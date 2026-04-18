'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { User, Message } from '@/types/chat';

interface ChatMessageListProps {
  user: User;
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ user, messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    /* Khu vực hiển thị nội dung các tin nhắn trong cuộc hội thoại */
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#242526]">
      {/* Thông tin Profile lớn ở đầu cuộc hội thoại mới */}
      <div className="flex flex-col items-center py-6">
        <Image 
          src={user.avatar} 
          width={64} 
          height={64} 
          unoptimized
          className="w-16 h-16 rounded-full mb-3" 
          alt="Avatar" 
        />
        <span className="font-bold text-[17px] text-white underline decoration-white/10 underline-offset-4">{user.name}</span>
        <span className="text-[13px] text-[#b0b3b8] mt-1">Facebook</span>
      </div>

      {/* Danh sách các tin nhắn (tự động phân loại sender: 'me' hoặc 'them') */}
      {messages.map((item) => (
        <div key={item.id} className={`flex ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
          {item.sender !== 'me' && (
            <Image 
              src={user.avatar} 
              width={28} 
              height={28} 
              unoptimized
              className="w-7 h-7 rounded-full self-end mr-2 mb-1" 
              alt="Avatar" 
            />
          )}
          <div className={`max-w-[210px] px-3.5 py-2 rounded-[18px] text-[15px] ${item.sender === 'me' ? 'bg-[#0084ff] text-white rounded-br-none' : 'bg-[#3e4042] text-gray-100 rounded-bl-none'
            }`}>
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
