'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
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
    <header className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-[#242526]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 h-14 px-4 overflow-visible">
      <div className="max-w-full mx-auto h-full flex items-center justify-between gap-4">
        
        {/* KHU VỰC BÊN TRÁI: Logo thương hiệu & Ô tìm kiếm nhanh */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Icon icon="solar:gamepad-bold" className="text-white text-2xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent hidden lg:block">
              Nexus
            </span>
          </Link>

          {/* Ô tìm kiếm tiêu chuẩn (Chỉ hiện từ màn hình tablet trở lên) */}
          <div className="hidden md:flex items-center relative flex-1 max-w-[280px] ml-4">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 text-slate-400" width="18" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-[#3a3b3c] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none dark:text-[#e4e6eb] dark:placeholder-[#b0b3b8]"
            />
          </div>
        </div>

        {/* KHU VỰC TRUNG TÂM: Thanh điều hướng Tab chính (Home, Social, Shop...) */}
        <HeaderNav />

        {/* KHU VỰC BÊN PHẢI: Các nút hành động, Messenger và Profile người dùng */}
        <HeaderActions />

      </div>
    </header>
  );
}
