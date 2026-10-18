'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'An gravitational disturbance prevented destinations from loading.',
  onRetry,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto my-16 p-8 rounded-3xl glass-card text-center border border-pink-500/30 shadow-2xl relative"
    >
      <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 shadow-glow-purple">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2">
        Signal Lost in Orbit
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500/30 hover:bg-pink-500/40 border border-pink-400/50 text-white font-semibold text-xs transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Re-establish Uplink (Retry)</span>
      </button>
    </motion.div>
  );
};
