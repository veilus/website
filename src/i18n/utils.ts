import en from './en.json';
import zh from './zh.json';
import ru from './ru.json';
import vi from './vi.json';
import pt from './pt.json';
import es from './es.json';
import tr from './tr.json';
import id from './id.json';

export const languages = {
    en: { label: 'English', flag: '🇬🇧', dir: 'ltr' },
    zh: { label: '中文', flag: '🇨🇳', dir: 'ltr' },
    ru: { label: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    pt: { label: 'Português', flag: '🇧🇷', dir: 'ltr' },
    es: { label: 'Español', flag: '🇪🇸', dir: 'ltr' },
    tr: { label: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    id: { label: 'Indonesia', flag: '🇮🇩', dir: 'ltr' },
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

/** hreflang của trang đang dựng cho mọi ngôn ngữ, cùng dạng URL với canonical: https://veilus.io/vi/download/ */
export function getHreflangs(currentPath: string, siteUrl: string) {
    const cleanPath = stripLang(currentPath);
    return supportedLangs.map((lang) => ({ lang, href: `${siteUrl}${getLocalizedPath(cleanPath, lang)}` }));
}
