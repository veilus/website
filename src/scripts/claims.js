/**
 * Cụm từ cấm trên website — spec trang chủ "bản vẽ" §6 (VEIL-955, VEIL-981).
 *
 * Mỗi mẫu là một câu sai sự thật TỪNG lên trang, hoặc một khẳng định chưa đo được. Mẫu dựng từ nguyên
 * văn 8 ngôn ngữ đo ở website fa160df (trước các bản sửa VEIL-961/977/978) và ở nhánh nháp VEIL-955.
 * claims.test.js quét chữ nguồn của trang; lượt kiểm toàn trang quét cả dist/ bằng cùng hàm hits().
 *
 * KHÔNG ĐO:
 * - nghĩa của câu — chỉ khớp cụm từ. Câu đúng mà trúng mẫu phải khai trong ALLOWED kèm lý do;
 * - câu sai diễn đạt kiểu mới, không trúng mẫu nào ("Untraceable", "undetected", "gấp 3 lần") — lọt;
 * - chữ trong ảnh (public/og-image.png) và chữ sinh lúc chạy (script gắn vào trang, số đếm lấy từ API);
 * - lúc nào bài chạy: CI chỉ chạy bài này trước deploy khi push main; nhánh khác không bị chặn.
 */

// Chữ "đồng bộ" và chữ "mã hoá" của 8 ngôn ngữ; sync-encrypted bắt hai nhóm đứng gần nhau.
const SYNC = 'sync|đồng bộ|同步|синхрониз|sincroniz|senkroniz|sinkronisasi|disinkronkan|menyinkronkan';
const ENC = 'encrypt|mã hoá|mã hóa|加密|шифр|cifr|criptograf|şifre|enkrip|terenkripsi';
// Cách nhau tối đa 40 ký tự trong cùng một câu: không vượt qua ".", "。", xuống dòng.
const NEAR = '[^.。\\n]{0,40}';

