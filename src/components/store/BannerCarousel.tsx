'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Icon } from '@iconify/react';
import { BANNER_SLIDES } from '@/data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerCarouselProps {
  isStatic?: boolean;
  slides?: typeof BANNER_SLIDES;
}

/**
 * BannerCarousel: Thành phần hiển thị dãy banner trượt tự động (Hero Slider).
 * Sử dụng thư viện Swiper để tạo hiệu ứng chuyển cảnh mượt mà và hỗ trợ Video nền.
 */
export const BannerCarousel = ({ isStatic = false, slides = BANNER_SLIDES }: BannerCarouselProps) => {
  return (
    <div className="w-full h-full">
      {/* 1. Container chính của Carousel, có bóng đổ và bo góc nhẹ */}
      <section className={`relative w-full h-full overflow-hidden group/carousel bg-black shadow-2xl ${isStatic ? 'pointer-events-none' : ''}`}>
        
        {/* Swiper: Cấu hình tự động chạy, phân trang và điều hướng */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={isStatic ? false : {
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={!isStatic}
          allowTouchMove={!isStatic}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'w-1.5 h-1.5 rounded-full bg-white/30 cursor-pointer transition-all',
            bulletActiveClass: 'bg-white w-6'
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full flex items-center justify-center text-center">
                {/* 2. Lớp Video Background: Hiển thị video chất lượng cao làm nền */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                </div>

                {/* 3. Nội dung văn bản (Content Overlay): Tiêu đề, mô tả và nút bấm */}
                <div className="relative z-20 container mx-auto px-6 max-w-3xl flex flex-col items-center">
                  <span className="text-white text-[10px] md:text-sm font-black uppercase tracking-[0.5em] mb-4 block animate-fade-down opacity-80">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-white text-5xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase animate-fade-up leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/70 text-xs md:text-base font-medium mb-10 max-w-xl leading-relaxed animate-fade-in px-4">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center animate-fade-up-slow">
                    <button className="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 uppercase text-[11px] tracking-tighter">
                      {slide.cta1}
                    </button>
                    <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-full hover:bg-white/20 transition-all hover:scale-105 active:scale-95 uppercase text-[11px] tracking-tighter">
                      {slide.cta2}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {!isStatic && (
          <>
            {/* Pagination Dots (Bottom Center) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 custom-pagination" />

            {/* Navigation Controls (Bottom Right) */}
            <div className="absolute bottom-6 right-8 z-30 flex items-center gap-3 scale-90 md:scale-100">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer swiper-button-prev-custom">
                <Icon icon="solar:alt-arrow-left-linear" width="20" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer swiper-button-next-custom">
                <Icon icon="solar:alt-arrow-right-linear" width="20" />
              </button>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg flex items-center justify-center text-white cursor-pointer ml-2">
                 <Icon icon="solar:pause-bold" width="14" />
              </div>
            </div>
          </>
        )}
      </section>

      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-down { animation: fade-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-fade-up-slow { animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }

        .custom-pagination .swiper-pagination-bullet {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
};
