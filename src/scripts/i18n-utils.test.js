/**
 * VEIL-1029 — stripLang, getLocalizedPath, getHreflangs: một dạng URL (luôn có / cuối) cho
 * canonical, hreflang, sitemap và link nội bộ (xem src/i18n/utils.ts:40-60).
 * KHÔNG ĐO: getLangFromUrl, t() (loader dịch) — ngoài phạm vi ba hàm này; 404 theo ngôn ngữ; rào
 * URL tuyệt đối trong getLocalizedPath; hành vi redirect thật của Cloudflare Pages
 * (public/_redirects) hay sitemap sinh ra lúc build — chỉ đo ba hàm thuần, không đo output build.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stripLang, getLocalizedPath, getHreflangs, supportedLangs, languages } from '../i18n/utils.ts';

test('stripLang: bỏ tiền tố ngôn ngữ, ranh giới (?=\\/|$) giữ /vietnam và /identity nguyên vẹn', () => {
  assert.equal(stripLang('/'), '/');
  assert.equal(stripLang(''), '/');
  assert.equal(stripLang('/vi'), '/');
  assert.equal(stripLang('/vi/'), '/');
  assert.equal(stripLang('/vi/download/'), '/download/');
  assert.equal(stripLang('/en/download/'), '/download/');
  assert.equal(stripLang('/vietnam'), '/vietnam');
  assert.equal(stripLang('/identity'), '/identity');
  assert.equal(stripLang('/id'), '/');
});

test('getLocalizedPath: luôn thêm / cuối phần path, giữ nguyên ?query và #hash', () => {
  assert.equal(getLocalizedPath('/', 'en'), '/');
  assert.equal(getLocalizedPath('/', 'vi'), '/vi/');
  assert.equal(getLocalizedPath('/download', 'vi'), '/vi/download/');
  assert.equal(getLocalizedPath('/download/', 'en'), '/download/');
  assert.equal(getLocalizedPath('/mua?sku=monthly', 'vi'), '/vi/mua/?sku=monthly');
  assert.equal(getLocalizedPath('/#pricing', 'zh'), '/zh/#pricing');
  assert.equal(getLocalizedPath('/download/#x', 'en'), '/download/#x');
});

test('vòng tròn: getLocalizedPath(stripLang(getLocalizedPath(p, L)), L) === getLocalizedPath(p, L)', () => {
  for (const lang of supportedLangs) {
    for (const p of ['/', '/download/', '/privacy/']) {
      const once = getLocalizedPath(p, lang);
      const roundTrip = getLocalizedPath(stripLang(once), lang);
      assert.equal(roundTrip, once, `lang=${lang} path=${p}`);
    }
  }
});

test('getHreflangs: đủ 8 ngôn ngữ, en không tiền tố /en/, mọi href có / cuối', () => {
  const hreflangs = getHreflangs('/vi/download/', 'https://veilus.io');
  assert.equal(hreflangs.length, 8);
  assert.equal(hreflangs.find((h) => h.lang === 'en').href, 'https://veilus.io/download/');
  assert.equal(hreflangs.find((h) => h.lang === 'vi').href, 'https://veilus.io/vi/download/');
  for (const h of hreflangs) {
    assert.ok(h.href.endsWith('/'), `${h.lang}: ${h.href} không kết thúc bằng /`);
    assert.ok(!h.href.includes('/en/'), `${h.lang}: ${h.href} chứa /en/`);
  }
});

// VEIL-1306 — bản zh là giản thể, bản pt là Bồ Brazil: hreflang phải nói đúng thế (zh-Hans, pt-BR),
// còn mã URL (/zh/, /pt/) và khoá i18n giữ nguyên. KHÔNG ĐO: HTML build có dùng code hay không (đọc dist).
test('getHreflangs: mã hreflang theo bảng languages — zh-Hans, pt-BR, còn lại trùng mã URL', () => {
  const codes = Object.fromEntries(getHreflangs('/', 'https://veilus.io').map((h) => [h.lang, h.code]));
  assert.deepEqual(codes, { en: 'en', zh: 'zh-Hans', ru: 'ru', vi: 'vi', pt: 'pt-BR', es: 'es', tr: 'tr', id: 'id' });
  for (const lang of supportedLangs) assert.equal(languages[lang].hreflang, codes[lang]);
});
