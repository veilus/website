/**
 * Solutions pages (VEIL-1448): copy exists in English and Vietnamese only, so it lives here instead of the
 * 8 top-level locale files (i18n-parity.test.js requires every key in all 8). Pages are built for these
 * languages only, and Layout/Navbar list only these in hreflang and the language menu.
 * claims.test.js still scans these files: it lists src/i18n/ recursively.
 */
import en from './en.json' with { type: 'json' };
import vi from './vi.json' with { type: 'json' };
import type { Lang } from '../utils';

export const SOLUTION_LANGS: Lang[] = ['en', 'vi'];
const COPY = { en, vi } as Record<Lang, typeof en>;

export type PlatformSlug = keyof typeof en.platforms;
export const PLATFORM_SLUGS = Object.keys(en.platforms) as PlatformSlug[];

export function solutions(lang: Lang) {
  const copy = COPY[lang];
  if (!copy) throw new Error(`solutions: no copy for ${lang}`);
  return copy;
}

/** "{platform} {units}" → "Instagram accounts" */
export const fillPlatform = (s: string, p: { name: string; unit: string; units: string }) =>
  s.replace(/\{platform\}/g, p.name).replace(/\{units\}/g, p.units).replace(/\{unit\}/g, p.unit);
