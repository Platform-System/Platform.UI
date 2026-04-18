'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { CURRENT_USER } from '@/data/mockData';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TopNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch - standardized pattern for Next.js
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="h-[4.5rem] shrink-0 glass-panel sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2 md:hidden text-cyan-500">
           <Icon icon="solar:infinity-bold-duotone" width="32" height="32" />
        </div>
        <div className="flex-1"></div>
      </header>
    );
  }

  return (
    /* Thanh điều hướng phía trên của toàn bộ ứng dụng */
    <header className="h-[4.5rem] shrink-0 glass-panel sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 transition-colors duration-300 border-b border-slate-100 dark:border-white/5">
      {/* Khối Logo hiển thị trên Mobile */}
      <div className="flex items-center gap-2 md:hidden text-cyan-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
        <Icon icon="solar:infinity-bold-duotone" width="32" height="32" />
      </div>

      {/* Thanh tìm kiếm - Phong cách Glassmorphic */}
      <div className="hidden sm:flex items-center max-w-md w-full bg-slate-100 dark:bg-white/10 rounded-2xl px-4 py-2.5 border border-slate-200 dark:border-white/10 focus-within:border-cyan-500/50 focus-within:bg-white dark:focus-within:bg-white/15 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 group">
        <Icon icon="solar:magnifer-linear" width="20" height="20" className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search for content, creators, or drops..." 
          className="bg-transparent border-none outline-none w-full px-3 text-sm text-slate-900 dark:text-white placeholder-slate-400"
        />
      </div>

      {/* Khu vực Action Buttons bên trái */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Nút Tìm kiếm (chỉ hiện trên Mobile) */}
        <button title="Search" className="sm:hidden text-slate-400 hover:text-cyan-500 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
          <Icon icon="solar:magnifer-linear" width="24" height="24" />
        </button>

        {/* Nút Chuyển đổi Theme (Sáng/Tối) */}
        <button 
          title="Toggle Theme"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="text-slate-400 hover:text-cyan-500 dark:hover:text-yellow-400 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
        >
          <Icon icon={resolvedTheme === 'dark' ? "solar:sun-bold-duotone" : "solar:moon-bold-duotone"} width="24" height="24" />
        </button>
        
        {/* Nút Thông báo với hiệu ứng Pulse */}
        <button title="Notifications" className="relative text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all group">
          <Icon icon="solar:bell-linear" width="24" height="24" className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white dark:border-[#0a0a0f] shadow-[0_0_8px_theme(colors.pink.500)] animate-pulse"></span>
        </button>
        
        {/* Khối Profile người dùng: Avatar và Tên */}
        <button title="Account Settings" className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all pr-4 border border-transparent hover:border-slate-200 dark:hover:border-white/10 group text-left">
          <div className="relative">
            <Image 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              width={36}
              height={36}
              unoptimized
              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/50 transition-colors"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0a0a0f] rounded-full"></div>
          </div>
          <span className="hidden lg:block text-sm font-bold text-slate-600 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{CURRENT_USER.name}</span>
          <Icon icon="solar:alt-arrow-down-linear" width="16" height="16" className="hidden lg:block text-slate-400 group-hover:text-cyan-500 transition-colors" />
        </button>
      </div>
    </header>
  );
}
