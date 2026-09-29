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
                // Mã hreflang phải khớp <link rel="alternate" hreflang> trong HTML (Layout.astro)
                locales: {
                    en: 'en',
                    zh: 'zh',
                    ru: 'ru',
                    vi: 'vi',
                    pt: 'pt',
                    es: 'es',
                    tr: 'tr',
                    id: 'id',
                },
            },
        }),
    ],
    build: {
        assets: '_assets',
    },
    vite: {
        build: {
            cssMinify: true,
        },
    },
});
