'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { useChatStore } from '@/store/chatStore';
import ChatWindow from './ChatWindow';
import Image from 'next/image';

const FloatingChatContainer = () => {
  const { activeChats, minimizedChats, closeChat, minimizeChat, toggleChat } = useChatStore();

  return (
    /* Container chính chứa toàn bộ hệ thống Chat nổi, nằm cố định ở góc dưới bên phải */
    <div className="fixed bottom-0 right-5 flex items-end gap-1.5 z-[100] pointer-events-none">
      
      {/* Khối hiển thị các cửa sổ Chat đang hoạt động (không bị thu nhỏ) */}
      <div className="flex items-end gap-3 mr-2">
        {activeChats.map((chat) => (
          <ChatWindow
            key={chat.id}
            user={chat}
            onClose={() => closeChat(chat.id)}
            onMinimize={() => minimizeChat(chat)}
          />
        ))}
      </div>

      {/* Khối hiển thị các bong bóng Chat thu gọn (Icons tròn bên phải) */}
      <div className="flex flex-col gap-1 items-center pb-4 pointer-events-auto">
        {minimizedChats.map((chat) => (
          <div key={chat.id} className="relative group/bubble">
            {/* Ảnh đại diện người chat - Click để mở lại cửa sổ */}
            <button
              onClick={() => toggleChat(chat)}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-[#242526] shadow-lg overflow-hidden hover:scale-110 transition-transform bg-white dark:bg-[#242526] relative"
            >
              <Image 
                src={chat.avatar} 
                fill 
                unoptimized 
                className="object-cover" 
                alt="Chat Bubble" 
              />
            </button>
            {/* Nút đóng nhanh bong bóng chat khi hover vào */}
            <button
              title="Close"
              onClick={(e) => { e.stopPropagation(); closeChat(chat.id, true); }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-[#3e4042] rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/bubble:opacity-100 transition-opacity hover:bg-slate-100"
            >
              <Icon icon="solar:close-bold" width="12" className="text-slate-600 dark:text-white" />
            </button>
          </div>
        ))}

        {/* Nút soạn tin nhắn mới (Soạn thư nhanh) */}
        <div className="relative group/compose mt-1">
          <button title="New Message" className="w-12 h-12 rounded-full bg-white dark:bg-[#323334] shadow-xl flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-[#4e4f50] transition-colors">
            <Icon icon="solar:pen-new-square-bold" width="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatContainer;
