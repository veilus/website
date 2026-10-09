import en from './en.json' with { type: 'json' };
import zh from './zh.json' with { type: 'json' };
import ru from './ru.json' with { type: 'json' };
import vi from './vi.json' with { type: 'json' };
import pt from './pt.json' with { type: 'json' };
import es from './es.json' with { type: 'json' };
import tr from './tr.json' with { type: 'json' };
import id from './id.json' with { type: 'json' };

// ogLocale: dạng ngôn_VÙNG mà og:locale của Open Graph đòi; mã trần như 'vi' không đúng dạng.
// hreflang: mã khai cho Google (link alternate, menu ngôn ngữ, sitemap) — zh là giản thể, pt là Bồ Brazil (VEIL-1306);
// khoá (mã URL /zh/, /pt/) và tên file i18n giữ nguyên.
export const languages = {
    en: { label: 'English', flag: '🇬🇧', dir: 'ltr', ogLocale: 'en_US', hreflang: 'en' },
    zh: { label: '中文', flag: '🇨🇳', dir: 'ltr', ogLocale: 'zh_CN', hreflang: 'zh-Hans' },
    ru: { label: 'Русский', flag: '🇷🇺', dir: 'ltr', ogLocale: 'ru_RU', hreflang: 'ru' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', ogLocale: 'vi_VN', hreflang: 'vi' },
    pt: { label: 'Português', flag: '🇧🇷', dir: 'ltr', ogLocale: 'pt_BR', hreflang: 'pt-BR' },
    es: { label: 'Español', flag: '🇪🇸', dir: 'ltr', ogLocale: 'es_ES', hreflang: 'es' },
    tr: { label: 'Türkçe', flag: '🇹🇷', dir: 'ltr', ogLocale: 'tr_TR', hreflang: 'tr' },
    id: { label: 'Indonesia', flag: '🇮🇩', dir: 'ltr', ogLocale: 'id_ID', hreflang: 'id' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const supportedLangs = Object.keys(languages) as Lang[];

const translations: Record<Lang, typeof en> = { en, zh, ru, vi, pt, es, tr, id };

export function t(lang: Lang): typeof en {
    return translations[lang] || translations[defaultLang];
}

export function getLangFromUrl(url: URL): Lang {
    const [, langSegment] = url.pathname.split('/');
    if (langSegment && langSegment in languages) {
        return langSegment as Lang;
    }
    return defaultLang;
}

/** Bỏ tiền tố ngôn ngữ, kể cả en: /vi/cookies/ → /cookies/, /vi → /. Ranh giới (?=\/|$) giữ /identity nguyên vẹn. */
export function stripLang(path: string): string {
    return path.replace(/^\/(en|zh|ru|vi|pt|es|tr|id)(?=\/|$)/, '') || '/';
}

/**
 * Đường dẫn của trang ở ngôn ngữ lang. Phần đường dẫn luôn có / cuối — một dạng URL cho link nội bộ, canonical,
 * hreflang và sitemap; thiếu / thì mỗi lượt bấm đi qua một lần chuyển hướng 308. ?query và #hash giữ nguyên:
 * ('/mua?sku=monthly', 'vi') → /vi/mua/?sku=monthly.
 */
export function getLocalizedPath(path: string, lang: Lang): string {
    const [, pathname, rest] = path.match(/^([^?#]*)(.*)$/)!;
    const slashed = pathname.endsWith('/') ? pathname : `${pathname}/`;
    return `${lang === defaultLang ? '' : `/${lang}`}${slashed}${rest}`;
}

/** hreflang của trang đang dựng cho mọi ngôn ngữ, cùng dạng URL với canonical: https://veilus.io/vi/download/; code là mã khai (zh-Hans, pt-BR). */
/**
 * URL một trang docs theo ngôn ngữ. Chỉ 10 trang có bản dịch tiếng Việt thật (đếm docs 989e4fc, 2026-10-09);
 * trang /vi/ khác là bản dự phòng noindex, link vào đó là đổ PageRank vào trang không được index.
 * Ngôn ngữ khác tiếng Việt chưa có docs riêng → bản tiếng Anh.
 */
export const DOCS_URL = 'https://docs.veilus.io';
const DOCS_VI = new Set([
  'getting-started/installation', 'getting-started/quickstart', 'profiles/datasets', 'profiles/fingerprinting',
  'profiles/proxy', 'recipes/llm-scripts', 'reference/faq', 'reference/mcp', 'reference/plans-and-license', 'reference/rest-api',
]);
export function docsUrl(page: string, lang: Lang): string {
  const prefix = lang === 'vi' && DOCS_VI.has(page) ? '/vi' : '';
  return `${DOCS_URL}${prefix}/${page}/`;
}

export function getHreflangs(currentPath: string, siteUrl: string) {
    const cleanPath = stripLang(currentPath);
    return supportedLangs.map((lang) => ({ lang, code: languages[lang].hreflang, href: `${siteUrl}${getLocalizedPath(cleanPath, lang)}` }));
}
