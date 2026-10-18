'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Particles from './Particles';

export const AntigravityBackground: React.FC = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=70',
          y: '-=90',
          scale: 1.15,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=90',
          y: '+=80',
          scale: 0.9,
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=60',
          y: '+=70',
          scale: 1.1,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Blurred Cosmic Glow Orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-36 -left-36 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent blur-[140px] will-change-transform pointer-events-none"
      />

      <div
        ref={orb2Ref}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-500/15 via-pink-600/10 to-transparent blur-[160px] will-change-transform pointer-events-none"
      />

      <div
        ref={orb3Ref}
        className="absolute -bottom-48 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-500/12 via-teal-400/8 to-transparent blur-[150px] will-change-transform pointer-events-none"
      />

      {/* React Bits WebGL Particles Component */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <Particles
          particleColors={['#38bdf8', '#818cf8', '#c084fc', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          glow={0.5}
          twinkle={0.3}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          clickBurst={true}
          cameraDistance={20}
          className="w-full h-full"
        />
      </div>

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 mix-blend-multiply pointer-events-none" />
    </div>
  );
};
