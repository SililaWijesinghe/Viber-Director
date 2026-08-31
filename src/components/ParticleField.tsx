import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid nodes
    const cols = 25;
    const rows = 15;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];

    // Initialize points as a 3D perspective grid
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Distribute grid cells
        const ox = (c / (cols - 1)) * width;
        const oy = (r / (rows - 1)) * height;
        points.push({
          x: ox,
          y: oy,
          ox: ox,
          oy: oy,
        });
      }
    }

    // Floating particles
    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#7C3AED' : '#22D3EE',
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-initialize points on resize
      points.length = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (c / (cols - 1)) * width;
          const oy = (r / (rows - 1)) * height;
          points.push({ x: ox, y: oy, ox: ox, oy: oy });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Ease mouse movement
    const animate = () => {
      // Linear interpolation for mouse ease
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle grid wireframe with magnetic displacement
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.04)';
      ctx.lineWidth = 0.5;

      // Update point positions based on mouse proximity
      points.forEach((p) => {
        const dx = mouseRef.current.x - p.ox;
        const dy = mouseRef.current.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 280;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          // Displace point slightly away from mouse
          p.x = p.ox - (dx / dist) * force * 45;
          p.y = p.oy - (dy / dist) * force * 45;
        } else {
          // Return to origin
          p.x += (p.ox - p.x) * 0.1;
          p.y += (p.oy - p.y) * 0.1;
        }
      });

      // Draw horizontal grid lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (c === 0) ctx.moveTo(points[idx].x, points[idx].y);
          else ctx.lineTo(points[idx].x, points[idx].y);
        }
        ctx.stroke();
      }

      // Draw vertical grid lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          if (r === 0) ctx.moveTo(points[idx].x, points[idx].y);
          else ctx.lineTo(points[idx].x, points[idx].y);
        }
        ctx.stroke();
      }

      // 2. Render and update floating code-like particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Magnetism to cursor
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.45;
          p.y += (dy / dist) * 0.45;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw tiny connecting lines if close
        particles.forEach((other) => {
          if (p === other) return;
          const odx = p.x - other.x;
          const ody = p.y - other.y;
          const odist = Math.sqrt(odx * odx + ody * ody);
          if (odist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = p.color === '#7C3AED' ? 'rgba(124, 58, 237, 0.05)' : 'rgba(34, 211, 238, 0.05)';
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1.0; // Reset alpha

      // 3. Draw an interactive scanner cursor indicator (faint overlay circle)
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      id="hud-particle-canvas"
    />
  );
}