export const BANNED = [
  {
    id: 'e2e',
    re: /end[-\s]to[-\s]end|\bE2E\b|сквозн|端到端|uçtan uca|ponta a ponta|extremo a extremo|đầu[-\s]cuối/i,
    why: 'dữ liệu đồng bộ không mã hoá (quyết định 0024); chỉ token truy cập được mã hoá',
  },
  {
    id: 'sync-encrypted',
    re: new RegExp(`(?:${SYNC})${NEAR}(?:${ENC})|(?:${ENC})${NEAR}(?:${SYNC})`, 'i'),
    why: 'như trên (0024) — nhánh nháp từng ghi "Encrypted sync", "Đồng bộ mã hóa", "the synced data is encrypted"',
  },
  {
    id: 'recorder',
    re: /recorder|ghi thao tác|запись действий|操作录制|\bgravação\b|grabador|perekam|graba acciones|eylemleri kaydet|rekam aksi/i,
    why: 'recorder đã gỡ khỏi app (VEIL-961); Veilus Flow là script do trợ lý AI viết qua MCP, hoặc tự viết',
  },
  {
    id: 'undetectable',
    re: /undetectable|indetect[aá]ve|indetectable|необнаружим|不可检测|无法检测|tespit edilemez|tidak terdeteksi/i,
    why: 'không công cụ nào hứa được điều này; FAQ nói thẳng như vậy',
  },
  {
    id: 'the-only',
    re: /\bthe only\b|duy nhất|единственн|唯一|satu-satunya|únic[oa] navegador|\btek\b[^.\n]{0,60}tarayıcı/i,
    why: 'khẳng định "duy nhất" không kiểm chứng được',
  },
  {
    id: 'speed',
    re: /\b\d(?:\s?[-–]\s?\d)?\s?x\b|в \d(?:[-–]\d)? раз|\d(?:[-–]\d)?\s?倍|\b\d(?:[-–]\d)? kat\b/i,
    why: '"nhanh 3x", "ít hơn 3-5x" chưa từng đo',
  },
  {
    id: 'ram',
    re: /(?:\bRAM\b|内存|ОЗУ)\D{0,15}\d+\s?%|%\s?\d+\D{0,15}\bRAM\b|\d+\s?%\D{0,15}(?:\bRAM\b|内存|ОЗУ)|\d+\s?MB\b/i,
    why: '"ít RAM 80%", "~100MB mỗi profile" chưa từng đo',
  },
  {
    id: 'electron',
    re: /Electron/,
    why: 'so với đối thủ "Electron" là khẳng định về bên thứ ba chưa đo',
  },
  {
    id: 'user-count',
    re: /"\d{2,}\+"|\b\d{2,}\s?\+\s*(?:beta|users?|testers?)/i,
    why: '"500+ beta testers" không có nguồn',
  },
  {
    id: 'linux',
    re: /Linux/,
    why: 'chỉ có bản macOS và Windows (release.yml)',
  },
  {
    id: 'rating',
    re: /ratingValue|ratingCount|reviewCount|aggregateRating|\b[1-5][.,]\d\s?\/\s?5\b|★/,
    why: 'điểm đánh giá không có nguồn (VEIL-946)',
  },
  {
    // Động từ phủ định phải đứng sát chữ "dữ liệu": câu đúng "We do not knowingly collect personal data
    // from children", "We never collect: …" của chính sách quyền riêng tư không bị bắt.
    id: 'no-personal-data',
    re: /no personal data|(?:do(?:es)?(?: not|n['’]t)|never) collect (?:any )?(?:personal )?data|không thu thập (?:bất kỳ )?dữ liệu|不收集(?:任何)?(?:个人)?(?:数据|信息)|без сбора (?:\S+ )?данных|не собира\S* (?:\S+ )?данн|sem coleta de dados|não coleta\S* (?:\S+ )?dados|sin datos recopilados|no recopila\S* (?:\S+ )?datos|veri\S* topla(?:nmaz|mıyor|may)|tidak mengumpulkan (?:\S+ )?data/i,
    why: 'trang tải về thu email danh sách chờ; chính sách quyền riêng tư liệt kê email và dữ liệu phân tích (GA4)',
  },
];

/**
 * Câu ĐÚNG mà một mẫu bắt nhầm, theo từng file. Dòng nào không còn nằm nguyên văn trong file của nó
 * thì claims.test.js đỏ — danh sách này không được mục. Chỉ khai ba loại: câu phủ định đúng ("không có
 * bản Linux", "Veilus không mã hoá dữ liệu đồng bộ"), câu miễn trừ trách nhiệm, và chuỗi kỹ thuật trông
 * giống khẳng định (cỡ file cài, dung lượng đĩa). Câu khẳng định sai thì sửa chữ, không khai ở đây.
 */
export const ALLOWED = [
  { file: 'src/i18n/en.json', text: 'macOS and Windows. There is no Linux version.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/vi.json', text: 'macOS và Windows. Không có bản Linux.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/zh.json', text: 'macOS 和 Windows。没有 Linux 版本。', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/ru.json', text: 'macOS и Windows. Версии для Linux нет.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/pt.json', text: 'macOS e Windows. Não há versão para Linux.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/es.json', text: 'macOS y Windows. No hay versión para Linux.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/tr.json', text: 'macOS ve Windows. Linux sürümü yoktur.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'src/i18n/id.json', text: 'macOS dan Windows. Tidak ada versi Linux.', why: 'phủ định đúng: không có bản Linux' },
  { file: 'public/llms.txt', text: 'Platforms: macOS and Windows (no Linux version)', why: 'phủ định đúng: không có bản Linux' },
  {
    file: 'src/i18n/legal/terms.ts',
    text: 'We do not guarantee that browser fingerprints will be undetectable by all detection systems.',
    why: 'miễn trừ trách nhiệm: nói rõ KHÔNG hứa',
  },
  { file: 'src/pages/download.astro', text: '.exe · ~120MB', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/pages/download.astro', text: '.dmg · ~150MB', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/pages/download.astro', text: '500 MB disk space', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/pages/[lang]/download.astro', text: '.exe · ~120MB', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/pages/[lang]/download.astro', text: '.dmg · ~150MB', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/pages/[lang]/download.astro', text: '500 MB disk space', why: 'cỡ file cài / dung lượng đĩa, không phải khẳng định RAM mỗi hồ sơ' },
  { file: 'src/i18n/zh.json', text: '在你的电脑之间双向同步 · 仅访问令牌会被加密', why: 'phủ định đúng (0024): chỉ token truy cập được mã hoá' },
  {
    file: 'src/i18n/legal/privacy.ts',
    text: "Veilus Sync'i kullanırsanız veriler, seçtiğiniz bir Git deposuna veya Google Drive'a senkronize edilir; bu veriler Veilus tarafından şifrelenmez",
    why: 'phủ định đúng (0024): "şifrelenmez" = không được mã hoá',
  },
  {
    file: 'public/llms.txt',
    text: 'Veilus does not encrypt the synced profile data, only the remote access token',
    why: 'phủ định đúng (0024): chỉ token truy cập được mã hoá',
  },
  {
    file: 'src/components/Fig5Backup.astro',
    text: 'quyết định 0024: đồng bộ không mã hoá dữ liệu, chỉ token truy cập được mã hoá.',
    why: 'chú thích nguồn, phủ định đúng (0024)',
  },
  {
    file: 'src/components/Fig5Backup.astro',
    text: 'Không câu nào ở đây được nói dữ liệu đồng bộ được mã hoá.',
    why: 'chú thích cấm chính câu sai này',
  },
];

/** Bỏ thẻ HTML để câu "The <strong>only</strong> …" khớp đúng như chữ người đọc thấy. */
export const plain = (s) => s.replace(/<\/?[a-zA-Z][^>]*>/g, '');

/** Mọi chỗ trong text trúng một mẫu cấm. */
export function hits(text) {
  return BANNED.flatMap((b) =>
    [...text.matchAll(new RegExp(b.re.source, `${b.re.flags}g`))].map((m) => ({
      id: b.id,
      match: m[0],
      why: b.why,
    })),
  );
}

/** Gỡ các câu đúng đã khai cho file này trước khi quét. */
export function stripAllowed(text, file) {
  return ALLOWED.filter((a) => a.file === file).reduce((t, a) => t.split(a.text).join(''), text);
}
