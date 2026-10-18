'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Plus, 
  Check, 
  Compass, 
  Sparkles,
  ArrowUpRight,
  DollarSign
} from 'lucide-react';
import { Destination } from '@/types/trip';
import { useFlightAnimation } from './FlightAnimation';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  isSaved: boolean;
  onSelect: (destination: Destination) => void;
  onToggleItinerary: (destination: Destination, e: React.MouseEvent) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  index,
  isSaved,
  onSelect,
  onToggleItinerary,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { triggerFlight } = useFlightAnimation();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 3D Tilt physics with Framer Motion useMotionValue & useSpring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Dynamic specular glare coordinates
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalize from -0.5 to 0.5
    mouseX.set(clientX / rect.width - 0.5);
    mouseY.set(clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Randomized continuous idle float offset
  const floatDuration = 4.8 + (index % 4) * 0.9;
  const floatDelay = (index % 5) * 0.35;

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSaved && actionButtonRef.current) {
      const rect = actionButtonRef.current.getBoundingClientRect();
      triggerFlight(rect, destination.name, destination.imageUrl);
    }
    onToggleItinerary(destination, e);
  };

  return (
    <motion.div
      layout
      layoutId={`card-${destination.id}`}
      initial={{ 
        opacity: 0, 
        y: 60, 
        rotateX: 25, 
        scale: 0.92 
      }}
      animate={{ 
        opacity: 1, 
        y: [0, -8, 0], 
        rotateX: 0, 
        scale: 1 
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.85, 
        y: 30,
        transition: { duration: 0.3 } 
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.07 },
        rotateX: { duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        },
        layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      }}
      className="perspective-1000 h-full will-change-transform"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(destination)}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.96 }}
        whileHover={isTouchDevice ? {} : { scale: 1.03 }}
        className="relative group rounded-3xl glass-card overflow-hidden cursor-pointer h-full flex flex-col transition-shadow duration-300 hover:shadow-glass-hover border border-white/15"
      >
        {/* Dynamic Specular Glare Highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-3xl z-20"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, transparent 65%)`,
          }}
        />

        {/* Hero Image Container with Shared Layout Id */}
        <div className="relative h-56 w-full overflow-hidden bg-space-900">
          <motion.img
            layoutId={`card-img-${destination.id}`}
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/25 to-black/20" />

          {/* Floating Category & Itinerary Toggle Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="glass-panel text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>{destination.category}</span>
            </span>

            {/* Quick Add / Flight Trigger Button */}
            <motion.button
              ref={actionButtonRef}
              whileTap={{ scale: 0.85 }}
              onClick={handleActionClick}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isSaved
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-space-950 shadow-glow-cyan'
                  : 'glass-panel text-white hover:bg-white/25 hover:scale-110'
              }`}
              title={isSaved ? 'In your itinerary' : 'Add to itinerary'}
            >
              {isSaved ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <Plus className="w-4 h-4 stroke-[2.5]" />
              )}
            </motion.button>
          </div>

          {/* Rating & Budget Float Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1 text-amber-300 glass-panel px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{destination.rating.toFixed(2)}</span>
              <span className="text-[10px] text-slate-300 font-normal">
                ({(destination.reviewsCount / 1000).toFixed(1)}k)
              </span>
            </div>

            <div className="glass-panel px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-300 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              <span>${destination.dailyBudget}/day</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title & Location with Shared Layout Id */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <motion.h3 
                  layoutId={`card-title-${destination.id}`}
                  className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  {destination.name}
                </motion.h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{destination.country}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{destination.continent}</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
              {destination.description}
            </p>

            {/* Highlights Tag Cloud */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {destination.highlights.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Details */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{destination.bestSeason.split('(')[0].trim()}</span>
            </span>

            <span className="text-cyan-300 font-semibold group-hover:underline">
              View Destination →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
