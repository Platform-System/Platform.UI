'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Icon } from '@iconify/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * CSSSculpture: Các biểu tượng ý nghĩa cho mỗi chương.
 */
const CSSSculpture = ({ type }: { type: number }) => {
  if (type === 0) {
    // Meaning: "The Origin" - Sự khởi đầu của trí tuệ.
    return (
      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute inset-0 border border-cyan-400/10 rounded-full animate-spin-slow" />
        <div className="absolute inset-8 border border-purple-500/10 rounded-full animate-spin-slow [animation-direction:reverse]" />
        <div className="relative w-4 w-4 bg-white rounded-full shadow-[0_0_30px_cyan]" />
        <div className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-45" />
        <div className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45" />
      </div>
    );
  }
  if (type === 1) {
    // Meaning: "The Catalyst" - Sự kết nối và lan tỏa.
    return (
      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-white/5" />
        <div className="absolute h-full w-[1px] bg-white/5" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute border border-cyan-400/20 w-40 h-40 animate-pulse" style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
        <div className="w-12 h-12 border-2 border-purple-500 rotate-45 animate-bounce-slow" />
      </div>
    );
  }
  // Meaning: "The Zenith" - Đỉnh cao của sự tinh khiết.
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1)_0%,_transparent_70%)]" />
       <div className="relative flex flex-col gap-2">
          <div className="w-20 h-1 bg-cyan-400" />
          <div className="w-16 h-1 bg-white/20" />
          <div className="w-24 h-1 bg-purple-500" />
       </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1px] border-white/5 rounded-full animate-ping" />
    </div>
  );
};

/**
 * BannerCarousel: Phiên bản "The Anthology of Meaning".
 * Mỗi slide là một câu chuyện riêng biệt về ý nghĩa thương hiệu.
 */
export const BannerCarousel = ({ isStatic = false }: any) => {
  
  const content = [
    {
      title: "ORIGIN SOURCE",
      meaning: "Cội nguồn sáng tạo",
      desc: "Mọi sản phẩm điêu khắc số bắt đầu từ một điểm ảnh duy nhất. Chúng tôi tôn trọng sự khởi đầu thuần khiết nhất của mỗi ý tưởng.",
      label: "Chapter 01 // Genesis"
    },
    {
      title: "CATALYST GRID",
      meaning: "Mạng lưới kết nối",
      desc: "Nyxoris không chỉ là nền tảng, mà là chất xúc tác gắn kết những nghệ nhân và người sưu tầm tinh hoa trên toàn thế giới.",
      label: "Chapter 02 // Connection"
    },
    {
      title: "ZENITH POINT",
      meaning: "Đỉnh cao giám tuyển",
      desc: "Tiêu chuẩn tối thượng của sự xa xỉ nằm ở sự tinh giản. Chúng tôi lược bỏ mọi chi tiết thừa để giữ lại giá trị cốt lõi.",
      label: "Chapter 03 // Precision"
    }
  ];

  return (
    <div className="w-full h-full bg-[#050608]">
      <section className="relative w-full h-full overflow-hidden">
        
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={isStatic ? false : { delay: 7000 }}
          loop={true}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'w-8 h-[2px] bg-white/10 cursor-pointer transition-all mx-1',
            bulletActiveClass: 'bg-gradient-to-r from-cyan-400 to-purple-500 w-12'
          }}
          className="h-full w-full"
        >
          {content.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex items-center justify-between px-12 md:px-40">
                
                {/* Leftside: The Meaning Narrative */}
                <div className="relative z-20 max-w-xl space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 text-[10px] font-black uppercase tracking-[0.6em]">
                            {slide.label}
                        </span>
                        <div className="h-[1px] w-20 bg-white/10" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] italic">{slide.meaning}</h3>
                       <h2 className="text-white text-7xl md:text-8xl font-serif italic tracking-tighter leading-none uppercase">
                         {slide.title.split(' ')[0]} <br/>
                         <span className="font-sans font-black not-italic opacity-20">{slide.title.split(' ')[1]}</span>
                       </h2>
                    </div>
                  </div>

                  <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose pl-10 border-l border-cyan-400/20 italic">
                    {slide.desc}
                  </p>

                  <div className="pt-6">
                    <button className="px-10 py-4 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                      Read Manifesto
                    </button>
                  </div>
                </div>

                {/* Rightside: The Visual Metaphor */}
                <div className="relative hidden xl:flex items-center justify-center w-[45%] h-[75%]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.03)_0%,_transparent_70%)]" />
                    <div className="animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        <CSSSculpture type={index} />
                    </div>
                    
                    {/* Meta Status */}
                    <div className="absolute top-0 right-0 opacity-20">
                       <span className="text-[7px] font-bold text-white uppercase tracking-[1em] rotate-90 origin-right block">CONCEPT_ACTIVE</span>
                    </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute bottom-20 left-40 z-30 flex custom-pagination" />
      </section>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0) rotate(45deg); } 50% { transform: translateY(-20px) rotate(45deg); } }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
