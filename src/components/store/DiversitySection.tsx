'use client';

import React from 'react';
import { Icon } from '@iconify/react';

/**
 * DiversitySection: Chapter II - Diverse Shopping Experience.
 * Cleaned version - English only.
 */
export const DiversitySection = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.03)_0%,_transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-6 flex justify-center animate-in fade-in zoom-in-95 duration-1000">
             <div className="relative w-80 h-80">
                <div className="absolute inset-0 border border-cyan-400/10 rotate-12 scale-110" />
                <div className="absolute inset-0 border border-purple-500/10 -rotate-12 scale-105" />
                <div className="absolute inset-8 border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center">
                   <Icon icon="solar:globus-linear" width="80" className="text-cyan-400 opacity-20" />
                </div>
                
                {/* Product Tags floating */}
                <div className="absolute -top-4 -right-10 bg-zinc-900 border border-white/5 px-4 py-2 text-[8px] font-black tracking-widest text-white/40 uppercase">
                   OFFICIAL_STOCK
                </div>
                <div className="absolute bottom-10 -left-10 bg-zinc-900 border border-white/5 px-4 py-2 text-[8px] font-black tracking-widest text-cyan-400/40 uppercase">
                   COMMUNITY_MARKET
                </div>
             </div>
          </div>

          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <span className="text-[12px] font-serif italic text-cyan-400">Boundless Variety</span>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">PLATFORM</span>
              </div>
              <h2 className="text-white text-6xl md:text-7xl font-serif italic tracking-tighter leading-none">
                Diversity <br/>
                <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-700">UNLIMITED.</span>
              </h2>
            </div>
            
            <p className="max-w-md text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-cyan-400/20 italic">
                Access a vast library of cross-service assets, ready to be deployed into your individual ecosystem.
            </p>

            <div className="flex items-center gap-6 pt-4">
               <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-purple-950 opacity-50" />
                    </div>
                  ))}
               </div>
               <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">2,500+ Active Listings</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
