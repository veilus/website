import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
  usdtAllowed,
  usdtShown,
  countdownText,
  emailHintKey,
  liveFromApi,
  fetchLive,
} from "./purchase-core.js";
import { SKUS } from "../data/skus.js";

test("API_BASE trùng hằng các trang hiện có", () => {
  assert.equal(API_BASE, "https://api.veilus.io");
});

test("parseQuery: renew=1 hỏi key, không mang key", () => {
  assert.deepEqual(parseQuery("?renew=1"), { sku: null, licenseKey: null, askKey: true, method: null });
});

test("parseQuery: renew=vl_pro_abc giữ key trong bộ nhớ", () => {
  assert.deepEqual(parseQuery("?renew=vl_pro_abc&sku=device_solo"), {
    sku: "device_solo",
    licenseKey: "vl_pro_abc",
    askKey: true,
    method: null,
  });
});

test("parseQuery: renew rỗng hoặc rác thì chỉ hỏi key", () => {
  assert.deepEqual(parseQuery("?renew=%20"), { sku: null, licenseKey: null, askKey: true, method: null });
  assert.deepEqual(parseQuery("?renew=<script>"), { sku: null, licenseKey: null, askKey: true, method: null });
});

test("parseQuery: renew=1&sku=monthly sống sót qua reload (URL đã gỡ key)", () => {
  assert.deepEqual(parseQuery("?renew=1&sku=monthly"), {
    sku: "monthly",
    licenseKey: null,
    askKey: true,
    method: null,
  });
});

test("formRequiresKey: renew=1 (không key, sau reload) vẫn buộc nhập key ở thuê tháng và thêm máy", () => {
  const q = parseQuery("?renew=1&sku=monthly");
  assert.equal(formRequiresKey("monthly", q), true);
  assert.equal(formRequiresKey("device_solo", q), true);
});

test("parseQuery: không có renew thì không hỏi key; sku lạ bị bỏ", () => {
  assert.deepEqual(parseQuery("?sku=solo"), { sku: "solo", licenseKey: null, askKey: false, method: null });
  assert.deepEqual(parseQuery("?sku=../x"), { sku: null, licenseKey: null, askKey: false, method: null });
  assert.deepEqual(parseQuery(""), { sku: null, licenseKey: null, askKey: false, method: null });
});

