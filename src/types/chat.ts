export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

export interface ChatSession {
  id: string;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread?: number;
}
