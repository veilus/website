/**
 * VEIL-982 — 8 file ngôn ngữ có cùng bộ khoá và cùng độ dài mảng với en.json.
 * Thiếu khoá thì trang ngôn ngữ đó vỡ lúc build; mảng ngắn hơn thì trang lặng lẽ hiện thiếu mục.
 * KHÔNG ĐO: bản dịch có đúng nghĩa không, hay còn là tiếng Anh chép sang.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const LANGS = ['en', 'zh', 'ru', 'vi', 'pt', 'es', 'tr', 'id'];
const load = (lang) => JSON.parse(readFileSync(new URL(`../i18n/${lang}.json`, import.meta.url), 'utf8'));

// Mọi đường tới khoá lá, kèm độ dài từng mảng: {a:{b:[x,y]}} → ['a.b[2]', 'a.b[0]', 'a.b[1]']
const shape = (value, path = '') => {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  return [path];
};

test('danh sách ngôn ngữ khớp src/i18n/utils.ts', () => {
  const utils = readFileSync(new URL('../i18n/utils.ts', import.meta.url), 'utf8');
  const declared = [...utils.matchAll(/^\s+(\w{2}): \{ label:/gm)].map((m) => m[1]);
  assert.deepEqual([...declared].sort(), [...LANGS].sort());
});

test('8 ngôn ngữ có cùng khoá và cùng độ dài mảng với en', () => {
  const en = shape(load('en'));
  assert.ok(en.length > 100, `en.json chỉ có ${en.length} khoá — bài đang đọc sai file?`);
  const enSet = new Set(en);
  for (const lang of LANGS.slice(1)) {
    const got = new Set(shape(load(lang)));
    const missing = en.filter((k) => !got.has(k));
    const extra = [...got].filter((k) => !enSet.has(k));
    assert.deepEqual({ missing, extra }, { missing: [], extra: [] }, `${lang}.json lệch en.json`);
  }
});

// Mọi đường tới khoá LÁ KIỂU CHUỖI: {a:{b:"x",c:[1,2]}} → [['a.b', 'x']] (bỏ qua lá không phải chuỗi/mảng số).
const leafStrings = (value, path = '') => {
  if (Array.isArray(value)) return value.flatMap((v, i) => leafStrings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => leafStrings(v, path ? `${path}.${k}` : k));
  return typeof value === 'string' ? [[path, value]] : [];
};

const PLACEHOLDER_RE = /\{[a-zA-Z]+\}/g;
const placeholders = (str) => new Set(str.match(PLACEHOLDER_RE) || []);
const sortedPlaceholders = (str) => [...placeholders(str)].sort();

// `cta` bị .replace("{os}", ...) và `version` bị .replace("{version}", ...) trong DownloadPage.astro: bản dịch
// làm rơi chỗ giữ vẫn là chuỗi hợp lệ, template không vỡ — nút chỉ mất tên hệ điều hành, không bài nào đỏ.
// KHÔNG ĐO: nghĩa bản dịch đúng hay sai, thứ tự chỗ giữ trong câu (chỉ đo ĐÚNG TẬP tên chỗ giữ).
test('khoá có {tên} trong en giữ đúng tập chỗ giữ ở 7 ngôn ngữ còn lại', () => {
  // Hàng đối chứng: "x {os}" và "x {o}" khác nhau đúng một ký tự trong tên chỗ giữ — hàm so sánh phải báo lệch,
  // không được coi là giống nhau.
  assert.notDeepEqual(
    leafStrings({ a: 'x {o}' }).map(([k, v]) => [k, sortedPlaceholders(v)]),
    leafStrings({ a: 'x {os}' }).map(([k, v]) => [k, sortedPlaceholders(v)]),
  );

  const enMap = new Map(leafStrings(load('en')));
  const keysWithPlaceholder = [...enMap.keys()].filter((k) => placeholders(enMap.get(k)).size > 0);
  assert.ok(keysWithPlaceholder.length > 0, 'en.json không còn khoá nào có {tên} — bài hết ý nghĩa?');

  for (const lang of LANGS.slice(1)) {
    const gotMap = new Map(leafStrings(load(lang)));
    for (const key of keysWithPlaceholder) {
      assert.deepEqual(
        sortedPlaceholders(gotMap.get(key) ?? ''),
        sortedPlaceholders(enMap.get(key)),
        `${lang}.json khoá "${key}" lệch tập chỗ giữ so với en`,
      );
    }
  }
});
