'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface ChatFooterProps {
  onSendMessage: (text: string) => void;
}

/** Style chung cho các icon hành động xanh dương của Facebook Messenger */
const ACTION_ICON_STYLE = "p-1.5 text-[#0084ff] hover:bg-white/10 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform";

const ChatFooter: React.FC<ChatFooterProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  /** 
   * Trạng thái Expand (Kéo dãn): 
   * Chỉ dãn rộng ô nhập liệu khi người dùng bắt đầu gõ chữ (message.length > 0)
   */
  const isExpanded = message.length > 0;

  /** Xử lý khi nhấn Enter hoặc bấm nút Gửi */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message); // Gửi tin nhắn lên component cha
      setMessage(''); // Xóa trắng ô nhập liệu sau khi gửi
    }
  };

  return (
    /* Khung nền của Footer Chat - Màu tối chuẩn Dark Mode Facebook */
    <div className="px-1 pb-3 bg-[#242526] shrink-0">
      <div className="flex items-center gap-1.5 h-10 w-full px-0.5">
        
        {/* BÊN TRÁI: Nhóm icon chức năng (Mic, Ảnh, Sticker, Camera) */}
        <div 
          className="flex items-center overflow-hidden shrink-0 transition-all duration-700" 
          style={{ 
            width: isExpanded ? '34px' : '136px', // Thu gọn lại khi bắt đầu gõ chữ
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' 
          }}
        >
          {isExpanded ? (
            /* Chế độ thu gọn: Chỉ hiện nút (+) để mở lại các công cụ */
            <div className="flex items-center justify-center w-[34px] shrink-0">
              <button title="Show more" className="w-5.5 h-5.5 rounded-full bg-[#0084ff] flex items-center justify-center text-white active:scale-95">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            /* Chế độ đầy đủ: Hiện 4 icon công cụ */
            <div className="flex items-center justify-between shrink-0 w-[136px]">
              <button title="Voice Message" className={ACTION_ICON_STYLE}><Icon icon="solar:microphone-bold" width="22" /></button>
              <button title="Gallery" className={ACTION_ICON_STYLE}><Icon icon="solar:gallery-bold" width="22" /></button>
              <button title="Stickers" className={ACTION_ICON_STYLE}><Icon icon="solar:sticker-smile-square-bold" width="22" /></button>
              <button title="Video Chat" className={ACTION_ICON_STYLE}><Icon icon="solar:videocamera-record-bold" width="22" /></button>
            </div>
          )}
        </div>

        {/* GIỮA: Ô nhập văn bản dạng viên thuốc (Input Pill) */}
        <div className="flex-1 min-w-0 bg-[#3a3b3c] rounded-[20px] pl-3.5 pr-0.5 h-[36px] flex items-center border border-white/5 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center min-w-0">
            <input
              type="text"
              placeholder="Aa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-100 placeholder-[#b0b3b8] min-w-0 h-full"
            />
          </form>
          {/* Nút Emoji nằm sát mép phải trong ô nhập liệu */}
          <button title="Choose an emoji" className="p-1 pl-1.5 pr-0.5 text-[#0084ff] hover:bg-white/10 rounded-full shrink-0">
            <Icon icon="solar:smile-circle-bold" width="24" />
          </button>
        </div>

        {/* BÊN PHẢI: Nút Like hoặc Nút Gửi (Tự động hoán đổi) */}
        <div className="w-9 h-9 flex items-center justify-center shrink-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Nút Gửi (Chỉ hiện khi có văn bản) */}
            <button
              title="Send"
              onClick={handleSubmit}
              className={`absolute transition-all duration-700 p-2 rounded-full hover:bg-white/10 ${
                message.length > 0 ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90 pointer-events-none"
              }`}
            >
              <Icon icon="solar:plain-bold" width="24" className="text-[#0084ff] rotate-45" />
            </button>
            {/* Nút Like (Chỉ hiện khi ô nhập trống) */}
            <button
              title="Send a Like"
              className={`absolute transition-all duration-700 p-2 rounded-full hover:bg-white/10 ${
                message.length === 0 ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 90 pointer-events-none"
              }`}
            >
              <Icon icon="solar:like-bold" width="24" className="text-[#0084ff]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
