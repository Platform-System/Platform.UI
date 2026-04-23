'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * LiquidAuroraCursor: Hiệu ứng chuột "Giọt sương Aurora".
 * Thay thế bầy hạt bằng một quầng sáng lỏng, co giãn và có độ trễ nghệ thuật.
 */
export const LiquidAuroraCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState<{ x: number; y: number }[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Logic tạo độ trễ (trailing) mượt mà
    const updateTrails = () => {
      setTrails(prev => {
        const newTrails = [...prev];
        newTrails.unshift({ x: mousePos.x, y: mousePos.y });
        return newTrails.slice(0, 10); // Giữ lại 10 bước di chuyển gần nhất
      });
      requestRef.current = requestAnimationFrame(updateTrails);
    };
    
    requestRef.current = requestAnimationFrame(updateTrails);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* 1. Điểm sáng chính (The Core) */}
      <div 
        className="absolute w-64 h-64 bg-cyan-400/20 blur-[80px] rounded-full transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${mousePos.x - 128}px, ${mousePos.y - 128}px)` 
        }}
      />

      {/* 2. Các quầng sáng trễ (The Liquid Trail) */}
      {trails.map((pos, i) => (
        <div 
          key={i}
          className="absolute rounded-full transition-opacity duration-500"
          style={{ 
            width: `${160 - i * 15}px`,
            height: `${160 - i * 15}px`,
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -50%)`,
            backgroundColor: i % 2 === 0 ? 'rgba(34,211,238,0.05)' : 'rgba(147,51,234,0.05)',
            blur: '60px',
            opacity: (10 - i) / 20,
            zIndex: 5-i
          }}
        />
      ))}

      {/* 3. Điểm nhấn sắc nét ở tâm (The Pearl) */}
      <div 
        className="absolute w-2 h-2 bg-white/40 rounded-full blur-[2px] transition-transform duration-150 ease-out"
        style={{ 
          transform: `translate(${mousePos.x - 4}px, ${mousePos.y - 4}px)` 
        }}
      />
    </div>
  );
};
