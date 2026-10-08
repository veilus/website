/**
 * Logic thuần của trang /mua — không chạm DOM, test bằng `node --test`.
 * Key license chỉ đi qua tham số hàm; module này không ghi nó đi đâu cả.
 */
import { SKUS } from "../data/skus.js";

// Biến PUBLIC_* đặt lúc build (Vite thay vào bundle). Chạy bằng `node --test` thì không có, nên mọi thứ về mặc định production.
const env = import.meta.env ?? {};
const off = (v) => v === "0" || v === "false";
const on = (v) => v === "1" || v === "true";
const list = (v) => v.split(",").map((x) => x.trim()).filter(Boolean);

/** API thanh toán. Bản staging build với `PUBLIC_API_BASE` trỏ Worker staging. */
export const API_BASE = env.PUBLIC_API_BASE || "https://api.veilus.io";

/**
 * Kênh thanh toán nào đang bán — mỗi kênh một công tắc, đặt lúc build.
 * Thẻ (`PUBLIC_CARD_LIVE`) và chuyển khoản VNĐ (`PUBLIC_VND_LIVE`) mặc định BẬT,
 * đặt `0` để tắt; kênh tắt thì mọi nút mua của kênh đó mở Telegram. USDT
 * (`PUBLIC_USDT_LIVE`) mặc định TẮT, chỉ `1` hoặc `true` mới bật: build không đặt
 * biến thì không có nút USDT nào và không có link `method=usdt`. Production
 * không tắt kênh nào: thẻ (USD) và chuyển khoản (VNĐ).
 */
export function liveFrom(e) {
  return Object.freeze({
    card: !off(e.PUBLIC_CARD_LIVE),
    vnd: !off(e.PUBLIC_VND_LIVE),
    usdt: on(e.PUBLIC_USDT_LIVE),
  });
}
export const LIVE = liveFrom(env);

/**
 * Gói không hiện trên bảng giá và /mua. Mặc định ẩn team10/team20: giá vượt trần
 * thẻ $199 (quyết định usd-lemonsqueezy-tran-199-va-usdt-trc20). Bảng SKU vẫn giữ hai gói
 * này (cổng sku-price-parity, bán VNĐ/USDT sau). Staging đặt `PUBLIC_HIDE_SKUS=`
 * (rỗng) hoặc `PUBLIC_HIDE_SKUS=none` (shell không đặt được biến rỗng) để hiện đủ.
 * Gói ẩn thắng mọi kênh, kể cả USDT: không có dòng giá, ô chọn hay link `method=usdt` cho chúng.
 */
export const HIDDEN_SKUS = Object.freeze(list(env.PUBLIC_HIDE_SKUS ?? "team10,team20"));

export function listed(sku, hidden = HIDDEN_SKUS) {
  return !hidden.includes(sku);
}

const isSku = (x) => typeof x === "string" && Object.hasOwn(SKUS, x);

/**
 * `?renew=` có mặt (kể cả `1` từ thư nhắc) thì hỏi key; chỉ nhận key dạng `vl_…`.
 * `?method=usdt` mở thẳng luồng USDT (app mở trang này cho gói trọn đời và thêm máy); giá trị khác là rác.
 */
