/**
 * category-queries.ts
 *
 * Data-access layer cho category data.
 * Dùng chung bởi marketplace filter-sidebar, home categories-section, v.v.
 *
 * Khi backend sẵn sàng: swap hàm mock bên dưới bằng GET /api/categories.
 */

import { categories } from "@/shared/lib/data"

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}

/** Trả về tất cả categories (mock). Swap với GET /api/categories khi có backend. */
export async function fetchAllCategories(): Promise<Category[]> {
  return categories
}

/** Query keys dùng với TanStack Query. */
export const categoryQueryKeys = {
  all: ["categories"] as const,
}
