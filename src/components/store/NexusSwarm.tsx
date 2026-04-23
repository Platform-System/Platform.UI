'use client';

import React, { useEffect, useRef } from 'react';

/**
 * NexusSwarm: Phiên bản "Hyper-Visible".
 * Tăng cường độ sáng, kích thước và lực hút để hiệu ứng rõ nét như Antigravity.
 */
export const NexusSwarm = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1; // Hạt to hơn (1px - 3.5px)
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.baseAlpha = Math.random() * 0.6 + 0.3; // Sáng hơn
        
        const colors = ['#22d3ee', '#818cf8', '#ffffff', '#c084fc'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (mouse.x !== -1000) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 500) {
            // Lực hút mạnh hơn (Factor 0.5 thay vì 0.1)
            const force = (500 - distance) / 1000;
            this.vx += dx * force * 0.08;
            this.vy += dy * force * 0.08;
          }
        }

        // Ma sát nhẹ để bay lượn tự nhiên
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Hiệu ứng phát sáng nhẹ cho mỗi hạt
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.baseAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      // Tăng số lượng hạt lên (250 hạt)
      for (let i = 0; i < 250; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Tạo hiệu ứng "đuôi" (motion trail) bằng cách không xóa hoàn toàn canvas
      ctx.fillStyle = 'rgba(5, 5, 8, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[5] pointer-events-none opacity-80"
    />
  );
};
