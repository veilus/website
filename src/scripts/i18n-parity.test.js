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
