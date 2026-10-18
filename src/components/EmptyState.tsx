'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, RotateCcw, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, searchQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto my-16 p-8 rounded-3xl glass-card text-center border border-white/15 relative overflow-hidden"
    >
      {/* Decorative Aura */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Compass Emblem */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 p-4 flex items-center justify-center text-cyan-300 shadow-glow-cyan mb-5"
      >
        <Compass className="w-10 h-10 animate-spin-slow" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-2">
        Zero Gravity • No Coordinates Found
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        {searchQuery ? (
          <>
            No destinations matched <span className="text-cyan-300 font-semibold">&ldquo;{searchQuery}&rdquo;</span>.
            Try loosening your filters or searching another continent.
          </>
        ) : (
          'No destinations match your current filter combination. Try resetting to discover more places across the globe.'
        )}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold text-xs shadow-glow-cyan hover:shadow-glow-purple transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters & Explore All</span>
      </motion.button>
    </motion.div>
  );
};
