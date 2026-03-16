// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://veilus.io',
    output: 'static',
    integrations: [
        sitemap({
            filter: (page) =>
                !page.includes('/blog/') &&
                !page.includes('/en/download'),
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    zh: 'zh-CN',
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
    },
    vite: {
        build: {
            cssMinify: true,
        },
    },
});
