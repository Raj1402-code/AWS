'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Particles from './Particles';

export const AntigravityBackground: React.FC = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);

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

      {/* React Bits WebGL Particles Component */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <Particles
          particleColors={['#38bdf8', '#818cf8', '#c084fc', '#ffffff', '#34d399']}
          particleCount={250}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={130}
          sizeRandomness={1}
          glow={0.8}
          twinkle={0.5}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          particleHoverFactor={1.2}
          clickBurst={true}
          cameraDistance={20}
          className="w-full h-full"
        />
      </div>

      {/* Subtle Vignette for Cinematic Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 4, 14, 0.65) 100%)',
        }}
      />
    </div>
  );
};
