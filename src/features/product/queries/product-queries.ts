/**
 * product-queries.ts
 *
 * Data-access layer for products.
 * All hooks MUST import product data from HERE — never import from shared/lib/data directly.
 *
 * When backend is ready, swap the mock implementations below with real API calls (axios/fetch).
 * The hooks layer (use-product-detail.ts, etc.) does NOT need to change.
 */

import { featuredProducts, trendingProducts, newArrivals } from "@/shared/lib/data"
import { Product } from "@/types/store"

/** Trả về toàn bộ product pool (mock). Swap với GET /api/products khi có backend. */
export async function fetchAllProducts(): Promise<Product[]> {
  return [...featuredProducts, ...trendingProducts, ...newArrivals]
}

/** Tìm một product theo id (mock). Swap với GET /api/products/:id khi có backend. */
export async function fetchProductById(id: string): Promise<Product | undefined> {
  const all = await fetchAllProducts()
  return all.find((p) => p.id === id)
}

/** Query keys dùng với TanStack Query — đảm bảo cache invalidation nhất quán. */
export const productQueryKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
}
