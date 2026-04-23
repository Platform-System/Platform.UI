'use client';

import { NexusField } from './NexusField';

/**
 * StoreBackground: Nền được làm sáng hơn với các điểm nhấn Cyan và White.
 * Tích hợp trường hạt tương tác (NexusField) toàn màn hình.
 */
export const StoreBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508]">
      <NexusField />
      {/* Luồng sáng Cyan chủ đạo */}
      <div className="absolute top-[-10%] right-[-5%] w-[1200px] h-[1200px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      
      {/* Luồng sáng White tạo điểm nhấn trung tâm */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full"></div>
      
      {/* Luồng sáng Indigo bổ trợ ở góc dưới */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[900px] h-[900px] bg-indigo-500/10 blur-[180px] rounded-full"></div>
      
      {/* Overlay noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
