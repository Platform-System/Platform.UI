export interface User {
  id: string | number;
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
  user?: string; // Hỗ trợ fallback cho mock data cũ
}

export interface Message {
  id: string | number;
  text: string;
  sender: 'me' | 'other' | 'them';
  time: string;
}

export interface ChatSession {
  id: string | number;
  name: string;
  avatar: string;
  lastMessage?: string; // Chuyển thành optional để tránh lỗi khi truyền dữ liệu thiếu
  time: string;
  unread?: number;
}
