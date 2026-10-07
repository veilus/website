import { test } from "node:test";
import assert from "node:assert/strict";
import {
  API_BASE,
  parseQuery,
  needsKey,
  formRequiresKey,
  buildOrderBody,
  errorKey,
  safeCheckoutUrl,
  pollDelay,
  hasValidAmount,
  currencyForLang,
  payCurrency,
  formatPrice,
  CARD_MAX_USD,
  cardAllowed,
  TELEGRAM_URL,
  LIVE,
  payRoute,
  HIDDEN_SKUS,
  listed,
  liveFrom,
} from "./purchase-core.js";

test("API_BASE trùng hằng các trang hiện có", () => {
  assert.equal(API_BASE, "https://api.veilus.io");
});

test("parseQuery: renew=1 hỏi key, không mang key", () => {
  assert.deepEqual(parseQuery("?renew=1"), { sku: null, licenseKey: null, askKey: true });
});

test("parseQuery: renew=vl_pro_abc giữ key trong bộ nhớ", () => {
  assert.deepEqual(parseQuery("?renew=vl_pro_abc&sku=device_solo"), {
    sku: "device_solo",
    licenseKey: "vl_pro_abc",
    askKey: true,
  });
});

test("parseQuery: renew rỗng hoặc rác thì chỉ hỏi key", () => {
  assert.deepEqual(parseQuery("?renew=%20"), { sku: null, licenseKey: null, askKey: true });
  assert.deepEqual(parseQuery("?renew=<script>"), { sku: null, licenseKey: null, askKey: true });
});

test("parseQuery: renew=1&sku=monthly sống sót qua reload (URL đã gỡ key)", () => {
  assert.deepEqual(parseQuery("?renew=1&sku=monthly"), {
    sku: "monthly",
    licenseKey: null,
    askKey: true,
  });
});

test("formRequiresKey: renew=1 (không key, sau reload) vẫn buộc nhập key ở thuê tháng và thêm máy", () => {
  const q = parseQuery("?renew=1&sku=monthly");
  assert.equal(formRequiresKey("monthly", q), true);
  assert.equal(formRequiresKey("device_solo", q), true);
});

test("parseQuery: không có renew thì không hỏi key; sku lạ bị bỏ", () => {
  assert.deepEqual(parseQuery("?sku=solo"), { sku: "solo", licenseKey: null, askKey: false });
  assert.deepEqual(parseQuery("?sku=../x"), { sku: null, licenseKey: null, askKey: false });
  assert.deepEqual(parseQuery(""), { sku: null, licenseKey: null, askKey: false });
});

test("needsKey: thêm máy luôn cần key, thuê tháng cần khi gia hạn, trọn đời không", () => {
  assert.equal(needsKey("device_solo"), true);
  assert.equal(needsKey("device_team10"), true);
  assert.equal(needsKey("monthly"), false);
  assert.equal(needsKey("monthly", true), true);
  assert.equal(needsKey("solo"), false);
  assert.equal(needsKey("solo", true), false);
});

test("formRequiresKey: renew=1 buộc key ở thuê tháng, không renew thì không", () => {
  assert.equal(formRequiresKey("monthly", { askKey: true, licenseKey: null }), true);
  assert.equal(formRequiresKey("monthly", { askKey: false, licenseKey: null }), false);
  assert.equal(formRequiresKey("monthly", { askKey: false, licenseKey: "vl_pro_x" }), true);
  assert.equal(formRequiresKey("device_solo", { askKey: false, licenseKey: null }), true);
  assert.equal(formRequiresKey("solo", { askKey: true, licenseKey: null }), false);
});

test("hasValidAmount: chỉ nhận số hữu hạn dương", () => {
  assert.equal(hasValidAmount(2_500_000), true);
  assert.equal(hasValidAmount(NaN), false);
  assert.equal(hasValidAmount(Infinity), false);
  assert.equal(hasValidAmount("2500000"), false);
  assert.equal(hasValidAmount(undefined), false);
  assert.equal(hasValidAmount(0), false);
});

test("buildOrderBody: bỏ license_key khi null hoặc gói trọn đời", () => {
  assert.deepEqual(buildOrderBody({ sku: "monthly", email: "a@b.co", licenseKey: null }), {
    sku: "monthly",
    email: "a@b.co",
  });
  assert.deepEqual(buildOrderBody({ sku: "solo", email: "a@b.co", licenseKey: "vl_pro_abc" }), {
    sku: "solo",
    email: "a@b.co",
  });
  assert.deepEqual(
    buildOrderBody({ sku: "device_solo", email: " a@b.co ", licenseKey: " vl_pro_abc " }),
    { sku: "device_solo", email: "a@b.co", license_key: "vl_pro_abc" },
  );
});

