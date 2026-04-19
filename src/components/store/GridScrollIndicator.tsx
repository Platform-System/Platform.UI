'use client';

import React from 'react';

/**
 * GridScrollIndicator: Hiệu ứng chỉ báo tự động cuộn (Auto-Next).
 */
export const GridScrollIndicator = () => {
  return (
    <div className="absolute bottom-4 -right-8 z-20 pointer-events-none flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-1 group/scroll">
        <span className="text-[6px] font-black uppercase tracking-[0.3em] text-cyan-400/40 animate-pulse">Auto-Next</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400/30 to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-[scroll-down_2s_infinite]" />
        </div>
      </div>
    </div>
  );
};
