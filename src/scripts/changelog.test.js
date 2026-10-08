/**
 * Cổng cho src/data/changelog.json (VEIL-1308): file soạn tay mỗi lần phát hành, nên thứ dễ sai là quên thêm bản
 * mới (phiên bản đầu phải bằng APP_VERSION của facts.js — trang tải về đã trỏ bản đó), thứ tự và ngày.
 *
 * KHÔNG ĐO: nội dung ghi chú có đúng với bản phát hành không, và tag v<version> có tồn tại trên GitHub không.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APP_VERSION } from '../data/facts.js';

const entries = JSON.parse(readFileSync(new URL('../data/changelog.json', import.meta.url), 'utf8'));
const semver = (v) => v.split('.').map(Number);
const newer = (a, b) => {
  const [x, y] = [semver(a), semver(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
};

test('phiên bản đầu changelog là APP_VERSION của facts.js', () => {
  assert.equal(entries[0].version, APP_VERSION);
});

test('mỗi mục có version x.y.z duy nhất, ngày ISO, ít nhất một dòng thay đổi không rỗng', () => {
  const seen = new Set();
  for (const e of entries) {
    assert.match(e.version, /^\d+\.\d+\.\d+$/, e.version);
    assert.ok(!seen.has(e.version), `trùng ${e.version}`);
    seen.add(e.version);
    assert.match(e.date, /^\d{4}-\d{2}-\d{2}$/, e.version);
    assert.ok(!Number.isNaN(Date.parse(e.date)), `${e.version}: ngày ${e.date} không đọc được`);
    assert.ok(Array.isArray(e.changes) && e.changes.length > 0, `${e.version}: không có dòng thay đổi`);
    for (const line of e.changes) assert.ok(typeof line === 'string' && line.trim().length > 0, `${e.version}: dòng rỗng`);
  }
});

test('phiên bản giảm dần và ngày không tăng khi đi xuống', () => {
  for (let i = 1; i < entries.length; i++) {
    const [a, b] = [entries[i - 1], entries[i]];
    assert.ok(newer(a.version, b.version), `${a.version} phải mới hơn ${b.version}`);
    assert.ok(a.date >= b.date, `${a.version} (${a.date}) phải không sớm hơn ${b.version} (${b.date})`);
  }
});
