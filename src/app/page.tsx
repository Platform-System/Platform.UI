'use client';

import React from 'react';
/* Loại bỏ imports không dùng đến để tránh cảnh báo ESLint */


// Components
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import FloatingChatContainer from '@/components/chat/FloatingChatContainer';
import NewsFeed from '@/components/feed/NewsFeed';

export default function HomeFeed() {
  return (
    /* Khung bố cục chính của trang Home (Newsfeed) */
    <main className="min-h-screen bg-slate-50 dark:bg-[#18191a] pb-12 flex justify-between">
      {/* Cột Sidebar bên trái (Lối tắt) */}
      <LeftSidebar />

      {/* Cột News Feed trung tâm (680px) */}
      <NewsFeed />

      {/* Cột Sidebar bên phải (Người liên hệ) */}
      <RightSidebar />

      {/* Hệ thống cửa sổ Chat nổi và bong bóng thu nhỏ */}
      <FloatingChatContainer />
    </main>
  );
}
