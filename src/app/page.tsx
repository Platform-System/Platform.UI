'use client';

import React from 'react';

/**
 * HomePage: Trang chào mừng chính của ứng dụng NYXORIS.
 * Sử dụng Typography đậm nét và dải màu Gradient đặc trưng.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* 1. Tiêu đề lớn với hiệu ứng Gradient Text */}
      <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-indigo-600 bg-clip-text text-transparent uppercase tracking-tighter">
        Welcome to NYXORIS
      </h1>
      
      {/* 2. Slogan với hiệu ứng nhịp thở (Pulse) */}
      <p className="text-xs font-black uppercase tracking-[0.6em] text-zinc-500 mb-8 animate-pulse">
        Nyx&apos;s Radiance
      </p>

      {/* 3. Đoạn giới thiệu triết lý thương hiệu */}
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
        Experience the intersection of machine precision and human aspiration. 
        Explore our curated digital atelier and connect with the community.
      </p>
      <div className="mt-10 flex gap-4">
        <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20">
          Get Started
        </button>
        <button className="px-8 py-3 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-full font-bold transition-all">
          Documentation
        </button>
      </div>
    </div>
  );
}
