/**
 * Con số trên trang phải đo được (spec trang chủ §6). Mỗi hằng số ghi nguồn và ngày đếm; nguồn đổi thì
 * đếm lại và sửa ở đây. Plan VEIL-955 đếm lại trước khi lên production.
 */

/**
 * Số trường cấu hình fingerprint mà engine Chromium của Veilus nhận; mỗi trường có mã tiêu thụ trong engine.
 * Nguồn: bảng trường engine (field-matrix) ở repo gốc. Đếm 2026-09-30: 56.
 */
export const FINGERPRINT_FIELDS = 56;

// Trang tải về (VEIL-1000): đo trên bản phát hành mới nhất v0.2.1 (repo công khai veilus/releases, đăng 2026-09-26)
// và engine mới nhất 153.0.8010.37. Chuỗi có "MB" đổi thì đổi cùng lượt dòng ALLOWED của nó trong
// src/scripts/claims.js — claims.test.js đỏ khi dòng đó không còn nằm nguyên văn trong file này.

/**
 * Hệ điều hành và kiến trúc. release.yml ở repo gốc chỉ dựng x86_64-pc-windows-msvc và aarch64-apple-darwin.
 * Bản tối thiểu do engine đặt, không do app. Đo 2026-09-29 trên engine 153.0.8010.37: chrome.exe và veilus.exe
 * bản win-x64 khai SubsystemVersion 10.0; Veilus.app bản mac-arm64 khai LSMinimumSystemVersion 13.0 (minos 13.0).
 * App một mình chỉ đòi macOS 11.0 (minos của Veilus_0.2.1_aarch64.dmg); tauri.conf.json không đặt minimumSystemVersion.
 */
export const OS_SUPPORT = { windows: 'Windows 10/11 · x64', macos: 'macOS 13+ · Apple Silicon' };

/**
 * Cỡ bộ cài, MB thập phân (10^6) làm tròn. Nguồn: `gh release view v0.2.1 -R veilus/releases --json assets`.
 * Đo 2026-09-29: Veilus_0.2.1_x64-setup.exe 6552683 byte, Veilus_0.2.1_aarch64.dmg 9630666 byte.
 */
export const INSTALLER_SIZE = { windows: '.exe · ~7 MB', macos: '.dmg · ~10 MB' };

/**
 * Bản app mà trang tải về phát. Nguồn: `gh release list -R veilus/releases` (bản Latest). Đo 2026-09-30: v0.2.1.
 * Phát hành bản mới thì đổi hằng này cùng lượt với INSTALLER_SIZE (đo lại bằng `gh release view v<bản> -R veilus/releases
 * --json assets`); app chưa có updater nên trang giữ bản cũ tới khi hằng này đổi.
 */
export const APP_VERSION = '0.2.1';

/** Tên file do release.yml ở repo gốc đặt (Tauri bundler). Kiểm 2026-09-30: cả hai URL trả 200 sau chuyển hướng. */
const RELEASE_BASE = `https://github.com/veilus/releases/releases/download/v${APP_VERSION}`;
export const DOWNLOAD_URL = {
  windows: `${RELEASE_BASE}/Veilus_${APP_VERSION}_x64-setup.exe`,
  macos: `${RELEASE_BASE}/Veilus_${APP_VERSION}_aarch64.dmg`,
};
export const RELEASES_URL = 'https://github.com/veilus/releases/releases';

/**
 * Ngày phát hành app, giờ Việt Nam (người dùng chốt 2026-09-30). Chỉ bản build từ lúc này trở đi mới hiện link tải;
 * bản build trước đó hiện ngày ra mắt thay cho nút. Trang tĩnh nên tới ngày phải deploy lại một lần.
 */
export const RELEASE_AT = '2026-10-09T00:00:00+07:00';
export const DOWNLOADS_OPEN = Date.now() >= Date.parse(RELEASE_AT);

/**
 * Cỡ ZIP engine, MB thập phân làm tròn. Bộ cài không kèm engine: người dùng tải nó trong app (Settings > Chromium).
 * Nguồn: danh sách engine công khai mà app đọc từ api.veilus.io, bản mới nhất của từng nền tảng; HEAD lấy
 * content-length, khớp cỡ khai trong index engine đã ký. Đo 2026-09-29: win-x64 187294648 byte, mac-arm64 152088012 byte.
 */
export const ENGINE_SIZE = { windows: '.zip · ~187 MB', macos: '.zip · ~152 MB' };
