/**
 * product-queries.ts
 *
 * Data-access layer for products.
 * All hooks MUST import product data from HERE — never import from shared/lib/data directly.
 *
 * When backend is ready, swap the mock implementations below with real API calls (axios/fetch).
 * The hooks layer (use-product-detail.ts, etc.) does NOT need to change.
 */

import { Product } from "@/types/store";
import { apiClient } from "@/shared/api/api-client";

/** Trả về toàn bộ product pool. Gọi GET /api/catalog/products từ gateway. */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<any>("/api/catalog/products");
    
    // Xử lý cấu trúc Result/PagedResult từ Backend
    if (response.data && response.data.success && response.data.data?.items) {
      return response.data.data.items;
    }
    
    // Fallback nếu trả về mảng trực tiếp
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error("Lỗi gọi API Catalog:", error);
    return [];
  }
}

/** Tìm một product theo id. Gọi GET /api/catalog/products/:id. */
export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await apiClient.get<any>(`/api/catalog/products/${id}`);
    
    // Xử lý cấu trúc Result từ Backend
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }

    return response.data;
  } catch (error) {
    console.error(`Lỗi gọi API cho sản phẩm ${id}:`, error);
    return undefined;
  }
}

/** Query keys dùng với TanStack Query — đảm bảo cache invalidation nhất quán. */
export const productQueryKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
};
