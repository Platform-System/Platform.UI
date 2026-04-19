'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BannerCarousel } from './BannerCarousel';

/**
 * SplitBannerReveal: Hiệu ứng banner tách đôi khi cuộn trang.
 * Mô tả: Banner sẽ bị chia làm 2 nửa trái/phải và dạt sang hai bên khi người dùng cuộn chuột, 
 * tiết lộ dần nội dung nằm ở lớp phía sau.
 */
export const SplitBannerReveal = () => {
  // Trạng thái tiến trình cuộn (từ 0 đến 1)
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Tính toán phần trăm đã cuộn qua Section này
      // 0: Bắt đầu cuộn tới, 1: Đã cuộn qua hết
      const progress = Math.min(Math.max(-top / (height - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-black">
      {/* The Split Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Left Half */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-full z-20 overflow-hidden transition-transform duration-100 ease-out"
          style={{ transform: `translateX(-${scrollProgress * 100}%)` }}
        >
          <div className="w-[100vw] h-full translate-x-0">
            <BannerCarousel isStatic />
          </div>
        </div>

        {/* Right Half */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full z-20 overflow-hidden transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${scrollProgress * 100}%)` }}
        >
          <div className="w-[100vw] h-full -translate-x-1/2">
            <BannerCarousel isStatic />
          </div>
        </div>

        {/* Content reveal from center (optional decorative text or logo) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
           <div 
             className="text-white text-4xl font-black italic tracking-widest transition-all duration-700"
             style={{ 
               opacity: scrollProgress > 0.1 ? 1 : 0,
               scale: 0.8 + (scrollProgress * 0.2)
             }}
           >
             NYXORIS
           </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
