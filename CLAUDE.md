# website — landing page Veilus

> Quy trình làm việc chung (Superpowers + Plane): `../CLAUDE.md`.
> Nhãn Plane cho repo này: **`repo:website`**.

## Repo này là gì

Astro, deploy lên Cloudflare qua `wrangler.jsonc`. Có `.github/workflows/deploy.yml`.

```
src/       trang và component Astro
public/    ảnh, font, tài sản tĩnh
```

```bash
npm run dev
npm run build
npm run preview
```

## Repo này CÔNG KHAI — hai hệ quả

**1. Không bao giờ đăng ký self-hosted runner cho repo này.** Veilus có một runner Windows chạy trên máy dev, đăng ký riêng cho `veilus/veilus`. Nếu thêm nó vào đây, một pull request từ fork bất kỳ sẽ chạy được code tuỳ ý trên máy cá nhân — toàn bộ file, SSH key và token trên đó. Workflow ở repo này chỉ dùng runner GitHub-hosted.

**2. Mọi thứ commit vào đây là công khai vĩnh viễn.** Không đưa vào: chi tiết patch fingerprint, tên miền nội bộ, endpoint API chưa công bố, số liệu kinh doanh, ảnh chụp màn hình lộ dữ liệu khách hàng. Xoá ở commit sau không gỡ được — lịch sử git vẫn còn.

## Nội dung marketing

Tuyên bố kỹ thuật trên trang phải khớp thực tế sản phẩm. Nói "patch tầng C++" thì phải đúng là patch C++; nói con số thì phải đo được. Đối thủ trong ngành này bị soi rất kỹ.

Nguồn định vị sản phẩm: `../project-docs/OVERVIEW.md` mục 1. Nguồn thương hiệu: `../marketing/`.

## Commit

Sửa ở đây phải commit **hai lần**: trong submodule này, rồi con trỏ ở repo gốc.
