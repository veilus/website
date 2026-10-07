/**
 * Tự chuyển ngôn ngữ ở trang chủ en (src/pages/index.astro), lần đầu vào: trình duyệt nói một ngôn ngữ có bản
 * dịch thì sang /<ngôn ngữ>/, giữ nguyên ?query (utm_…) và #hash — link cũ /#pricing phải tới bảng giá.
 *
 * index.astro nhúng hai hàm này vào <head> bằng Function.prototype.toString, trước GA. Vì vậy mỗi hàm tự đủ:
 * không đọc tên nào ngoài tham số của chính nó. Một tên lấy từ phạm vi module là ReferenceError trên trang thật
 * mà lang-redirect.test.js không thấy — pw_redirect.cjs (Playwright, trang đã build) mới thấy.
 */

/**
 * Hàm thuần: đích chuyển (to, null = ở lại) và giá trị ghi vào localStorage (save, null = không ghi).
 * - đã có giá trị lưu (lần trước đã quyết): không làm gì;
 * - tới từ một trang của chính site (bấm English ở bộ chọn, bấm logo): người đọc đã chọn — ở lại, ghi 'manual'
 *   để lần sau cũng ở lại (VEIL-1031);
 * - còn lại: ghi ngôn ngữ chính của trình duyệt; có bản dịch thì chuyển. Danh sách phải khớp src/i18n/utils.ts
 *   trừ en — lang-redirect.test.js canh.
 */
export function langRedirectTarget({ language, referrer, origin, stored, search, hash }) {
  if (stored) return { save: null, to: null };
  if (referrer && new URL(referrer).origin === origin) return { save: 'manual', to: null };
  const primary = (language || '').split('-')[0].toLowerCase();
  const translated = ['zh', 'ru', 'vi', 'pt', 'es', 'tr', 'id'];
  return { save: primary, to: translated.includes(primary) ? `/${primary}/${search}${hash}` : null };
}

/**
 * Chạy trên trang: đọc trạng thái từ win, hỏi decide, ghi localStorage rồi mới chuyển. Trả URL đã chuyển tới,
 * hoặc null khi ở lại. Mọi truy cập localStorage nằm trong try: đọc hay ghi không được (chặn cookie, Safari riêng
 * tư) thì ở lại trang en, không ném lỗi ra trang — chuyển mà không nhớ được thì người đã bấm English, lần sau
 * vào lại / sẽ bị đẩy đi lần nữa.
 */
export function runLangRedirect(win, decide) {
  try {
    const key = 'veilus_lang_detected';
    const { save, to } = decide({
      language: win.navigator.language,
      referrer: win.document.referrer,
      origin: win.location.origin,
      stored: win.localStorage.getItem(key),
      search: win.location.search,
      hash: win.location.hash,
    });
    if (save !== null) win.localStorage.setItem(key, save);
    if (to) win.location.replace(to);
    return to;
  } catch {
    return null;
  }
}
