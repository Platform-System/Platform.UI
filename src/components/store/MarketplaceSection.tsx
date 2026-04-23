'use client';

import React from 'react';
import { Icon } from '@iconify/react';

/**
 * MarketplaceSection: Chapter III - Trading Platform.
 * Cleaned version - English only.
 */
export const MarketplaceSection = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(147,51,234,0.03)_0%,_transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <span className="text-[12px] font-serif italic text-purple-400">World-Class Services</span>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">Creator</span>
              </div>
              <h2 className="text-white text-6xl md:text-7xl font-serif italic tracking-tighter leading-none">
                Fluid <br/>
                <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">MARKETPLACE.</span>
              </h2>
            </div>
            
            <p className="max-w-md text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-purple-500/20 italic">
                Experience a seamless, real-time trading hub designed for the next generation of digital assets.
            </p>

            <div className="flex items-center gap-10">
               <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  Join Marketplace
               </button>
               <div className="space-y-1">
                  <div className="text-white text-sm font-black tracking-widest">10k+ Creators</div>
                  <div className="text-zinc-600 text-[8px] font-bold uppercase tracking-[0.3em]">Secure Transactions Only</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6 animate-in fade-in slide-in-from-right-10 duration-1000">
             {/* Abstract Marketplace Visuals */}
             <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-4 group hover:bg-purple-500/5 transition-colors">
                     <Icon icon="solar:tag-horizontal-linear" width="40" className="text-purple-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                     <span className="text-[7px] font-black tracking-[0.5em] text-white/20 uppercase">Smart_Listing</span>
                  </div>
                  <div className="aspect-square border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-4 group hover:bg-cyan-500/5 transition-colors">
                     <Icon icon="solar:users-group-two-rounded-linear" width="40" className="text-cyan-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                     <span className="text-[7px] font-black tracking-[0.5em] text-white/20 uppercase">Global_Reach</span>
                  </div>
             </div>
             <div className="h-40 border border-white/5 bg-gradient-to-r from-purple-500/5 to-transparent flex items-center px-10 gap-6">
                  <div className="w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center">
                     <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-[8px] font-black tracking-[0.6em] text-white/40 uppercase leading-loose">Live Marketplace Syncing...</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
