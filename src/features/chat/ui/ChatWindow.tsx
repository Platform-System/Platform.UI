'use client';

import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatFooter from './ChatFooter';

import { User, Message } from '@/types/chat';

interface ChatWindowProps {
  user: User;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, onClose, onMinimize }) => {
  /* Quản lý danh sách tin nhắn nội bộ của cửa sổ chat */
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello!", sender: "other", time: "10:00" },
    { id: '2', text: "How can I help you?", sender: "other", time: "10:01" },
  ]);

  /* Hàm xử lý khi người dùng nhấn gửi tin nhắn */
  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: text,
      sender: "me" as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  return (
    /* Khung cửa sổ Chat nổi sát đáy màn hình */
    <div className="w-[328px] h-[445px] bg-[#242526] rounded-t-xl shadow-[0_12px_48px_rgba(0,0,0,0.6)] flex flex-col border border-white/10 pointer-events-auto overflow-hidden">
      {/* Tiêu đề: Avatar, Tên và các nút điều khiển */}
      <ChatHeader 
        user={user} 
        onClose={onClose} 
        onMinimize={onMinimize} 
      />
      
      {/* Danh sách nội dung tin nhắn */}
      <ChatMessageList 
        user={user} 
        messages={messages} 
      />
      
      {/* Thanh nhập liệu và gửi tin */}
      <ChatFooter 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
};

export default ChatWindow;
