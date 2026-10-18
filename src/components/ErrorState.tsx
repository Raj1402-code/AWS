'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, ZapOff } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'A gravitational anomaly disrupted communications with the global destination uplink.',
  onRetry,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    onRetry();
    setTimeout(() => setIsRetrying(false), 1000);
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: [-14, 14, -10, 10, -6, 6, -2, 2, 0],
      }}
      transition={{
        duration: 0.65,
        ease: 'easeInOut',
      }}
      className="max-w-md mx-auto my-16 p-8 rounded-3xl glass-card text-center border border-pink-500/40 shadow-2xl relative overflow-hidden"
    >
      {/* Glitch Aura */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Pulsing Glitch Icon */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 border border-pink-500/35 flex items-center justify-center text-pink-400 mb-4 shadow-glow-purple"
      >
        <ZapOff className="w-8 h-8" />
      </motion.div>

      <h3 className="text-xl font-black text-white mb-2">
        Telemetry Anomaly Detected
      </h3>

      <p className="text-xs text-slate-300 mb-6 leading-relaxed">
        {message}
      </p>

      {/* Magnetic Retry Connection Button with Spinning Icon on Click */}
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
        <span>{isRetrying ? 'Re-establishing Uplink...' : 'Retry Connection'}</span>
      </MagneticButton>
    </motion.div>
  );
};