export function parseQuery(search) {
  const q = new URLSearchParams(search);
  const sku = q.get("sku");
  const renew = q.has("renew") ? q.get("renew").trim() : null;
  return {
    sku: isSku(sku) ? sku : null,
    licenseKey: renew && renew.startsWith("vl_") ? renew : null,
    askKey: renew !== null,
    method: q.get("method") === "usdt" ? "usdt" : null,
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
 * `method: "usdt"` đi vào body để API tạo đơn USDT; thiếu thì API mặc định là chuyển khoản VNĐ.
 */
export function buildOrderBody({ sku, email, licenseKey, lang, method }) {
  const body = { sku, email: (email ?? "").trim() };
  const key = (licenseKey ?? "").trim();
  if (key && SKUS[sku]?.kind !== "lifetime") body.license_key = key;
  if (lang) body.lang = lang;
  if (method === "usdt") body.method = "usdt";
  return body;
}

const BAD_REQUEST_KEYS = {
  BAD_REQUEST: "buy.err.input",
  WRONG_SKU: "buy.err.wrongSku",
  ADDON_NOT_ALLOWED: "buy.err.addonNotAllowed",
  METHOD_NOT_SUPPORTED: "buy.err.methodNotSupported",
};

export function errorKey(status, code) {
  if (status === 400) return BAD_REQUEST_KEYS[code] ?? "buy.err.generic";
  if (status === 404) return "buy.err.keyNotFound";
  if (status === 429) return "buy.err.rateLimited";
  // BUSY: API hết số lẻ USDT để cấp (thử lại sau); các 503 còn lại là kênh chưa cấu hình.
  if (status === 503) return code === "BUSY" ? "buy.err.busy" : "buy.err.unavailable";
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

/**
 * Gia hạn từ app (`?renew=`) là key thuê tháng VNĐ — luôn đi luồng VNĐ dù trang ngôn ngữ nào.
 * Ngoại lệ: `method=usdt` đi luồng USDT kể cả khi có `renew` (mua thêm máy từ app mang key trong `renew`),
 * nhưng chỉ ở trang trả USD — trang `vi` không có USDT nên bỏ qua `method`.
 */
export function payCurrency(lang, query) {
  if (query?.method === "usdt" && currencyForLang(lang) === "USD") return "USDT";
  return query?.askKey || query?.licenseKey ? "VND" : currencyForLang(lang);
}

/** Khoá chú thích dưới ô email: chuyển khoản VNĐ bắt buộc có email; thẻ và USDT dùng câu về biên nhận/key. */
export function emailHintKey(currency) {
  return currency === "VND" ? "emailHint" : "emailHintUsd";
}

export function formatPrice(amount, currency, lang) {
  return currency === "VND" ? `${new Intl.NumberFormat(lang).format(amount)} đ` : `$${amount}`;
}

/** Trần mỗi giao dịch thẻ của LemonSqueezy (thư duyệt store ngày 2026-10-07). */
export const CARD_MAX_USD = 199;

/** Kênh Telegram của Veilus: đường mua khi kênh trả tự động đang tắt hoặc gói không có đường nào (`payRoute`). */
export const TELEGRAM_URL = "https://t.me/veilusbrowser";

/** Gói này trả thẻ (USD) được không: giá USD không vượt trần của LemonSqueezy. SKU lạ thì không. */
export function cardAllowed(sku) {
  return (SKUS[sku]?.usd ?? Infinity) <= CARD_MAX_USD;
}

/** v1 bán gói trọn đời và gói thêm máy qua USDT; gói tháng chỉ qua thẻ (spec USDT §3). SKU lạ thì không. */
export function usdtAllowed(sku) {
  const kind = SKUS[sku]?.kind;
  return kind === "lifetime" || kind === "addon";
}

/**
 * Trang có hiện nút USDT cho gói này không: loại tiền khác VNĐ, USDT đã bật, gói trọn đời hoặc thêm máy.
 * Tách khỏi `payRoute` vì trang USD có thể hiện nút thẻ và nút USDT cạnh nhau.
 */
export function usdtShown(currency, sku, live = LIVE) {
  return currency !== "VND" && Boolean(live.usdt) && usdtAllowed(sku);
}

/**
 * Thẻ trả được gói này không. `live.card` là bảng theo gói (từ API — API đã áp trần $199 của LemonSqueezy)
 * hoặc một công tắc chung (bản build) — khi đó website tự áp trần qua `cardAllowed`.
 */
export function cardOn(sku, live = LIVE) {
  return typeof live.card === "object" && live.card !== null ? live.card[sku] === true : Boolean(live.card) && cardAllowed(sku);
}

/**
 * Mua gói `sku` bằng `currency` thì đi đường nào: `"vnd"` (chuyển khoản), `"card"` (thẻ), `"usdt"` (USDT TRC20),
 * `"telegram"` khi kênh chưa bật hay gói không có đường nào, hoặc `"hidden"` khi cả Telegram cũng tắt
 * (`live.telegram === false`; bản build không có trường này nên Telegram luôn bật) — gói đó không hiện ở đâu.
 * Trang USD: thẻ đứng trước, không được thì USDT (gói trọn đời, thêm máy). Loại tiền `"USDT"` (`?method=usdt`)
 * chọn USDT trước; gói tháng không bán qua USDT nên rơi về kết quả của USD. Bảng giá và trang /mua cùng dùng
 * hàm này để hai nơi không lệch nhau.
 */
export function payRoute(currency, sku, live = LIVE) {
  const fallback = live.telegram === false ? "hidden" : "telegram";
  if (currency === "VND") return live.vnd ? "vnd" : fallback;
  const usdt = usdtShown(currency, sku, live);
  if (currency === "USDT" && usdt) return "usdt";
  if (cardOn(sku, live)) return "card";
  return usdt ? "usdt" : fallback;
}

/**
 * Phản hồi `GET /api/v1/payment-methods` → công tắc dạng `payRoute` nhận, kèm `telegramUrl`. Thiếu trường hay sai kiểu thì null:
 * trang giữ công tắc của bản build thay vì đoán.
 */
export function liveFromApi(d) {
  const ok =
    d && typeof d === "object" &&
    typeof d.vnd === "boolean" && typeof d.usdt === "boolean" &&
    typeof d.telegram?.enabled === "boolean" &&
    d.card && typeof d.card === "object" && !Array.isArray(d.card);
  if (!ok) return null;
  // Link Telegram của API chỉ nhận khi là https://t.me/… — khác thì dùng link cố định, không đưa khách tới chỗ lạ.
  const url = d.telegram.url;
  const telegramUrl = typeof url === "string" && url.startsWith("https://t.me/") ? url : TELEGRAM_URL;
  return Object.freeze({ card: d.card, vnd: d.vnd, usdt: d.usdt, telegram: d.telegram.enabled, telegramUrl });
}

/** Hỏi API công tắc thanh toán lúc chạy; lỗi mạng, mã khác 2xx, JSON hỏng hoặc quá `ms` thì null. */
export async function fetchLive(f = fetch, ms = 4000) {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), ms);
  try {
    const res = await f(`${API_BASE}/api/v1/payment-methods`, { signal: c.signal });
    return res.ok ? liveFromApi(await res.json()) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Thời gian còn lại tới `expiresAt` (chuỗi ISO mà API trả trong `expires_at`) dạng HH:MM:SS, làm tròn lên giây;
 * quá hạn thì 00:00:00. Hạn thật do máy chủ giữ (cron chuyển đơn sang `expired`) — đây chỉ là đồng hồ hiển thị,
 * nên giá trị không đọc được trả null để trang ẩn dòng đồng hồ thay vì hiện giờ sai.
 */
export function countdownText(expiresAt, now = Date.now()) {
  const end = typeof expiresAt === "string" ? Date.parse(expiresAt) : NaN;
  if (!Number.isFinite(end)) return null;
  const s = Math.max(0, Math.ceil((end - now) / 1000));
  const p = (n) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}
