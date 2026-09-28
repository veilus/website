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
