/**
 * Bảng SKU hiển thị — bản sao NGUYÊN VĂN `api/src/config/skus.ts` (SKUS).
 * API mới là nơi quyết định số tiền thu; bảng này chỉ để hiển thị. Đổi giá ở
 * API thì sửa cả đây (cổng gốc `tools/sku-price-parity` canh ba bảng khớp).
 */
export const SKUS = {
  solo: { kind: "lifetime", devices: 1, vnd: 2_500_000, usd: 99 },
  team5: { kind: "lifetime", devices: 5, vnd: 5_000_000, usd: 199 },
  team10: { kind: "lifetime", devices: 10, vnd: 8_500_000, usd: 345 },
  team20: { kind: "lifetime", devices: 20, vnd: 16_000_000, usd: 650 },
  monthly: { kind: "monthly", devices: 1, vnd: 200_000, usd: 9 },
  device_solo: { kind: "addon", devices: 1, vnd: 1_400_000, usd: 55 },
  device_team5: { kind: "addon", devices: 1, vnd: 1_200_000, usd: 48 },
  device_team10: { kind: "addon", devices: 1, vnd: 1_000_000, usd: 40 },
};
