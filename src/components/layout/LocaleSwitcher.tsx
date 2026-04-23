'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, Locale } from '@/i18n/config';
import { Icon } from '@iconify/react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en';
    
    // Replace the locale in the pathname
    // e.g. /en/store -> /vi/store
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');

    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLocale}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-[#323334] text-slate-900 dark:text-[#e4e6eb] hover:bg-slate-200 dark:hover:bg-[#4e4f50] transition-colors relative"
      title={locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
    >
      <Icon icon="solar:global-linear" width="20" />
      <span className="absolute -bottom-1 -right-1 bg-cyan-600 text-white text-[8px] font-black px-1 rounded-sm uppercase border border-white dark:border-[#242526]">
        {locale}
      </span>
    </button>
  );
}
