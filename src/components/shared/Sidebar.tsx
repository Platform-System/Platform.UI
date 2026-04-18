'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { CURRENT_USER, CHATS } from '@/data/mockData';
import { useChatStore } from '@/store/chatStore';

// --- Styles ---
const MENU_BTN_STYLE = "w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-[#323334] text-slate-900 dark:text-[#e4e6eb] hover:bg-slate-200 dark:hover:bg-[#4e4f50] transition-colors relative";
const FILTER_BTN_STYLE = "px-3 py-1.5 rounded-full text-[15px] font-semibold transition-colors whitespace-nowrap";
const ACTION_ICON_STYLE = "w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors";

// --- Sub-components ---
const ChatItem = ({ chat, onClick }: any) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group"
  >
    <div className="relative shrink-0">
      <img src={chat.avatar} className="w-14 h-14 rounded-full object-cover shadow-sm" alt={chat.name} />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-[3px] border-white dark:border-[#242526] rounded-full"></div>
    </div>
    <div className="flex-1 min-w-0 pr-2">
      <h4 className="text-[15px] font-semibold text-black dark:text-[#e4e6eb] mb-0.5">{chat.name}</h4>
      <div className="flex items-center gap-1">
        <p className="text-[13px] text-slate-500 dark:text-[#b0b3b8] truncate font-medium max-w-[180px]">
          {chat.lastMessage}
        </p>
        <span className="text-[13px] text-slate-500 dark:text-[#b0b3b8]">· {chat.time || '10 giờ'}</span>
      </div>
    </div>
    <div className="w-3 h-3 bg-blue-600 rounded-full shrink-0"></div>
  </div>
);

const HeaderActionButton = ({ icon, width = "20" }: any) => (
  <button className={ACTION_ICON_STYLE}>
    <Icon icon={icon} width={width} className="text-slate-600 dark:text-[#b0b3b8]" />
  </button>
);

// --- Danh sách các mục điều hướng chính ---
const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: 'solar:home-smile-linear', activeIcon: 'solar:home-smile-bold', desc: 'Home' },
  { path: '/explore', label: 'Explore', icon: 'solar:compass-linear', activeIcon: 'solar:compass-bold', desc: 'Explore' },
  { path: '/store', label: 'Store', icon: 'solar:cart-large-linear', activeIcon: 'solar:cart-large-bold', desc: 'Store' },
  { path: '/chat', label: 'Chat', icon: 'solar:chat-round-line-linear', activeIcon: 'solar:chat-round-line-bold', desc: 'Chat' },
  { path: '/library', label: 'Library', icon: 'solar:music-library-2-linear', activeIcon: 'solar:music-library-2-bold', desc: 'Library' },
];

