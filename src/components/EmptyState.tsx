'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, MapPin, Sparkles, Orbit } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, searchQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 260 }}
      className="max-w-md mx-auto my-16 p-8 rounded-3xl glass-card text-center border border-white/15 relative overflow-hidden shadow-2xl"
    >
      {/* Decorative Cosmic Nebulae */}
      <div className="absolute -top-24 -left-24 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Lost Astronaut / Map Pin Illustration with Tether Loop */}
      <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
        {/* Tether ring orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20"
        />

        {/* Orbiting star dust */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute w-28 h-28"
        >
          <Sparkles className="w-4 h-4 text-pink-400 absolute top-0 left-1/2 -translate-x-1/2 animate-pulse" />
        </motion.div>

        {/* Lost Astronaut Floating Capsule / Map Pin */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 8, -6, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-purple-500/25 to-pink-500/25 border border-white/30 p-4 flex items-center justify-center shadow-glow-cyan"
        >
          {/* Astronaut Helmet / Pin SVG */}
          <svg
            viewBox="0 0 64 64"
            className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Astronaut Helmet Visor */}
            <circle cx="32" cy="26" r="18" className="stroke-cyan-300 fill-cyan-950/60" />
            <path
              d="M22 24 C22 18 42 18 42 24 C42 30 22 30 22 24 Z"
              className="fill-cyan-400/40 stroke-cyan-300"
            />
            {/* Helmet Reflection */}
            <path d="M26 21 Q32 19 38 21" className="stroke-white/80" strokeWidth="1.5" />
            {/* Backpack / Torso */}
            <path d="M18 44 C18 36 46 36 46 44 L48 56 C48 58 44 60 32 60 C20 60 16 58 16 56 Z" className="stroke-purple-300 fill-space-900" />
            {/* Floating Antenna */}
            <line x1="32" y1="8" x2="32" y2="3" />
            <circle cx="32" cy="2" r="2" className="fill-pink-400 stroke-pink-400" />
          </svg>
        </motion.div>
      </div>

      <h3 className="text-xl font-black text-white mb-2">
        Lost in the Multiverse
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-sm mx-auto">
        {searchQuery ? (
          <>
            No coordinates found for <span className="text-cyan-300 font-bold">&ldquo;{searchQuery}&rdquo;</span>.
            The coordinates may have drifted beyond our gravitational radar.
          </>
        ) : (
          'No destinations match your active filters. Try loosening your filters to discover places across the globe.'
        )}
      </p>

      {/* Spring-Animated Magnetic Reset Button */}
      <MagneticButton
        onClick={onReset}
        magneticRadius={50}
        magneticStrength={0.4}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white font-bold text-xs shadow-glow-cyan hover:shadow-glow-purple transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters & Recalibrate Orbit</span>
      </MagneticButton>
    </motion.div>
  );
};
