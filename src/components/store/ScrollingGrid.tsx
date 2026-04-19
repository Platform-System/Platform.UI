'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ProductSmallCard } from './ProductSmallCard';
import { Product } from '@/types/store';
import { GridPagination } from './GridPagination';
import { GridScrollIndicator } from './GridScrollIndicator';

/**
 * ScrollingGrid: Lưới sản phẩm nhỏ bên phải (3x2)
 * Đã tối ưu bằng cách tách thẻ sản phẩm ra component ProductSmallCard riêng.
 */
export const ScrollingGrid = ({ products }: { products: Product[] }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [isDraggingDots, setIsDraggingDots] = useState(false);

  // Bỏ qua sản phẩm dành cho Featured
  const displayProducts = products.length > 1 ? products.slice(1) : [];
  const totalPages = Math.max(1, Math.ceil(displayProducts.length / 6));

  // Tự động cuộn trang sau 15 giây
  useEffect(() => {
    const timer = setInterval(() => {
      if (gridRef.current && !isDraggingDots && totalPages > 1) {
        const next = (activePage + 1) % totalPages;
        gridRef.current.scrollTo({ top: next * gridRef.current.clientHeight, behavior: 'smooth' });
        setActivePage(next);
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [activePage, totalPages, isDraggingDots]);

  const handleGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isDraggingDots) return;
    setActivePage(Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight));
  };

  const handleDotsDrag = useCallback((clientY: number) => {
    if (!dotsContainerRef.current || !gridRef.current) return;
    const rect = dotsContainerRef.current.getBoundingClientRect();
    const target = Math.min(totalPages - 1, Math.floor(((clientY - rect.top) / rect.height) * totalPages));
    if (target !== activePage) {
      gridRef.current.scrollTo({ top: target * gridRef.current.clientHeight, behavior: 'auto' });
      setActivePage(target);
    }
  }, [totalPages, activePage]);

  const handlePageClick = (p: number) => {
    gridRef.current?.scrollTo({ top: p * (gridRef.current.clientHeight), behavior: 'smooth' });
    setActivePage(p);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => isDraggingDots && handleDotsDrag(e.clientY);
    const onUp = () => setIsDraggingDots(false);
    if (isDraggingDots) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDraggingDots, handleDotsDrag]);

  return (
    <div className="col-span-4 h-[480px] relative group/grid flex flex-row-reverse gap-8 pr-8">
       {/* 1. THANH CHẤM ĐIỀU HƯỚNG DỌC (ĐÃ TÁCH NHỎ) */}
       <GridPagination 
         {...{ totalPages, activePage, isDraggingDots, setIsDraggingDots, dotsContainerRef, handleDotsDrag }} 
         onPageClick={handlePageClick}
       />

       {/* 2. LƯỚI SẢN PHẨM PHÂN TRANG */}
       <div 
         ref={gridRef}
         onScroll={handleGridScroll}
         className="flex-1 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory overscroll-contain"
       >
          <div className="flex flex-col gap-4 pb-20">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const pageProducts = displayProducts.slice(pageIdx * 6, (pageIdx + 1) * 6);
              return (
                <div key={pageIdx} className="snap-start snap-always h-full grid grid-cols-3 gap-4 shrink-0">
                  {pageProducts.map((product) => (
                    <ProductSmallCard key={product.id} product={product} />
                  ))}
                  
                  {/* Ô trống placeholder (Next Slot) */}
                  {pageProducts.length < 6 && Array.from({ length: 6 - pageProducts.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-[232px] rounded-[1.5rem] border border-white/5 bg-white/[0.02] border-dashed flex items-center justify-center opacity-50">
                       <span className="text-[8px] font-black uppercase tracking-widest text-zinc-800 italic">Next Slot</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
       </div>

       {/* 3. CHỈ BÁO TỰ ĐỘNG CUỘN (ĐÃ TÁCH NHỎ) */}
       <GridScrollIndicator />
    </div>
  );
};
