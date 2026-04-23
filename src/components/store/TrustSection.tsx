'use client';

import React from 'react';
import { Icon } from '@iconify/react';

/**
 * TrustSection: Chapter IV - Safety and Convenience.
 * Cleaned version - English only.
 */
export const TrustSection = () => {
  const features = [
    { icon: 'solar:shield-check-linear', label: 'AI_SECURED' },
    { icon: 'solar:verified-check-linear', label: 'IDENTITY_TRUST' },
    { icon: 'solar:heart-angle-linear', label: 'NYX_AUTHENTIC' },
  ];

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Soft Linear Aurora */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent shadow-[0_0_100px_rgba(34,211,238,0.1)]" />
      
      <div className="relative z-10 w-full max-w-7xl px-12 md:px-24 text-center space-y-16">
        
        <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-zinc-800" />
                <span className="text-[12px] font-serif italic text-cyan-400">Secure & Fluid</span>
                <div className="h-[1px] w-8 bg-zinc-800" />
            </div>
            <h2 className="text-white text-6xl md:text-8xl font-serif italic tracking-tighter leading-[1.1]">
              Trust <br/>
              <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-600">
                REDEFINED.
              </span>
            </h2>
        </div>

        <p className="mx-auto max-w-2xl text-zinc-500 text-[11px] font-bold uppercase tracking-[0.4em] leading-relaxed italic opacity-80">
            Providing a reliable environment through advanced security measures and streamlined transactions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
            {features.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group animate-in fade-in slide-in-from-bottom-10 duration-1000" style={{ animationDelay: `${i * 200}ms` }}>
                  <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01] group-hover:border-cyan-400/20 transition-colors">
                     <Icon icon={item.icon} width="32" className="text-cyan-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[9px] font-black text-white/40 tracking-[0.5em] uppercase group-hover:text-white transition-colors">{item.label}</span>
              </div>
            ))}
        </div>

      </div>

    </section>
  );
};
