/**
 * Tải font IBM Plex (Sans, Mono) và Material Symbols Rounded về repo để trang tự phục vụ, không gọi
 * fonts.googleapis.com / fonts.gstatic.com lúc tải trang (VEIL-1038).
 *
 * Nguồn: CSS của Google Fonts — PLEX_CSS dưới đây và iconFontHref() trong src/data/icons.js — tải từ
 * https://fonts.googleapis.com/css2, rồi từng file woff2 mà CSS đó trỏ tới trên https://fonts.gstatic.com.
 * Giấy phép cho tự host: IBM Plex — SIL Open Font License 1.1; Material Symbols — Apache License 2.0.
 * Toàn văn hai giấy phép nằm ở src/assets/font-licenses/ — NGOÀI src/assets/fonts/ vì script này xoá sạch thư mục đó
 * mỗi lần chạy. Nguồn: github.com/IBM/plex LICENSE.txt và github.com/google/material-design-icons LICENSE.
 *
 * Chạy lại khi đổi weight Plex hoặc thêm/bớt icon trong src/data/icons.js, rồi commit kết quả:
 *   node scripts/fetch-fonts.mjs
 * Ghi đè: src/assets/fonts/ (woff2 + manifest.json) và src/styles/fonts.css.
 * src/scripts/icons.test.js so manifest.icon_names với ICONS: thêm icon mà quên chạy lại script thì đỏ.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { iconFontHref } from '../src/data/icons.js';

// Đúng các weight trang dùng (--font-sans, --font-mono ở src/styles/global.css).
const PLEX_CSS =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
// Google Fonts chọn định dạng theo User-Agent: UA của Chrome thì CSS trỏ tới woff2.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
// Chữ của 8 ngôn ngữ trang (en vi ru pt es tr id zh). Bỏ greek; chữ Hán không có trong IBM Plex, rơi về font hệ thống.
const SUBSETS = new Set(['latin', 'latin-ext', 'vietnamese', 'cyrillic', 'cyrillic-ext']);

const FONT_DIR = new URL('../src/assets/fonts/', import.meta.url);
const CSS_OUT = new URL('../src/styles/fonts.css', import.meta.url);

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res;
}

// Mỗi @font-face của Google: chú thích /* subset */ đứng trước (font icon không có), src là một url(...) woff2.
function parse(css) {
  return [...css.matchAll(/(?:\/\* ([\w-]+) \*\/\s*)?@font-face \{([^}]*)\}/g)].map(([, subset, body]) => {
    const prop = (name) => body.match(new RegExp(`${name}: ([^;]+);`))?.[1];
    const src = body.match(/src: url\((\S+?)\) format\('woff2'\);/);
    if (!src) throw new Error(`@font-face không có src woff2 — User-Agent không được nhận?\n${body}`);
    return {
      subset: subset ?? null,
      family: prop('font-family').replace(/'/g, ''),
      style: prop('font-style'),
      weight: prop('font-weight'),
      display: prop('font-display'),
      unicodeRange: prop('unicode-range') ?? null,
      url: src[1],
    };
  });
}

const cssOf = async (url) => parse(await (await get(url)).text());
const faces = [...(await cssOf(PLEX_CSS)), ...(await cssOf(iconFontHref()))].filter(
  (f) => f.subset === null || SUBSETS.has(f.subset),
);

// Tên file: họ font + subset, thêm weight khi mỗi weight một file. Plex Sans trên Google là font biến thiên:
// bốn weight trỏ cùng một file mỗi subset, nên tên không mang weight.
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');
const filesOf = (f) => new Set(faces.filter((g) => g.family === f.family && g.subset === f.subset).map((g) => g.url));
const names = new Map();
for (const f of faces) {
  const name = [slug(f.family), filesOf(f).size > 1 ? f.weight : null, f.subset].filter(Boolean).join('-') + '.woff2';
  if ([...names].some(([url, n]) => n === name && url !== f.url)) throw new Error(`hai file trùng tên ${name}`);
  names.set(f.url, name);
}

const files = new Map();
for (const [url, name] of names) {
  const buf = Buffer.from(await (await get(url)).arrayBuffer());
  if (buf.subarray(0, 4).toString('latin1') !== 'wOF2') throw new Error(`không phải woff2: ${url}`);
  files.set(name, buf);
}

await rm(FONT_DIR, { recursive: true, force: true });
await mkdir(FONT_DIR, { recursive: true });
for (const [name, buf] of files) await writeFile(new URL(name, FONT_DIR), buf);

const rule = (f) =>
  [
    ...(f.subset ? [`/* ${f.subset} */`] : []),
    '@font-face {',
    `  font-family: '${f.family}';`,
    `  font-style: ${f.style};`,
    `  font-weight: ${f.weight};`,
    `  font-display: ${f.display};`,
    `  src: url('../assets/fonts/${names.get(f.url)}') format('woff2');`,
    ...(f.unicodeRange ? [`  unicode-range: ${f.unicodeRange};`] : []),
    '}',
  ].join('\n');
await writeFile(
  CSS_OUT,
  `/* Sinh bởi scripts/fetch-fonts.mjs — không sửa tay, chạy lại script. url() tương đối: Vite băm tên file vào _assets/. */\n${faces.map(rule).join('\n')}\n`,
);

const manifest = {
  generatedBy: 'scripts/fetch-fonts.mjs',
  css: [PLEX_CSS, iconFontHref()],
  icon_names: new URL(iconFontHref()).searchParams.get('icon_names'),
  files: Object.fromEntries([...names].map(([url, name]) => [name, { from: url, bytes: files.get(name).length }])),
};
await writeFile(new URL('manifest.json', FONT_DIR), `${JSON.stringify(manifest, null, 2)}\n`);

const total = [...files.values()].reduce((s, b) => s + b.length, 0);
console.log(`${faces.length} @font-face, ${files.size} file woff2, ${total} byte → src/assets/fonts/, src/styles/fonts.css`);