export default function SidebarNav() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const pathname = usePathname();
  const messagesRef = useRef<HTMLDivElement>(null);
  const openChat = useChatStore((state) => state.openChat);

  /* Logic xử lý đóng dropdown tin nhắn khi click ra ngoài */
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
    /* Header điều hướng cố định phía trên */
    <header className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-[#242526]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 h-14 px-4 overflow-visible">
      <div className="max-w-full mx-auto h-full flex items-center justify-between gap-4">
        {/* Khu vực bên trái: Thương hiệu & Tìm kiếm */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Icon icon="solar:gamepad-bold" className="text-white text-2xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent hidden lg:block">
              Nexus
            </span>
          </Link>

          <div className="hidden md:flex items-center relative flex-1 max-w-[280px] ml-4">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 text-slate-400" width="18" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-[#3a3b3c] border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-cyan-500/50 transition-all outline-none dark:text-[#e4e6eb] dark:placeholder-[#b0b3b8]"
            />
          </div>
        </div>

        {/* Khu vực trung tâm: Các nút điều hướng tab chính */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-100/50 dark:bg-white/5 rounded-2xl shrink-0 h-11 border border-transparent">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
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

        {/* Khu vực bên phải: Các nút chức năng (Widget, Messenger, Notification, Profile) */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button title="Widgets" className={MENU_BTN_STYLE}>
            <Icon icon="solar:widget-3-bold" width="20" />
          </button>

          {/* Messenger Dropdown - Quản lý tin nhắn nhanh */}
          <div className="relative" ref={messagesRef}>
            <button
              title="Chats"
              onClick={() => setIsMessagesOpen(!isMessagesOpen)}
              className={clsx(
                MENU_BTN_STYLE,
                isMessagesOpen && "bg-blue-500/10 text-blue-500"
              )}
            >
              <Icon icon={isMessagesOpen ? "solar:chat-round-bold" : "solar:chat-round-linear"} width="22" />
              <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">3</span>
            </button>
 
            {/* Popover chứa danh sách tin nhắn */}
            {isMessagesOpen && (
              <div className="fixed top-[53px] right-5 w-[360px] bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden h-[calc(100vh-80px)] z-[1100]">
                <div className="p-4 pb-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[24px] font-bold dark:text-white tracking-tight">Chats</h2>
                    <div className="flex gap-1.5">
                      <HeaderActionButton icon="solar:menu-dots-bold" />
                      <HeaderActionButton icon="solar:maximize-bold" width="18" />
                      <HeaderActionButton icon="solar:pen-new-square-bold" />
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <Icon icon="solar:magnifer-linear" className="absolute left-3 text-slate-400" width="16" />
                    <input
                      type="text"
                      placeholder="Search Messenger"
                      className="w-full bg-slate-100 dark:bg-[#3a3b3c] border-none rounded-full py-2 pl-9 pr-4 text-[15px] outline-none dark:text-[#e4e6eb] dark:placeholder-[#b0b3b8]"
                    />
                  </div>

                  {/* Bộ lọc tin nhắn (Tất cả, Chưa đọc, ...) */}
                  <div className="flex gap-1 py-1 overflow-x-auto no-scrollbar items-center">
                    <button className={clsx(FILTER_BTN_STYLE, "bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-[#4599ff]")}>All</button>
                    <button className={clsx(FILTER_BTN_STYLE, "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-[#b0b3b8]")}>Unread</button>
                    <button className={clsx(FILTER_BTN_STYLE, "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-[#b0b3b8]")}>Groups</button>
                  </div>
                </div>

                {/* Danh sách các cuộc trò chuyện gần đây */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-2 pb-2">
                  <div className="space-y-0.5 mt-1">
                    {CHATS.map((chat) => (
                      <ChatItem 
                        key={chat.id} 
                        chat={chat} 
                        onClick={() => {
                          openChat(chat);
                          setIsMessagesOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Chân trang Messenger Popover */}
                <div className="p-3 border-t border-slate-100 dark:border-white/5 text-center bg-white dark:bg-[#242526]">
                  <button className="text-blue-600 dark:text-[#4599ff] text-[15px] font-semibold hover:underline">
                    See all in Messenger
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Nút Thông báo chung */}
          <button title="Notifications" className={MENU_BTN_STYLE}>
            <Icon icon="solar:bell-bold" width="22" />
            <span className="absolute -top-1 -right-1 bg-[#e41e3f] text-white text-[11px] font-bold w-[19px] h-[19px] flex items-center justify-center rounded-full border-2 border-white dark:border-[#242526]">5</span>
          </button>

          {/* Khối Profile người dùng và Menu thu gọn */}
          <Link href="/profile" title="Profile" className="relative group/profile ml-1">
            <div className="w-10 h-10 rounded-full border border-transparent hover:border-cyan-500/50 transition-all overflow-hidden shrink-0 shadow-sm">
              <img src={CURRENT_USER.avatar} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute bottom-0 right-[-2px] w-4 h-4 bg-slate-200 dark:bg-[#444546] rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526] shadow-sm">
              <Icon icon="solar:alt-arrow-down-bold" width="8" className="text-slate-900 dark:text-white" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
