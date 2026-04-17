'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { PRODUCTS } from '@/data/mockData';

export default function StoreView() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-12">
      
      {/* Featured Banner - Neon Style */}
      <section className="relative w-full h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden bg-[#0a0a0f] border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80" 
          alt="Sale Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">Exclusive Drop</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Cyber Week Essentials</h1>
          <p className="text-slate-300 text-sm md:text-lg mb-8 leading-relaxed max-w-xl font-medium">Upgrade your setup with next-gen audio, minimalist accessories, and premium tech. Limited quantities available.</p>
          <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-cyan-400 hover:text-[#0a0a0f] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105">
            Shop The Drop <Icon icon="solar:arrow-right-linear" width="20" />
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Trending Drops <Icon icon="solar:flame-bold" className="text-pink-500" />
          </h2>
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-semibold shadow-sm">All</button>
            <button className="px-5 py-2 rounded-full text-slate-400 text-sm font-medium hover:text-white hover:bg-white/5 transition-colors">Audio</button>
            <button className="px-5 py-2 rounded-full text-slate-400 text-sm font-medium hover:text-white hover:bg-white/5 transition-colors">Tech</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {PRODUCTS.map(product => (
            <div key={product.id} className="group flex flex-col glass-card rounded-[1.5rem] p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] hover:border-cyan-500/30">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 mb-5">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60"></div>
                
                {/* Overlay actions */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-slate-300 hover:text-pink-500 hover:bg-white/10 transition-all border border-white/10 z-10">
                  <Icon icon="solar:heart-linear" width="20" />
                </button>
                
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{product.category}</span>
                </div>
              </div>
              
              <div className="flex flex-col flex-1 px-2 pb-2">
                <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-black tracking-tight text-white">${product.price.toFixed(2)}</span>
                  <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-cyan-400 hover:text-[#0a0a0f] transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <Icon icon="solar:cart-plus-bold" width="20" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
