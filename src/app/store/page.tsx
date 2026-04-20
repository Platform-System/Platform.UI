'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/mockData';

// Import các Component đã được tách nhỏ
import { BannerCarousel } from '@/components/store/BannerCarousel';
import { MegaMenu } from '@/components/store/MegaMenu';
import { SideNavigation } from '@/components/store/SideNavigation';
import { FeaturedCarousel } from '@/components/store/FeaturedCarousel';
import { ScrollingGrid } from '@/components/store/ScrollingGrid';
import { StoreFooter } from '@/components/store/StoreFooter';
import { StoreBackground } from '@/components/store/StoreBackground';
import { StoreSection } from '@/components/store/StoreSection';

import { ProductIntro } from '@/components/store/ProductIntro';

// Hooks
import { useStoreScroll } from '@/hooks/store/useStoreScroll';
import { useStoreFilter } from '@/hooks/store/useStoreFilter';

/**
 * StoreView: Component chính quản lý giao diện cửa hàng (Digital Atelier).
 * Sử dụng cơ chế Snap Scroll để tạo trải nghiệm cuộn theo từng phân đoạn (Section).
 */
export default function StoreView() {
  // Sử dụng Hook tùy chỉnh để quản lý logic cuộn trang (Xác định section hiện tại, hàm cuộn)
  const { activeSection, scrollContainerRef, handleScroll, scrollToSection } = useStoreScroll();
  
  // Sử dụng Hook tùy chỉnh để quản lý việc lọc sản phẩm theo danh mục
  const { selectedCategory, setSelectedCategory, categories, filteredProducts } = useStoreFilter(PRODUCTS);
  
  // Trạng thái đóng/mở của bảng Menu mở rộng (Mega Menu)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="h-full w-full snap-y snap-mandatory bg-[#020205] text-white selection:bg-cyan-500 selection:text-black font-sans scroll-smooth no-scrollbar overflow-y-auto relative"
    >

      {/* A. Hệ thống menu điều hướng và bảng chọn danh mục */}
      <MegaMenu
        isMegaMenuOpen={isMegaMenuOpen}
        setIsMegaMenuOpen={setIsMegaMenuOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        scrollToSection={scrollToSection}
        featuredProductImage={PRODUCTS[0].image}
      />

      {/* B. Các dấu chấm điều hướng nhanh ở cạnh phải màn hình */}
      <SideNavigation
        activeSection={activeSection}
        onScroll={scrollToSection}
      />

      {/* C. Thành phần nền với hiệu ứng Cosmic và Noise Texture */}
      <StoreBackground />

      {/* 1. Trang mở đầu (Premier Section): Giới thiệu sản phẩm mũi nhọn */}
      <StoreSection className="z-10">
        <ProductIntro />
      </StoreSection>

      {/* 2. Trang Banner (Hero Section): Hiển thị Banner quảng cáo chạy tự động */}
      <StoreSection className="z-20">
        <BannerCarousel />
      </StoreSection>

      {/* 3. Trang sản phẩm (Product Grid): Hiển thị lưới sản phẩm đã được lọc */}
      <StoreSection isOverflowHidden className="z-30 flex flex-col justify-center">
        <div className="max-w-[1360px] mx-auto w-full pl-[120px] pr-[40px] grid grid-cols-6 gap-10">
          {/* Card lớn nổi bật bên trái - Tự động reset index khi đổi danh mục nhờ key */}
          <FeaturedCarousel key={selectedCategory} products={filteredProducts} />
          {/* Lưới sản phẩm nhỏ bên phải */}
          <ScrollingGrid products={filteredProducts} />
        </div>
      </StoreSection>

      {/* 4. Chân trang (Footer): Thông tin bản quyền và liên kết hệ thống */}
      <StoreFooter />

      {/* D. CSS ANIMATIONS TÙY CHỈNH */}
      <style jsx global>{`
        @keyframes reveal-card {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-card {
          animation: reveal-card 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
