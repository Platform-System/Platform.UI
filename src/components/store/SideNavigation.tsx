'use client';

import React from 'react';
import { useStoreScroll } from '@/context/StoreScrollContext';

/**
 * SideNavigation: "The Triple Pillar" version for store navigation.
 * Cleaned version - English only.
 */
export const SideNavigation = () => {
  const { activeSection, scrollToSection } = useStoreScroll();
  
  const sections = [
    { id: 'atelier', label: 'ATELIER' }, 
    { id: 'diversity', label: 'DIVERSITY' }, 
    { id: 'market', label: 'MARKET' },       
    { id: 'trust', label: 'TRUST' },         
    { id: 'portal', label: 'PORTAL' }        
  ];

  return (
    <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-10">
      <div className="absolute top-0 bottom-0 w-[1px] bg-white/5" />

      {sections.map((section, index) => {
        const isActive = activeSection === index;
        
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className="group relative flex items-center justify-end"
          >
            <span className={`absolute right-8 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500
              ${isActive ? 'opacity-100 translate-x-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400' : 'opacity-0 translate-x-4 text-zinc-600 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              {section.label}
            </span>

            <div className="relative flex items-center justify-center w-4 h-4">
               {isActive && (
                 <>
                   <div className="absolute inset-0 rounded-full bg-cyan-400/5 animate-ping" />
                   <div className="absolute inset-[-6px] rounded-full border border-purple-500/20 scale-110" />
                 </>
               )}
               
               <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 
                 ${isActive ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-zinc-800 group-hover:bg-zinc-500'}`} 
               />
            </div>
          </button>
        );
      })}
    </nav>
  );
};
