'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong while loading destination details. Please try again.',
  onRetry,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    onRetry();
    setTimeout(() => setIsRetrying(false), 800);
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: [-12, 12, -8, 8, -4, 4, -2, 2, 0],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
      className="max-w-md mx-auto my-16 p-8 rounded-3xl glass-card text-center border border-pink-500/40 shadow-2xl relative overflow-hidden"
    >
      {/* Alert Icon */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 border border-pink-500/35 flex items-center justify-center text-pink-400 mb-4 shadow-glow-purple">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Unable to Load Destinations
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        {message}
      </p>

      {/* Magnetic Retry Button */}
      <MagneticButton
        onClick={handleRetry}
        disabled={isRetrying}
        magneticRadius={45}
        magneticStrength={0.35}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-600/30 hover:from-pink-500/40 hover:to-purple-600/40 border border-pink-400/50 text-white font-bold text-xs shadow-lg transition-all"
      >
        <motion.div
          animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8, repeat: isRetrying ? Infinity : 0, ease: 'linear' }}
        >
          <RefreshCw className="w-4 h-4 text-pink-300" />
        </motion.div>
        <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
      </MagneticButton>
    </motion.div>
  );
};
