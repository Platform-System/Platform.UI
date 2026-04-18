'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface ChatConversationProps {
  activeChat: any;
  messages: any[];
  isTyping: boolean;
}

const ChatConversation: React.FC<ChatConversationProps> = ({ activeChat, messages, isTyping }) => {
  return (
    /* Khu vực hiển thị nội dung hội thoại đang hoạt động */
    <div className="hidden md:flex flex-col flex-1 bg-[#0f172a]/20 relative">
      {/* Hình nền logo mờ ảo tạo điểm nhấn thương hiệu */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Icon icon="solar:infinity-bold-duotone" width="300" />
      </div>

      {/* Header của cuộc hội thoại: Thông tin người chat và các nút Call/Video */}
      <div className="h-20 border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <img src={activeChat.avatar} alt={activeChat.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
          <div>
            <h3 className="font-bold text-white text-lg">{activeChat.name}</h3>
            <div className="text-xs text-green-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span> Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button title="Audio Call" className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:phone-bold" width="20" /></button>
          <button title="Video Call" className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:videocamera-bold" width="20" /></button>
          <button title="Conversation Info" className="p-2.5 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all"><Icon icon="solar:info-circle-linear" width="22" /></button>
        </div>
      </div>

      {/* Vùng hiển thị tin nhắn - Tự động cuộn và có hiệu ứng Typing */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scroll-smooth no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={clsx("flex flex-col w-full", msg.sender === 'me' ? "items-end" : "items-start")}>
            <div className={clsx(
              "max-w-[70%] px-5 py-3.5",
              msg.sender === 'me' 
                ? "bg-gradient-to-tr from-cyan-600 to-blue-600 text-white rounded-2xl rounded-tr-sm shadow-[0_4px_20px_rgba(34,211,238,0.15)]" 
                : "glass-panel text-slate-200 rounded-2xl rounded-tl-sm border border-white/10"
            )}>
              <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
            </div>
            <span className="text-[10px] font-medium text-slate-500 mt-2 px-1">{msg.time}</span>
          </div>
        ))}
        
        {/* Hiệu ứng bong bóng khi đối phương đang gõ tin nhắn */}
        {isTyping && (
          <div className="flex flex-col items-start w-full">
            <div className="px-5 py-4 glass-panel rounded-2xl rounded-tl-sm border border-white/10 w-20 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
              <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
              <span className="w-2 h-2 bg-cyan-400 rounded-full typing-dot"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatConversation;
