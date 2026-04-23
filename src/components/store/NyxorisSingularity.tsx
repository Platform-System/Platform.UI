'use client';

import React, { useEffect, useRef } from 'react';

/**
 * NyxorisSingularity: Hiệu ứng "Lõi năng lượng" siêu cường.
 * Mô phỏng một quả cầu hạt 3D (Spherical Swarm) bao quanh con trỏ chuột.
 * Mạnh mẽ, rực rỡ và mang đầy năng lượng kỹ thuật số.
 */
export const NyxorisSingularity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let rotationX = 0;
    let rotationY = 0;
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      theta: number; // Góc ngang
      phi: number;   // Góc dọc
      radius: number;
      size: number;
      color: string;
      speed: number;

      constructor() {
        this.theta = Math.random() * Math.PI * 2;
        this.phi = Math.acos((Math.random() * 2) - 1);
        this.radius = 120 + Math.random() * 30; // Độ dày của lớp vỏ cầu
        this.size = Math.random() * 2 + 0.5;
        this.speed = (Math.random() - 0.5) * 0.02;
        
        const colors = ['#22d3ee', '#818cf8', '#c084fc', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw(mx: number, my: number) {
        if (!ctx) return;

        // Cập nhật rotation
        this.theta += this.speed;

        // Chuyển đổi tọa độ cầu 3D sang 2D
        let x3d = this.radius * Math.sin(this.phi + rotationY) * Math.cos(this.theta + rotationX);
        let y3d = this.radius * Math.sin(this.phi + rotationY) * Math.sin(this.theta + rotationX);
        let z3d = this.radius * Math.cos(this.phi + rotationY);

        // Phép chiếu 2D đơn giản (Perspective)
        let scale = 400 / (400 - z3d);
        let x2d = (x3d * scale) + mx;
        let y2d = (y3d * scale) + my;
        let finalSize = this.size * scale;

        if (z3d < 0) ctx.globalAlpha = 0.3; // Làm mờ các hạt ở mặt sau
        else ctx.globalAlpha = 0.8;

        ctx.beginPath();
        ctx.arc(x2d, y2d, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Hiệu ứng phát sáng mạnh
        if (z3d > 100) {
           ctx.shadowBlur = 10;
           ctx.shadowColor = this.color;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      particles = [];
      // Tăng mật độ lên 400 hạt để tạo cảm giác "Mạnh"
      for (let i = 0; i < 400; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolation cho chuột mượt mà hơn
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Xoay nhẹ theo hướng di chuyển chuột
      rotationX += 0.005;
      rotationY += 0.002;

      particles.forEach(p => p.draw(mouse.x, mouse.y));
      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
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
      className="fixed inset-0 z-[20] pointer-events-none opacity-90 mix-blend-screen" 
    />
  );
};
