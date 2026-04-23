'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { HeaderActions } from '@/components/layout/HeaderActions';

/**
 * SidebarNav (Header chuẩn): Thành phần điều hướng chính cố định trên cùng của ứng dụng.
 * Được tách thành 3 phần rõ rệt: 
 * 1. Bên trái: Logo và Tìm kiếm.
 * 2. Ở giữa: Thanh điều hướng 5 Tab chính (HeaderNav).
 * 3. Bên phải: Các nút chức năng và Profile (HeaderActions).
 */
export default function SidebarNav() {
  return (
    <header 
      style={{ viewTransitionName: 'global-header' } as React.CSSProperties}
      className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-[#242526]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 h-14 px-4 overflow-visible"
    >
      <div className="max-w-full mx-auto h-full flex items-center justify-between gap-4">
        
        {/* KHU VỰC BÊN TRÁI: Logo thương hiệu & Ô tìm kiếm nhanh */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-cyan-300 to-indigo-600 rounded-lg rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-500 ease-in-out shrink-0 group-hover:[animation:spin-infinite_4s_linear_infinite]">
              <span className="text-black font-black text-lg -rotate-12 group-hover:[animation:reverse-spin-infinite_4s_linear_infinite]">N</span>
            </div>
            <div className="flex items-center gap-4 hidden lg:flex">
              <span className="text-[20px] text-zinc-100 italic mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-allura">
                Nyx&apos;s Radiance
              </span>
            </div>
          </Link>
        </div>

        {/* KHU VỰC GIỮA: Điều hướng (Thanh menu chính) */}
        <HeaderNav />

        {/* KHU VỰC BÊN PHẢI: Các nút hành động, Messenger và Profile người dùng */}
        <HeaderActions />

      </div>
    </header>
  );
}
