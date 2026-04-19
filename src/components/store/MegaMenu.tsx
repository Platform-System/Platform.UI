'use client';

import React from 'react';

/**
 * Props cho MegaMenu Component
 * @param isMegaMenuOpen - Trạng thái đóng/mở của panel mở rộng
 * @param setIsMegaMenuOpen - Hàm cập nhật trạng thái đóng/mở
 * @param categories - Danh sách các danh mục sản phẩm
 * @param selectedCategory - Danh mục hiện đang được chọn
 * @param onSelectCategory - Hàm xử lý khi người dùng chọn danh mục
 * @param scrollToSection - Hàm cuộn trang đến Section tương ứng
 * @param featuredProductImage - Hình ảnh sản phẩm nổi bật hiển thị trong menu
 */
interface MegaMenuProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  scrollToSection: (index: number) => void;
  featuredProductImage: string;
}

import { StoreSubHeader } from './StoreSubHeader';
import { MegaPanel } from './MegaPanel';

export const MegaMenu = ({
  isMegaMenuOpen,
  setIsMegaMenuOpen,
  categories,
  selectedCategory,
  onSelectCategory,
  scrollToSection,
  featuredProductImage
}: MegaMenuProps) => {
  return (
    <div 
      className="fixed top-16 left-0 w-full z-[100] transition-all duration-300"
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <StoreSubHeader setIsMegaMenuOpen={setIsMegaMenuOpen} />
      <MegaPanel 
        {...{ 
          isMegaMenuOpen, 
          setIsMegaMenuOpen, 
          categories, 
          selectedCategory, 
          onSelectCategory, 
          scrollToSection, 
          featuredProductImage 
        }} 
      />
    </div>
  );
};
