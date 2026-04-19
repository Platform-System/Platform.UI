'use client';

import React from 'react';
import Image from 'next/image';

interface MegaPanelProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  scrollToSection: (index: number) => void;
  featuredProductImage: string;
}

/**
 * MegaPanel: Bảng điều hướng mở rộng hiển thị các lựa chọn chi tiết.
 * Được kích hoạt khi người dùng hover vào phần "Collection".
 */
export const MegaPanel = ({
  isMegaMenuOpen,
  setIsMegaMenuOpen,
  categories,
  selectedCategory,
  onSelectCategory,
  scrollToSection,
  featuredProductImage,
}: MegaPanelProps) => {
  return (
    <div 
      className={`absolute top-10 left-0 w-full bg-white text-black transition-all duration-500 ease-out overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] ${isMegaMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="container mx-auto py-16 px-20 grid grid-cols-4 gap-20">
        {/* Phần 1: Các liên kết nổi bật (Cố định) */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Featured</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li className="hover:text-cyan-600 cursor-pointer">Best Sellers</li>
            <li className="hover:text-cyan-600 cursor-pointer">New Arrivals</li>
            <li className="hover:text-cyan-600 cursor-pointer">Member Exclusive</li>
          </ul>
        </div>

        {/* Phần 2: Danh sách danh mục sản phẩm (Được nạp từ MockData) */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">By Category</h4>
          <ul className="space-y-4 text-sm font-bold">
            {categories.map(cat => (
              <li 
                key={cat} 
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMegaMenuOpen(false);
                  scrollToSection(1); // Khi chọn category, cuộn thẳng xuống Grid sản phẩm
                }}
                className={`cursor-pointer hover:text-cyan-600 ${selectedCategory === cat ? 'text-cyan-600' : ''}`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Phần 3: Hình ảnh quảng cáo (Banner Trending) */}
        <div className="relative col-span-2 aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-100 group/promo">
          <Image src={featuredProductImage} alt="Featured" fill unoptimized className="object-cover transition-transform duration-700 group-hover/promo:scale-110" />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
          <div className="absolute bottom-6 left-6">
            <span className="text-[8px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full mb-2 block w-fit">Trending</span>
            <h5 className="text-xl font-black italic uppercase leading-none text-white drop-shadow-lg">The Genesis <br/>Series</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
