/**
 * Solutions pages (VEIL-1448): copy exists in English and Vietnamese only, so it lives here instead of the
 * 8 top-level locale files (i18n-parity.test.js requires every key in all 8). Pages are built for these
 * languages only, and Layout/Navbar list only these in hreflang, the language menu and the Solutions nav link.
 * claims.test.js still scans these files: it lists src/i18n/ recursively.
 */
import en from './en.json' with { type: 'json' };
import vi from './vi.json' with { type: 'json' };
import type { Lang } from '../utils';

export const SOLUTION_LANGS: readonly Lang[] = ['en', 'vi'];
type Copy = typeof en;
const COPY: Partial<Record<Lang, Copy>> = { en, vi };

export type Group = 'verticals' | 'platforms';
export const VERTICAL_SLUGS = Object.keys(en.verticals);
export const PLATFORM_SLUGS = Object.keys(en.platforms);
export const ALL_SLUGS = [...VERTICAL_SLUGS, ...PLATFORM_SLUGS];

export function solutions(lang: Lang): Copy {
  const copy = COPY[lang];
  if (!copy) throw new Error(`solutions: no copy for ${lang}`);
  return copy;
}

type Item = { title: string; body: string; href?: string; linkText?: string };
/** Example data for the page's drawings (SolutionArt.astro). `st` keys common.art.st, `type` keys common.art.types. */
export type Art = {
  rows: { n: string; l: string; tz: string; px: string; st: string }[];
  tag?: string;
  script?: string;
  type?: string;
  list?: 'dataset' | 'variables';
  items?: string[];
  view?: 'runs';
};
export type Entry = {
  group: Group;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  benefits: Item[];
  steps: Item[];
  guides: { href: string; text: string }[];
  related: string[];
  faq: { q: string; a: string; aup?: boolean }[];
  art: Art;
};

/** One page's copy; platform pages fall back to the shared benefits/steps/guides with {platform}/{unit}/{units} filled. */
export function entry(lang: Lang, slug: string): Entry {
  const s = solutions(lang);
  const v = (s.verticals as Record<string, Omit<Entry, 'group'>>)[slug];
  if (v) return { group: 'verticals', ...v };
  const p = (s.platforms as Record<string, Omit<Entry, 'group' | 'benefits' | 'steps' | 'guides' | 'related'> & { unit: string; units: string; related?: string[] }>)[slug];
  if (!p) throw new Error(`solutions: no page ${slug} for ${lang}`);
  const fill = (str: string) =>
    str.replace(/\{platform\}/g, p.name).replace(/\{units\}/g, p.units).replace(/\{unit\}/g, p.unit);
  const fillItem = (i: Item): Item => ({ ...i, title: fill(i.title), body: fill(i.body) });
  return {
    group: 'platforms',
    ...p,
    benefits: s.common.benefits.map(fillItem),
    steps: s.common.steps.map(fillItem),
    guides: s.common.guides,
    related: p.related ?? [],
  };
}
