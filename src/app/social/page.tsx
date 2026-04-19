'use client';

import React from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import FloatingChatContainer from '@/components/chat/FloatingChatContainer';
import NewsFeed from '@/components/feed/NewsFeed';

export default function SocialPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#18191a] pb-12 flex justify-between">
      <LeftSidebar />
      <NewsFeed />
      <RightSidebar />
      <FloatingChatContainer />
    </main>
  );
}
