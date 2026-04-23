'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

/**
 * CollectionPortal: "The Zen Threshold" version.
 * Toned for a global editorial aesthetic.
 * Cleaned version - English only.
 */
export const CollectionPortal = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      
        {/* 1. Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-400/5 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-40 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-12 md:px-24 flex flex-col items-start gap-8 md:gap-10 -translate-y-8 md:-translate-y-12">
          
          {/* Subtle Identification Label */}
          <div className="flex items-center gap-6 overflow-hidden">
             <div className="h-[1.5px] w-12 bg-gradient-to-r from-cyan-400 to-purple-500" />
             <span className="text-[10px] font-black uppercase tracking-[1em] text-white/50">Join the Ecosystem</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="flex flex-col gap-4 md:gap-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <span className="text-white text-6xl md:text-[7rem] lg:text-[8rem] font-serif italic tracking-tighter leading-none">
                The
              </span>
              <span className="font-sans font-black not-italic tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-800 uppercase text-5xl md:text-[6rem] lg:text-[7.5rem] leading-none">
                ULTIMATE.
              </span>
            </h2>
            <p className="max-w-xs text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] leading-[1.8] pl-1 transition-all duration-1000 delay-300 opacity-60">
               The peak of excellence. Explore the full catalog from the Nyxoris system and community.
            </p>
          </div>

          {/* CTA Link */}
          <Link 
            href="/store/all"
            className="group relative flex items-center gap-8 mt-4"
          >
            <div className="relative w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-700">
               <div className="absolute inset-0 rounded-full bg-cyan-400/5 scale-0 group-hover:scale-100 transition-transform duration-700" />
               <Icon icon="solar:arrow-right-linear" width="24" className="text-white group-hover:text-cyan-400 transition-all group-hover:translate-x-1" />
            </div>
            
            <div className="flex flex-col gap-1">
               <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white group-hover:tracking-[0.8em] transition-all duration-500">
                  Enter The Collection
               </span>
               <div className="h-[1px] w-0 bg-cyan-400 group-hover:w-full transition-all duration-500" />
            </div>
          </Link>
        </div>

      {/* Decorations */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full" />
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 grayscale pointer-events-none hidden lg:block">
         <div className="w-full h-full border-l border-white/5 bg-gradient-to-r from-transparent to-white/5 backdrop-blur-sm" />
      </div>
    </section>
  );
};
