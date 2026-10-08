/**
 * VEIL-981 — không trang nào của website lặp lại một câu sai sự thật từng lên trang.
 * Mẫu và danh sách miễn trừ ở claims.js; chú thích ở đó nói bài này KHÔNG đo gì.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { BANNED, ALLOWED, hits, pageText, plain, stripAllowed } from './claims.js';

const ROOT = new URL('../../', import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), 'utf8');
// Chữ mà cả bài quét lẫn bài miễn trừ nhìn: một đường trích duy nhất.
const seen = (f) => pageText(f, read(f));
const list = (dir, ext) =>
  readdirSync(new URL(dir, ROOT), { recursive: true })
    .filter((f) => f.endsWith(ext))
    .map((f) => `${dir}${f}`);

// Chữ của trang: 8 file ngôn ngữ, 4 trang pháp lý, llms.txt, facts.js, layout (JSON-LD), component, trang.
// facts.js giữ chuỗi mà trang tải về hiện nguyên văn (cỡ bộ cài, cỡ engine — VEIL-1000): bỏ nó thì chữ đó ra khỏi bài.
// Không quét src/scripts/: đó là mã và fixture của bài; claims.fixture.json cố ý chứa một câu trúng sync-encrypted.
const FILES = [
  ...list('src/i18n/', '.json'),
  ...list('src/i18n/legal/', '.ts'),
  'public/llms.txt',
  'src/data/facts.js',
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
  // Gỡ ở de04958: features.desc, features.badge, câu FAQ dữ liệu — 8 ngôn ngữ; rồi câu cấm của spec §6.
  ['sync-encrypted', 'Veilus Sync keeps profiles in sync, encrypted. Start scripts from templates, and import or export profiles when you change machines.'],
  ['sync-encrypted', 'Encrypted sync · Pro'],
  ['sync-encrypted', 'On your machine. Profiles and their data are stored locally. If you turn on Veilus Sync, the synced data is encrypted.'],
  ['sync-encrypted', 'Veilus Sync sincroniza los perfiles cifrados. Empieza scripts desde plantillas e importa o exporta perfiles al cambiar de equipo.'],
  ['sync-encrypted', 'Sincronización cifrada · Pro'],
  ['sync-encrypted', 'En tu equipo. Los perfiles y sus datos se guardan en local. Si activas Veilus Sync, los datos sincronizados van cifrados.'],
  ['sync-encrypted', 'Veilus Sync menyinkronkan profil secara terenkripsi. Mulai skrip dari template, dan impor atau ekspor profil saat ganti komputer.'],
  ['sync-encrypted', 'Sinkronisasi terenkripsi · Pro'],
  ['sync-encrypted', 'Di komputer Anda. Profil dan datanya disimpan secara lokal. Jika Anda mengaktifkan Veilus Sync, data yang disinkronkan dienkripsi.'],
  ['sync-encrypted', 'O Veilus Sync sincroniza os perfis com criptografia. Comece scripts a partir de modelos e importe ou exporte perfis ao trocar de computador.'],
  ['sync-encrypted', 'Sincronização criptografada · Pro'],
  ['sync-encrypted', 'No seu computador. Os perfis e os dados deles ficam salvos localmente. Se você ativar o Veilus Sync, os dados sincronizados são criptografados.'],
  ['sync-encrypted', 'Veilus Sync синхронизирует профили в зашифрованном виде. Начинайте скрипты с шаблонов, импортируйте и экспортируйте профили при смене компьютера.'],
  ['sync-encrypted', 'Шифрованная синхронизация · Pro'],
  ['sync-encrypted', 'На вашем компьютере. Профили и их данные хранятся локально. Если включить Veilus Sync, синхронизируемые данные шифруются.'],
  ['sync-encrypted', 'Veilus Sync profilleri şifreli olarak senkronize eder. Betiklere şablonlardan başlayın, bilgisayar değiştirirken profilleri içe veya dışa aktarın.'],
  ['sync-encrypted', 'Şifreli senkronizasyon · Pro'],
  ['sync-encrypted', 'Bilgisayarınızda. Profiller ve verileri yerelde saklanır. Veilus Sync\'i açarsanız senkronize edilen veriler şifrelenir.'],
  ['sync-encrypted', 'Veilus Sync đồng bộ profile có mã hóa. Bắt đầu script từ mẫu có sẵn, nhập hoặc xuất profile khi đổi máy.'],
  ['sync-encrypted', 'Đồng bộ mã hóa · Pro'],
  ['sync-encrypted', 'Trên máy của bạn. Profile và dữ liệu của chúng được lưu cục bộ. Nếu bật Veilus Sync, dữ liệu đồng bộ được mã hóa.'],
  ['sync-encrypted', 'Veilus Sync 加密同步配置文件。可以从模板开始编写脚本，换电脑时导入或导出配置文件。'],
  ['sync-encrypted', '加密同步 · Pro'],
  ['sync-encrypted', '存在你的电脑上。配置文件及其数据都保存在本地。如果开启 Veilus Sync，同步的数据会被加密。'],
  ['sync-encrypted', 'Veilus Sync được mã hoá'],
  ['recorder', 'Plus, Veilus includes a built-in automation platform (action recorder, visual canvas)'],
  ['recorder', 'Tích hợp sẵn automation (ghi thao tác, visual canvas)'],
  ['recorder', 'Плюс встроенная автоматизация (запись действий, визуальный редактор)'],
  ['recorder', '此外，Veilus 内置完整自动化平台（操作录制、可视化画布）'],
  ['recorder', 'Além disso, automação integrada (gravação, canvas visual)'],
  ['recorder', 'Graba acciones → genera scripts automáticamente en 1 clic'],
  ['recorder', 'Eylemleri kaydet → 1 tıkla otomatik script oluştur'],
  ['recorder', 'Rekam aksi → buat script otomatis dalam 1 klik'],
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
  ['the-only', 'Tamamen entegre otomasyon platformuna sahip <strong>tek</strong> anti-tespit tarayıcısı. Yerel motor — 3 kat hızlı, %80 daha az RAM.'],
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
  ['ram', 'Cerca de 100MB por perfil'],
  ['ram', 'Unos 100MB por perfil'],
  ['ram', 'Profil başına yaklaşık 100MB'],
  ['ram', 'Sekitar 100MB per profil'],
  ['ram', 'Mỗi hồ sơ dùng khoảng 100MB RAM'],
  ['ram', 'Each profile uses only about 100MB RAM'],
  ['electron', 'Native engine built with Tauri + Rust (not Electron)'],
  ['user-count', '"users": "500+"'],
  ['linux', 'operatingSystem: "Windows, macOS, Linux",'],
  ['linux', 'Currently available on macOS; Windows and Linux expected Q2 2026'],
  ['rating', 'ratingValue: "4.9",'],
  // Badge trang tải về và khoá download.note (8 ngôn ngữ), gỡ ở VEIL-994.
  ['no-personal-data', 'No personal data collected. No credit card required.'],
  ['no-personal-data', '不收集个人数据 · 无需信用卡'],
  ['no-personal-data', 'Без сбора данных · Без кредитной карты'],
  ['no-personal-data', 'Không thu thập dữ liệu cá nhân · Không cần thẻ tín dụng'],
  ['no-personal-data', 'Sem coleta de dados.'],
  ['no-personal-data', 'Sin datos recopilados.'],
  ['no-personal-data', 'Kişisel veri toplanmaz · Kredi kartı gerekmez'],
  ['no-personal-data', 'Tidak mengumpulkan data.'],
  // FAQ proxy (8 ngôn ngữ), llms.txt và chip ở FeatureBento, gỡ ở VEIL-1182.
  ['https-proxy', 'Yes. HTTP, HTTPS and SOCKS5 are supported, and each profile can have its own proxy.'],
  ['https-proxy', 'Được. Veilus hỗ trợ HTTP, HTTPS và SOCKS5, mỗi hồ sơ có thể gắn proxy riêng.'],
  ['https-proxy', '可以。支持 HTTP、HTTPS 和 SOCKS5，每个配置文件都可以设置自己的代理。'],
  ['https-proxy', 'Да. Поддерживаются HTTP, HTTPS и SOCKS5, и у каждого профиля может быть свой прокси.'],
  ['https-proxy', 'Sim. HTTP, HTTPS e SOCKS5 são suportados, e cada perfil pode ter seu próprio proxy.'],
  ['https-proxy', 'Sí. Admite HTTP, HTTPS y SOCKS5, y cada perfil puede tener su propio proxy.'],
  ['https-proxy', 'Evet. HTTP, HTTPS ve SOCKS5 desteklenir ve her profilin kendi proxy\'si olabilir.'],
  ['https-proxy', 'Bisa. HTTP, HTTPS, dan SOCKS5 didukung, dan tiap profil bisa punya proxy sendiri.'],
  ['https-proxy', '- Each profile has its own fingerprint and its own proxy (HTTP, HTTPS, SOCKS5)'],
  ['https-proxy', '<span class="k-chip k-chip-s">HTTP</span><span class="k-chip k-chip-s">HTTPS</span><span class="k-chip k-chip-s">SOCKS5</span>'],
];

// Câu sai CHƯA từng lên trang, cùng ý với HISTORIC nhưng viết kiểu khác (VEIL-994): dấu chấm nằm giữa
// token (".veiluspack", "v1.2", "veilus.io"), từ đồng nghĩa của từng ngôn ngữ. Mỗi hàng canh một nhánh của mẫu.
const VARIANTS = [
  ['sync-encrypted', 'Đồng bộ file .veiluspack được mã hoá'],
  ['sync-encrypted', 'Veilus Sync v1.2 is encrypted'],
  ['sync-encrypted', 'Sync to veilus.io is encrypted'],
  ['sync-encrypted', 'Sincronización encriptada'],
  ['sync-encrypted', 'Sincronização encriptada'],
  ['sync-encrypted', 'Profil tersinkron dan terenkripsi'],
  ['sync-encrypted', 'Menyinkronkan profil secara terenkripsi'],
  ['sync-encrypted', 'Profiller eşitlenir ve şifrelenir'],
  // Thể chủ động "toplamaz" (không thu thập); thể bị động "toplanmaz" đã lên trang, nằm ở HISTORIC.
  ['no-personal-data', 'Kişisel veri toplamaz'],
  ['no-personal-data', 'Veilus collects no personal data.'],
  ['no-personal-data', 'No personal data is stored on our servers.'],
  ['no-personal-data', 'No personal data · No credit card required'],
  ['no-personal-data', 'No personal data. No credit card.'],
  ['no-personal-data', 'Kişisel veri toplamayan anti-tespit tarayıcı'],
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
  // Câu trả lời FAQ dữ liệu (en): "sync" cuối cách "encrypt" 144 ký tự, quá cửa sổ 40 nên không bị bắt.
  // Hàng này canh cửa sổ 40 ký tự, KHÔNG canh ranh giới câu — dấu chấm do bài "câu sai viết kiểu khác" canh.
  'If you turn on Veilus Sync, profiles sync to a Git repository or Google Drive you choose — use a private one. When you export a profile to a .veiluspack file, you can set a password to encrypt the file.',
  // tr "şifre" là MẬT KHẨU, không phải "mã hoá".
  'Senkronizasyon için bir erişim şifresi gerekmez',
  'Tek seferlik ödeme',
  // tr "tek" nghĩa là "một" (tr.json dùng 9 lần): chỉ "tek [anti-tespit] tarayıcı" mới là "trình duyệt duy nhất".
  'Tek tıkla tarayıcı açılır',
  'tek bir tarayıcı penceresi',
  'Tek bilgisayarda yüz tarayıcı',
  // "toplamayı" là danh động từ ("việc thu thập"), không phải phủ định.
  'Çerezler, analiz için veri toplamayı sağlar',
  'UTC+7 · UTC+9 · UTC−4',
  'Trên 20 máy? Liên hệ',
  'Our affiliate program pays 20% per sale',
  // Câu đúng sau VEIL-1182; URL https:// chữ thường cạnh SOCKS5 cũng không phải khẳng định proxy HTTPS.
  'Yes. HTTP and SOCKS5 are supported, and each profile can have its own proxy.',
  '<span class="k-chip k-chip-s">HTTP</span><span class="k-chip k-chip-s">SOCKS5</span>',
  'Endpoint https://gate.example.com hoặc socks5://host:1080',
];

test('quét đủ mẫu số: 8 ngôn ngữ, 5 trang pháp lý, llms.txt, facts.js, layout, component, trang', () => {
  const count = (prefix) => FILES.filter((f) => f.startsWith(prefix)).length;
  assert.equal(FILES.filter((f) => /^src\/i18n\/[a-z]{2}\.json$/.test(f)).length, 8);
  assert.equal(count('src/i18n/legal/'), 5);
  assert.ok(FILES.includes('public/llms.txt'));
  assert.ok(FILES.includes('src/data/facts.js'));
  // Ngưỡng bằng đúng số file hiện có: xoá component hay trang thì hạ ngưỡng trong cùng commit.
  assert.ok(count('src/layouts/') >= 2, 'thiếu layout');
  assert.ok(count('src/components/') >= 13, 'thiếu component');
  assert.ok(count('src/pages/') >= 14, 'thiếu trang');
});

test('mỗi mẫu cấm bắt được câu sai từng lên trang', () => {
  for (const [id, text] of HISTORIC) {
    assert.ok(hits(plain(text)).some((h) => h.id === id), `mẫu ${id} không bắt: ${text}`);
  }
  for (const b of BANNED) {
    assert.ok(HISTORIC.some(([id]) => id === b.id), `mẫu ${b.id} thiếu hàng đối chứng`);
  }
});

test('câu sai viết kiểu khác vẫn bị bắt; dấu chấm chỉ cắt câu khi theo sau là khoảng trắng', () => {
  const missed = VARIANTS.filter(([id, text]) => !hits(text).some((h) => h.id === id));
  assert.deepEqual(missed, []);
  // "Sync" ở câu trước, "encrypted" ở câu sau: câu đúng, không được bắt.
  assert.deepEqual(hits('Veilus Sync is optional. Exported files can be encrypted.'), []);
});

test('câu gần giống mà đúng thì không bị bắt', () => {
  for (const text of NEAR_MISS) assert.deepEqual(hits(plain(text)), [], text);
});

test('file JSON: chỉ quét giá trị chuỗi, tên khoá không phải chữ trên trang', () => {
  assert.deepEqual(hits(pageText('x.json', '{"syncNote": "Access tokens are encrypted"}')), []);
  // Hàng đối chứng: câu sai nằm trong giá trị thì vẫn bị bắt.
  assert.deepEqual(hits(pageText('x.json', '{"a": "Sync is encrypted"}')).map((h) => h.id), ['sync-encrypted']);
});

test('thẻ đứng ngay sau dấu chấm thì câu kết thúc ở đó', () => {
  assert.deepEqual(hits(plain('Veilus Sync is optional.</p><p>Exported files can be encrypted.')), []);
  assert.deepEqual(hits(plain('Veilus Sync is optional.<br>Exported files can be encrypted.')), []);
  // Hàng đối chứng: thẻ không đứng sau dấu chấm thì vẫn chỉ bị bỏ.
  assert.deepEqual(hits(plain('The <strong>only</strong> anti-detect browser')).map((h) => h.id), ['the-only']);
});

test('tên icon ligature hiện thành hình, không phải chữ trên trang', () => {
  assert.deepEqual(hits(plain('<span class="ms" aria-hidden="true">cloud_sync</span> Profiles are encrypted')), []);
  assert.deepEqual(hits(plain('<span class="ms k-sw" aria-hidden="true">{f.syncIcon}</span> Profiles are encrypted')), []);
  // Icon đứng ngay sau dấu chấm: bỏ icon phải chạy trước bước dấu chấm.
  assert.deepEqual(hits(plain('Backups are optional.<span class="ms" aria-hidden="true">cloud_sync</span> Profiles are encrypted')), []);
  // Hàng đối chứng: chữ đứng sau icon vẫn là chữ.
  assert.deepEqual(hits(plain('<span class="ms" aria-hidden="true">lock</span> Sync is encrypted')).map((h) => h.id), ['sync-encrypted']);
});

// Dòng miễn trừ không còn nằm nguyên văn trong chữ mà bài quét thấy của file nó.
const stale = (allowed) => allowed.filter((a) => !seen(a.file).includes(a.text));

test('mỗi dòng miễn trừ còn nằm nguyên văn trong file của nó', () => {
  assert.deepEqual(stale(ALLOWED), [], 'câu không còn trong file — gỡ dòng miễn trừ');
});

test('câu miễn trừ có dấu " trong file JSON vẫn khớp nguyên văn', () => {
  const quoted = { file: 'src/scripts/claims.fixture.json', text: 'Veilus does not encrypt "synced" profile data' };
  // Hàng đối chứng: file thô chứa \" nên so trên file thô thì không thấy câu.
  assert.ok(!read(quoted.file).includes(quoted.text));
  assert.deepEqual(stale([quoted]), []);
});

test('không trang nào chứa cụm từ cấm', () => {
  const found = FILES.flatMap((f) =>
    hits(stripAllowed(seen(f), f)).map((h) => `${f}: [${h.id}] "${h.match}" — ${h.why}`),
  );
  assert.deepEqual(found, []);
});
