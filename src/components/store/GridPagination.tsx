'use client';

import React from 'react';

interface GridPaginationProps {
  totalPages: number;
  activePage: number;
  isDraggingDots: boolean;
  setIsDraggingDots: (isDragging: boolean) => void;
  dotsContainerRef: React.RefObject<HTMLDivElement | null>;
  handleDotsDrag: (clientY: number) => void;
  onPageClick: (page: number) => void;
}

/**
 * GridPagination: Thanh chấm tròn điều hướng dọc cho Product Grid.
 * Hỗ trợ cả Click và Drag để cuộn nhanh.
 */
export const GridPagination = ({
  totalPages,
  activePage,
  isDraggingDots,
  setIsDraggingDots,
  dotsContainerRef,
  handleDotsDrag,
  onPageClick
}: GridPaginationProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div 
        ref={dotsContainerRef}
        onMouseDown={(e) => { e.preventDefault(); setIsDraggingDots(true); handleDotsDrag(e.clientY); }}
        className={`flex flex-col justify-center gap-4 cursor-ns-resize px-4 relative transition-opacity duration-300 ${isDraggingDots ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5" />
        {Array.from({ length: totalPages }).map((_, p) => (
          <button 
            key={p} 
            onClick={() => onPageClick(p)}
            className={`transition-all duration-500 rounded-full relative z-10 ${activePage === p ? 'w-1.5 h-6 bg-cyan-400 shadow-[0_0_15px_cyan]' : 'w-1 h-1 bg-white/10'}`} 
          />
        ))}
      </div>
    </div>
  );
};
