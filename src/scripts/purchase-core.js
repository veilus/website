/**
 * Logic thuần của trang /mua — không chạm DOM, test bằng `node --test`.
 * Key license chỉ đi qua tham số hàm; module này không ghi nó đi đâu cả.
 */
import { SKUS } from "../data/skus.js";

export const API_BASE = "https://api.veilus.io";

const isSku = (x) => typeof x === "string" && Object.hasOwn(SKUS, x);

/** `?renew=` có mặt (kể cả `1` từ thư nhắc) thì hỏi key; chỉ nhận key dạng `vl_…`. */
export function parseQuery(search) {
  const q = new URLSearchParams(search);
  const sku = q.get("sku");
  const renew = q.has("renew") ? q.get("renew").trim() : null;
  return {
    sku: isSku(sku) ? sku : null,
    licenseKey: renew && renew.startsWith("vl_") ? renew : null,
    askKey: renew !== null,
  };
}

/** Thêm máy luôn cần key; thuê tháng cần khi gia hạn; trọn đời cấp key mới. */
export function needsKey(sku, renewing = false) {
  const kind = SKUS[sku]?.kind;
  return kind === "addon" || (kind === "monthly" && renewing);
}

/** API trả 400 nếu gói trọn đời mang license_key — nên bỏ hẳn ở đây. */
export function buildOrderBody({ sku, email, licenseKey }) {
  const body = { sku, email: (email ?? "").trim() };
  const key = (licenseKey ?? "").trim();
  if (key && SKUS[sku]?.kind !== "lifetime") body.license_key = key;
  return body;
}

const BAD_REQUEST_KEYS = {
  BAD_REQUEST: "buy.err.input",
  WRONG_SKU: "buy.err.wrongSku",
  ADDON_NOT_ALLOWED: "buy.err.addonNotAllowed",
};

export function errorKey(status, code) {
  if (status === 400) return BAD_REQUEST_KEYS[code] ?? "buy.err.generic";
  if (status === 404) return "buy.err.keyNotFound";
  if (status === 429) return "buy.err.rateLimited";
  if (status === 503) return "buy.err.unavailable";
  return "buy.err.generic";
}

export function safeCheckoutUrl(url) {
  return typeof url === "string" && url.startsWith("https://") ? url : null;
}

const SLOW_AFTER_MS = 30 * 60 * 1000;

/** Poll đơn mỗi 4 giây; 30 phút không đổi trạng thái thì thưa lại 30 giây. */
export function pollDelay(msSinceChange) {
  return msSinceChange >= SLOW_AFTER_MS ? 30_000 : 4_000;
}
