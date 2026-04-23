'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { CURRENT_USER } from '@/data/mockData';
import { MessengerPopover } from '@/components/chat/MessengerPopover';
import LocaleSwitcher from './LocaleSwitcher';

/** Style chung cho các nút chức năng hình tròn trên Header */
const MENU_BTN_STYLE = "w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-[#323334] text-slate-900 dark:text-[#e4e6eb] hover:bg-slate-200 dark:hover:bg-[#4e4f50] transition-colors relative";

/**
 * HeaderActions: Global functional shortcuts.
 * Cleaned version - English only, removed language switcher logic.
 */
export const HeaderActions = () => {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 flex-1 justify-end">
      
      {/* Language Switcher */}
      <LocaleSwitcher />

      {/* Search Shortcut */}
      <button title="Search" className={MENU_BTN_STYLE}>
        <Icon icon="solar:magnifer-linear" width="20" />
      </button>

      {/* Widgets */}
      <button title="Widgets" className={MENU_BTN_STYLE}>
        <Icon icon="solar:widget-3-bold" width="20" />
      </button>

      {/* Messenger */}
      <div className="relative" ref={messagesRef}>
        <button
          title="Messages"
          onClick={() => setIsMessagesOpen(!isMessagesOpen)}
          className={clsx(
            MENU_BTN_STYLE,
            isMessagesOpen && "bg-blue-500/10 text-blue-500"
          )}
        >
          <Icon icon={isMessagesOpen ? "solar:chat-round-bold" : "solar:chat-round-linear"} width="22" />
          <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">3</span>
        </button>

        {isMessagesOpen && (
          <MessengerPopover onClose={() => setIsMessagesOpen(false)} />
        )}
      </div>

      {/* Notifications */}
      <button title="Notifications" className={MENU_BTN_STYLE}>
        <Icon icon="solar:bell-bold" width="22" />
        <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">5</span>
      </button>

      {/* Profile */}
      <Link href="/profile" title="Profile" className="relative group/profile ml-1">
        <div className="w-10 h-10 rounded-full border border-transparent hover:border-cyan-500/50 transition-all overflow-hidden shrink-0 shadow-sm relative">
          <Image 
            src={CURRENT_USER.avatar} 
            fill
            unoptimized
            className="object-cover" 
            alt="Profile" 
          />
        </div>
        <div className="absolute bottom-0 right-[-2px] w-4 h-4 bg-slate-200 dark:bg-[#444546] rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526] shadow-sm">
          <Icon icon="solar:alt-arrow-down-bold" width="8" className="text-slate-900 dark:text-white" />
        </div>
      </Link>
    </div>
  );
};
