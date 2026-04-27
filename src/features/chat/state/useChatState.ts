import { create } from 'zustand';

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
}


interface ChatStore {
  activeChats: ChatUser[];
  minimizedChats: ChatUser[];
  openChat: (user: ChatUser) => void;
  closeChat: (userId: number, isBubble?: boolean) => void;
  minimizeChat: (user: ChatUser) => void;
  toggleChat: (user: ChatUser) => void;
}

export const useChatState = create<ChatStore>((set) => ({
  activeChats: [],
  minimizedChats: [],
  
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
  })
}));
