'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

export default function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx(
      "fixed z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] glass-card flex flex-col overflow-hidden",
      "md:bottom-8 md:right-8 md:rounded-3xl md:w-[340px]", 
      "bottom-[4.5rem] left-0 right-0 w-full rounded-t-3xl md:rounded-b-3xl border-x-0 md:border-x border-b-0 md:border-b", 
      isExpanded ? "h-[320px]" : "h-[84px]"
    )}>
      
      {/* Compact View / Header */}
      <div 
        className="flex items-center justify-between px-5 h-[84px] shrink-0 cursor-pointer hover:bg-white/5 transition-colors relative group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Animated gradient border on playing */}
        {isPlaying && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-30 animate-pulse pointer-events-none"></div>}

        <div className="flex items-center gap-4 overflow-hidden z-10">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover:shadow-cyan-500/20 transition-all">
            <img 
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80" 
              alt="Album Art" 
              className={clsx("w-full h-full object-cover transition-transform duration-1000", isPlaying && "scale-110")}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Icon icon={isExpanded ? "solar:alt-arrow-down-linear" : "solar:alt-arrow-up-linear"} className="text-white drop-shadow-md" width="24" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white truncate tracking-tight group-hover:text-cyan-400 transition-colors">Neon Nights</span>
            <span className="text-xs text-slate-400 truncate mt-0.5">Synthwave Collective</span>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10" onClick={e => e.stopPropagation()}>
          {/* Audio Waveform animation when playing */}
          <div className={clsx("hidden sm:flex items-end h-4 gap-0.5 mr-2", isPlaying ? "opacity-100" : "opacity-0")}>
            {[1,2,3,4].map(i => (
              <div key={i} className="w-1 bg-cyan-400 rounded-t-sm animate-waveform"></div>
            ))}
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Icon icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} width="24" height="24" />
          </button>
        </div>
      </div>

      {/* Expanded Controls */}
      <div className={clsx("px-6 pb-6 flex flex-col justify-end flex-1 transition-all duration-500 relative", isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
        
        {/* Large Album Art blur bg */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80')] bg-cover bg-center blur-xl"></div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress relative">
            <div className="w-[45%] h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full group-hover/progress:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity transform scale-0 group-hover/progress:scale-100 duration-200"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400">1:24</span>
            <span className="text-[10px] font-medium text-slate-400">3:45</span>
          </div>
        </div>

        {/* Playback Actions */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button className="text-slate-400 hover:text-white transition-colors hover:scale-110 duration-200"><Icon icon="solar:shuffle-bold" width="24" /></button>
          <button className="text-slate-200 hover:text-white transition-colors hover:scale-110 duration-200"><Icon icon="solar:skip-previous-bold" width="32" /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 flex items-center justify-center bg-white text-slate-900 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            <Icon icon={isPlaying ? "solar:pause-bold" : "solar:play-bold"} width="32" />
          </button>
          <button className="text-slate-200 hover:text-white transition-colors hover:scale-110 duration-200"><Icon icon="solar:skip-next-bold" width="32" /></button>
          <button className="text-slate-400 hover:text-cyan-400 transition-colors hover:scale-110 duration-200"><Icon icon="solar:repeat-bold" width="24" /></button>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center justify-between text-slate-400 pt-4 border-t border-white/10">
          <button className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-xs font-medium"><Icon icon="solar:devices-linear" width="20" /> Mac Studio</button>
          <div className="flex items-center gap-4">
            <button className="hover:text-pink-500 transition-colors"><Icon icon="solar:heart-linear" width="22" /></button>
            <button className="hover:text-white transition-colors"><Icon icon="solar:playlist-minimalistic-2-linear" width="22" /></button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
