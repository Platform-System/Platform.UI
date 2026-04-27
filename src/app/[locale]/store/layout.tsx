'use client';

import React from 'react';

/**
 * StoreLayout: Minimal container for the store experience.
 * Stripped of redundant legacy components (MegaMenu, SubHeader, etc.)
 * to provide a clean slate for new design implementation.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full bg-black text-white selection:bg-cyan-500 selection:text-black relative">
      {/* The Scrollable Surface */}
      <div className="h-[calc(100vh-3.5rem)] w-full overflow-y-auto no-scrollbar scroll-smooth relative z-10">
        {children}
      </div>
    </div>
  );
}
