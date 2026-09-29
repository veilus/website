/** Bọc mỗi <table> của nội dung pháp lý trong khung cuộn ngang: bảng giữ display: table
 *  (trình đọc màn hình vẫn thấy bảng), màn hẹp thì khung cuộn thay vì trang tràn hay chẻ chữ. */
export const wrapTables = (html) =>
  html.replace(/<table\b/g, '<div class="legal-table"><table').replace(/<\/table>/g, '</table></div>');
