'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { CURRENT_USER } from '@/data/mockData';

const ACTION_BTN_STYLE = "p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center";

const CreatePost: React.FC = () => {
  return (
    /* Khung tạo bài viết nhanh */
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm p-3 mb-3 border dark:border-white/5 flex items-center gap-2">
      {/* Avatar người dùng hiện tại */}
      <img
        src={CURRENT_USER.avatar}
        className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90 shrink-0 border dark:border-white/10 shadow-sm"
        alt=""
      />
      {/* Ô nhập liệu giả bộ (nơi click để mở modal) */}
      <div className="flex-1 bg-slate-100 dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-[#4e4f50] rounded-full py-2 px-4 cursor-pointer transition-colors text-slate-500 dark:text-[#b0b3b8] text-[16px] truncate">
        {CURRENT_USER.name}, what's on your mind?
      </div>
      {/* Các nút chức năng nhanh (Live, Gallery, Feeling) */}
      <div className="flex items-center gap-1 shrink-0">
        <button title="Live Video" className={ACTION_BTN_STYLE}>
          <Icon icon="solar:videocamera-record-bold" className="text-[#f3425f]" width="24" />
        </button>
        <button title="Photo/Video" className={ACTION_BTN_STYLE}>
          <Icon icon="solar:gallery-bold" className="text-[#45bd62]" width="24" />
        </button>
        <button title="Feeling/Activity" className={ACTION_BTN_STYLE}>
          <Icon icon="solar:emoji-funny-circle-bold" className="text-[#f7b928]" width="24" />
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
