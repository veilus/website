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

/**
 * Buộc nhập key hay không, tính từ query của URL lúc vào trang (`parseQuery`).
 * `askKey`/`licenseKey` không đổi khi người dùng đổi SKU trong form, nên đây
 * là nguồn sự thật duy nhất cho "đang gia hạn" — không suy lại từ ô key.
 */
export function formRequiresKey(sku, query) {
  const renewing = Boolean(query?.askKey) || Boolean(query?.licenseKey);
  return needsKey(sku, renewing);
}

/** Số tiền hợp lệ để hiển thị — chặn "NaN đ" từ response hỏng hoặc sessionStorage cũ. */
export function hasValidAmount(amount) {
  return typeof amount === "number" && Number.isFinite(amount) && amount > 0;
}

/**
 * API trả 400 nếu gói trọn đời mang license_key — nên bỏ hẳn ở đây.
 * `lang` là mã ngôn ngữ trang (`vi`, `en`, …), gửi nguyên văn — API tự chuẩn hoá.
 */
export function buildOrderBody({ sku, email, licenseKey, lang }) {
  const body = { sku, email: (email ?? "").trim() };
  const key = (licenseKey ?? "").trim();
  if (key && SKUS[sku]?.kind !== "lifetime") body.license_key = key;
  if (lang) body.lang = lang;
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

/** Một loại tiền mỗi ngôn ngữ trang: tiếng Việt trả VNĐ (chuyển khoản), còn lại USD (thẻ). */
export function currencyForLang(lang) {
  return lang === "vi" ? "VND" : "USD";
}

/** Gia hạn từ app (`?renew=`) là key thuê tháng VNĐ — luôn đi luồng VNĐ dù trang ngôn ngữ nào. */
export function payCurrency(lang, query) {
  return query?.askKey || query?.licenseKey ? "VND" : currencyForLang(lang);
}

export function formatPrice(amount, currency, lang) {
  return currency === "VND" ? `${new Intl.NumberFormat(lang).format(amount)} đ` : `$${amount}`;
}

/** Trần mỗi giao dịch thẻ của LemonSqueezy (thư duyệt store ngày 2026-10-07). */
export const CARD_MAX_USD = 199;

/** Kênh mua các gói không bán qua thẻ, trong lúc chưa có USDT (spec USDT §12 bước 2). */
export const TELEGRAM_URL = "https://t.me/veilusbrowser";

/** Gói này trả thẻ (USD) được không: giá USD không vượt trần của LemonSqueezy. SKU lạ thì không. */
export function cardAllowed(sku) {
  return (SKUS[sku]?.usd ?? Infinity) <= CARD_MAX_USD;
}
