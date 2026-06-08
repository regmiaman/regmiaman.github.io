import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let pts = [];
    let animationFrameId;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      pts = [];
      const density = Math.floor((W * H) / 18000); // balance performance
      const n = Math.max(30, Math.min(density, 120)); // clamp particle count

      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.5 + 0.5,
          op: Math.random() * 0.4 + 0.1,
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Determine particle RGB based on theme context
      const pc = theme === 'light' ? '37, 99, 235' : '56, 189, 248';

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pc}, ${p.op})`;
        ctx.fill();
      });

      // Draw lines between close particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${pc}, ${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.45,
      }}
    />
  );
};

export default ParticlesBackground;
