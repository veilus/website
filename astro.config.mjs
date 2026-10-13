// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://veilus.io',
    output: 'static',
    integrations: [
        sitemap({
            // /mua ngoài sitemap: trang có noindex (Layout, cờ noTracking)
            filter: (page) =>
                !page.includes('/blog/') &&
                !page.includes('/mua'),
            i18n: {
                defaultLocale: 'en',
                // Mã hreflang phải khớp <link rel="alternate" hreflang> trong HTML (Layout.astro) — cùng bảng languages của src/i18n/utils.ts
                locales: {
                    en: 'en',
                    zh: 'zh-Hans',
                    ru: 'ru',
                    vi: 'vi',
                    pt: 'pt-BR',
                    es: 'es',
                    tr: 'tr',
                    id: 'id',
                },
            },
        }),
    ],
    build: {
        assets: '_assets',
        // Khai rõ giá trị mặc định của Astro: canonical, hreflang, sitemap và link nội bộ
        // (src/i18n/utils.ts, Layout.astro:35) đều dựa vào việc Astro.url.pathname luôn có / cuối,
        // tức mỗi trang ra .../index.html trong một thư mục riêng — không được đổi ngầm.
        format: 'directory',
        // Nhúng mọi CSS vào HTML (VEIL-1360): Astro tách CSS dùng chung thành 3–4 file chặn render cho mỗi trang
        // (Lighthouse mobile ước ~1,8 s ở trang chủ). Đổi lại HTML nặng hơn và không cache CSS giữa các trang.
        inlineStylesheets: 'always',
    },
    vite: {
        build: {
            cssMinify: true,
            // Font tự host (VEIL-1038) luôn là file riêng trong _assets/: file dưới 4 KB (Plex Mono vietnamese
            // 400, 500) mà nhúng base64 thì nằm trong CSS chặn render của mọi trang, kể cả trang không có chữ
            // Việt. undefined: mọi thứ khác, kể cả ngưỡng Astro nhúng CSS/script vào HTML, giữ mặc định 4 KB.
            assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
        },
    },
});
