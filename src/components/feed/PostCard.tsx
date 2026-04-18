'use client';

import React from 'react';
import { Icon } from '@iconify/react';
// --- Styles ---
const ACTION_BTN_STYLE = "flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-600 dark:text-[#b0b3b8] font-semibold text-sm";
const STAT_TEXT_STYLE = "hover:underline cursor-pointer";

// --- Sub-components ---
const PostAction = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className={ACTION_BTN_STYLE}>
    <Icon icon={icon} width="22" />
    <span>{label}</span>
  </button>
);

const ReactionBadge = ({ icon, bgColor, zIndex }: any) => (
  <div className={`w-5 h-5 ${bgColor} rounded-full flex items-center justify-center border-2 border-white dark:border-[#242526] ${zIndex}`}>
    <Icon icon={icon} className="text-white" width="10" />
  </div>
);

const PostCard = ({ post }: any) => {
  return (
    /* Khung bài viết (Post Card) trên News Feed */
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm mb-3 ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
      {/* Header bài viết: Avatar, Tên tác giả, Thời gian */}
      <div className="p-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} className="w-10 h-10 rounded-full border dark:border-white/10 shadow-sm" alt="" />
          <div>
            <h3 className="font-semibold dark:text-gray-100 hover:underline cursor-pointer leading-tight">{post.author.name}</h3>
            <div className="flex items-center gap-1 text-[12px] text-slate-500 dark:text-[#b0b3b8]">
              <span>{post.time}</span>
              <span>•</span>
              <Icon icon="solar:public-bold" width="12" />
            </div>
          </div>
        </div>
        <button title="Options" className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
          <Icon icon="solar:menu-dots-bold" className="text-slate-500 dark:text-[#b0b3b8]" width="20" />
        </button>
      </div>

      {/* Nội dung văn bản (Caption) */}
      <div className="px-4 pb-3">
        <p className="text-[15px] dark:text-[#e4e6eb] whitespace-pre-line leading-normal">
          {post.caption}
        </p>
      </div>

      {/* Nội dung hình ảnh/video đi kèm bài viết */}
      {post.content && (
        <div className="bg-slate-100 dark:bg-[#18191a] flex items-center justify-center">
          <img 
            src={post.content} 
            className="w-full h-auto object-contain max-h-[612px]" 
            alt="Post content" 
          />
        </div>
      )}

      {/* Khu vực hiển thị lượt tương tác (Like, Comment) */}
      <div className="px-4 py-2.5 flex items-center justify-between text-[14px] text-slate-500 dark:text-[#b0b3b8]">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <ReactionBadge icon="solar:like-bold" bgColor="bg-[#1877f2]" zIndex="z-10" />
            <ReactionBadge icon="solar:heart-bold" bgColor="bg-[#f12849]" zIndex="z-0" />
          </div>
          <span className={STAT_TEXT_STYLE}>{post.likes.toLocaleString()}</span>
        </div>
        <div className="flex gap-3">
          <span className={STAT_TEXT_STYLE}>{post.comments} comments</span>
          <span className={STAT_TEXT_STYLE}>45 shares</span>
        </div>
      </div>

      {/* Các nút tương tác trực tiếp (Like, Comment, Share) */}
      <div className="mx-4 py-1 border-t dark:border-white/5 flex items-center justify-between">
        <PostAction icon="solar:like-broken" label="Like" />
        <PostAction icon="solar:chat-line-broken" label="Comment" />
        <PostAction icon="solar:share-broken" label="Share" />
      </div>
    </div>
  );
};

export default PostCard;
