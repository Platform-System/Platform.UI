'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: 'solar:home-smile-linear', activeIcon: 'solar:home-smile-bold' },
  { path: '/explore', label: 'Explore', icon: 'solar:compass-linear', activeIcon: 'solar:compass-bold' },
  { path: '/store', label: 'Store', icon: 'solar:cart-large-linear', activeIcon: 'solar:cart-large-bold' },
  { path: '/chat', label: 'Chat', icon: 'solar:chat-round-line-linear', activeIcon: 'solar:chat-round-line-bold' },
  { path: '/library', label: 'Library', icon: 'solar:music-library-2-linear', activeIcon: 'solar:music-library-2-bold' },
];

export default function Sidebar() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Collapsible) */}
      <aside 
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={clsx(
          "hidden md:flex flex-col glass-panel z-40 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-r border-white/5",
          isSidebarHovered ? "w-64" : "w-20"
        )}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4 text-cyan-400">
            <Icon icon="solar:infinity-bold-duotone" width="32" height="32" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <span className={clsx("text-xl font-bold tracking-tight text-white transition-opacity duration-300", isSidebarHovered ? "opacity-100" : "opacity-0 hidden")}>Nexus</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-3 space-y-2 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  "flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "text-white" 
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-100"></div>
                )}
                <div className={clsx(
                  "flex items-center justify-center shrink-0 w-8 h-8 rounded-xl transition-all duration-300",
                  isActive ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "group-hover:scale-110 group-hover:text-cyan-400"
                )}>
                  <Icon icon={isActive ? item.activeIcon : item.icon} width="24" height="24" />
                </div>
                <span className={clsx("font-medium tracking-wide transition-all duration-300 z-10 whitespace-nowrap", isSidebarHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 hidden")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[4.5rem] glass-panel z-50 flex items-center justify-around pb-safe border-t border-white/5">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {isActive && <div className="absolute top-0 w-8 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] rounded-b-full"></div>}
              <Icon 
                icon={isActive ? item.activeIcon : item.icon} 
                width="24" 
                height="24"
                className={clsx("transition-transform duration-300", isActive && "scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]")}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
