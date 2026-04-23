'use client';

import React from 'react';
import { useStoreScroll } from '@/context/StoreScrollContext';

interface StoreSectionProps {
  children: React.ReactNode;
  index: number;
}

/**
 * StoreSection: Phiên bản "Perfect Viewport".
 * Để trong suốt để nhìn thấy được lớp nền NexusSwarm bên dưới.
 */
export const StoreSection = ({ children, index }: StoreSectionProps) => {
  const { activeSection } = useStoreScroll();
  const isActive = activeSection === index;

  return (
    <div className="relative w-full h-full overflow-hidden snap-start flex flex-col bg-transparent">
      
      {/* Tia sáng quét ở đỉnh */}
      <div className={`absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 to-purple-500 z-40 transition-all duration-1000 ease-in-out
        ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} 
      />

      <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ease-out 
        ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-10 translate-y-4 scale-[0.98]'}`}>
        <div className="w-full h-full">
           {children}
        </div>
      </div>

      {/* Bottom Glow */}
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-400/5 via-purple-500/5 to-transparent pointer-events-none transition-opacity duration-1000
        ${isActive ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
};
