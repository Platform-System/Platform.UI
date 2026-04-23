'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

/**
 * CategoryFeature: Phiên bản "The Editorial Spotlight".
 * Đồng bộ logic với các chương MaterialCraft và BrandManifesto.
 * Sử dụng bố cục "Vật thể bên trái - Nội dung bên phải" thanh thoát.
 */
export const CategoryFeature = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const departments = [
    {
      label: 'Optic Audio',
      title: 'SOUND ARCHITECTURE.',
      desc: 'Sự giao thoa giữa độ trung thực tuyệt đối và thiết kế tối giản. Trải nghiệm âm thanh không chỉ bằng tai, mà bằng tâm hồn.',
      icon: 'solar:headphones-round-linear',
      tag: 'Section II-A'
    },
    {
      label: 'Cortex Tech',
      title: 'NEURAL HARDWARE.',
      desc: 'Công nghệ không chỉ là những con số. Đó là sự mở rộng của khả năng con người thông qua những thiết bị tinh vi nhất.',
      icon: 'solar:cpu-linear',
      tag: 'Section II-B'
    },
    {
      label: 'Ether Wear',
      title: 'FUTURE APPAREL.',
      desc: 'Chất liệu vải thông minh kết hợp với những đường cắt kiến trúc. Thời trang là lớp vỏ bọc hoàn hảo cho sự tự tin.',
      icon: 'solar:t-shirt-linear',
      tag: 'Section II-C'
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % departments.length);

  return (
    <section className="relative w-full h-full bg-[#050608] flex items-center justify-center overflow-hidden">
      
      {/* Background Soft Aurora */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.03)_0%,_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Trái: Visual Sculpture (Đồng bộ với logic Prism) */}
          <div className="lg:col-span-6 flex justify-center animate-in fade-in zoom-in-95 duration-1000">
             <div className="relative w-80 h-80 group">
                {/* Rotating Frame */}
                <div className="absolute inset-0 border border-white/5 bg-white/[0.01] backdrop-blur-3xl rotate-45 transition-transform duration-1000 group-hover:rotate-90" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                   <Icon 
                     key={activeIndex} 
                     icon={departments[activeIndex].icon} 
                     width="120" 
                     className="text-cyan-400 opacity-20 animate-in fade-in zoom-in duration-700" 
                   />
                </div>

                {/* Aurora Pulse Ring */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
             </div>
          </div>

          {/* Phải: Nội dung Editorial (Đồng bộ với MaterialCraft) */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <span className="text-[12px] font-serif italic text-cyan-400">{departments[activeIndex].tag}</span>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">{departments[activeIndex].label}</span>
              </div>
              <h2 className="text-white text-6xl md:text-7xl font-serif italic tracking-tighter leading-none animate-in fade-in slide-in-from-right-4 duration-700">
                {departments[activeIndex].title.split(' ')[0]} <br/>
                <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-800">
                  {departments[activeIndex].title.split(' ')[1]}
                </span>
              </h2>
            </div>
            
            <p className="max-w-md text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-cyan-400/20 italic">
                {departments[activeIndex].desc}
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-10 pt-4">
                <button 
                  onClick={next}
                  className="group flex items-center gap-4"
                >
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                      <Icon icon="solar:arrow-right-linear" className="text-white group-hover:text-cyan-400 transition-colors" />
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] group-hover:pl-2 transition-all">Next Collection</span>
                </button>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan { 0% { transform: translateY(-320px); } 100% { transform: translateY(320px); } }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </section>
  );
};
