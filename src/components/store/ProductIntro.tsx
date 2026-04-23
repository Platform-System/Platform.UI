'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

/**
 * ProductIntro: Chapter I - Introducing the Nyxoris Era.
 * Updated version - Multi-language support enabled.
 */
export const ProductIntro = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState<any[]>([]);
  const t = useTranslations('Hero');

  useEffect(() => {
    // Generate random points only on client side to avoid hydration mismatch
    const newPoints = [...Array(6)].map((_, i) => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      delay: `${i * 1.5}s`
    }));
    setPoints(newPoints);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      
      {/* Background: Digital Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.05)_0%,_transparent_70%)] opacity-60" />
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full h-full max-w-[1500px] mx-auto px-12 md:px-24 flex flex-col justify-center gap-16 select-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Manifesto */}
            <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.8em]">{t('ecosystem')}</span>
                        <div className="h-[1px] w-12 bg-white/10" />
                    </div>
                    <h1 className="text-white text-6xl md:text-8xl lg:text-[7rem] font-serif italic tracking-tighter leading-[0.85]">
                      {t('imagine')} <br/>
                      <span className="font-sans font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">{t('future')}</span>
                    </h1>
                </div>
                
                <p className="max-w-md text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-cyan-500/20 italic">
                    {t('description')}
                </p>

                <div className="flex items-center gap-10 pt-4 cursor-pointer group">
                    <div className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest group-hover:bg-cyan-400 transition-all">
                       {t('getStarted')}
                    </div>
                    <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                       <span className="text-[9px] font-black uppercase tracking-widest">{t('viewDocs')}</span>
                       <Icon icon="solar:alt-arrow-right-linear" />
                    </div>
                </div>
            </div>

            {/* Right: The Nexus Core */}
            <div 
              className="lg:col-span-5 hidden lg:flex justify-center transition-transform duration-1000"
              style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            >
                <div className="relative w-96 h-96 flex items-center justify-center">
                   <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow" />
                   <div className="absolute inset-10 border border-cyan-400/10 rounded-full animate-spin-slow [animation-direction:reverse]" />
                   
                   <div className="relative w-48 h-48 border border-white/10 bg-zinc-950/50 backdrop-blur-3xl flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                         <div className="flex gap-1">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse [animation-delay:0.5s]" />
                         </div>
                         <Icon icon="solar:link-circle-linear" width="60" className="text-white/20" />
                         <span className="text-[7px] font-black text-white/40 tracking-[0.5em] uppercase">LINKED_SYSTEM</span>
                      </div>
                   </div>

                   {/* Floating Datapoints */}
                   {points.map((p, i) => (
                     <div 
                       key={i} 
                       className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float shadow-[0_0_10px_cyan]" 
                       style={{ 
                         top: p.top, 
                         left: p.left,
                         animationDelay: p.delay
                       }} 
                     />
                   ))}
                </div>
            </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); opacity: 0.2; } 50% { transform: translateY(-30px); opacity: 1; } }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};
