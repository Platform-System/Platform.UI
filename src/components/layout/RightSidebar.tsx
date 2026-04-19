'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { CHATS } from '@/data/mockData';
import { useChatStore } from '@/store/chatStore';
import SidebarItem from '../shared/SidebarItem';

const RightSidebar = () => {
  const { openChat } = useChatStore(); // Lấy hàm mở khung chat từ Store (Zustand)

  return (
    /* 
      Thanh Sidebar bên phải: 
      Chứa danh sách người trực tuyến (Contacts), ẩn trên màn hình nhỏ (lg:block) 
    */
    <aside className="fixed right-0 top-14 w-[360px] h-[calc(100vh-56px)] overflow-y-auto px-0 py-2 hidden lg:block no-scrollbar">
      
      {/*Phần HEADER của danh sách contact: Tiêu đề và các icon chức năng */}
      <div className="flex items-center justify-between px-3 py-2 mb-2 text-slate-500 dark:text-[#b0b3b8]">
        <span className="font-semibold text-[17px]">Contacts</span>
        <div className="flex items-center gap-2">
          {/* Nút tìm kiếm trong danh sách contacts */}
          <button title="Search" className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">
            <Icon icon="solar:magnifer-bold" width="16" />
          </button>
          {/* Nút cài đặt/tùy chọn */}
          <button title="Options" className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">
            <Icon icon="solar:menu-dots-bold" width="16" />
          </button>
        </div>
      </div>

      {/* DANH SÁCH BẠN BÈ: Mỗi SidebarItem khi bấm vào sẽ mở một cửa sổ chat nổi tương ứng */}
      <div className="flex flex-col items-center">
        {CHATS.map((chat) => (
          <SidebarItem
            key={chat.id}
            avatar={chat.avatar}
            label={chat.name}
            onClick={() => openChat(chat)} // Kích hoạt hành động mở chat
          />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
