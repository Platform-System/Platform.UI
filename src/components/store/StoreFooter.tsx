'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { FOOTER_LINKS } from '@/data/mockData';

/**
 * StoreFooter: Chân trang thiết kế theo phong cách tối giản cao cấp.
 */
export const StoreFooter = () => {
  return (
    <footer className="w-full flex items-center bg-black border-t border-white/5 px-10 z-30 py-20 lg:py-0 h-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Cột 1 & 2: Brand Identity */}
        <div className="lg:col-span-2 space-y-6">
          <h4 className="text-4xl font-black tracking-tighter uppercase italic">NYX<span className="text-cyan-400">ORIS</span></h4>
          <p className="text-zinc-500 max-w-sm uppercase text-[9px] font-bold tracking-[0.2em] leading-loose italic">
            Experience the intersection of machine precision and human aspiration. 
            Redefining the digital atelier through systemic excellence.
          </p>
        </div>

        {/* Cột 3: Liên kết hệ thống */}
        <div className="space-y-4">
          <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-white">System</h5>
          <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {FOOTER_LINKS.system.map((link) => (
              <li key={link.label} className="hover:text-cyan-400 cursor-pointer transition-colors">
                {link.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Social & Copyright */}
        <div className="space-y-4 lg:text-right">
          <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Social</h5>
          <ul className="flex lg:justify-end gap-5 text-zinc-500">
            {FOOTER_LINKS.social.map((item, idx) => (
               <Icon key={idx} icon={item.icon} width="24" className="hover:text-white cursor-pointer transition-colors" />
            ))}
          </ul>
          <p className="text-[8px] text-zinc-800 font-black uppercase tracking-[0.2em] mt-10">
            © 2026 NYXORIS Systems. <br/>All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
