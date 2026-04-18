export const CURRENT_USER = {
  name: "Khanh Hung",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80",
  handle: "@khanhhung.dev"
};

export const STORIES = [
  { 
    id: 1, 
    user: "Nguyễn Bình An", 
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80", 
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
    time: "1 giờ",
    hasUnseen: true 
  },
  { 
    id: 2, 
    user: "Hong My", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    time: "3 giờ",
    hasUnseen: true 
  },
  { 
    id: 3, 
    user: "Trần Trúc", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    time: "33 phút",
    hasUnseen: false 
  },
  { 
    id: 4, 
    user: "Soái Ca Soái Tỷ", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", 
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
    time: "vừa xong",
    hasUnseen: true 
  },
  { 
    id: 5, 
    user: "Khoa Lai", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    time: "5 giờ",
    hasUnseen: false 
  },
];

export const POSTS = [
  {
    id: 1,
    author: { name: "Nexus Official", handle: "@nexus.hq", avatar: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80" },
    content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    caption: "The new Cyber-collection has just dropped! 🚀 Get ready for the next level of immersive experience. #cyberpunk #nexus #future",
    likes: 12400,
    comments: 850,
    time: "2 giờ",
    isLiked: false
  },
  {
    id: 2,
    author: { name: "Khoa Lai", handle: "@khoa.lai", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
    content: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?w=800&q=80",
    caption: "Chúng ta quen nhau đã nhiều năm. Giờ hồi tưởng lại mỗi lần gặp nhau toàn đi ăn. Những lần nói chuyện với nhau toàn là: Mọi người ơi ăn gì? ✨",
    likes: 8900,
    comments: 420,
    time: "1 ngày",
    isLiked: true
  }
];

export const CHATS = [
  { id: 1, name: "Alex Rivers", lastMessage: "Hey! Are we still on for later?", time: "10:30 AM", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80", unread: 2 },
  { id: 2, name: "Sarah Connor", lastMessage: "The tickets are ready! 🔥", time: "9:15 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", unread: 0 },
  { id: 3, name: "Mike Wazowski", lastMessage: "Did you check the new drop?", time: "Yesterday", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", unread: 0 },
  { id: 4, name: "Emma Stone", lastMessage: "See you at the event!", time: "2 giờ", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", unread: 1 },
  { id: 5, name: "John Wick", lastMessage: "I need a marker.", time: "5 giờ", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", unread: 0 },
  { id: 6, name: "Steve Rogers", lastMessage: "I can do this all day.", time: "1 ngày", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", unread: 0 },
];

export const PRODUCTS = [
  { id: 1, name: "Nexus Genesis Headphones", price: 299.99, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
  { id: 2, name: "Cyber-key Mechanical Keyboard", price: 159.00, category: "Tech", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80" },
  { id: 3, name: "Neon Glow Mousepad", price: 35.50, category: "Accessories", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80" },
  { id: 4, name: "Hologram Watch v2", price: 450.00, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
];
