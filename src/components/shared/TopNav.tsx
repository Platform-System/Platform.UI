'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { CURRENT_USER } from '@/data/mockData';

export default function TopNav() {
  return (
    <header className="h-[4.5rem] shrink-0 glass-panel sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 transition-all duration-300 border-b border-white/5">
      {/* Mobile Logo */}
      <div className="flex items-center gap-2 md:hidden text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        <Icon icon="solar:infinity-bold-duotone" width="32" height="32" />
      </div>

      {/* Search Bar - Glassmorphic */}
      <div className="hidden sm:flex items-center max-w-md w-full bg-white/5 rounded-2xl px-4 py-2.5 border border-white/5 focus-within:border-cyan-500/50 focus-within:bg-white/10 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 group">
        <Icon icon="solar:magnifer-linear" width="20" height="20" className="text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search for content, creators, or drops..." 
          className="bg-transparent border-none outline-none w-full px-3 text-sm text-white placeholder-slate-500"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button className="sm:hidden text-slate-400 hover:text-cyan-400 p-2 rounded-xl hover:bg-white/5 transition-all">
          <Icon icon="solar:magnifer-linear" width="24" height="24" />
        </button>
        
        <button className="relative text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all group">
          <Icon icon="solar:bell-linear" width="24" height="24" className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-pink-500 rounded-full border border-[#0a0a0f] shadow-[0_0_8px_theme(colors.pink.500)] animate-pulse"></span>
        </button>
        
        <button className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-all pr-4 border border-transparent hover:border-white/10 group text-left">
          <div className="relative">
            <img 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-cyan-400/50 transition-colors"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0a0a0f] rounded-full"></div>
          </div>
          <span className="hidden lg:block text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{CURRENT_USER.name}</span>
          <Icon icon="solar:alt-arrow-down-linear" width="16" height="16" className="hidden lg:block text-slate-500 group-hover:text-cyan-400 transition-colors" />
        </button>
      </div>
    </header>
  );
}
