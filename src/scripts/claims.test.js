/**
 * VEIL-981 — không trang nào của website lặp lại một câu sai sự thật từng lên trang.
 * Mẫu và danh sách miễn trừ ở claims.js; chú thích ở đó nói bài này KHÔNG đo gì.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { BANNED, ALLOWED, hits, plain, stripAllowed } from './claims.js';

const ROOT = new URL('../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
const list = (dir, ext) =>
  readdirSync(new URL(dir, ROOT), { recursive: true })
    .filter((f) => f.endsWith(ext))
    .map((f) => `${dir}${f}`);

// Chữ của trang: 8 file ngôn ngữ, 4 trang pháp lý, llms.txt, layout (JSON-LD), component, trang.
// Không quét src/data/competitors.json: đó là trích nguyên văn trang đối thủ, còn cụm cấm nói về Veilus.
const FILES = [
  ...list('src/i18n/', '.json'),
  ...list('src/i18n/legal/', '.ts'),
  'public/llms.txt',
  ...list('src/layouts/', '.astro'),
  ...list('src/components/', '.astro'),
  ...list('src/pages/', '.astro'),
];

// Nguyên văn từng lên trang (website fa160df và nhánh nháp VEIL-955): mỗi mẫu phải bắt được câu của nó.
const HISTORIC = [
  ['e2e', 'Veilus Sync uses hierarchical end-to-end encryption — even we cannot read your data.'],
  ['e2e', 'Veilus Sync 使用分层端到端加密 — 连我们也无法读取你的数据。'],
  ['e2e', 'Veilus Sync использует сквозное шифрование — даже мы не можем прочитать ваши данные.'],
  ['e2e', 'Veilus Sync E2E şifreleme kullanır — biz bile okuyamayız.'],
  ['e2e', 'Criptografia hierárquica de ponta a ponta — nem nós podemos ler seus dados.'],
  ['e2e', 'Cifrado jerárquico de extremo a extremo — ni nosotros podemos leer tus datos.'],
  ['e2e', 'Hiyerarşik uçtan uca şifreleme — biz bile verilerinizi okuyamayız.'],
  ['e2e', 'Veilus Sync mã hóa end-to-end — ngay cả chúng tôi cũng không đọc được.'],
  ['sync-encrypted', 'Encrypted sync (Veilus Sync)'],
  ['sync-encrypted', 'Profile data is stored locally on your machine; Veilus Sync is encrypted'],
  ['sync-encrypted', 'Veilus Sync (encrypted), script templates, import/export'],
  ['recorder', 'Plus, Veilus includes a built-in automation platform (action recorder, visual canvas)'],
  ['recorder', 'Tích hợp sẵn automation (ghi thao tác, visual canvas)'],
  ['recorder', 'Плюс встроенная автоматизация (запись действий, визуальный редактор)'],
  ['recorder', '此外，Veilus 内置完整自动化平台（操作录制、可视化画布）'],
  ['recorder', 'Além disso, automação integrada (gravação, canvas visual)'],
  ['undetectable', 'Is Veilus really undetectable?'],
  ['undetectable', 'Veilus có thực sự undetectable không?'],
  ['undetectable', 'Veilus действительно необнаружим?'],
  ['undetectable', 'Veilus 真的不可检测吗？'],
  ['undetectable', 'O Veilus é realmente indetectável?'],
  ['undetectable', '¿Es Veilus realmente indetectable?'],
  ['undetectable', 'Veilus gerçekten tespit edilemez mi?'],
  ['undetectable', 'Apakah Veilus benar-benar tidak terdeteksi?'],
  ['the-only', 'The <strong>only</strong> anti-detect browser with a fully integrated automation platform.'],
  ['the-only', 'Trình duyệt chống phát hiện <strong>duy nhất</strong> tích hợp nền tảng tự động hóa hoàn chỉnh.'],
  ['the-only', '<strong>Единственный</strong> антидетект-браузер с полностью интегрированной платформой автоматизации.'],
  ['the-only', '<strong>唯一</strong>集成完整自动化平台的反检测浏览器。'],
  ['the-only', 'O <strong>único</strong> navegador antidetecção com plataforma de automação totalmente integrada.'],
  ['the-only', 'El <strong>único</strong> navegador antidetección con plataforma de automatización completamente integrada.'],
  ['the-only', 'Browser anti-deteksi <strong>satu-satunya</strong> dengan platform otomasi terintegrasi penuh.'],
  ['speed', 'Native engine — 3x faster, 80% less RAM.'],
  ['speed', 'Engine gốc — nhanh hơn 3x, ít RAM hơn 80%.'],
  ['speed', 'Нативный движок — в 3 раза быстрее, на 80% меньше RAM.'],
  ['speed', '原生引擎 — 快3倍，内存减少80%。'],
  ['speed', 'Veilus, Electron yerine yerel motor kullanır — 3 kat hızlı, %80 daha az RAM.'],
  ['speed', 'Each profile uses only about 100MB RAM — 3-5x less than Electron-based anti-detect browsers.'],
  ['ram', 'Native engine — 3x faster, 80% less RAM.'],
  ['ram', 'Engine gốc — nhanh hơn 3x, ít RAM hơn 80%.'],
  ['ram', 'Нативный движок — в 3 раза быстрее, на 80% меньше RAM.'],
  ['ram', 'Veilus 使用原生引擎而非 Electron — 速度快3倍，内存占用减少80%。'],
  ['ram', 'Veilus, Electron yerine yerel motor kullanır — 3 kat hızlı, %80 daha az RAM.'],
  ['ram', 'Engine native — 3x lebih cepat, RAM 80% lebih sedikit.'],
  ['ram', 'Около 100MB на профиль — в 3-5 раз меньше чем браузеры на Electron.'],
  ['ram', '每个配置文件只使用约100MB内存'],
  ['electron', 'Native engine built with Tauri + Rust (not Electron)'],
  ['user-count', '"users": "500+"'],
  ['linux', 'operatingSystem: "Windows, macOS, Linux",'],
  ['linux', 'Currently available on macOS; Windows and Linux expected Q2 2026'],
  ['rating', 'ratingValue: "4.9",'],
];

// Câu đúng, hoặc chuỗi kỹ thuật trông gần giống: không mẫu nào được bắt.
const NEAR_MISS = [
  'padding: calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-4xl);',
  'ellipse 80% 50% at 50% -20%',
  '1920 × 1080 · 24-bit',
  'Chrome · Windows 11',
  'Cập nhật trọn đời · hỗ trợ 3 năm (gia hạn 40% giá gói mỗi 3 năm)',
  'Lifetime includes updates forever and 3 years of support (renewal: 40% of the plan price per 3 years)',
  'Script đưa vào qua MCP hay REST chỉ chạy trên tối đa 3 profile mỗi lượt',
  'Không đảm bảo fingerprint không bị phát hiện bởi mọi hệ thống.',
  'mật khẩu tuỳ chọn · AES-256',
  'Hai chiều giữa các máy của bạn · token truy cập được mã hoá',
  'Veilus does not encrypt the synced profile data, only the remote access token',
  'UTC+7 · UTC+9 · UTC−4',
  'Trên 20 máy? Liên hệ',
  'Our affiliate program pays 20% per sale',
  '.exe · ~120MB',
  '.dmg · ~150MB',
  '500 MB disk space',
];

test('quét đủ mẫu số: 8 ngôn ngữ, 4 trang pháp lý, llms.txt, layout, component, trang', () => {
  const count = (prefix) => FILES.filter((f) => f.startsWith(prefix)).length;
  assert.equal(FILES.filter((f) => /^src\/i18n\/[a-z]{2}\.json$/.test(f)).length, 8);
  assert.equal(count('src/i18n/legal/'), 4);
  assert.ok(FILES.includes('public/llms.txt'));
  assert.ok(count('src/layouts/') >= 2, 'thiếu layout');
  assert.ok(count('src/components/') >= 5, 'thiếu component');
  assert.ok(count('src/pages/') >= 10, 'thiếu trang');
});

test('mỗi mẫu cấm bắt được câu sai từng lên trang', () => {
  for (const [id, text] of HISTORIC) {
    assert.ok(hits(plain(text)).some((h) => h.id === id), `mẫu ${id} không bắt: ${text}`);
  }
  for (const b of BANNED) {
    assert.ok(HISTORIC.some(([id]) => id === b.id), `mẫu ${b.id} thiếu hàng đối chứng`);
  }
});

test('câu gần giống mà đúng thì không bị bắt', () => {
  for (const text of NEAR_MISS) assert.deepEqual(hits(plain(text)), [], text);
});

test('mỗi dòng miễn trừ còn nằm nguyên văn trong file của nó', () => {
  for (const a of ALLOWED) {
    assert.ok(plain(read(a.file)).includes(a.text), `${a.file} không còn câu: ${a.text} — gỡ dòng miễn trừ`);
  }
});

test('không trang nào chứa cụm từ cấm', () => {
  const found = FILES.flatMap((f) =>
    hits(stripAllowed(plain(read(f)), f)).map((h) => `${f}: [${h.id}] "${h.match}" — ${h.why}`),
  );
  assert.deepEqual(found, []);
});
