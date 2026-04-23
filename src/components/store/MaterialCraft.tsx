'use client';

import React from 'react';

/**
 * MaterialCraft: Phiên bản "Aurora Atelier".
 * Kết hợp dải màu Xanh - Tím để tạo nên sự đẳng cấp vượt thời gian.
 */
export const MaterialCraft = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center bg-[#0d0e11] overflow-hidden">
      
      {/* Background Soft Aurora Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.04)_0%,_rgba(147,51,234,0.03)_50%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24">
        <div className="flex flex-col md:flex-row items-center gap-40">
          
          {/* Trái: Tác phẩm Glassmorphism trung tâm */}
          <div className="relative w-80 h-[450px] group">
             {/* Glowing Soft Frame */}
             <div className="absolute inset-0 border border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-[2px] transition-all duration-1000 group-hover:scale-105 shadow-2xl">
                {/* Thin Aurora Line */}
                <div className="absolute top-8 left-8 w-16 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500" />
                <h4 className="absolute top-12 left-8 text-[10px] font-bold text-cyan-400 tracking-[0.5em] uppercase">Material Origin</h4>
                
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 space-y-4">
                    <div className="text-white text-5xl font-serif italic opacity-10">Aurora</div>
                    <div className="h-[1px] w-full bg-white/10" />
                    <div className="text-right text-[9px] font-black text-white/40 uppercase tracking-widest leading-relaxed">
                        Bio-Optic <br/>
                        Core Structure
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 animate-pulse" />
                   <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Procedural Grade S+</span>
                </div>
             </div>
          </div>

          {/* Phải: Nội dung "Atelier" cao cấp */}
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                  <span className="text-[12px] font-serif italic text-cyan-400">Craftsmanship</span>
                  <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-400/30 to-purple-500/30" />
              </div>
              <h2 className="text-white text-7xl font-serif italic tracking-tighter leading-[0.8]">
                Eternal <br/>
                <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-700">STANDARDS.</span>
              </h2>
            </div>
            
            <p className="max-w-md text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-cyan-400/20">
                Chúng tôi không chỉ bán sản phẩm, chúng tôi lưu giữ những giá trị vượt thời gian. 
                Tại Nyxoris, tiêu chuẩn là điều không bao giờ được phép thỏa hiệp.
            </p>

            <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-2">
                    <span className="block text-2xl font-serif italic text-white leading-none tracking-widest">Heritage</span>
                    <span className="block text-[8px] font-black text-cyan-400 uppercase tracking-widest">Modern Legacy</span>
                </div>
                <div className="space-y-2">
                    <span className="block text-2xl font-serif italic text-white leading-none tracking-widest">Superior</span>
                    <span className="block text-[8px] font-black text-purple-400 uppercase tracking-widest">Marketplace King</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
