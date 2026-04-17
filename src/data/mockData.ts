export const CURRENT_USER = {
  name: "Khanh Hung",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80",
  handle: "@khanhhung.dev"
};

export const STORIES = [
  { id: 1, user: "Alex", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80", hasUnseen: true },
  { id: 2, user: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", hasUnseen: true },
  { id: 3, user: "Mike", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", hasUnseen: false },
  { id: 4, user: "Emma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", hasUnseen: true },
  { id: 5, user: "David", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", hasUnseen: false },
];

export const FEED_POSTS = [
  {
    id: 1,
    author: { name: "Nexus Official", handle: "@nexus.hq", avatar: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80" },
    content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    caption: "The new Cyber-collection has just dropped! 🚀 Get ready for the next level of immersive experience. #cyberpunk #nexus #future",
    likes: 12400,
    comments: 850,
    isLiked: false
  },
  {
    id: 2,
    author: { name: "Synthwave AI", handle: "@synth.ai", avatar: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&q=80" },
    content: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?w=800&q=80",
    caption: "Midnight vibes in the digital city. Music composed by our latest AI module. 🌃✨",
    likes: 8900,
    comments: 420,
    isLiked: true
  }
];

export const CHATS = [
  { id: 1, user: "Alex Rivers", lastMessage: "Hey! Are we still on for later?", time: "10:30 AM", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80", unread: 2 },
  { id: 2, user: "Sarah Connor", lastMessage: "The tickets are ready! 🔥", time: "9:15 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", unread: 0 },
  { id: 3, user: "Mike Wazowski", lastMessage: "Did you check the new drop?", time: "Yesterday", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", unread: 0 },
];

export const PRODUCTS = [
  { id: 1, name: "Nexus Genesis Headphones", price: 299.99, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
  { id: 2, name: "Cyber-key Mechanical Keyboard", price: 159.00, category: "Tech", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80" },
  { id: 3, name: "Neon Glow Mousepad", price: 35.50, category: "Accessories", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80" },
  { id: 4, name: "Hologram Watch v2", price: 450.00, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
];
