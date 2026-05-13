/**
 * seller-queries.ts
 *
 * Data-access layer cho seller feature.
 * Tất cả hooks và components PHẢI import seller data từ đây — không import trực tiếp từ shared/lib/data.
 *
 * Khi backend sẵn sàng: swap các hàm mock bên dưới bằng API calls thật (axios/fetch).
 * Layer hooks/screens bên trên không cần thay đổi.
 */

import { Seller } from "@/types/store"
import { apiClient } from "@/shared/api/api-client"

/** Trả về tất cả sellers. Gọi GET /api/sellers. */
export async function fetchAllSellers(): Promise<Seller[]> {
  try {
    const response = await apiClient.get<any>("/api/store/stores");
    
    // Xử lý cấu trúc Result từ Backend
    if (response.data && response.data.success && response.data.data) {
      // Nếu là PagedResult thì lấy items, nếu không lấy data trực tiếp
      return response.data.data.items || response.data.data;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return []
  } catch (error) {
    console.error("Lỗi gọi API Stores:", error);
    return []
  }
}

/** Tìm seller theo slug. Gọi GET /api/sellers/:slug. */
export async function fetchSellerBySlug(slug: string): Promise<Seller | undefined> {
  try {
    const response = await apiClient.get<any>(`/api/store/stores/${slug}`);
    
    // Xử lý cấu trúc Result từ Backend
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }

    return response.data;
  } catch (error) {
    console.error(`Lỗi gọi API cho store ${slug}:`, error);
    return undefined
  }
}

/** Trả về seller stats (trống nếu không có data). */
export async function fetchSellerStats(): Promise<{ label: string; value: string }[]> {
  return []
}

/** Query keys dùng với TanStack Query. */
export const sellerQueryKeys = {
  all: ["sellers"] as const,
  detail: (slug: string) => ["sellers", slug] as const,
  stats: ["sellers", "stats"] as const,
}