test("method=usdt: parseQuery giữ lại, payCurrency ra USDT kể cả khi có renew (mua thêm máy từ app)", () => {
  const q = parseQuery("?sku=device_team5&renew=vl_pro_abc&method=usdt");
  assert.equal(q.method, "usdt");
  assert.equal(q.licenseKey, "vl_pro_abc");
  assert.equal(payCurrency("en", q), "USDT");
  // Hàng đối chứng: renew không kèm method vẫn là luồng VNĐ như trước.
  assert.equal(payCurrency("en", parseQuery("?renew=1")), "VND");
  assert.equal(parseQuery("?sku=solo&method=paypal").method, null);
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

test("buildOrderBody: method usdt đi vào body; không có thì giữ nguyên", () => {
  assert.equal(buildOrderBody({ sku: "solo", email: "a@b.io", method: "usdt" }).method, "usdt");
  assert.equal("method" in buildOrderBody({ sku: "solo", email: "a@b.io" }), false);
  // Chỉ "usdt" đi vào body: giá trị khác là rác, API mặc định về SePay.
  assert.equal("method" in buildOrderBody({ sku: "solo", email: "a@b.io", method: "paypal" }), false);
  assert.equal("method" in buildOrderBody({ sku: "solo", email: "a@b.io", method: null }), false);
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

test("errorKey: 503 BUSY và 400 METHOD_NOT_SUPPORTED có thông báo riêng; 503 khác vẫn là unavailable", () => {
  assert.equal(errorKey(503, "BUSY"), "buy.err.busy");
  assert.equal(errorKey(400, "METHOD_NOT_SUPPORTED"), "buy.err.methodNotSupported");
  // Hàng đối chứng: mã cũ không đổi.
  assert.equal(errorKey(503, "NOT_CONFIGURED"), "buy.err.unavailable");
  assert.equal(errorKey(503, undefined), "buy.err.unavailable");
  assert.equal(errorKey(400, "BAD_REQUEST"), "buy.err.input");
});

// Trang tra chữ bằng `tr(key)` và rơi về `err.generic` khi thiếu khoá — im lặng. Bài này giữ cho mọi khoá
// errorKey trả về đều có chữ thật trong en.json (bài i18n-parity lo 7 ngôn ngữ còn lại có cùng khoá).
test("errorKey: mọi khoá trả về đều có chữ trong en.json", () => {
  const en = JSON.parse(readFileSync(new URL("../i18n/en.json", import.meta.url), "utf8"));
  const cases = [
    [400, "BAD_REQUEST"],
    [400, "WRONG_SKU"],
    [400, "ADDON_NOT_ALLOWED"],
    [400, "METHOD_NOT_SUPPORTED"],
    [400, undefined],
    [404, undefined],
    [429, undefined],
    [503, "NOT_CONFIGURED"],
    [503, "BUSY"],
    [500, undefined],
  ];
  for (const [status, code] of cases) {
    const key = errorKey(status, code);
    const text = en.buy.err[key.replace(/^buy\.err\./, "")];
    assert.ok(typeof text === "string" && text.length > 0, `${status} ${code} → ${key} thiếu trong en.json`);
  }
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

test("payCurrency: trang vi bỏ qua method=usdt (VNĐ không có USDT); bảy ngôn ngữ trả USD nhận method=usdt", () => {
  assert.equal(payCurrency("vi", { method: "usdt" }), "VND");
  assert.equal(payCurrency("vi", parseQuery("?sku=solo&method=usdt")), "VND");
  assert.equal(payCurrency("vi", parseQuery("?sku=device_solo&renew=vl_pro_abc&method=usdt")), "VND");
  for (const lang of OTHER_LANGS) {
    assert.equal(payCurrency(lang, parseQuery("?sku=solo&method=usdt")), "USDT", lang);
    assert.equal(payCurrency(lang, parseQuery("?sku=device_solo&renew=vl_pro_abc&method=usdt")), "USDT", lang);
    // Hàng đối chứng: thiếu method thì vẫn USD.
    assert.equal(payCurrency(lang, parseQuery("?sku=solo")), "USD", lang);
  }
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

test("usdtAllowed: v1 bán gói trọn đời và thêm máy qua USDT, không bán gói tháng", () => {
  for (const sku of ["solo", "team3", "team5", "team10", "team20", "device_solo", "device_team5", "device_team10"]) {
    assert.equal(usdtAllowed(sku), true, sku);
  }
  assert.equal(usdtAllowed("monthly"), false);
  assert.equal(usdtAllowed("khong-co"), false);
});

test("TELEGRAM_URL là kênh Telegram của Veilus", () => {
  assert.equal(TELEGRAM_URL, "https://t.me/veilusbrowser");
});

test("công tắc kênh: build không đặt biến thì thẻ và VNĐ bật, USDT tắt, API mặc định là production", () => {
  // Nộp LemonSqueezy duyệt (quyết định usd-lemonsqueezy-tran-199-va-usdt-trc20): production trả thẻ qua LemonSqueezy, VNĐ chuyển khoản; Telegram/USDT sau khi duyệt.
  assert.deepEqual(LIVE, { card: true, vnd: true, usdt: false });
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

test("liveFrom: thẻ và VNĐ chỉ \"0\" hoặc \"false\" mới tắt (thiếu biến hay rỗng là bật); USDT ngược lại, chỉ \"1\" hoặc \"true\" mới bật", () => {
  assert.deepEqual(liveFrom({}), { card: true, vnd: true, usdt: false });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "", PUBLIC_VND_LIVE: "" }), { card: true, vnd: true, usdt: false });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "0", PUBLIC_VND_LIVE: "false" }), { card: false, vnd: false, usdt: false });
  assert.deepEqual(liveFrom({ PUBLIC_CARD_LIVE: "1", PUBLIC_VND_LIVE: "0" }), { card: true, vnd: false, usdt: false });
  // USDT mặc định tắt (opt-in): chỉ "1" và "true" bật; rỗng, "0", "false" và giá trị lạ đều tắt.
  assert.equal(liveFrom({ PUBLIC_USDT_LIVE: "1" }).usdt, true);
  assert.equal(liveFrom({ PUBLIC_USDT_LIVE: "true" }).usdt, true);
  for (const v of ["", "0", "false", "yes", "on", "TRUE", " 1"]) {
    assert.equal(liveFrom({ PUBLIC_USDT_LIVE: v }).usdt, false, JSON.stringify(v));
  }
  // Mỗi kênh một công tắc: bật USDT không đụng tới thẻ và VNĐ, và ngược lại.
  assert.deepEqual(liveFrom({ PUBLIC_USDT_LIVE: "1" }), { card: true, vnd: true, usdt: true });
  assert.deepEqual(liveFrom({ PUBLIC_USDT_LIVE: "1", PUBLIC_CARD_LIVE: "0" }), { card: false, vnd: true, usdt: true });
});

// Quan hệ, không phải danh sách: SKU nào còn hiện mà giá vượt trần thẻ thì CI đỏ — kể cả SKU thêm sau này.
test("mọi gói đang hiện đều trả thẻ được, và bản build mặc định đưa chúng tới thẻ (USD) hoặc chuyển khoản (VNĐ)", () => {
  for (const sku of Object.keys(SKUS).filter((x) => listed(x))) {
    assert.ok(SKUS[sku].usd <= CARD_MAX_USD, `${sku} $${SKUS[sku].usd}`);
    assert.equal(payRoute("USD", sku), "card", `USD ${sku}`);
    assert.equal(payRoute("VND", sku), "vnd", `VND ${sku}`);
  }
});

// Thẻ đứng trước USDT: bật cả ba kênh mà gói đang hiện (theo danh sách ẩn mặc định) vẫn đi thẻ ở trang USD và chuyển
// khoản ở trang VNĐ. Bài này đo `payRoute` ghép với `listed`; việc ẩn gói khỏi bảng giá, ô chọn /mua và JSON-LD do các
// bộ lọc `listed()` trong .astro làm, bài này KHÔNG chạm tới chúng.
test("bật cả ba kênh: thẻ vẫn đứng trước USDT — mọi gói đang hiện (theo danh sách ẩn mặc định) giữ thẻ (USD) và chuyển khoản (VNĐ)", () => {
  const all = { card: true, vnd: true, usdt: true };
  for (const sku of Object.keys(SKUS).filter((x) => listed(x))) {
    assert.equal(payRoute("USD", sku, all), "card", `USD ${sku}`);
    assert.equal(payRoute("VND", sku, all), "vnd", `VND ${sku}`);
  }
  // Hàng đối chứng: bộ công tắc này có đường USDT thật (team10/team20 đi USDT), hai gói đó nằm ngoài vòng lặp vì đang ẩn.
  assert.equal(payRoute("USD", "team10", all), "usdt");
  assert.equal(payRoute("USD", "team20", all), "usdt");
  assert.equal(listed("team10"), false);
  assert.equal(listed("team20"), false);
});

// USDT TRC20 (VEIL-1283) là kênh thứ ba, chỉ cho gói trọn đời và gói thêm máy; thẻ còn thì thẻ đứng trước ở trang USD.
test("payRoute: trang USD, thẻ tắt USDT bật — gói trọn đời và thêm máy đi USDT, gói tháng đi Telegram", () => {
  const live = { card: false, vnd: false, usdt: true };
  for (const sku of ["solo", "team3", "team5", "team10", "team20", "device_solo", "device_team5", "device_team10"]) {
    assert.equal(payRoute("USD", sku, live), "usdt", sku);
  }
  assert.equal(payRoute("USD", "monthly", live), "telegram");
  assert.equal(payRoute("USD", "khong-co", live), "telegram");
});

test("payRoute: trang USD, thẻ và USDT cùng bật — gói ≤ $199 giữ thẻ, gói vượt trần đi USDT, gói tháng đi thẻ", () => {
  const live = { card: true, vnd: false, usdt: true };
  for (const sku of ["solo", "team3", "team5", "device_team10", "monthly"]) {
    assert.equal(payRoute("USD", sku, live), "card", sku);
  }
  assert.equal(payRoute("USD", "team10", live), "usdt");
  assert.equal(payRoute("USD", "team20", live), "usdt");
});

test("payRoute: USDT tắt thì không gói nào đi USDT — gói vượt trần về Telegram như trước", () => {
  const live = { card: true, vnd: true, usdt: false };
  // Mọi gói trong bảng SKU (kể cả gói thêm sau này) × mọi loại tiền: USDT tắt thì không đường nào ra "usdt".
  for (const sku of Object.keys(SKUS)) {
    for (const currency of ["USD", "USDT", "VND"]) {
      assert.notEqual(payRoute(currency, sku, live), "usdt", `${currency} ${sku}`);
    }
  }
  assert.equal(payRoute("USD", "team10", live), "telegram");
  assert.equal(payRoute("USDT", "team10", live), "telegram");
  assert.equal(payRoute("USD", "solo", live), "card");
  // Mặc định đọc công tắc của bản build — test không đặt biến nên thẻ bật, USDT tắt: gói vượt trần về Telegram;
  // loại tiền USDT (?method=usdt) không có USDT để đi nên rơi về đường của USD (gói rẻ → thẻ, gói vượt trần → Telegram).
  assert.equal(payRoute("USD", "team10"), "telegram");
  assert.equal(payRoute("USDT", "team10"), "telegram");
  assert.equal(payRoute("USDT", "solo"), "card");
});

test("payRoute: VNĐ không phụ thuộc công tắc USDT", () => {
  assert.equal(payRoute("VND", "solo", { card: false, vnd: true, usdt: true }), "vnd");
  assert.equal(payRoute("VND", "solo", { card: true, vnd: false, usdt: true }), "telegram");
});

test("payRoute: loại tiền USDT (method=usdt) chọn USDT dù thẻ cũng được; gói tháng rơi về kết quả của USD", () => {
  const both = { card: true, vnd: true, usdt: true };
  for (const sku of ["solo", "team10", "device_team5"]) {
    assert.equal(payRoute("USDT", sku, both), "usdt", sku);
  }
  // Gói tháng không bán qua USDT: thẻ còn bật thì giữ nút thẻ, thẻ tắt thì Telegram.
  assert.equal(payRoute("USDT", "monthly", both), "card");
  assert.equal(payRoute("USDT", "monthly", { card: false, vnd: true, usdt: true }), "telegram");
  // Hàng đối chứng: không có method=usdt thì cùng bộ công tắc cho gói rẻ vẫn là thẻ.
  assert.equal(payRoute("USD", "solo", both), "card");
});

test("usdtShown: nút USDT hiện ở luồng USD và luồng method=usdt khi USDT bật, cho gói trọn đời và thêm máy; VNĐ không bao giờ", () => {
  const on = { card: false, vnd: true, usdt: true };
  const off = { card: true, vnd: true, usdt: false };
  for (const sku of ["solo", "team3", "team10", "device_team5"]) {
    assert.equal(usdtShown("USD", sku, on), true, `USD ${sku}`);
    assert.equal(usdtShown("USDT", sku, on), true, `USDT ${sku}`);
    assert.equal(usdtShown("VND", sku, on), false, `VND ${sku}`);
    assert.equal(usdtShown("USD", sku, off), false, `USD, USDT tắt ${sku}`);
    assert.equal(usdtShown("USDT", sku, off), false, `USDT, USDT tắt ${sku}`);
  }
  // Gói tháng không bán qua USDT, kể cả khi bật.
  assert.equal(usdtShown("USD", "monthly", on), false);
  assert.equal(usdtShown("USDT", "monthly", on), false);
  // Mặc định đọc công tắc của bản build — test không đặt biến nên USDT tắt.
  assert.equal(usdtShown("USD", "solo"), false);
  // Bộ công tắc thiếu khoá usdt vẫn ra đúng `false`, không phải `undefined`.
  assert.equal(usdtShown("USD", "solo", { card: true, vnd: true }), false);
});

test("countdownText: HH:MM:SS còn lại tới expires_at, làm tròn lên giây; quá hạn thì 00:00:00; giá trị hỏng thì null", () => {
  const exp = "2026-10-08T12:00:00.000Z";
  const at = (iso) => Date.parse(iso);
  assert.equal(countdownText(exp, at("2026-10-07T12:00:00.000Z")), "24:00:00");
  assert.equal(countdownText(exp, at("2026-10-07T12:00:01.000Z")), "23:59:59");
  assert.equal(countdownText(exp, at("2026-10-08T11:58:59.000Z")), "00:01:01");
  assert.equal(countdownText(exp, at("2026-10-08T11:59:59.500Z")), "00:00:01");
  assert.equal(countdownText(exp, at("2026-10-08T12:00:00.000Z")), "00:00:00");
  // Quá hạn thì dừng ở 0, không âm.
  assert.equal(countdownText(exp, at("2026-10-09T00:00:00.000Z")), "00:00:00");
  // Chỉ chuỗi ngày đọc được mới có đồng hồ: số, rỗng, thiếu, rác đều null (trang ẩn dòng đồng hồ).
  for (const bad of [undefined, null, 1791374400000, "", "khong-phai-ngay"]) {
    assert.equal(countdownText(bad, 0), null, String(bad));
  }
});

test("emailHintKey: chỉ luồng VNĐ dùng câu 'bắt buộc khi chuyển khoản'; thẻ và USDT dùng câu biên nhận/key", () => {
  assert.equal(emailHintKey("VND"), "emailHint");
  assert.equal(emailHintKey("USD"), "emailHintUsd");
  assert.equal(emailHintKey("USDT"), "emailHintUsd");
  // Trang `en` (USD) không được hiện câu chuyển khoản; trang `vi` (VNĐ) thì giữ.
  for (const lang of ["en", "vi", "zh", "ru", "es", "pt", "id", "tr"]) {
    const dict = JSON.parse(readFileSync(new URL(`../i18n/${lang}.json`, import.meta.url), "utf8")).buy;
    assert.ok(dict.emailHint && dict.emailHintUsd, lang);
    assert.notEqual(dict.emailHint, dict.emailHintUsd, lang);
  }
});

test("buy.telegramOnly và usdtExpired: không hứa thời hạn, telegramOnly không nói 'gửi key' (đơn gia hạn/thêm máy đã có key)", () => {
  for (const lang of ["en", "vi", "zh", "ru", "es", "pt", "id", "tr"]) {
    const dict = JSON.parse(readFileSync(new URL(`../i18n/${lang}.json`, import.meta.url), "utf8")).buy;
    assert.doesNotMatch(dict.telegramOnly, /ngay khi|即|once payment|key|ключ|clave|chave|kunci|anahtar/i, lang);
    assert.match(dict.usdtExpired, /billing@veilus\.io/, lang);
    assert.match(dict.usdtExpired, new RegExp(TELEGRAM_URL.split("/").pop()), lang);
  }
});

// Công tắc từ API (GET /api/v1/payment-methods, VEIL-1321): thẻ theo từng gói, Telegram có thể tắt, gói không đường nào thì ẩn.
const apiBody = (o = {}) => ({
  telegram: { enabled: true, url: "https://t.me/veilusbrowser" },
  usdt: false,
  vnd: true,
  card: Object.fromEntries(Object.keys(SKUS).map((k) => [k, SKUS[k].usd <= 199])),
  ...o,
});

test("liveFromApi: ánh xạ phản hồi API sang công tắc; phản hồi hỏng trả null", () => {
  const live = liveFromApi(apiBody({ usdt: true, telegram: { enabled: false, url: "x" } }));
  assert.deepEqual(live, { card: apiBody().card, vnd: true, usdt: true, telegram: false, telegramUrl: TELEGRAM_URL });
  for (const bad of [null, "x", {}, { vnd: true, usdt: false, telegram: { enabled: true } }, apiBody({ vnd: "1" }), apiBody({ card: null })]) {
    assert.equal(liveFromApi(bad), null, JSON.stringify(bad));
  }
});

test("payRoute: thẻ theo từng gói khi API trả bảng card", () => {
  const live = { card: { solo: false, team3: true }, vnd: true, usdt: false, telegram: true };
  assert.equal(payRoute("USD", "team3", live), "card");
  assert.equal(payRoute("USD", "solo", live), "telegram");
  // Gói vắng trong bảng card coi như không trả thẻ được — kể cả khi giá ≤ $199.
  assert.equal(payRoute("USD", "monthly", live), "telegram");
  // Bảng card thay trần $199 phía website: API nói được là được.
  assert.equal(payRoute("USD", "team10", { ...live, card: { team10: true } }), "card");
});

test("payRoute: không còn đường nào (Telegram tắt) thì ra hidden", () => {
  const none = { card: {}, vnd: false, usdt: false, telegram: false };
  for (const sku of ["monthly", "solo", "team10", "device_team5"]) {
    assert.equal(payRoute("USD", sku, none), "hidden", `USD ${sku}`);
    assert.equal(payRoute("USDT", sku, none), "hidden", `USDT ${sku}`);
    assert.equal(payRoute("VND", sku, none), "hidden", `VND ${sku}`);
  }
  // Hàng đối chứng: cùng công tắc nhưng Telegram bật thì về Telegram, không phải hidden.
  assert.equal(payRoute("VND", "solo", { ...none, telegram: true }), "telegram");
  assert.equal(payRoute("USD", "solo", { ...none, telegram: true }), "telegram");
  // Còn một đường thật thì không ẩn dù Telegram tắt.
  assert.equal(payRoute("VND", "solo", { ...none, vnd: true }), "vnd");
  assert.equal(payRoute("USD", "solo", { ...none, card: { solo: true } }), "card");
  assert.equal(payRoute("USD", "solo", { ...none, usdt: true }), "usdt");
  assert.equal(payRoute("USDT", "solo", { ...none, usdt: true, card: { solo: true } }), "usdt");
  // Gói tháng không bán qua USDT: thẻ tắt + Telegram tắt thì ẩn dù USDT bật.
  assert.equal(payRoute("USD", "monthly", { ...none, usdt: true }), "hidden");
});

test("fetchLive: đọc API; lỗi mạng, mã khác 200, JSON hỏng hay quá giờ thì null (giữ bản build)", async () => {
  const ok = async (url) => {
    assert.equal(url, `${API_BASE}/api/v1/payment-methods`);
    return new Response(JSON.stringify(apiBody()), { status: 200 });
  };
  assert.deepEqual(await fetchLive(ok), liveFromApi(apiBody()));
  assert.equal(await fetchLive(async () => { throw new TypeError("mạng"); }), null);
  assert.equal(await fetchLive(async () => new Response("{}", { status: 500 })), null);
  assert.equal(await fetchLive(async () => new Response("không phải json", { status: 200 })), null);
  // Treo quá hạn: fetch nhận signal và bị huỷ.
  const hang = (_u, { signal }) => new Promise((_, rej) => signal.addEventListener("abort", () => rej(signal.reason)));
  assert.equal(await fetchLive(hang, 20), null);
});

test("liveFromApi: telegramUrl lấy từ API khi là https://t.me/…, còn lại về TELEGRAM_URL", () => {
  const url = (u) => liveFromApi(apiBody({ telegram: { enabled: true, url: u } })).telegramUrl;
  assert.equal(url("https://t.me/veilus_sales"), "https://t.me/veilus_sales");
  for (const bad of [undefined, "", "http://t.me/x", "https://t.me.evil.com/x", "https://evil.com/?https://t.me/", "javascript:alert(1)", 42]) {
    assert.equal(url(bad), TELEGRAM_URL, JSON.stringify(bad));
  }
});
