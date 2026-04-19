'use client';

import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

/**
 * HeroBanner: Phiên bản banner tĩnh với hiệu tượng theo dõi chuột (Mouse Tracking).
 * Tạo cảm giác chiều sâu (Parallax) khi người dùng di chuyển chuột trên màn hình.
 */
export const HeroBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Logic theo dõi vị trí chuột để cập nhật biến CSS (--mouse-x, --mouse-y)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      container.style.setProperty('--mouse-x', x.toString());
      container.style.setProperty('--mouse-y', y.toString());
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-[#020205]"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      {/* 1. Lớp ánh sáng nền: Di chuyển theo tỷ lệ chuột */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full transition-transform duration-1000 ease-out"
          style={{
            top: 'calc(var(--mouse-y) * 20% - 10%)',
            left: 'calc(var(--mouse-x) * 20% - 10%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] bg-purple-600/15 blur-[120px] rounded-full transition-transform duration-700 ease-out"
          style={{
            bottom: 'calc(var(--mouse-y) * -20% + 90%)',
            right: 'calc(var(--mouse-x) * -20% + 90%)',
            transform: 'translate(50%, 50%)',
          }}
        />
      </div>

      {/* Background Text: BEYOND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <h2 
          className="text-[25vw] font-black text-white/[0.03] uppercase tracking-[-0.05em] leading-none animate-reveal-bg"
          style={{
            transform: 'translate(calc(var(--mouse-x) * 20px - 10px), calc(var(--mouse-y) * 20px - 10px))',
          }}
        >
          BEYOND
        </h2>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="overflow-hidden mb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-cyan-400/80 animate-slide-up opacity-0 [animation-fill-mode:forwards]">
            Nyx's Radiance
          </p>
        </div>

        <h1 className="text-6xl md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.85] flex flex-col items-center">
          <span className="inline-block animate-reveal-text opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 relative group">
              IMAGINE
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
            </span>
          </span>
          <span className="inline-block animate-reveal-text opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms] italic font-light mt-[-0.1em] relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] animate-pulse-glow">
              The Future.
            </span>
          </span>
        </h1>

        <div className="max-w-xl overflow-hidden mb-12">
          <p className="text-zinc-400 text-sm md:text-lg font-medium leading-relaxed animate-slide-up opacity-0 [animation-fill-mode:forwards] [animation-delay:600ms]">
            Step into a world where technology becomes invisible and elegance becomes absolute. 
            Experience the next generation of sensory hardware.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:800ms]">
          <button className="group relative px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Start Exploring</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button className="group px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/30 backdrop-blur-xl active:scale-95 flex items-center gap-2">
            Collection
            <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Bottom Left Link */}
      <div className="absolute bottom-12 left-12 z-20 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:1000ms]">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-md hover:bg-white/5">
          <span className="text-sm font-black group-hover:text-cyan-400 transition-colors pt-0.5 tracking-tighter">NX</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes reveal-bg {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 0.03; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes reveal-text {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(34,211,238,0.3)); }
          50% { filter: drop-shadow(0 0 30px rgba(34,211,238,0.6)); }
        }
        .animate-reveal-bg {
          animation: reveal-bg 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-reveal-text {
          animation: reveal-text 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s infinite ease-in-out;
        }
      `}</style>

    </section>
  );
};
