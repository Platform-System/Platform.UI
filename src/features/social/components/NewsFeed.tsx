'use client';

import React from 'react';
import { STORIES, POSTS } from '@/data/mockData';
import StoryBar from './StoryBar';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const NewsFeed = () => {
  return (
    /* Cột nội dung trung tâm: Căn giữa (justify-center) và giới hạn chiều rộng tối đa (680px) */
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[680px] px-0 pt-2">
        
        {/* THÀNH PHẦN 1: Ô soạn thảo bài viết mới (Nằm trên cùng) */}
        <CreatePost />

        {/* THÀNH PHẦN 2: Thanh hiển thị Tin (Stories) - Có thể cuộn ngang */}
        <StoryBar stories={STORIES} />

        {/* THÀNH PHẦN 3: Danh sách các bài đăng (Posts) được Maps từ dữ liệu mẫu */}
        <div className="max-w-[100%]">
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