test("buildOrderBody: kèm lang nguyên văn khi có, bỏ qua khi không", () => {
  assert.deepEqual(
    buildOrderBody({ sku: "monthly", email: "a@b.co", licenseKey: null, lang: "vi" }),
    { sku: "monthly", email: "a@b.co", lang: "vi" },
  );
  assert.deepEqual(
    buildOrderBody({ sku: "monthly", email: "a@b.co", licenseKey: null, lang: "zh-CN" }),
    { sku: "monthly", email: "a@b.co", lang: "zh-CN" },
  );
  // Hàng đối chứng: không có lang thì không thêm khoá — thân đơn như cũ.
  assert.deepEqual(
    buildOrderBody({ sku: "monthly", email: "a@b.co", licenseKey: null }),
    { sku: "monthly", email: "a@b.co" },
  );
});

test("errorKey: đủ bảng ánh xạ", () => {
  assert.equal(errorKey(400, "BAD_REQUEST"), "buy.err.input");
  assert.equal(errorKey(400, "WRONG_SKU"), "buy.err.wrongSku");
  assert.equal(errorKey(400, "ADDON_NOT_ALLOWED"), "buy.err.addonNotAllowed");
  assert.equal(errorKey(404, "LICENSE_INVALID"), "buy.err.keyNotFound");
  assert.equal(errorKey(404, undefined), "buy.err.keyNotFound");
  assert.equal(errorKey(429, "RATE_LIMITED"), "buy.err.rateLimited");
  assert.equal(errorKey(503, "NOT_CONFIGURED"), "buy.err.unavailable");
  assert.equal(errorKey(500, "INTERNAL_ERROR"), "buy.err.generic");
  assert.equal(errorKey(502, undefined), "buy.err.generic");
  assert.equal(errorKey(400, undefined), "buy.err.generic");
});

test("safeCheckoutUrl: chỉ nhận chuỗi https://", () => {
  assert.equal(safeCheckoutUrl("https://x"), "https://x");
  assert.equal(safeCheckoutUrl("http://x"), null);
  assert.equal(safeCheckoutUrl("javascript:alert(1)"), null);
  assert.equal(safeCheckoutUrl(" https://x"), null);
  assert.equal(safeCheckoutUrl(42), null);
  assert.equal(safeCheckoutUrl(undefined), null);
});

test("pollDelay: 4 giây, sau 30 phút không đổi thì 30 giây", () => {
  assert.equal(pollDelay(0), 4000);
  assert.equal(pollDelay(30 * 60 * 1000 - 1), 4000);
  assert.equal(pollDelay(30 * 60 * 1000), 30000);
});

const OTHER_LANGS = ["en", "zh", "ru", "pt", "es", "tr", "id"];

test("currencyForLang: vi ra VND, bảy ngôn ngữ còn lại ra USD", () => {
  assert.equal(currencyForLang("vi"), "VND");
  for (const lang of OTHER_LANGS) assert.equal(currencyForLang(lang), "USD", lang);
});

test("payCurrency: có renew thì luôn VND bất kể ngôn ngữ trang", () => {
  for (const lang of [...OTHER_LANGS, "vi"]) {
    assert.equal(payCurrency(lang, parseQuery("?renew=vl_pro_x")), "VND", lang);
    assert.equal(payCurrency(lang, parseQuery("?renew=1")), "VND", lang);
  }
  assert.equal(payCurrency("en", parseQuery("?sku=monthly")), "USD");
  assert.equal(payCurrency("vi", parseQuery("?sku=monthly")), "VND");
});

test("formatPrice: VND có dấu nhóm và đ, USD có $", () => {
  assert.equal(formatPrice(200_000, "VND", "vi"), "200.000 đ");
  assert.equal(formatPrice(9, "USD", "en"), "$9");
  assert.equal(formatPrice(0, "USD", "zh"), "$0");
});

test("cardAllowed: gói ≤ $199 trả thẻ được; team10/team20 vượt trần LemonSqueezy; SKU lạ thì không", () => {
  assert.equal(CARD_MAX_USD, 199);
  for (const sku of ["monthly", "solo", "team3", "team5", "device_solo", "device_team5", "device_team10"]) {
    assert.equal(cardAllowed(sku), true, sku);
  }
  assert.equal(cardAllowed("team10"), false);
  assert.equal(cardAllowed("team20"), false);
  assert.equal(cardAllowed("khong-co"), false);
});

