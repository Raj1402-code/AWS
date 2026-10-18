'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            y: [0, -8, 0] 
          }}
          transition={{
            y: {
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            },
          }}
          className="rounded-3xl glass-card overflow-hidden h-[420px] flex flex-col border border-white/10"
        >
          {/* Shimmer Image Area */}
          <div className="relative h-56 w-full bg-white/5 animate-pulse overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
  );
};
