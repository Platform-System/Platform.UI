'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import Image from 'next/image';
import { CHATS } from '@/data/mockData';

interface ChatListSidebarProps {
  activeChatId: number;
  onSelectChat: (id: number) => void;
}

const ChatListSidebar: React.FC<ChatListSidebarProps> = ({ activeChatId, onSelectChat }) => {
  return (
    /* Sidebar bên trái của trang Chat chính, chứa danh sách hội thoại */
    <div className="w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col shrink-0 bg-[#0a0a0f]/40 backdrop-blur-xl">
      {/* Tiêu đề vùng tin nhắn và nút soạn mới */}
      <div className="h-20 p-5 border-b border-white/5 flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Messages <span className="bg-cyan-500/20 text-cyan-400 text-xs py-0.5 px-2 rounded-full border border-cyan-500/30">4 New</span>
        </h2>
        <button title="New Message" className="text-slate-400 hover:text-cyan-400 p-2 rounded-full hover:bg-white/5 transition-all">
          <Icon icon="solar:pen-new-square-linear" width="24" />
        </button>
      </div>
      
      {/* Danh sách cuộn các cuộc trò chuyện gần đây */}
      <div className="p-3 overflow-y-auto flex-1 no-scrollbar space-y-1">
        {CHATS.map(chat => (
          /* Nút đại diện cho một cuộc hội thoại */
          <button 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={clsx(
              "w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left group relative",
              activeChatId === chat.id ? "bg-white/10 border border-white/5" : "hover:bg-white/5 border border-transparent"
            )}
          >
            {/* Vạch màu xanh bám bên trái khi hội thoại đang được chọn */}
            {activeChatId === chat.id && (
              <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            )}
            
            {/* Avatar người dùng và chấm trạng thái online */}
            <div className="relative shrink-0">
              <Image 
                src={chat.avatar} 
                width={48} 
                height={48} 
                unoptimized
                alt={chat.name} 
                className="w-12 h-12 rounded-full object-cover border border-white/10" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a0a0f] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>
            
            {/* Thông tin xem trước: Tên, tin nhắn cuối, thời gian, số chưa đọc */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className={clsx("font-bold truncate", activeChatId === chat.id ? "text-cyan-400" : "text-white")}>{chat.name}</span>
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
  );
};

export default ChatListSidebar;
