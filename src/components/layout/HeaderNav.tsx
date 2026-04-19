'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

/** 
 * Danh sách các mục điều hướng chính trên Header
 * Mỗi mục bao gồm: đường dẫn (path), nhãn (label) và bộ icon (thường & active)
 */
const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: 'solar:home-smile-linear', activeIcon: 'solar:home-smile-bold' },
  { path: '/social', label: 'Social', icon: 'solar:users-group-two-rounded-linear', activeIcon: 'solar:users-group-two-rounded-bold' },
  { path: '/store', label: 'Store', icon: 'solar:cart-large-linear', activeIcon: 'solar:cart-large-bold' },
  { path: '/chat', label: 'Chat', icon: 'solar:chat-round-line-linear', activeIcon: 'solar:chat-round-line-bold' },
  { path: '/library', label: 'Library', icon: 'solar:music-library-2-linear', activeIcon: 'solar:music-library-2-bold' },
];

export const HeaderNav = () => {
  const pathname = usePathname();

  return (
    /* Khung chứa các Tab điều hướng - Phong cách Social hiện đại */
    <nav className="flex items-center gap-1.5 p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl shrink-0 h-11 border border-transparent">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path; // Kiểm tra xem tab có đang được chọn hay không
        return (
          <Link
            key={item.path}
            href={item.path}
            title={item.label}
            className={clsx(
              "flex items-center justify-center h-9 w-11 rounded-xl transition-all duration-150 relative group shrink-0",
              isActive
                ? "bg-white dark:bg-[#3a3b3c] text-cyan-600 dark:text-cyan-400" // Style khi Active
                : "text-slate-500 dark:text-[#b0b3b8] hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white" // Style khi Normal
            )}
          >
            {/* Phần hiển thị Icon với hiệu ứng Scale khi hover */}
            <div className={clsx("flex items-center justify-center transition-transform", isActive ? "scale-105" : "group-hover:scale-110 active:scale-95")}>
              <Icon icon={isActive ? item.activeIcon : item.icon} width="24" height="24" />
            </div>
            {/* Thanh gạch chân (Indicator) phía dưới khi Tab được chọn */}
            {isActive && <div className="absolute bottom-0 inset-x-3 h-[2.5px] bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>}
          </Link>
        );
      })}
    </nav>
  );
};
