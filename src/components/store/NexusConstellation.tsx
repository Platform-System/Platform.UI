'use client';

import React, { useEffect, useRef } from 'react';

/**
 * NexusConstellation: Hiệu ứng "Mạng lưới kết nối".
 * Các điểm nút (Nodes) sẽ liên kết với nhau bằng những sợi tơ ánh sáng khi ở gần chuột.
 */
export const NexusConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Node[] = [];
    let mouse = { x: -1000, y: -1000, radius: 250 };
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Tự do trôi
        this.x += this.vx;
        this.y += this.vy;

        // Va chạm biên
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Tương tác chuột: Đẩy hạt ra xa một chút
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
           const force = (mouse.radius - distance) / mouse.radius;
           this.x -= dx * force * 0.05;
           this.y -= dy * force * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      for (let i = 0; i < Math.min(count, 120); i++) {
        particles.push(new Node());
      }
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Chỉ nối dây khi ở gần chuột hoặc gần nhau
          const distToMouse = Math.sqrt(Math.pow(particles[i].x - mouse.x, 2) + Math.pow(particles[i].y - mouse.y, 2));

          if (distance < 120 && distToMouse < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
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
    <canvas ref={canvasRef} className="fixed inset-0 z-[5] pointer-events-none opacity-50" />
  );
};
