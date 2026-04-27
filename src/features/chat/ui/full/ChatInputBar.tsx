'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface ChatInputBarProps {
  message: string;
  setMessage: (text: string) => void;
  onSend: (e: React.FormEvent) => void;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({ message, setMessage, onSend }) => {
  return (
    <div className="p-5 bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/5 shrink-0 z-10">
      <form onSubmit={onSend} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 pr-2 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all">
        <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-pink-500 rounded-full hover:bg-white/10 transition-colors shrink-0">
          <Icon icon="solar:smile-circle-linear" width="24" />
        </button>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="..." 
          className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-white placeholder-slate-600 font-medium italic"
        />
        <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-cyan-400 rounded-full hover:bg-white/10 transition-colors shrink-0 mr-1">
          <Icon icon="solar:paperclip-linear" width="24" />
        </button>
        <button 
          type="submit" 
          disabled={!message.trim()}
          className="w-10 h-10 flex items-center justify-center bg-cyan-500 text-[#0a0a0f] rounded-full hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-all shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:shadow-none"
        >
          <Icon icon="solar:plain-bold" width="20" />
        </button>
      </form>
    </div>
  );
};

export default ChatInputBar;
