'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Compass, Sparkles } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Central Orbiting Plane / Compass Loader */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsating Glow Core */}
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-xl"
          />

          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30"
          />

          {/* Inner Orbital Ring with Orbiting Plane */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute w-24 h-24 rounded-full border border-purple-400/40"
          >
            {/* The Orbiting Plane */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 text-space-950 flex items-center justify-center shadow-glow-cyan">
              <Plane className="w-3.5 h-3.5 rotate-45" />
            </div>
          </motion.div>

          {/* Center Compass */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border border-white/20 text-cyan-300 shadow-glow-purple"
          >
            <Compass className="w-6 h-6 text-cyan-300" />
          </motion.div>
        </div>

        {/* Loading Message */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 flex items-center gap-2 text-xs font-semibold text-cyan-300 tracking-wider uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Curating Destinations...</span>
        </motion.div>
      </div>

      {/* Shimmering Glassmorphic Skeleton Cards Floating */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0] 
            }}
            transition={{
              opacity: { duration: 0.5, delay: i * 0.05 },
              y: {
                duration: 4.2 + (i % 3) * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.25,
              },
            }}
            className="rounded-3xl glass-card overflow-hidden h-[420px] flex flex-col border border-white/10 relative"
          >
            {/* Shimmer Image Area */}
            <div className="relative h-56 w-full bg-white/5 overflow-hidden">
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
            </div>

            {/* Skeleton Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-32 bg-white/10 rounded-md animate-pulse" />
                  <div className="h-6 w-12 bg-white/10 rounded-full animate-pulse" />
                </div>
                <div className="h-3.5 w-24 bg-white/5 rounded-md animate-pulse" />
                <div className="space-y-1.5 pt-2">
                  <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
