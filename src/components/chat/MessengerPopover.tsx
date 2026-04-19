'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { ChatSession } from '@/types/chat';
import { CHATS } from '@/data/mockData';
import { useChatStore } from '@/store/chatStore';

/** Hằng số định nghĩa Style cho bộ lọc và icon hành động */
const FILTER_BTN_STYLE = "px-3 py-1.5 rounded-full text-[15px] font-semibold transition-colors whitespace-nowrap";
const ACTION_ICON_STYLE = "w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors";

interface MessengerPopoverProps {
  onClose: () => void;
}

/** Component nút hành động nhỏ trên Header của Messenger (Menu, Maximize, Pen) */
const HeaderActionButton = ({ icon, width = "20" }: { icon: string; width?: string }) => (
  <button className={ACTION_ICON_STYLE}>
    <Icon icon={icon} width={width} className="text-slate-600 dark:text-[#b0b3b8]" />
  </button>
);

/** Component hiển thị từng dòng tin nhắn trong danh sách chat */
const ChatItem = ({ chat, onClick }: { chat: ChatSession; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group"
  >
    <div className="relative shrink-0">
      <Image 
        src={chat.avatar} 
        width={56} 
        height={56} 
        unoptimized
        className="w-14 h-14 rounded-full object-cover shadow-sm" 
        alt={chat.name} 
      />
      {/* Chấm xanh online */}
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
    {/* Chấm xanh biểu thị tin nhắn chưa đọc */}
    <div className="w-3 h-3 bg-blue-600 rounded-full shrink-0"></div>
  </div>
);

export const MessengerPopover = ({ onClose }: MessengerPopoverProps) => {
  const openChat = useChatStore((state) => state.openChat); // Lấy hàm mở khung chat từ Store

  return (
    /* Khung bao ngoài của Popover Messenger */
    <div className="fixed top-[53px] right-5 w-[360px] bg-white dark:bg-[#242526] rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden h-[calc(100vh-80px)] z-[1100]">
      
      {/* Phần Header của Messenger: Tiêu đề & Nút chức năng */}
      <div className="p-4 pb-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] font-bold dark:text-white tracking-tight">Chats</h2>
          <div className="flex gap-1.5">
            <HeaderActionButton icon="solar:menu-dots-bold" />
            <HeaderActionButton icon="solar:maximize-bold" width="18" />
            <HeaderActionButton icon="solar:pen-new-square-bold" />
          </div>
        </div>

        {/* Ô Tìm kiếm tin nhắn */}
        <div className="relative flex items-center">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 text-slate-400" width="16" />
          <input
            type="text"
            placeholder="Search Messenger"
            className="w-full bg-slate-100 dark:bg-[#3a3b3c] border-none rounded-full py-2 pl-9 pr-4 text-[15px] outline-none dark:text-[#e4e6eb] dark:placeholder-[#b0b3b8]"
          />
        </div>

        {/* Bộ lọc tin nhắn (Tất cả, Chưa đọc...) */}
        <div className="flex gap-1 py-1 overflow-x-auto no-scrollbar items-center">
          <button className={`${FILTER_BTN_STYLE} bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-[#4599ff]`}>All</button>
          <button className={`${FILTER_BTN_STYLE} hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-[#b0b3b8]`}>Unread</button>
          <button className={`${FILTER_BTN_STYLE} hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-[#b0b3b8]`}>Groups</button>
        </div>
      </div>

      {/* Danh sách các cuộc hội thoại - Có thanh cuộn tùy chỉnh */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-2 pb-2">
        <div className="space-y-0.5 mt-1">
          {CHATS.map((chat) => (
            <ChatItem 
              key={chat.id} 
              chat={chat} 
              onClick={() => {
                openChat(chat); // Mở khung chat nổi
                onClose(); // Đóng popover
              }}
            />
          ))}
        </div>
      </div>

      {/* Nút Xem tất cả dưới cùng */}
      <div className="p-3 border-t border-slate-100 dark:border-white/5 text-center bg-white dark:bg-[#242526]">
        <button className="text-blue-600 dark:text-[#4599ff] text-[15px] font-semibold hover:underline">
          See all in Messenger
        </button>
      </div>
    </div>
  );
};
