'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        Welcome to Nexus 
      </h1>
      <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
        This is your new Home page. You can customize this layout to show your project overview, 
        dashboard, or any landing content you like!
      </p>
      <div className="mt-10 flex gap-4">
        <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20">
          Get Started
        </button>
        <button className="px-8 py-3 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white rounded-full font-bold transition-all">
          Documentation
        </button>
      </div>
    </div>
  );
}
