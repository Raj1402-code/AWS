'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Luggage } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import HoldButton from './HoldButton';
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
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/30 p-0.5 bg-space-900/70 shadow-glow-cyan flex items-center justify-center shrink-0"
          >
            <img
              src="/logo.png"
              alt="TripWise Logo"
              className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                Trip Wise
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Smart Travel Planner & Itinerary Builder
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Explore shortcut with magnetic pull */}
          <MagneticButton
            onClick={onScrollToExplore}
            magneticRadius={50}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white glass-pill rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Explore</span>
          </MagneticButton>

          {/* My Trip HoldButton from React Bits */}
          <div className="relative">
            <HoldButton
              doneLabel="Opened"
              backgroundColor="rgba(16, 22, 58, 0.75)"
              fillColor="#38bdf8"
              textColor="#f5f5f5"
              fillTextColor="#050714"
              size="sm"
              radius={14}
              fillDirection="right"
              holdTime={1200}
              releaseTime={200}
              pressScale={0.96}
              wave={true}
              waveAmplitude={5}
              glow={true}
              resetAfter={1000}
              onHold={onOpenItinerary}
              onTap={onOpenItinerary}
              className="border border-cyan-400/40 shadow-glass"
            >
              <span className="flex items-center gap-2">
                <Luggage className="w-4 h-4 text-cyan-300" />
                <span className="font-semibold text-xs tracking-wide">My Trip</span>
                {/* Target Badge for Flight Animation */}
                <motion.span
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
                  className={`flex items-center justify-center min-w-[20px] h-4 px-1 text-[10px] font-bold rounded-full ${
                    itineraryCount > 0
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-space-950 shadow-glow-cyan'
                      : 'bg-white/15 text-slate-400'
                  }`}
                >
                  {itineraryCount}
                </motion.span>
              </span>
            </HoldButton>
          </div>
        </div>
      </div>
    </header>
  );
};
