import { create } from 'zustand';

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  body: string;
  sender: 'me' | 'them';
  timestamp: string;
  isEdited?: boolean;
}

interface ChatStore {
  activeChats: ChatUser[];
  minimizedChats: ChatUser[];
  messages: { [key: number]: Message[] }; // Lưu trữ tin nhắn theo userId
  openChat: (user: ChatUser) => void;
  closeChat: (userId: number, isBubble?: boolean) => void;
  minimizeChat: (user: ChatUser) => void;
  toggleChat: (user: ChatUser) => void;
  addMessage: (userId: number, message: Message) => void;
  updateMessage: (userId: number, messageId: number, content: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChats: [],
  minimizedChats: [],
  messages: {},
  
  openChat: (user) => set((state) => {
    const newMinimized = state.minimizedChats.filter(c => c.id !== user.id);
    if (state.activeChats.find(c => c.id === user.id)) {
      return { minimizedChats: newMinimized };
    }

    const nextActive = [...state.activeChats];
    const finalMinimized = [...newMinimized];

    if (nextActive.length >= 3) {
      const removed = nextActive.shift();
      if (removed && !finalMinimized.find(c => c.id === removed.id)) {
        finalMinimized.push(removed);
      }
    }
    
    nextActive.push(user);
    return { activeChats: nextActive, minimizedChats: finalMinimized };
  }),

  closeChat: (userId, isBubble) => set((state) => ({
    activeChats: state.activeChats.filter(c => c.id !== userId),
    minimizedChats: isBubble ? state.minimizedChats.filter(c => c.id !== userId) : state.minimizedChats
  })),

  minimizeChat: (user) => set((state) => {
    const newActive = state.activeChats.filter(c => c.id !== user.id);
    const alreadyInBubbles = state.minimizedChats.find(c => c.id === user.id);
    return { 
      activeChats: newActive, 
      minimizedChats: alreadyInBubbles ? state.minimizedChats : [...state.minimizedChats, user] 
    };
  }),

  toggleChat: (user) => set((state) => {
    // Chuyển từ bong bóng sang cửa sổ
    const newMinimized = state.minimizedChats.filter(c => c.id !== user.id);
    return {
      activeChats: [...state.activeChats, user].slice(-3),
      minimizedChats: newMinimized
    };
  }),

  addMessage: (userId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [userId]: [...(state.messages[userId] || []), message]
    }
  })),

  updateMessage: (userId, messageId, content) => set((state) => ({
    messages: {
      ...state.messages,
      [userId]: (state.messages[userId] || []).map(m => 
        m.id === messageId ? { ...m, body: content, isEdited: true } : m
      )
    }
  }))
}));
