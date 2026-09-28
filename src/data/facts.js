/**
 * Con số trên trang phải đo được (spec trang chủ §6). Mỗi hằng số ghi nguồn và ngày đếm; nguồn đổi thì
 * đếm lại và sửa ở đây. Plan VEIL-955 đếm lại trước khi lên production.
 */

/**
 * Số trường cấu hình fingerprint mà engine Chromium của Veilus nhận; mỗi trường có mã tiêu thụ trong engine.
 * Nguồn: bảng trường engine (field-matrix) ở repo gốc. Đếm 2026-09-29: 53.
 */
export const FINGERPRINT_FIELDS = 53;
