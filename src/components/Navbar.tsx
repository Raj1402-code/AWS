'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Luggage } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useFlightAnimation } from './FlightAnimation';

interface NavbarProps {
  itineraryCount: number;
  onOpenItinerary: () => void;
  onScrollToExplore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  itineraryCount,
  onOpenItinerary,
  onScrollToExplore,
}) => {
  const { isBadgeBouncing } = useFlightAnimation();

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl border border-white/15">
        {/* Logo and Brand */}
        <div 
          onClick={onScrollToExplore}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px] shadow-glow-cyan"
          >
            <div className="w-full h-full bg-space-950/80 rounded-[10px] flex items-center justify-center backdrop-blur-md">
              <Compass className="w-5 h-5 text-cyan-300 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </motion.div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                Trip Wise
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Zero-G
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Defy limits • Explore boundless worlds
            </p>
          </div>
        </div>

        {/* Action Buttons with Magnetic Pull */}
        <div className="flex items-center gap-3">
          {/* Explore shortcut with magnetic pull */}
          <MagneticButton
            onClick={onScrollToExplore}
            magneticRadius={50}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white glass-pill rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Discover</span>
          </MagneticButton>

          {/* My Trip Magnetic Button */}
          <MagneticButton
            onClick={onOpenItinerary}
            magneticRadius={65}
            magneticStrength={0.4}
            className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-600/25 to-pink-500/20 hover:from-cyan-500/35 hover:to-pink-500/35 border border-cyan-400/40 text-white font-medium text-sm shadow-glass transition-all group"
          >
            <Luggage className="w-4 h-4 text-cyan-300 group-hover:-translate-y-0.5 transition-transform" />
            <span className="tracking-wide">My Trip</span>

            {/* Target Badge for Flight Animation */}
            <motion.div
              id="nav-my-trip-badge"
              animate={
                isBadgeBouncing
                  ? {
                      scale: [1, 1.5, 0.85, 1.2, 1],
                      rotate: [0, -12, 12, -6, 0],
                    }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`flex items-center justify-center min-w-[22px] h-5 px-1.5 text-xs font-bold rounded-full ${
                itineraryCount > 0
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-space-950 shadow-glow-cyan'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              {itineraryCount}
            </motion.div>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};
