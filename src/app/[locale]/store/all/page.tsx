'use client';

import React from 'react';
import { PRODUCTS } from '@/data/mockData';
import { FeaturedCarousel } from '@/components/store/FeaturedCarousel';
import { ScrollingGrid } from '@/components/store/ScrollingGrid';
import { StoreSection } from '@/components/store/StoreSection';
import { SideNavigation } from '@/components/store/SideNavigation';
import { useStoreScroll } from '@/context/StoreScrollContext';
import { useStoreFilter } from '@/hooks/store/useStoreFilter';

/**
 * AllProductsPage: Trang hiển thị toàn bộ danh mục sản phẩm (/store/all).
 * Đây là "Page A" (Collection) bên trong mục lớn Store.
 */
export default function AllProductsPage() {
  const { activeSection, scrollToSection } = useStoreScroll();
  const { filteredProducts, selectedCategory } = useStoreFilter(PRODUCTS);

  return (
    <>
      <SideNavigation
        activeSection={activeSection}
        onScroll={scrollToSection}
        sections={[
          { id: 0, label: 'Best Sellers' }
        ]}
      />

      <StoreSection isOverflowHidden className="flex flex-col justify-center">
        <div className="max-w-[1360px] mx-auto w-full pl-[120px] pr-[40px] grid grid-cols-6 gap-10">
          <FeaturedCarousel key={selectedCategory} products={filteredProducts} />
          <ScrollingGrid products={filteredProducts} />
        </div>
      </StoreSection>
    </>
  );
}
