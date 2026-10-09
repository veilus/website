/**
 * og:image theo ngôn ngữ (VEIL-1336): chụp phần đầu trang chủ mỗi ngôn ngữ ở 1200×630, đúng cách ảnh
 * og-image-2026-09.png cũ được làm. Chạy tay khi đổi phần đầu trang chủ hoặc navbar:
 *   npm run build && npx astro preview --port <p>   (cửa sổ khác)
 *   node scripts/render-og.cjs http://localhost:<p> <playwright-module-path>
 * Playwright không phải dependency của website: truyền đường dẫn module (vd app/node_modules/playwright).
 * Đổi tên file (tháng) khi ảnh đổi để mạng xã hội không giữ bản cache cũ, rồi đổi OG_IMAGE_STAMP trong Layout.astro.
 */
const path = require('node:path');
const [base, pwPath] = process.argv.slice(2);
if (!base || !pwPath) throw new Error('cách dùng: node scripts/render-og.cjs <base-url> <playwright-module-path>');
const { chromium } = require(pwPath);
const STAMP = '2026-10';
const LANGS = ['en', 'vi', 'zh', 'ru', 'es', 'pt', 'tr', 'id'];
(async () => {
  const browser = await chromium.launch();
  for (const lang of LANGS) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await page.goto(`${base}/${lang === 'en' ? '' : `${lang}/`}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(__dirname, '..', 'public', `og-image-${STAMP}-${lang}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log(out);
    await page.close();
  }
  await browser.close();
})();
