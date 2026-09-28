/**
 * Cụm từ cấm trên website — spec trang chủ "bản vẽ" §6 (VEIL-955, VEIL-981).
 *
 * Mỗi mẫu là một câu sai sự thật TỪNG lên trang, hoặc một khẳng định chưa đo được. Mẫu dựng từ nguyên
 * văn 8 ngôn ngữ đo ở website fa160df (trước các bản sửa VEIL-961/977/978) và ở nhánh nháp VEIL-955.
 * claims.test.js quét chữ nguồn của trang; lượt kiểm toàn trang quét cả dist/ bằng cùng hàm hits().
 *
 * KHÔNG ĐO: nghĩa của câu — chỉ khớp cụm từ. Câu phủ định đúng ("không có bản Linux") phải khai trong
 * ALLOWED kèm lý do. Câu sai viết theo kiểu mới mà không trúng mẫu nào thì lọt.
 */

export const BANNED = [
  {
    id: 'e2e',
    re: /end[-\s]to[-\s]end|\bE2E\b|сквозн|端到端|uçtan uca|ponta a ponta|extremo a extremo|đầu[-\s]cuối/i,
    why: 'dữ liệu đồng bộ không mã hoá (quyết định 0024); chỉ token truy cập được mã hoá',
  },
  {
    id: 'sync-encrypted',
    re: /encrypted (?:profile )?sync|sync is encrypted|sync \(encrypted\)/i,
    why: 'như trên (0024) — nhánh nháp từng ghi "Encrypted sync", "Veilus Sync is encrypted"',
  },
  {
    id: 'recorder',
    re: /recorder|ghi thao tác|запись действий|操作录制|\bgravação\b|grabador|perekam/i,
    why: 'recorder đã gỡ khỏi app (VEIL-961); Veilus Flow là script do trợ lý AI viết qua MCP, hoặc tự viết',
  },
  {
    id: 'undetectable',
    re: /undetectable|indetect[aá]ve|indetectable|необнаружим|不可检测|无法检测|tespit edilemez|tidak terdeteksi/i,
    why: 'không công cụ nào hứa được điều này; FAQ nói thẳng như vậy',
  },
  {
    id: 'the-only',
    re: /\bthe only\b|duy nhất|единственн|唯一|satu-satunya|únic[oa] navegador/i,
    why: 'khẳng định "duy nhất" không kiểm chứng được',
  },
  {
    id: 'speed',
    re: /\b\d(?:\s?[-–]\s?\d)?\s?x\b|в \d(?:[-–]\d)? раз|\d(?:[-–]\d)?\s?倍|\b\d(?:[-–]\d)? kat\b/i,
    why: '"nhanh 3x", "ít hơn 3-5x" chưa từng đo',
  },
  {
    id: 'ram',
    re: /(?:\bRAM\b|内存|ОЗУ)\D{0,15}\d+\s?%|%\s?\d+\D{0,15}\bRAM\b|\d+\s?%\D{0,15}(?:\bRAM\b|内存|ОЗУ)|\d+\s?MB\D{0,20}(?:profile|профил|配置文件)|(?:profile|профил|配置文件)\D{0,20}\d+\s?MB\b/i,
    why: '"ít RAM 80%", "~100MB mỗi profile" chưa từng đo — MB đứng riêng (cỡ file cài đặt, dung lượng đĩa) không phải khẳng định RAM mỗi profile',
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
];

/**
 * Câu ĐÚNG mà một mẫu bắt nhầm, theo từng file. Dòng nào không còn nằm nguyên văn trong file của nó
 * thì claims.test.js đỏ — danh sách này không được mục. Chỉ khai câu phủ định hoặc miễn trừ trách nhiệm;
 * câu khẳng định sai thì sửa chữ, không khai ở đây.
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
