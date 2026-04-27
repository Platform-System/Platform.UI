'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { useChatState } from '@/features/chat/state/useChatState';
import ChatWindow from './ChatWindow';
import Image from 'next/image';

/**
 * ChatWidget: Quản lý toàn bộ hệ thống cửa sổ chat nổi trên ứng dụng.
 * Removed translations for a cleaner, icon-only experience.
 */
const ChatWidget = () => {
  const { activeChats, minimizedChats, closeChat, minimizeChat, toggleChat } = useChatState();

  return (
    <div className="fixed bottom-0 right-24 flex items-end gap-1.5 z-[100] pointer-events-none">
      
      {/* Active Chat Windows */}
      <div className="flex items-end gap-3 mr-2 pointer-events-auto">
        {activeChats.map((chat) => (
          <ChatWindow
            key={chat.id}
            user={chat}
            onClose={() => closeChat(chat.id)}
            onMinimize={() => minimizeChat(chat)}
          />
        ))}
      </div>

      {/* Minimized Chat Bubbles */}
      <div className="flex flex-col gap-2 items-center pb-8 pointer-events-auto">
        {minimizedChats.map((chat) => (
          <div key={chat.id} className="relative group/bubble">
            <button
              onClick={() => toggleChat(chat)}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-[#242526] shadow-xl overflow-hidden hover:scale-110 transition-all bg-white dark:bg-[#242526] relative"
            >
              <Image 
                src={chat.avatar} 
                fill 
                unoptimized 
                className="object-cover" 
                alt="Chat Bubble" 
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#242526] rounded-full"></div>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); closeChat(chat.id, true); }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#e41e3f] text-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/bubble:opacity-100 transition-opacity hover:scale-110"
            >
              <Icon icon="solar:close-bold" width="10" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWidget;
