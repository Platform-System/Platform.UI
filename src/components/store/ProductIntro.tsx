'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

/**
 * ProductIntro: Trang giới thiệu sản phẩm (Showcase Section).
 * Hiển thị hình ảnh sản phẩm định dạng Cinematic với các hiệu ứng chuyển động cao cấp.
 */
export const ProductIntro = () => {
  return (
    <div className="relative w-full h-full bg-[#020205] flex items-center justify-center overflow-hidden">
      {/* 1. Background Image với hiệu ứng mờ ảo (Cinematic Backdrop) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-product.png" 
          alt="Nyxoris Prestige" 
          fill 
          className="object-cover opacity-50 scale-105 animate-pulse-slow" 
        />
        {/* Layer phủ gradient để làm nổi bật text */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/60 to-[#020205]" />
      </div>

      {/* 2. Nội dung chính: Căn giữa và dịch lên trên để sát Header hơn */}
      <div className="relative z-10 text-center px-6 max-w-4xl -mt-20">
        {/* Tag nhỏ giới thiệu */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-down">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Introducing</span>
        </div>
        
        {/* Tiêu đề lớn với hiệu ứng Reveal và Gradient */}
        <h1 className="text-white text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-8 leading-none animate-reveal-text">
          NYXORIS <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PRESTIGE</span>
        </h1>

        {/* Đoạn mô tả ngắn gọn, sang trọng */}
        <p className="text-zinc-400 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in">
          Trải nghiệm sự giao thoa giữa nghệ thuật chế tác và công nghệ tương lai. 
          Mỗi chi tiết đều được tối ưu hóa để mang lại cảm giác quyền năng tối thượng cho chủ sở hữu.
        </p>

        {/* Nhóm các nút tương tác (Video, Tech Specs) */}
        <div className="flex justify-center gap-10 animate-fade-up">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center group-hover:border-cyan-500 group-hover:text-cyan-400 transition-all duration-500 group-hover:scale-110">
              <Icon icon="solar:play-bold" width="22" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">Watch Film</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center group-hover:border-cyan-500 group-hover:text-cyan-400 transition-all duration-500 group-hover:scale-110">
              <Icon icon="solar:globus-linear" width="22" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">Explore Tech</span>
          </div>
        </div>
      </div>

      {/* 3. Chỉ báo cuộn xuống (Vertical Scroll Indicator) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce-slow">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-lr] rotate-180">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-cyan-400/50 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes reveal-text {
          from { clip-path: inset(0 0 100% 0); transform: translateY(50px); }
          to { clip-path: inset(0 0 0 0); transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-15px) translateX(-50%); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-text {
          animation: reveal-text 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out 0.5s forwards;
          opacity: 0;
        }
        .animate-fade-up {
          animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
          opacity: 0;
        }
        .animate-fade-down {
          animation: fade-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
