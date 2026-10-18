'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Particles from './Particles';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

const STAR_COLORS = ['#ffffff', '#38bdf8', '#818cf8', '#c084fc', '#67e8f9'];

export const AntigravityBackground: React.FC = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. GSAP Blurred Glowing Nebula Orbs
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=80',
          y: '-=100',
          scale: 1.2,
          rotation: 20,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=100',
          y: '+=90',
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
          x: '+=70',
          y: '+=80',
          scale: 1.15,
          rotation: 30,
          duration: 24,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          x: '-=60',
          y: '-=70',
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

  // 2. Ambient 2D Stardust & Antigravity Field (Guarantees visible particle animation anywhere)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for ambient repulsion
    const mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize 130 ambient zero-G stardust particles
    const starCount = Math.min(140, Math.floor((width * height) / 10000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.6 + 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1), // Gentle upward anti-gravity drift
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle constellation lines between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.15 * stars[i].alpha;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw and update each star
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Zero-G drift
        s.x += s.vx;
        s.y += s.vy;

        // Subtle mouse repulsion
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          s.x += (dx / dist) * force * 2.2;
          s.y += (dy / dist) * force * 2.2;
        }

        // Screen wrap-around with anti-gravity flow
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        // Twinkle oscillation
        s.alpha = s.baseAlpha + Math.sin(time * 2 + i) * 0.2;
        const currentAlpha = Math.max(0.1, Math.min(1, s.alpha));

        // Draw star with soft glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius * 3.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-space-950">
      {/* Deep Space Cosmic Base Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #182266 0%, #0e1540 40%, #06091c 80%, #03040e 100%)',
        }}
      />

      {/* Vibrant GSAP Driven Blurred Glowing Nebula Orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-cyan-400/25 via-blue-600/18 to-transparent blur-[130px] will-change-transform pointer-events-none"
      />

      <div
        ref={orb2Ref}
        className="absolute top-1/4 -right-44 w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-purple-500/25 via-pink-600/15 to-transparent blur-[150px] will-change-transform pointer-events-none"
      />

      <div
        ref={orb3Ref}
        className="absolute -bottom-48 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-teal-400/15 to-transparent blur-[140px] will-change-transform pointer-events-none"
      />

      <div
        ref={orb4Ref}
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500/15 via-cyan-500/12 to-transparent blur-[120px] will-change-transform pointer-events-none"
      />

      {/* Fail-Safe Ambient 2D Stardust Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* React Bits WebGL Particles Component with immediate reveal and connections */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-[2]">
        <Particles
          particleColors={['#38bdf8', '#818cf8', '#c084fc', '#ffffff', '#22d3ee', '#34d399']}
          particleCount={260}
          particleSpread={13}
          speed={0.14}
          particleBaseSize={130}
          sizeRandomness={1}
          glow={0.85}
          twinkle={0.6}
          connections={true}
          connectionDistance={120}
          moveParticlesOnHover={true}
          hoverEffect="repel"
          particleHoverFactor={1.2}
          clickBurst={true}
          cameraDistance={20}
          intro={false}
          className="w-full h-full"
        />
      </div>

      {/* Subtle Vignette for Cinematic Depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 4, 14, 0.65) 100%)',
        }}
      />
    </div>
  );
};
