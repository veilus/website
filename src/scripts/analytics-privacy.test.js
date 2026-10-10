/**
 * VEIL-1344, quyết định ga-trang-mua-cat-url — trang mua mang key license trên URL (?renew=vl_…) vẫn nạp GA, nên GA phải chỉ nhận
 * origin+pathname. Bài đọc VĂN BẢN Layout.astro và hai trang /mua, không chạy trình duyệt.
 * KHÔNG ĐO: request thật gửi tới Google (đo tay bằng Playwright trong comment VEIL-1344), sự kiện của analytics.js.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('Layout ép page_location về origin+pathname khi privateUrl', () => {
  const layout = read('layouts/Layout.astro');
  assert.match(layout, /privateUrl \? ",\{page_location:location\.origin\+location\.pathname\}" : ""/);
  assert.match(layout, /\{privateUrl && <meta name="referrer" content="no-referrer" \/>\}/);
});

test('cả hai trang /mua khai privateUrl', () => {
  for (const p of ['pages/mua.astro', 'pages/[lang]/mua.astro']) {
    assert.match(read(p), /<Layout [^>]*\bprivateUrl>/, `${p} thiếu privateUrl`);
  }
});

test('sự kiện mua không gửi email, key hay id đơn', () => {
  const src = read('components/Purchase.astro');
  const start = src.indexOf('function trackPay');
  const body = src.slice(start, src.indexOf('\n  }\n', start));
  assert.ok(body.includes('gtag("event"'), 'không tìm thấy thân trackPay');
  assert.doesNotMatch(body, /email|licenseKey|\bid\b|code/);
});
