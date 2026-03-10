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

export function getLocalizedPath(path: string, lang: Lang): string {
    if (lang === defaultLang) return path;
    return `/${lang}${path}`;
}

/** Generate hreflang links for all supported languages */
export function getHreflangs(currentPath: string, siteUrl: string) {
    // Strip any existing lang prefix
    const cleanPath = currentPath.replace(/^\/(en|zh|ru|vi|pt|es|tr|id)/, '') || '/';
    return supportedLangs.map((lang) => ({
        lang,
        href: `${siteUrl}${lang === defaultLang ? '' : `/${lang}`}${cleanPath === '/' ? '' : cleanPath}`,
    }));
}
