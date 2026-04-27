'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { ChatSession } from '@/types/chat';
import { CHATS } from '@/data/mockData';
import { useChatState } from '@/features/chat/state/useChatState';

/** Style constants for clean UI */
const FILTER_BTN_STYLE = "px-4 py-1.5 rounded-full text-[14px] font-bold transition-all whitespace-nowrap border dark:border-white/5";
const ACTION_ICON_STYLE = "w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors";

interface ChatDropdownProps {
  onClose: () => void;
}

const HeaderActionButton = ({ icon, width = "20" }: { icon: string; width?: string }) => (
  <button className={ACTION_ICON_STYLE}>
    <Icon icon={icon} width={width} className="text-slate-500 dark:text-[#b0b3b8]" />
  </button>
);

const ChatItem = ({ chat, onClick }: { chat: ChatSession; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group"
  >
    <div className="relative shrink-0">
      <Image 
        src={chat.avatar} 
        width={56} 
        height={56} 
        unoptimized
        className="w-14 h-14 rounded-full object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10" 
        alt={chat.name} 
      />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-[3px] border-white dark:border-[#242526] rounded-full shadow-sm"></div>
    </div>
    <div className="flex-1 min-w-0 pr-2">
      <h4 className="text-[15px] font-bold text-black dark:text-[#e4e6eb] mb-0.5">{chat.name}</h4>
      <div className="flex items-center gap-1.5">
        <p className="text-[13px] text-slate-500 dark:text-[#b0b3b8] truncate font-medium max-w-[180px]">
          {chat.lastMessage}
        </p>
        <span className="text-[12px] text-slate-400 dark:text-[#65676b]">· {chat.time || '10h'}</span>
      </div>
    </div>
    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

export const ChatDropdown = ({ onClose }: ChatDropdownProps) => {
  const openChat = useChatState((state) => state.openChat);

  return (
    <div className="fixed top-[56px] right-5 w-[360px] bg-white dark:bg-[#242526] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden h-[calc(100vh-100px)] z-[1100] backdrop-blur-3xl">
      
      {/* Header */}
      <div className="p-4 pb-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-black dark:text-white tracking-tighter uppercase">Messenger</h2>
          <div className="flex gap-1">
            <HeaderActionButton icon="solar:menu-dots-bold" />
            <HeaderActionButton icon="solar:maximize-bold" width="18" />
            <HeaderActionButton icon="solar:pen-new-square-bold" />
          </div>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Icon icon="solar:magnifer-linear" className="absolute left-3.5 text-slate-400" width="16" />
          <input
            type="text"
            placeholder="..."
            className="w-full bg-slate-100 dark:bg-[#3a3b3c] border-none rounded-full py-2.5 pl-10 pr-4 text-[14px] outline-none dark:text-[#e4e6eb] dark:placeholder-[#b0b3b8] font-medium"
          />
        </div>

        {/* Filter Pills (Icon-centric) */}
        <div className="flex gap-2 py-1 overflow-x-auto no-scrollbar items-center">
          <button className={`${FILTER_BTN_STYLE} bg-blue-600/10 border-blue-500/20 text-blue-600`}>All</button>
          <button className={`${FILTER_BTN_STYLE} hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500`}>Unread</button>
          <button className={`${FILTER_BTN_STYLE} hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500`}>Groups</button>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-2 pb-2">
        <div className="space-y-0.5 mt-1">
          {CHATS.map((chat) => (
            <ChatItem 
              key={chat.id} 
              chat={chat} 
              onClick={() => {
                openChat(chat);
                onClose();
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-white/50 dark:bg-[#242526]/50 backdrop-blur-md">
        <button className="w-full py-2 text-blue-600 dark:text-cyan-400 text-[14px] font-black uppercase tracking-widest hover:bg-blue-500/5 rounded-xl transition-all">
          View All
        </button>
      </div>
    </div>
  );
};
