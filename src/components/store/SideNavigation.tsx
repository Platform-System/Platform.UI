'use client';

import React from 'react';

/**
 * SideNavigation: Hiển thị các chấm điều hướng dọc bên phải màn hình
 * dùng cho trang có snap scroll (cuộn theo từng phần).
 */
interface SideNavigationProps {
  activeSection: number;
  onScroll: (index: number) => void;
}

export const SideNavigation = ({ activeSection, onScroll }: SideNavigationProps) => {
  // Danh sách các phần của trang
  const sections = [
    { id: 0, label: 'Atelier' },
    { id: 1, label: 'Collection' },
    { id: 2, label: 'System' }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((section) => (
        <button 
          key={section.id}
          onClick={() => onScroll(section.id)}
          className="group flex items-center gap-3"
        >
          {/* Label hiển thị khi hover */}
          <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-500 opacity-0 group-hover:opacity-100 ${activeSection === section.id ? 'text-cyan-400 opacity-100' : 'text-zinc-500'}`}>
            {section.label}
          </span>
          
          {/* Dấu chấm điều hướng */}
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
            activeSection === section.id 
              ? 'bg-cyan-400 scale-150 shadow-[0_0_15px_rgba(34,211,238,0.8)]' 
              : 'bg-zinc-800'
          }`} />
        </button>
      ))}
    </div>
  );
};
