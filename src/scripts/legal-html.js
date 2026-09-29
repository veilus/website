/** Bọc mỗi <table> của nội dung pháp lý trong khung cuộn ngang: bảng giữ display: table
 *  (trình đọc màn hình vẫn thấy bảng), màn hẹp thì khung cuộn thay vì trang tràn hay chẻ chữ.
 *  tabindex="0": Safari không cho khung cuộn nhận focus, người dùng bàn phím không cuộn được. */
export const wrapTables = (html) =>
  html.replace(/<table\b/g, '<div class="legal-table" tabindex="0"><table').replace(/<\/table>/g, '</table></div>');
