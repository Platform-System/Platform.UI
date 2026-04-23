'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
  opacity?: number;
}

/**
 * BackgroundSlider: Một thành phần trượt ảnh nền tự động với hiệu ứng Cross-fade.
 * Dùng để làm nền cho các Section, tạo cảm giác chuyển động mượt mà.
 */
export const BackgroundSlider = ({ 
  images, 
  interval = 5000,
  opacity = 0.5 
}: BackgroundSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img}
            alt={`Slide ${idx}`}
            fill
            unoptimized
            className={`object-cover transition-transform duration-[10000ms] ${
              idx === currentIndex ? 'scale-110' : 'scale-100'
            }`}
            style={{ opacity }}
          />
        </div>
      ))}
      {/* Overlay gradient để text luôn đọc được */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
    </div>
  );
};
