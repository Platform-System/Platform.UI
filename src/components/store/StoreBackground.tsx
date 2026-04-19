'use client';

import React from 'react';

/**
 * StoreBackground: Thành phần quản lý hiệu ứng thị giác nền cho Store.
 * Bao gồm: Các đốm sáng gradient (Cosmic), Noise Texture (độ nhiễu cao cấp) và Animation nhịp thở.
 */
export const StoreBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Luồng sáng Indigo bên trái */}
      <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/5 blur-[180px] rounded-full animate-pulse-slow"></div>
      
      {/* Luồng sáng Purple bên phải */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full"></div>
      
      {/* Overlay noise tạo cảm giác texture cao cấp */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
