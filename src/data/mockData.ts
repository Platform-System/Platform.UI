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
    author: { name: "NYXORIS Official", handle: "@nyxoris.hq", avatar: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80" },
    content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    caption: "The new Cyber-collection has just dropped! 🚀 Get ready for the next level of immersive experience. #cyberpunk #nyxoris #future",
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
  { id: 1, name: "NYXORIS Genesis Headphones", price: 299.99, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", rating: 4.8 },
  { id: 2, name: "Cyber-key Mechanical Keyboard", price: 159.00, category: "Tech", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80", rating: 4.9 },
  { id: 3, name: "Neon Glow Mousepad", price: 35.50, category: "Accessories", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80", rating: 4.5 },
  { id: 4, name: "Hologram Watch v2", price: 450.00, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", rating: 4.7 },
  { id: 5, name: "Quantum VR Headset", price: 599.00, category: "Tech", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80", rating: 4.9 },
  { id: 6, name: "Sonic Wave Speaker", price: 120.00, category: "Audio", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80", rating: 4.6 },
  { id: 7, name: "Titan Gaming Chair", price: 350.00, category: "Furniture", image: "https://images.unsplash.com/photo-1598550476439-6847785fce66?w=800&q=80", rating: 4.8 },
  { id: 8, name: "Lumina Desk Lamp", price: 45.00, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80", rating: 4.4 },
  { id: 9, name: "Neural Link Controller", price: 899.00, category: "Tech", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80", rating: 5.0 },
  { id: 10, name: "Atmosphere Purifier", price: 210.00, category: "Home", image: "https://images.unsplash.com/photo-1585336139118-89ce320d7be7?w=800&q=80", rating: 4.7 },
  { id: 11, name: "Prism Smartphone", price: 1200.00, category: "Tech", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", rating: 4.9 },
  { id: 12, name: "Carbon Fiber Wallet", price: 85.00, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", rating: 4.6 },
  { id: 13, name: "Echo Pulse Earbuds", price: 180.00, category: "Audio", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80", rating: 4.8 },
  { id: 14, name: "Zenith Smart Glasses", price: 650.00, category: "Wearables", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80", rating: 4.7 },
  { id: 15, name: "Obsidian Monitor Arm", price: 140.00, category: "Tech", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", rating: 4.5 },
  { id: 16, name: "Void-Black Water Bottle", price: 40.00, category: "Accessories", image: "https://images.unsplash.com/photo-1602143307185-84e05439755e?w=800&q=80", rating: 4.9 },
  { id: 17, name: "Apex Drone Pro", price: 1450.00, category: "Tech", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80", rating: 4.8 },
  { id: 18, name: "Velvety Night Desk Mat", price: 60.00, category: "Accessories", image: "https://images.unsplash.com/photo-1616419012574-e9ecb2b1bc01?w=800&q=80", rating: 4.7 },
  { id: 19, name: "Gravity E-Bike", price: 2500.00, category: "Tech", image: "https://images.unsplash.com/photo-1571068316344-75ad76712e0c?w=800&q=80", rating: 4.9 }
];

export const BANNER_SLIDES = [
  {
    id: 1,
    title: "'HURT FEELINGS'",
    subtitle: "LeBron XXII Elite",
    description: "After falling down 3-1 in the 2016 NBA finals, on-court trash talk spilled off-court — but only one King had the last laugh.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-basketball-player-practicing-dribbling-in-a-court-4841-large.mp4",
    cta1: "Show Now",
    cta2: "Learn More",
    theme: "dark"
  },
  {
    id: 2,
    title: "AIR MAX DN",
    subtitle: "Feel the Unreal",
    description: "The next generation of Air technology is here. Step into the future of comfort and style with the all-new Dynamic Air.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-running-on-the-treadmill-in-slow-motion-42289-large.mp4",
    cta1: "Shop Air Max",
    cta2: "Explore Tech",
    theme: "light"
  },
  {
    id: 3,
    title: "ATELIER NYX",
    subtitle: "Precision Engineering",
    description: "Experience the ultimate fusion of luxury aesthetics and performance-driven design in our latest hardware collection.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-high-tech-circuit-board-close-up-v2-42998-large.mp4",
    cta1: "Discover Now",
    cta2: "View Manifesto",
    theme: "dark"
  }
];

export const FOOTER_LINKS = {
  system: [
    { label: "Archive", href: "#" },
    { label: "Manifesto", href: "#" },
    { label: "Neural Network", href: "#" }
  ],
  social: [
    { icon: "solar:share-circle-linear", href: "#" },
    { icon: "solar:cloud-snow-linear", href: "#" }
  ]
};
