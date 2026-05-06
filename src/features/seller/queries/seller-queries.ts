/**
 * seller-queries.ts
 *
 * Data-access layer cho seller feature.
 * Tất cả hooks và components PHẢI import seller data từ đây — không import trực tiếp từ shared/lib/data.
 *
 * Khi backend sẵn sàng: swap các hàm mock bên dưới bằng API calls thật (axios/fetch).
 * Layer hooks/screens bên trên không cần thay đổi.
 */

import { popularSellers, sellerStats } from "@/shared/lib/data"
import { Seller } from "@/types/store"

/** Trả về tất cả sellers (mock). Swap với GET /api/sellers khi có backend. */
export async function fetchAllSellers(): Promise<Seller[]> {
  return popularSellers
}

/** Tìm seller theo slug (mock). Swap với GET /api/sellers/:slug khi có backend. */
export async function fetchSellerBySlug(slug: string): Promise<Seller | undefined> {
  return popularSellers.find((s) => s.slug === slug)
}

/** Trả về seller stats cho trang CTA (mock). Swap với GET /api/stats/sellers khi có backend. */
export async function fetchSellerStats(): Promise<{ label: string; value: string }[]> {
  return sellerStats
}

/** Query keys dùng với TanStack Query. */
export const sellerQueryKeys = {
  all: ["sellers"] as const,
  detail: (slug: string) => ["sellers", slug] as const,
  stats: ["sellers", "stats"] as const,
}
