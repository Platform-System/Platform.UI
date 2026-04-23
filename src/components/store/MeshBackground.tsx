'use client';

import React from 'react';

/**
 * MeshBackground: Tạo một lớp nền mây màu (Mesh Gradient) sống động.
 * Mang lại vẻ đẹp hiện đại, rực rỡ và cao cấp cho các Section.
 */
export const MeshBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-black">
      {/* Các khối màu loang (Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob-move" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[120px] animate-blob-move [animation-delay:2s]" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] animate-blob-move [animation-delay:4s]" />
      <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[100px] animate-blob-move [animation-delay:6s]" />

      {/* Lớp Texture hạt mịn (Noise) */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]" />
      
      <style jsx>{`
        @keyframes blob-move {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 10%) scale(1.2); }
          66% { transform: translate(-10%, 5%) scale(0.9); }
        }
        .animate-blob-move {
          animation: blob-move 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
