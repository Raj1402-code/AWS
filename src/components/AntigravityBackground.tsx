'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AntigravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. GSAP Timelines for Ambient Drifting Blurred Cosmic Orbs
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=90',
          y: '-=110',
          scale: 1.25,
          rotation: 30,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=120',
          y: '+=95',
          scale: 0.85,
          rotation: -25,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=80',
          y: '+=85',
          scale: 1.15,
          rotation: 45,
          duration: 24,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          x: '-=70',
          y: '-=60',
          scale: 1.1,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // 2. Interactive Canvas Particles with Smooth Zero-Gravity Repulsion Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext('2d');
    if (!g) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Particle pool with mass, velocity, acceleration, and damping
    const count = 75;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseRadius: Math.random() * 2.2 + 0.7,
      radius: Math.random() * 2.2 + 0.7,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.12), // Upward zero-g drift
      ax: 0,
      ay: 0,
      alpha: Math.random() * 0.65 + 0.25,
      hue: Math.random() > 0.45 ? (Math.random() > 0.5 ? 190 : 275) : 325, // Cyan, violet, pink
    }));

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      g.clearRect(0, 0, w, h);

      // Smooth cursor lerp
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      particles.forEach((p) => {
        // Physical repulsion from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 140;

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          const angle = Math.atan2(dy, dx);
          // Apply gentle repulsive force
          p.ax += Math.cos(angle) * force * 0.85;
          p.ay += Math.sin(angle) * force * 0.85;
        }

        // Apply acceleration & damping
        p.vx += p.ax;
        p.vy += p.ay;

        // Upward zero-g buoyancy bias
        p.vy -= 0.005;

        // Velocity damping (air resistance in zero-g)
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Reset acceleration
        p.ax = 0;
        p.ay = 0;

        // Move position
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrap
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Render particle with glow
        g.beginPath();
        g.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        g.fillStyle = `hsla(${p.hue}, 95%, 75%, ${p.alpha})`;
        g.shadowBlur = 12;
        g.shadowColor = `hsla(${p.hue}, 95%, 65%, 0.9)`;
        g.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* GSAP Driven Ambient Floating Blurred Cosmic Orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-36 -left-36 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-cyan-400/18 via-blue-600/10 to-transparent blur-[130px] will-change-transform"
      />

      <div
        ref={orb2Ref}
        className="absolute top-1/4 -right-44 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-purple-500/20 via-pink-600/12 to-transparent blur-[150px] will-change-transform"
      />

      <div
        ref={orb3Ref}
        className="absolute -bottom-48 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-teal-400/12 to-transparent blur-[140px] will-change-transform"
      />

      <div
        ref={orb4Ref}
        className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/8 to-transparent blur-[120px] will-change-transform"
      />

      {/* Interactive Anti-gravity Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Subtle Cosmic Noise Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 mix-blend-multiply" />
    </div>
  );
};
