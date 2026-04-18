'use client';

import React from 'react';
import { Icon } from '@iconify/react';

import { User } from '@/types/chat';

interface ChatHeaderProps {
  user: User;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, onClose, onMinimize }) => {
  return (
    /* Phần đầu của cửa sổ Chat nổi */
    <div className="p-2 border-b border-white/5 flex items-center justify-between bg-[#1c1c1e] z-20">
      {/* Thông tin người đang chat cùng (Avatar & Tên) */}
      <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg flex-1 min-w-0">
        <div className="relative shrink-0">
          <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="Avatar" />
          <div className="absolute bottom-[-0.5px] right-[-0.5px] w-3 h-3 bg-[#42b72a] border-[2px] border-[#1c1c1e] rounded-full"></div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[14px] truncate text-gray-100">{user.name || user.user}</span>
          <span className="text-[11px] text-[#b0b3b8]">Messenger</span>
        </div>
      </div>

      {/* Các nút điều khiển cửa sổ (Thu nhỏ, Đóng) */}
      <div className="flex items-center gap-0.5">
        <button title="Minimize" onClick={onMinimize} className="p-2 text-[#0084ff] hover:bg-white/10 rounded-full">
          <Icon icon="solar:minus-circle-bold" width="20" />
        </button>
        <button title="Close" onClick={onClose} className="p-2 text-[#0084ff] hover:bg-white/10 rounded-full">
          <Icon icon="solar:close-circle-bold" width="20" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
