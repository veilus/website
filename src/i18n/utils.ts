import en from './en.json' with { type: 'json' };
import zh from './zh.json' with { type: 'json' };
import ru from './ru.json' with { type: 'json' };
import vi from './vi.json' with { type: 'json' };
import pt from './pt.json' with { type: 'json' };
import es from './es.json' with { type: 'json' };
import tr from './tr.json' with { type: 'json' };
import id from './id.json' with { type: 'json' };

// ogLocale: dạng ngôn_VÙNG mà og:locale của Open Graph đòi; mã trần như 'vi' không đúng dạng.
export const languages = {
    en: { label: 'English', flag: '🇬🇧', dir: 'ltr', ogLocale: 'en_US' },
    zh: { label: '中文', flag: '🇨🇳', dir: 'ltr', ogLocale: 'zh_CN' },
    ru: { label: 'Русский', flag: '🇷🇺', dir: 'ltr', ogLocale: 'ru_RU' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', ogLocale: 'vi_VN' },
    pt: { label: 'Português', flag: '🇧🇷', dir: 'ltr', ogLocale: 'pt_BR' },
    es: { label: 'Español', flag: '🇪🇸', dir: 'ltr', ogLocale: 'es_ES' },
    tr: { label: 'Türkçe', flag: '🇹🇷', dir: 'ltr', ogLocale: 'tr_TR' },
    id: { label: 'Indonesia', flag: '🇮🇩', dir: 'ltr', ogLocale: 'id_ID' },
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
