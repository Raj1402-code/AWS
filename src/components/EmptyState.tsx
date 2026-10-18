'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, MapPin, Sparkles } from 'lucide-react';
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
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Map Pin Emblem */}
      <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
        {/* Ring orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20"
        />

        {/* Orbiting sparkle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24"
        >
          <Sparkles className="w-4 h-4 text-pink-400 absolute top-0 left-1/2 -translate-x-1/2 animate-pulse" />
        </motion.div>

        {/* Floating Pin Card */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/25 via-purple-500/25 to-pink-500/25 border border-white/30 p-3.5 flex items-center justify-center shadow-glow-cyan text-cyan-300"
        >
          <MapPin className="w-8 h-8 text-cyan-300" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        No Destinations Found
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-sm mx-auto">
        {searchQuery ? (
          <>
            No matches found for <span className="text-cyan-300 font-bold">&ldquo;{searchQuery}&rdquo;</span>.
            Try adjusting your search query or loosening your filters.
          </>
        ) : (
          'No destinations match your active filters. Try resetting to discover more places across the globe.'
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
        <span>Reset Filters & Show All</span>
      </MagneticButton>
    </motion.div>
  );
};