test("TELEGRAM_URL là kênh Telegram của Veilus", () => {
  assert.equal(TELEGRAM_URL, "https://t.me/veilusbrowser");
});

test("công tắc kênh: build không đặt biến thì thẻ và VNĐ bật, API mặc định là production", () => {
  // Nộp LemonSqueezy duyệt (quyết định 0115): production trả thẻ qua LemonSqueezy, VNĐ chuyển khoản; Telegram/USDT sau khi duyệt.
  assert.deepEqual(LIVE, { card: true, vnd: true });
  assert.equal(API_BASE, "https://api.veilus.io");
});

test("gói ẩn: build không đặt biến thì ẩn team10/team20 (vượt trần thẻ), mọi gói khác vẫn hiện", () => {
  assert.deepEqual([...HIDDEN_SKUS], ["team10", "team20"]);
  assert.equal(listed("team10"), false);
  assert.equal(listed("team20"), false);
  for (const sku of ["monthly", "solo", "team3", "team5", "device_solo", "device_team5", "device_team10"]) {
    assert.equal(listed(sku), true, sku);
  }
  // Staging đặt PUBLIC_HIDE_SKUS rỗng thì hiện đủ.
  assert.equal(listed("team10", []), true);
});

test("payRoute: kênh chưa bật thì mọi gói đi Telegram, cả VNĐ lẫn USD", () => {
  const off = { card: false, vnd: false };
  for (const sku of ["monthly", "solo", "team3", "team5", "team10", "device_team5"]) {
    assert.equal(payRoute("USD", sku, off), "telegram", `USD ${sku}`);
    assert.equal(payRoute("VND", sku, off), "telegram", `VND ${sku}`);
  }
  // Mặc định đọc công tắc của bản build — test không đặt biến nên thẻ và VNĐ đều bật.
  assert.equal(payRoute("VND", "solo"), "vnd");
  assert.equal(payRoute("USD", "team3"), "card");
});

// Hàng đối chứng: kênh bật thì về lại đường cũ — VNĐ chuyển khoản, thẻ cho gói ≤ $199, Telegram cho gói vượt trần.
test("payRoute: kênh đã bật thì VNĐ chuyển khoản, thẻ cho gói ≤ $199, vượt trần đi Telegram", () => {
  const on = { card: true, vnd: true };
  assert.equal(payRoute("VND", "team10", on), "vnd");
  assert.equal(payRoute("USD", "team3", on), "card");
  assert.equal(payRoute("USD", "monthly", on), "card");
  assert.equal(payRoute("USD", "team10", on), "telegram");
  assert.equal(payRoute("USD", "team20", on), "telegram");
  // Mỗi kênh một công tắc, hai chiều: bật VNĐ không bật thẻ, bật thẻ không bật VNĐ.
  assert.equal(payRoute("VND", "solo", { card: true, vnd: false }), "telegram");
  assert.equal(payRoute("USD", "solo", { card: false, vnd: true }), "telegram");
  assert.equal(payRoute("VND", "solo", { card: false, vnd: true }), "vnd");
});

test("liveFrom: chỉ \"0\" và \"false\" tắt một kênh; thiếu biến hay rỗng là bật", () => {
  assert.deepEqual(liveFrom({}), { card: true, vnd: true });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "", PUBLIC_VND_LIVE: "" }), { card: true, vnd: true });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "0", PUBLIC_VND_LIVE: "false" }), { card: false, vnd: false });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "1", PUBLIC_VND_LIVE: "0" }), { card: true, vnd: false });
});

// Quan hệ, không phải danh sách: SKU nào còn hiện mà giá vượt trần thẻ thì CI đỏ — kể cả SKU thêm sau này.
test("mọi gói đang hiện đều trả thẻ được, và bản build mặc định đưa chúng tới thẻ (USD) hoặc chuyển khoản (VNĐ)", async () => {
  const { SKUS } = await import("../data/skus.js");
  for (const sku of Object.keys(SKUS).filter((x) => listed(x))) {
    assert.ok(SKUS[sku].usd <= CARD_MAX_USD, `${sku} $${SKUS[sku].usd}`);
    assert.equal(payRoute("USD", sku), "card", `USD ${sku}`);
    assert.equal(payRoute("VND", sku), "vnd", `VND ${sku}`);
  }
});

