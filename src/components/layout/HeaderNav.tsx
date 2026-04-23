'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

/** 
 * HeaderNav: Global navigation tabs.
 * Updated version - Multi-language support enabled.
 */
export const HeaderNav = () => {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const navItems = [
    { path: '/', label: t('home'), icon: 'solar:home-smile-linear', activeIcon: 'solar:home-smile-bold' },
    { path: '/social', label: t('social'), icon: 'solar:users-group-two-rounded-linear', activeIcon: 'solar:users-group-two-rounded-bold' },
    { path: '/store', label: t('store'), icon: 'solar:cart-large-linear', activeIcon: 'solar:cart-large-bold' },
    { path: '/chat', label: t('chat'), icon: 'solar:chat-round-line-linear', activeIcon: 'solar:chat-round-line-bold' },
    { path: '/library', label: t('library'), icon: 'solar:music-library-2-linear', activeIcon: 'solar:music-library-2-bold' },
  ];

  return (
    <nav className="flex items-center gap-1.5 p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl shrink-0 h-11 border border-transparent select-none">
      {navItems.map((item) => {
        const isActive = item.path === '/' 
          ? pathname === '/' 
          : pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            href={item.path}
            title={item.label}
            className={clsx(
              "flex items-center justify-center h-9 w-11 rounded-xl transition-all duration-150 relative group shrink-0",
              isActive
                ? "bg-white dark:bg-[#3a3b3c] text-cyan-600 dark:text-cyan-400" 
                : "text-slate-500 dark:text-[#b0b3b8] hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white" 
            )}
          >
            <div className={clsx("flex items-center justify-center transition-transform", isActive ? "scale-105" : "group-hover:scale-110 active:scale-95")}>
              <Icon icon={isActive ? item.activeIcon : item.icon} width="24" height="24" />
            </div>
            {isActive && <div className="absolute bottom-0 inset-x-3 h-[2.5px] bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>}
          </Link>
        );
      })}
    </nav>
  );
};
