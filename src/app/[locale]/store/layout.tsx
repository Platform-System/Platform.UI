'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/mockData';
import { MegaMenu } from '@/components/store/MegaMenu';
import { StoreBackground } from '@/components/store/StoreBackground';
import { useStoreFilter } from '@/hooks/store/useStoreFilter';
import { StoreScrollProvider, useStoreScroll } from '@/context/StoreScrollContext';
import { StoreSubHeader } from '@/components/store/StoreSubHeader';
import { useRouter, usePathname } from '@/i18n/navigation';

/**
 * StoreLayoutInner: Chứa logic chính của Layout sau khi đã được bọc trong Provider.
 */
function StoreLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { scrollContainerRef, handleScroll, scrollToSection } = useStoreScroll();
  
  // Logic lọc sản phẩm dùng chung để đồng bộ dữ liệu
  const { selectedCategory, setSelectedCategory, categories } = useStoreFilter(PRODUCTS);

  /**
   * Truyền hàm điều hướng cho MegaMenu thay vì cuộn nội bộ nếu đang ở trang khác.
   */
  const handleNavigate = (index: number) => {
    if (index === 0) {
      if (pathname === '/store') {
        scrollToSection(0);
      } else {
        router.push('/store');
      }
    } else if (index === 1) {
      if (pathname === '/store/all') {
        scrollToSection(0);
      } else {
        router.push('/store/all');
      }
    }
  };

  return (
    <div className="h-full w-full bg-[#020205] text-white selection:bg-cyan-500 selection:text-black font-sans relative overflow-hidden">
      <MegaMenu
        isMegaMenuOpen={isMegaMenuOpen}
        setIsMegaMenuOpen={setIsMegaMenuOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (pathname !== '/store/all') router.push('/store/all');
        }}
        scrollToSection={handleNavigate}
        featuredProductImage={PRODUCTS[0].image}
      />

      <StoreBackground />

      {/* 1. Fixed Header (Height: 48px) */}
      <div className="relative z-50 w-full h-12">
        <StoreSubHeader />
      </div>

      {/* 2. Scrollable Body (Height: Remaining Viewport) */}
      <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-[calc(100vh-48px)] w-full overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth z-10 relative"
      >
        {children}
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

/**
 * StoreLayout: Khung giao diện chính bọc bởi Provider.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreScrollProvider>
      <StoreLayoutInner>{children}</StoreLayoutInner>
    </StoreScrollProvider>
  );
}
