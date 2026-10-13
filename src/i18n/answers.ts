/**
 * Điền số vào đoạn trả lời (VEIL-1393): giá từ data/skus.js theo tiền tệ của ngôn ngữ, cỡ file từ data/facts.js.
 * i18n chỉ giữ chữ và chỗ trống {…}; đổi giá hay phát hành bản mới thì đoạn văn tự đúng theo.
 */
import { SKUS } from '../data/skus.js';
import { INSTALLER_SIZE, ENGINE_SIZE } from '../data/facts.js';
import { currencyForLang, formatPrice, listed } from '../scripts/purchase-core.js';
import { t, type Lang } from './utils';

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);
// '.exe · ~39 MB' → '~39 MB'
const sizeOf = (s: string) => s.split('· ').pop() ?? s;
const mb = (s: string) => Number(s.match(/(\d+)\s*MB/)?.[1]);

export function answer(lang: Lang, page: 'mcp' | 'pricing' | 'download') {
  const { q, a } = t(lang).answers[page];
  const cur = currencyForLang(lang);
  const price = (sku: keyof typeof SKUS) => formatPrice(cur === 'VND' ? SKUS[sku].vnd : SKUS[sku].usd, cur, lang);
  const engine = [mb(ENGINE_SIZE.windows), mb(ENGINE_SIZE.macos)].sort((x, y) => x - y);
  // Khoảng giá trọn đời lấy từ gói đang bán (gói ẩn — PUBLIC_HIDE_SKUS — không được nhắc). Chữ i18n ghi gói rẻ nhất
  // là "một máy": đổi thì build đỏ ở đây để người sửa đổi cả câu, không lặng lẽ in sai.
  const life = Object.entries(SKUS).filter(([id, s]) => s.kind === 'lifetime' && listed(id)).sort((x, y) => x[1].usd - y[1].usd);
  const [lo, hi] = [life[0], life[life.length - 1]];
  if (lo[1].devices !== 1) throw new Error(`answers.pricing: gói trọn đời rẻ nhất ${lo[0]} không còn là 1 máy`);
  return {
    q,
    a: fill(a, {
      monthly: price('monthly'),
      lifeFrom: price(lo[0] as keyof typeof SKUS),
      lifeTo: price(hi[0] as keyof typeof SKUS),
      maxDevices: String(hi[1].devices),
      winSize: sizeOf(INSTALLER_SIZE.windows),
      macSize: sizeOf(INSTALLER_SIZE.macos),
      engineSize: `~${engine[0]}–${engine[1]} MB`,
    }),
  };
}
