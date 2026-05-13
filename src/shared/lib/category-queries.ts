/**
 * category-queries.ts
 *
 * Data-access layer cho category data.
 * Dùng chung bởi marketplace filter-sidebar, home categories-section, v.v.
 *
 * Khi backend sẵn sàng: swap hàm mock bên dưới bằng GET /api/categories.
 */

import { categories as mockCategories } from "@/shared/lib/data";
import { apiClient } from "@/shared/api/api-client";
import { useQuery } from "@tanstack/react-query";
import { Result, PagedResult } from "@/types/api";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
}

/** Query keys dùng với TanStack Query. */
export const categoryQueryKeys = {
  all: ["categories"] as const,
};

/** Trả về tất cả categories. Gọi GET /api/catalog/categories qua gateway, fallback sang mock nếu lỗi. */
export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Result<PagedResult<Category>>>(
      "/api/catalog/categories"
    );
    const categories = response.data?.data?.items || [];

    return categories.map(cat => ({
      ...cat,
      productCount: cat.productCount ?? 0,
      slug: cat.slug || cat.id
    }));
  } catch (error) {
    console.warn("Lỗi gọi API Categories, dùng dữ liệu mẫu:", error);
    return mockCategories.map(cat => ({
      ...cat,
      slug: cat.id // Dữ liệu mock cũ dùng id làm slug
    }));
  }
}

/** Hook để sử dụng trong Component */
export const useCategories = () => {
  return useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });
};
