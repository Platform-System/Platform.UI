'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import Image from 'next/image';

import { ChatSession, Message } from '@/types/chat';

interface ChatConversationProps {
  activeChat: ChatSession;
  messages: Message[];
  isTyping: boolean;
}

const ChatConversation: React.FC<ChatConversationProps> = ({ activeChat, messages, isTyping }) => {
  return (
    <div className="hidden md:flex flex-col flex-1 bg-[#0f172a]/20 relative">
      {/* Background brand mark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Icon icon="solar:infinity-bold-duotone" width="300" />
      </div>

      {/* Header */}
      <div className="h-20 border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Image 
            src={activeChat.avatar} 
            width={48} 
            height={48} 
            unoptimized
            alt={activeChat.name} 
            className="w-12 h-12 rounded-full object-cover border border-white/10 ring-1 ring-white/5" 
          />
          <div>
            <h3 className="font-bold text-white text-lg tracking-tight">{activeChat.name}</h3>
            <div className="text-[11px] text-green-400 font-black uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]"></span> 
              Active
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:phone-bold" width="20" /></button>
          <button className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:videocamera-bold" width="20" /></button>
          <button className="p-2.5 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all"><Icon icon="solar:info-circle-linear" width="22" /></button>
        </div>
      </div>

      {/* Messages */}
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
            <span className="text-[10px] font-black text-slate-500 mt-2 px-1 uppercase tracking-tighter">{msg.time}</span>
          </div>
        ))}
        
        {/* Typing Indicator */}
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
