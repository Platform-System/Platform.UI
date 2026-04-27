'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Icon } from '@iconify/react';
import { Locale } from '@/i18n/config';
import { useSearchParams } from 'next/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const toggleLocale = () => {
    const newLocale: Locale = locale === 'en' ? 'vi' : 'en';
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    const performNavigation = () => {
      startTransition(() => {
        router.replace(fullPath, { locale: newLocale, scroll: false });
      });
    };

    // Nếu trình duyệt hỗ trợ View Transitions
    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        performNavigation();
      });
    } else {
      performNavigation();
    }
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={`h-9 px-3 flex items-center gap-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-[#e4e6eb] hover:bg-slate-200 dark:hover:bg-white/10 transition-all group ${isPending ? 'opacity-50 cursor-wait' : ''}`}
    >
      <Icon 
        icon="solar:global-linear" 
        className={`w-4 h-4 opacity-70 transition-transform group-hover:rotate-12 ${isPending ? 'animate-spin' : ''}`} 
      />
      
      {/* Thin Vertical Divider */}
      <div className="w-[1px] h-3 bg-slate-400/20 dark:bg-white/10" />

      <span className={`text-[9px] font-black tracking-widest transition-transform ${isPending ? 'opacity-40' : ''}`}>
        {locale === 'en' ? 'EN' : 'VI'}
      </span>
    </button>
  );
}
