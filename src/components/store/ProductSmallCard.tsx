'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Product } from '@/types/store';

interface ProductSmallCardProps {
  product: Product;
}

/**
 * ProductSmallCard: Thẻ sản phẩm thu nhỏ dùng trong Scrolling Grid.
 * Tách biệt để dễ dàng bảo trì và tích hợp API sau này.
 */
export const ProductSmallCard = ({ product }: ProductSmallCardProps) => {
  return (
    <div className="group/card relative bg-white/5 backdrop-blur-3xl rounded-[1.5rem] border border-white/10 p-4 shadow-xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 h-[232px] flex flex-col">
      {/* Thumbnail sản phẩm */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-black mb-3">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          unoptimized 
          className="object-cover transition-transform duration-1000 group-hover/card:scale-110" 
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg text-[10px] font-black">
          ${product.price.toFixed(0)}
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <div className="text-left space-y-0.5 px-1 font-bold">
        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-cyan-400">
          {product.category}
        </span>
        <h4 className="text-[10px] font-black uppercase text-white truncate leading-tight">
          {product.name}
        </h4>
        
        {/* Rating & Interaction Button */}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5">
          <div className="flex gap-0.5 opacity-40 group-hover/card:opacity-100 transition-opacity">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} icon="solar:star-bold" className="text-cyan-400" width="8" />
              ))}
          </div>
          <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500">
             <Icon icon="solar:arrow-right-linear" width="10" />
          </div>
        </div>
      </div>
    </div>
  );
};
