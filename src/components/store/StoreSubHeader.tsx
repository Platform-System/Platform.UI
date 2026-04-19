'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface StoreSubHeaderProps {
  setIsMegaMenuOpen: (open: boolean) => void;
}

/**
 * StoreSubHeader: Thanh thanh điều hướng nhỏ ở trên cùng của trang Store.
 * Chứa logo thương hiệu, các liên kết chính và khu vực tìm kiếm/giỏ hàng.
 */
export const StoreSubHeader = ({ setIsMegaMenuOpen }: StoreSubHeaderProps) => {
  return (
    <div className="h-10 bg-black/40 backdrop-blur-md border-b border-white/5 grid grid-cols-3 items-center px-10">
      {/* Bên trái: Tên Hub */}
      <div className="flex items-center">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Store Hub</span>
      </div>

      {/* Giữa: Các liên kết điều hướng chính */}
      <div className="flex items-center justify-center gap-8">
        {['New & Featured', 'Collection', 'Atelier', 'Sale'].map((item) => (
          <button 
            key={item}
            onMouseEnter={() => item === 'Collection' ? setIsMegaMenuOpen(true) : setIsMegaMenuOpen(false)}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group h-10 px-2"
          >
            {item}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
        ))}
      </div>

      {/* Bên phải: Tìm kiếm & Cart */}
      <div className="flex items-center justify-end gap-6 text-white/60">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-40 bg-white/5 border border-white/5 rounded-full py-1 pl-10 pr-4 text-[10px] font-bold focus:outline-none focus:bg-white/10 focus:w-60 transition-all duration-500"
          />
          <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2" width="14" />
        </div>
        <button className="hover:text-white transition-colors">
          <Icon icon="solar:heart-linear" width="18" />
        </button>
        <button className="hover:text-white transition-colors relative">
          <Icon icon="solar:bag-linear" width="18" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-[6px] font-black text-black">2</span>
          </div>
        </button>
      </div>
    </div>
  );
};
