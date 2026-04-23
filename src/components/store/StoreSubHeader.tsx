'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * StoreSubHeader: Minimalist marketplace navigation.
 * Cleaned version - English only, removed language switching UI.
 */
export const StoreSubHeader = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'HOME', href: '/store', id: 'home' },
    { label: 'COLLECTION', href: '/store/all', id: 'collection' },
    { label: 'ATELIER', href: '/store', id: 'atelier' },
    { label: 'SALE', href: '/store/all?filter=sale', id: 'sale' },
  ];

  return (
    <div className="w-full h-12 bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 select-none">
      
      {/* Left: Section Brand */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-[#22d3ee]">Store Hub</span>
          <div className="w-[1px] h-4 bg-white/10" />
        </div>
      </div>

      {/* Middle: Navigation */}
      <nav className="flex items-center gap-12 h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id}
              href={item.href}
              className="relative h-full flex items-center group"
            >
              <span className={`text-[10px] font-black tracking-[0.2em] transition-colors duration-300 
                ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
                {item.label}
              </span>
              
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 group">
          <Icon icon="solar:magnifer-linear" className="text-zinc-500 group-hover:text-white transition-colors" width="16" />
          <span className="text-[9px] font-bold text-zinc-600 group-hover:text-white uppercase tracking-widest hidden md:block">Search</span>
        </button>
        <div className="relative">
           <Icon icon="solar:heart-linear" className="text-zinc-500 hover:text-white transition-colors cursor-pointer" width="18" />
        </div>
        <div className="relative">
           <Icon icon="solar:cart-large-2-linear" className="text-zinc-500 hover:text-white transition-colors cursor-pointer" width="18" />
           <div className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-[7px] font-black text-black">
              2
           </div>
        </div>
      </div>

    </div>
  );
};
