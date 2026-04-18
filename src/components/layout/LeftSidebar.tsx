'use client';

import React from 'react';
import { CURRENT_USER } from '@/data/mockData';
import SidebarItem from '../shared/SidebarItem';

const LEFT_SIDEBAR_LINKS = [
  { icon: "solar:users-group-rounded-bold", label: "Friends", color: "text-blue-500" },
  { icon: "solar:history-bold", label: "Memories", color: "text-cyan-500" },
  { icon: "solar:bookmark-bold", label: "Saved", color: "text-purple-500" },
  { icon: "solar:users-group-two-rounded-bold", label: "Groups", color: "text-blue-600" },
  { icon: "solar:clapperboard-play-bold", label: "Videos", color: "text-blue-400" },
  { icon: "solar:shop-bold", label: "Marketplace", color: "text-blue-500" },
  { icon: "solar:calendar-bold", label: "Events", color: "text-red-500" },
];

const LeftSidebar = () => {
  return (
    /* Sidebar bên trái chứa các lối tắt điều hướng */
    <aside className="fixed left-0 top-14 w-[360px] h-[calc(100vh-56px)] overflow-y-auto px-0 py-2 hidden xl:block no-scrollbar">
      <div className="flex flex-col items-center">
        {/* Thông tin Profile người dùng */}
        <SidebarItem
          avatar={CURRENT_USER.avatar}
          label={CURRENT_USER.name}
        />
        {/* Danh sách các liên kết lối tắt */}
        {LEFT_SIDEBAR_LINKS.map((item, i) => (
          <SidebarItem key={i} {...item} />
        ))}
      </div>
      {/* Thông tin bản quyền & Chính sách */}
      <div className="mt-4 pt-4 border-t dark:border-white/10 p-2 text-[13px] text-slate-500 dark:text-[#b0b3b8]">
        <p>Privacy · Terms · Advertising · Cookies · Meta © 2026</p>
      </div>
    </aside>
  );
};

export default LeftSidebar;
