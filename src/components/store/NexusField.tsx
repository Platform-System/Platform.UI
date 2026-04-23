'use client';

import React, { useEffect, useRef } from 'react';

/**
 * NexusField: Hiệu ứng "Trường năng lượng vô tận".
 * Hàng trăm hạt phủ khắp không gian, phản ứng mạnh mẽ với chuột nhưng không tụ lại.
 * Tạo cảm giác về một không gian Marketplace rộng lớn và đầy sức sống.
 */
export const NexusField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 200 };
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        
        const colors = ['#22d3ee', '#818cf8', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Tự động trôi nhẹ nhàng (Ambient drift)
        this.baseX += Math.sin(Date.now() * 0.001 + this.density) * 0.2;
        this.baseY += Math.cos(Date.now() * 0.001 + this.density) * 0.2;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          // Lực đẩy "Strong" - Các hạt tránh né con trỏ một cách mạnh mẽ
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Quay về vị trí gốc (Elastic behavior)
          if (this.x !== this.baseX) {
            let dxOrig = this.x - this.baseX;
            this.x -= dxOrig / 10;
          }
          if (this.y !== this.baseY) {
            let dyOrig = this.y - this.baseY;
            this.y -= dyOrig / 10;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Hiệu ứng tương tác ánh sáng khi gần chuột
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
          ctx.globalAlpha = 0.8;
        } else {
          ctx.fillStyle = this.color;
          ctx.globalAlpha = 0.2;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 5000);
      for (let i = 0; i < Math.min(count, 500); i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[5] pointer-events-none" 
    />
  );
};
