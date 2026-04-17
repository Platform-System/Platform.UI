'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { CHATS } from '@/data/mockData';

export default function ChatView() {
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);
  const activeChat = CHATS.find(c => c.id === activeChatId) || CHATS[0];
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Are we still on for later?", sender: 'them', time: '10:30 AM' },
    { id: 2, text: "Yes absolutely. I'll grab the tickets.", sender: 'me', time: '10:35 AM' },
    { id: 3, text: activeChat.lastMessage, sender: 'them', time: activeChat.time },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: 'Just now'
    }]);
    setMessage('');
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sounds like a plan! 🔥",
        sender: 'them',
        time: 'Just now'
      }]);
    }, 2000);
  };

  return (
    <div className="flex h-full max-h-[calc(100vh-4.5rem)] bg-[#0a0a0f] md:p-6 p-0 relative">
      <div className="w-full h-full max-w-6xl mx-auto flex glass-card md:rounded-3xl overflow-hidden relative z-10 border-x-0 md:border-x border-white/5">
        
        {/* Chat List Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col shrink-0 bg-[#0a0a0f]/40 backdrop-blur-xl">
          <div className="h-20 p-5 border-b border-white/5 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Messages <span className="bg-cyan-500/20 text-cyan-400 text-xs py-0.5 px-2 rounded-full border border-cyan-500/30">4 New</span>
            </h2>
            <button className="text-slate-400 hover:text-cyan-400 p-2 rounded-full hover:bg-white/5 transition-all">
              <Icon icon="solar:pen-new-square-linear" width="24" />
            </button>
          </div>
          
          <div className="p-3 overflow-y-auto flex-1 no-scrollbar space-y-1">
            {CHATS.map(chat => (
              <button 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={clsx(
                  "w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left group relative",
                  activeChatId === chat.id ? "bg-white/10 border border-white/5" : "hover:bg-white/5 border border-transparent"
                )}
              >
                {activeChatId === chat.id && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                )}
                
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.user} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a0a0f] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={clsx("font-bold truncate", activeChatId === chat.id ? "text-cyan-400" : "text-white")}>{chat.user}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={clsx("text-xs truncate", chat.unread ? "text-white font-medium" : "text-slate-400")}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 bg-gradient-to-tr from-cyan-500 to-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Chat Area */}
        <div className="hidden md:flex flex-col flex-1 bg-[#0f172a]/20 relative">
          {/* Subtle background logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
             <Icon icon="solar:infinity-bold-duotone" width="300" />
          </div>

          {/* Chat Header */}
          <div className="h-20 border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-4">
              <img src={activeChat.avatar} alt={activeChat.user} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <h3 className="font-bold text-white text-lg">{activeChat.user}</h3>
                <div className="text-xs text-green-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:phone-bold" width="20" /></button>
              <button className="p-2.5 bg-white/5 rounded-full hover:text-cyan-400 hover:bg-white/10 transition-all"><Icon icon="solar:videocamera-bold" width="20" /></button>
              <button className="p-2.5 bg-white/5 rounded-full hover:text-white hover:bg-white/10 transition-all"><Icon icon="solar:info-circle-linear" width="22" /></button>
            </div>
          </div>

          {/* Messages Area */}
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

          {/* Input Area */}
          <div className="p-5 bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/5 shrink-0 z-10">
            <form onSubmit={handleSend} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 pr-2 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all">
              <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-pink-500 rounded-full hover:bg-white/10 transition-colors shrink-0">
                <Icon icon="solar:smile-circle-linear" width="24" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message..." 
                className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-white placeholder-slate-500"
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
        </div>
        
      </div>
    </div>
  );
}
