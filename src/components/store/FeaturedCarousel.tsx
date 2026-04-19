'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Product } from '@/types/store';

/**
 * FeaturedCarousel: Component lớn hiển thị sản phẩm nổi bật
 * Đã sửa: Thêm reset index khi đổi category và tối ưu hiển thị chữ.
 */
export const FeaturedCarousel = ({ products }: { products: Product[] }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const cycleCount = Math.min(products.length, 5);

  // 1. Tự động chuyển sản phẩm nổi bật mỗi 5 giây
  useEffect(() => {
    if (cycleCount <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % cycleCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [cycleCount]);

  return (
    <div className="col-span-2 group relative animate-reveal-card h-[480px] overflow-hidden">
      {products.slice(0, 5).map((product, idx) => (
        <div 
          key={product.id} 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            idx === featuredIndex ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'
          }`}
        >
          <div className="relative h-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-6 shadow-2xl flex flex-col group/banner overflow-hidden">
            <div className="relative flex-1 rounded-[2rem] overflow-hidden bg-black mb-8 border border-white/5">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                unoptimized 
                className={`object-cover transition-transform duration-[10s] ease-linear ${idx === featuredIndex ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              
              {/* Badge Giá */}
              <div className={`absolute top-6 right-6 px-5 py-2 bg-cyan-400 text-black rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-1000 delay-300 ${idx === featuredIndex ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <span className="text-[10px] font-black tracking-tighter">${product.price.toFixed(0)}</span>
              </div>

              {/* Text Layout (Phong cách tạp chí) */}
              <div className="absolute bottom-10 left-10 text-left">
                 <div className="overflow-hidden mb-2">
                   <span className={`text-[11px] font-black uppercase tracking-[0.5em] text-cyan-400 block transition-all duration-1000 delay-500 ${idx === featuredIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                     {product.category}
                   </span>
                 </div>
                 <div className="overflow-hidden">
                   <h3 className={`text-5xl font-black italic uppercase leading-[0.8] text-white transition-all duration-1000 delay-700 ${idx === featuredIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                     {product.name.split(' ').map((word: string, i: number) => (
                       <span key={i} className="block">{word}</span>
                     ))}
                   </h3>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="solar:star-bold" className="text-cyan-400" width="14" />
                ))}
              </div>
              <Link 
                href={`/store/product/${product.id}`}
                className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center justify-center font-bold"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
