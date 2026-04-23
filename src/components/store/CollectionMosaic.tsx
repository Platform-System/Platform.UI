'use client';

import React from 'react';
import { Icon } from '@iconify/react';

/**
 * CollectionMosaic: Phiên bản "The Visual Departments".
 * Thêm hình ảnh cao cấp vào các mảnh ghép để tăng tính trực quan và sang trọng.
 */
export const CollectionMosaic = () => {
  const categories = [
    { 
      id: 'audio', 
      label: 'Optic Audio', 
      detail: 'Pure Sound Engineering', 
      width: 'col-span-12 md:col-span-7',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80' // High-end Headphones
    },
    { 
      id: 'tech', 
      label: 'Cortex Tech', 
      detail: 'Advanced Neural Hardware', 
      width: 'col-span-12 md:col-span-5',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1000&q=80' // Future CPU/Component
    },
    { 
      id: 'wear', 
      label: 'Ether Wear', 
      detail: 'Minimalist Tech-Apparel', 
      width: 'col-span-12 md:col-span-5',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&q=80' // Techwear Model
    },
    { 
      id: 'home', 
      label: 'Atelier Home', 
      detail: 'Architectural Artifacts', 
      width: 'col-span-12 md:col-span-7',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1000&q=80' // Minimalist Interior/Object
    },
  ];

  return (
    <section className="relative w-full h-full bg-[#050608] flex items-center justify-center overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.02)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-12 md:px-24 space-y-12">
        
        <div className="flex flex-col gap-2">
           <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[1em]">Chapter 02</span>
           <h2 className="text-white text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">
             Explore <span className="font-sans font-black not-italic opacity-30 uppercase">Departments.</span>
           </h2>
        </div>

        {/* Mosaic Grid with Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
           {categories.map((cat, index) => (
             <div 
               key={cat.id} 
               className={`${cat.width} group relative h-64 md:h-72 border border-white/5 bg-zinc-950 overflow-hidden cursor-pointer transition-all duration-700 animate-in fade-in zoom-in-95`}
               style={{ animationDelay: `${index * 150}ms` }}
             >
                {/* 1. Background Image (Ken Burns on Hover) */}
                <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
                   <img 
                     src={cat.image} 
                     alt={cat.label} 
                     className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700 grayscale-[0.8] group-hover:grayscale-0" 
                   />
                </div>

                {/* 2. Glass Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
                
                {/* 3. Content */}
                <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <h3 className="text-white text-xl font-serif italic group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{cat.label}</h3>
                         <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{cat.detail}</p>
                      </div>
                      <div className="w-10 h-10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                         <Icon icon="solar:arrow-right-up-linear" className="text-cyan-400" width="18" />
                      </div>
                   </div>

                   {/* Footer Status Line */}
                   <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700 origin-left" />
                </div>

                {/* Cyber Scanner Mesh (Overlay on Hover) */}
                <div className="absolute inset-0 z-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03] pointer-events-none" />
             </div>
           ))}
        </div>

        <div className="flex justify-center pt-4">
           <div className="flex items-center gap-6 opacity-20">
              <div className="h-[1px] w-20 bg-white" />
              <span className="text-[8px] font-bold text-white uppercase tracking-[1em]">Nyxoris_System_Archive</span>
              <div className="h-[1px] w-20 bg-white" />
           </div>
        </div>
      </div>
    </section>
  );
};
