/**
 * VEIL-983 — mọi icon dùng trong trang có trong danh sách tải font (src/data/icons.js).
 * Font chỉ chứa icon có tên trong icon_names=; tên thiếu thì trang hiện nguyên chữ ("fingerprint").
 * KHÔNG ĐO: icon có đúng nghĩa không, font có tải được không — việc đó shot-home.cjs đo lúc chụp.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ICONS, iconFontHref } from '../data/icons.js';

const SRC = new URL('../', import.meta.url);
const sources = readdirSync(SRC, { recursive: true })
  .filter((f) => f.endsWith('.astro'))
  .map((f) => readFileSync(new URL(f, SRC), 'utf8'));
// Hai cách một icon được viết: <span class="ms …" …>tên</span>, hoặc icon: 'tên' trong frontmatter.
const used = new Set(
  sources.flatMap((s) => [
    ...[...s.matchAll(/class="ms(?:\s[^"]*)?"[^>]*>([a-z0-9_]+)</g)].map((m) => m[1]),
    ...[...s.matchAll(/icon:\s*'([a-z0-9_]+)'/g)].map((m) => m[1]),
  ]),
);

test('có icon để canh (mẫu số không về 0)', () => {
  assert.ok(used.size >= 3, `chỉ thấy ${used.size} icon: ${[...used].join(', ')}`);
});

test('mọi icon dùng tới đều có trong ICONS', () => {
  assert.deepEqual([...used].filter((name) => !ICONS.includes(name)), []);
});

// Cùng bài trên: tập icon dùng tới BẰNG tập ICONS. Tên thừa trong ICONS là byte phí trong font tải về.
test('mọi tên trong ICONS đều được dùng', () => {
  assert.deepEqual(ICONS.filter((name) => !used.has(name)), []);
});

test('ICONS xếp a→z, không trùng, và đi đúng vào URL font', () => {
  assert.deepEqual([...ICONS].sort(), ICONS);
  assert.equal(new Set(ICONS).size, ICONS.length);
  assert.ok(iconFontHref().includes(`icon_names=${ICONS.join(',')}&`));
});
