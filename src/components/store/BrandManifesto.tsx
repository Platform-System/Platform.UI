'use client';

import React from 'react';
import { Icon } from '@iconify/react';

/**
 * BrandManifesto: Phiên bản "Sapphire Narrative".
 * Sử dụng màu Xanh kết hợp với phong cách Platinum Boutique.
 */
export const BrandManifesto = () => {
  return (
    <section className="relative w-full h-full bg-[#050608] flex items-center justify-center overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.03)_0%,_transparent_70%)] opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-12">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-serif italic text-cyan-400">Section IV</span>
                  <div className="h-[1px] w-12 bg-cyan-400/30" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[1em]">The Narrative</span>
                </div>
                <h2 className="text-white text-6xl md:text-7xl font-serif italic tracking-tighter leading-none">
                  A Soul in <br/>
                  <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-700">EVERY PIECE.</span>
                </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Philosophy</h4>
                   <p className="text-zinc-500 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                     Chúng tôi tin rằng món hàng hóa không chỉ là vật chất. Nó là kết tinh của hàng ngàn giờ sáng tạo, là tâm huyết của một cá nhân muốn thay đổi thế giới. 
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">The Community</h4>
                   <p className="text-zinc-500 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                     Nyxoris không chỉ là một chợ thương mại. Đây là một cộng đồng nơi những nghệ nhân tìm thấy tiếng nói chung và giá trị đích thực.
                   </p>
                </div>
             </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 flex justify-center xl:justify-end">
             <div className="relative w-full max-w-2xl h-[500px] border border-white/10 bg-white/[0.01] backdrop-blur-3xl p-12 flex flex-col justify-between group overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                
                <div className="flex justify-between items-start">
                   <Icon icon="solar:document-text-linear" width="40" className="text-cyan-400 opacity-20" />
                   <div className="text-right">
                      <span className="block text-[8px] font-black text-white/40 uppercase tracking-widest">Archive No.</span>
                      <span className="block text-xl font-serif italic text-white">#04-2024</span>
                   </div>
                </div>

                <div className="space-y-8 relative z-10">
                   <div className="text-white text-4xl font-serif italic leading-snug">
                     "In a world of mass production, we celebrate the unique, the hand-crafted, and the absolute."
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                         <Icon icon="solar:star-linear" width="20" className="text-cyan-400 animate-pulse" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">The Curation Lab</span>
                         <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Senior Curator // Nyxoris System</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
