/**
 * Icon Material Symbols Rounded mà website dùng. Spec trang chủ §3: tải bằng icon_names=, không tải cả bộ.
 * Thêm icon mới vào component thì thêm tên vào đây rồi chạy `node scripts/fetch-fonts.mjs` để tải lại font tự host
 * (VEIL-1038) — src/scripts/icons.test.js canh cả hai việc.
 * Google Fonts đòi icon_names xếp a→z.
 */
export const ICONS = [
  'account_circle', 'add', 'api', 'arrow_forward', 'autorenew', 'bolt', 'build', 'cable', 'chat', 'check',
  'close', 'cloud', 'cloud_sync', 'cookie', 'desktop_windows', 'event_repeat', 'expand_more', 'fingerprint',
  'folder_zip', 'history', 'hub', 'inventory_2', 'language', 'laptop_mac', 'link', 'link_off', 'lock', 'menu',
  'person', 'play_circle', 'remove', 'schedule', 'settings_backup_restore', 'smart_toy', 'stacks', 'storefront',
  'sync_alt', 'verified_user', 'visibility_off', 'vpn_lock',
];

// CSS Google Fonts mà scripts/fetch-fonts.mjs tải font icon theo; trang không gọi URL này.
// wght 200..300: nét 300 mặc định, 200 cho icon vân tay lớn ở Hình 3. display=block: icon chưa tải thì
// để trống, thay vì hiện chữ "fingerprint".
export const iconFontHref = () =>
  `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght@20..48,200..300&icon_names=${ICONS.join(',')}&display=block`;
