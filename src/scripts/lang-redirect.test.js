/**
 * VEIL-995 — tự chuyển ngôn ngữ ở trang chủ en (src/scripts/lang-redirect.js). Ca A–H theo pw_redirect.cjs (bản
 * Playwright chạy trên trang đã build); thêm: giữ ?query và #hash, localStorage ném lỗi thì ở lại mà không vỡ,
 * danh sách ngôn ngữ chuyển khớp src/i18n/utils.ts.
 * KHÔNG ĐO: trình duyệt thật — script có nằm trước GA không, hàm nhúng bằng toString có chạy không, trang có cuộn
 * tới #pricing không; ca F (URL không tồn tại) không có script này. Những thứ đó pw_redirect.cjs đo.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { langRedirectTarget, runLangRedirect } from './lang-redirect.js';
import { supportedLangs, defaultLang } from '../i18n/utils.ts';

const ORIGIN = 'https://veilus.io';
const KEY = 'veilus_lang_detected';
const decide = (language, env = {}) =>
  langRedirectTarget({ language, referrer: '', origin: ORIGIN, stored: null, search: '', hash: '', ...env });

// window giả: đủ những gì runLangRedirect đọc. storage = Map; broken = 'get' (truy cập localStorage ném lỗi,
// như Safari khi chặn cookie) hoặc 'set' (setItem ném lỗi, như hết hạn mức).
const fakeWindow = ({ language = 'en-US', referrer = '', href = `${ORIGIN}/`, stored, broken, userAgent } = {}) => {
  const url = new URL(href);
  const storage = new Map(stored ? [[KEY, stored]] : []);
  const replaced = [];
  const localStorage = {
    getItem: (k) => storage.get(k) ?? null,
    setItem: (k, v) => {
      if (broken === 'set') throw new DOMException('quota', 'QuotaExceededError');
      storage.set(k, v);
    },
  };
  const win = {
    navigator: { language, userAgent },
    document: { referrer },
    location: { origin: url.origin, search: url.search, hash: url.hash, replace: (to) => replaced.push(to) },
  };
  Object.defineProperty(win, 'localStorage', {
    get() {
      if (broken === 'get') throw new DOMException('blocked', 'SecurityError');
      return localStorage;
    },
  });
  return { win, storage, replaced };
};

test('A. en-US lần đầu vào /: ở lại, ghi en', () => {
  assert.deepEqual(decide('en-US'), { save: 'en', to: null });
});

test('B. Googlebot (en-US, không referrer, localStorage trống): ở lại — hàm không đọc User-Agent', () => {
  const { win, storage, replaced } = fakeWindow({
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  });
  assert.equal(runLangRedirect(win, langRedirectTarget), null);
  assert.deepEqual(replaced, []);
  assert.equal(storage.get(KEY), 'en');
});

test('C. vi-VN lần đầu vào /: tới /vi/, ghi vi', () => {
  assert.deepEqual(decide('vi-VN'), { save: 'vi', to: '/vi/' });
});

test('D. bấm English ở bộ chọn (referrer /vi/ cùng origin): ở lại, ghi manual; lần sau vẫn ở lại', () => {
  assert.deepEqual(decide('vi-VN', { referrer: `${ORIGIN}/vi/` }), { save: 'manual', to: null });
  assert.deepEqual(decide('vi-VN', { stored: 'manual' }), { save: null, to: null });
});

test('E. bấm logo ở /download/ (referrer cùng origin): ở lại, ghi manual', () => {
  assert.deepEqual(decide('vi-VN', { referrer: `${ORIGIN}/download/` }), { save: 'manual', to: null });
});

test('G. zh-TW lần đầu vào /: tới /zh/', () => {
  assert.deepEqual(decide('zh-TW'), { save: 'zh', to: '/zh/' });
});

test('H. de-DE (không có bản dịch): ở lại, ghi de', () => {
  assert.deepEqual(decide('de-DE'), { save: 'de', to: null });
});

test('giữ ?query và #hash: UTM của chiến dịch và #pricing từ /pricing (301 về /#pricing)', () => {
  const search = '?utm_source=newsletter&utm_campaign=launch';
  assert.equal(decide('vi-VN', { search, hash: '#pricing' }).to, `/vi/${search}#pricing`);
  assert.equal(decide('vi-VN', { hash: '#pricing' }).to, '/vi/#pricing');
  assert.equal(decide('pt-BR', { search }).to, `/pt/${search}`);
});

test('trang chạy thật: chuyển tới đúng URL có query và hash, ghi localStorage trước khi chuyển', () => {
  const { win, storage, replaced } = fakeWindow({
    language: 'vi-VN',
    href: `${ORIGIN}/?utm_source=newsletter&utm_campaign=launch#pricing`,
  });
  assert.equal(runLangRedirect(win, langRedirectTarget), '/vi/?utm_source=newsletter&utm_campaign=launch#pricing');
  assert.deepEqual(replaced, ['/vi/?utm_source=newsletter&utm_campaign=launch#pricing']);
  assert.equal(storage.get(KEY), 'vi');
});

test('referrer từ site khác (Google) không tính là tự chọn: vẫn chuyển', () => {
  assert.deepEqual(decide('ru-RU', { referrer: 'https://www.google.com/' }), { save: 'ru', to: '/ru/' });
});

test('đã có giá trị lưu từ lần trước: không chuyển, không ghi', () => {
  assert.deepEqual(decide('vi-VN', { stored: 'vi' }), { save: null, to: null });
  const { win, replaced } = fakeWindow({ language: 'vi-VN', stored: 'en' });
  assert.equal(runLangRedirect(win, langRedirectTarget), null);
  assert.deepEqual(replaced, []);
});

test('localStorage ném lỗi khi truy cập: ở lại, không ném ra trang', () => {
  const { win, replaced } = fakeWindow({ language: 'vi-VN', broken: 'get' });
  assert.equal(runLangRedirect(win, langRedirectTarget), null);
  assert.deepEqual(replaced, []);
});

test('localStorage ném lỗi khi ghi: ở lại — chuyển mà không nhớ được thì lần sau bị đẩy đi lần nữa', () => {
  const { win, replaced } = fakeWindow({ language: 'vi-VN', broken: 'set' });
  assert.equal(runLangRedirect(win, langRedirectTarget), null);
  assert.deepEqual(replaced, []);
});

test('ngôn ngữ chuyển tới khớp src/i18n/utils.ts: mọi ngôn ngữ có bản dịch, trừ en', () => {
  for (const lang of supportedLangs) {
    assert.equal(decide(`${lang}-XX`).to, lang === defaultLang ? null : `/${lang}/`, lang);
  }
});
