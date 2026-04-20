'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/store';

/**
 * useStoreFilter: Quản lý logic lọc sản phẩm theo danh mục.
 * @param allProducts - Danh sách toàn bộ sản phẩm ban đầu từ mock data hoặc API.
 * Hook này giúp tách biệt logic xử lý dữ liệu khỏi UI của Grid.
 */
export const useStoreFilter = (allProducts: Product[]) => {
  // Danh mục hiện tại đang được người dùng chọn để xem
  const [selectedCategory, setSelectedCategory] = useState('All');

  /**
   * categories: Trích xuất danh sách các tên danh mục duy nhất từ mảng sản phẩm.
   * Dùng useMemo để tránh tính toán lại mỗi lần component render nếu dữ liệu không đổi.
   */
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];
  }, [allProducts]);

  /**
   * filteredProducts: Mảng sản phẩm đã được lọc theo selectedCategory.
   * Nếu chọn 'Best Sellers' sẽ lọc theo thuộc tính isBestSeller.
   */
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return allProducts;
    if (selectedCategory === 'Best Sellers') return allProducts.filter(p => p.isBestSeller);
    return allProducts.filter(p => p.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  return { selectedCategory, setSelectedCategory, categories, filteredProducts };
};
