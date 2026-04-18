'use client';

import React from 'react';
import { STORIES, POSTS } from '@/data/mockData';
import StoryBar from './StoryBar';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const NewsFeed = () => {
  return (
    /* Cột chính hiển thị nội dung Feed trung tâm */
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[680px] px-0 pt-2">
        {/* Khung tạo bài viết mới */}
        <CreatePost />
        {/* Thanh tin (Stories) dạng ngang */}
        <StoryBar stories={STORIES} />
        {/* Danh sách các bài viết trên Feed */}
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
