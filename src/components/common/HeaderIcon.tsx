'use client';

import React from 'react';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Library, 
  Search, 
  MessageCircle, 
  Bell, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

/**
 * HeaderIcon: Sử dụng Lucide React để đảm bảo icon sắc nét, cao cấp và HIỂN THỊ TỨC THÌ.
 * Giải quyết triệt để vấn đề icon bị nạp lại khi chuyển ngôn ngữ.
 */
export const HeaderIcon = ({ icon, className = "w-6 h-6" }: { icon: string; className?: string }) => {
  const iconMap: Record<string, React.ElementType> = {
    'home-linear': Home,
    'home-bold': Home,
    'users-linear': Users,
    'users-bold': Users,
    'cart-linear': ShoppingBag,
    'cart-bold': ShoppingBag,
    'library-linear': Library,
    'library-bold': Library,
    'search': Search,
    'chat': MessageCircle,
    'bell': Bell,
    'widgets': LayoutGrid,
    'arrow-down': ChevronDown,
  };

  const IconComponent = iconMap[icon];

  if (!IconComponent) return <div className={className} />;

  // Render Lucide icon với các thuộc tính stroke mượt mà
  return (
    <IconComponent 
      className={className} 
      strokeWidth={icon.includes('bold') ? 2.5 : 1.8} 
    />
  );
};
