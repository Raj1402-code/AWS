'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar, 
  CloudSun, 
  Compass, 
  Check, 
  Plus, 
  Sparkles,
  Share2,
  Navigation,
  Clock
} from 'lucide-react';
import { Destination } from '@/types/trip';
import { MagneticButton } from './MagneticButton';
import { useFlightAnimation } from './FlightAnimation';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleItinerary: (destination: Destination) => void;
}

// Staggered child variants for choreographed content reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 280,
    },
  },
};

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleItinerary,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const { triggerFlight } = useFlightAnimation();

  if (!destination) return null;

  const allImages = [
    destination.imageUrl,
    ...(destination.secondaryImages || []),
  ];

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out ${destination.name}, ${destination.country} on Trip Wise! Daily budget: $${destination.dailyBudget}/day.`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAction = () => {
    if (!isSaved && actionButtonRef.current) {
      const rect = actionButtonRef.current.getBoundingClientRect();
      triggerFlight(rect, destination.name, destination.imageUrl);
    }
    onToggleItinerary(destination);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-space-950/85 backdrop-blur-xl"
        />

        {/* Modal Window with Shared LayoutId on Container */}
        <motion.div
          layoutId={`card-${destination.id}`}
          transition={{
            type: 'spring',
            damping: 28,
            stiffness: 300,
          }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-card overflow-hidden z-10 border border-white/20 shadow-2xl"
        >
          {/* Close Button with Magnetic Pull */}
          <div className="absolute top-4 right-4 z-30">
            <MagneticButton
              onClick={onClose}
              magneticRadius={40}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 shadow-xl"
            >
              <X className="w-5 h-5" />
            </MagneticButton>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto max-h-[92vh] no-scrollbar">
            {/* Hero Gallery Section with Shared LayoutId on Image */}
            <div className="relative h-72 sm:h-96 w-full bg-space-950">
              <motion.img
                layoutId={`card-img-${destination.id}`}
                key={activeImageIndex}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={allImages[activeImageIndex]}
                alt={destination.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent" />

              {/* Image Thumbnail Selector */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-cyan-400 scale-105 shadow-glow-cyan'
                          : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Header Info with Shared LayoutId on Title */}
              <div className="absolute bottom-4 left-4 sm:left-8 z-20 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="glass-panel text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-cyan-400/30">
                    <Compass className="w-3.5 h-3.5" />
                    {destination.category}
                  </span>
                  <span className="glass-panel text-white text-xs px-2.5 py-1 rounded-full">
                    {destination.continent}
                  </span>
                </div>

                <motion.h1 
                  layoutId={`card-title-${destination.id}`}
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
                >
                  {destination.name}
                </motion.h1>
                <p className="text-sm text-cyan-200 flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{destination.country}</span>
                  <span className="text-slate-400">
                    ({destination.coordinates.lat.toFixed(2)}°, {destination.coordinates.lng.toFixed(2)}°)
                  </span>
                </p>
              </div>
            </div>

            {/* Choreographed Content Reveal Body */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Quick Info Grid Badges */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Rating */}
                <div className="glass-panel rounded-2xl p-3 border border-white/10 flex flex-col items-center text-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    Rating
                  </span>
                  <span className="text-base font-bold text-white">
                    {destination.rating} / 5.0
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    ({destination.reviewsCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Daily Budget */}
                <div className="glass-panel rounded-2xl p-3 border border-white/10 flex flex-col items-center text-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Daily Budget
                  </span>
                  <span className="text-base font-bold text-emerald-300">
                    ${destination.dailyBudget}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Tier: {destination.budgetTier}
                  </span>
                </div>

                {/* Best Season */}
                <div className="glass-panel rounded-2xl p-3 border border-white/10 flex flex-col items-center text-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    Best Time
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">
                    {destination.bestSeason.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Ideal Season
                  </span>
                </div>

                {/* Weather & Climate */}
                <div className="glass-panel rounded-2xl p-3 border border-white/10 flex flex-col items-center text-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
                    Climate
                  </span>
                  <span className="text-base font-bold text-cyan-300">
                    {destination.climate.temp}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {destination.climate.weather}
                  </span>
                </div>
              </motion.div>

              {/* Detailed Overview */}
              <motion.div variants={itemVariants}>
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  About Destination
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {destination.fullOverview}
                </p>
              </motion.div>

              {/* Top Highlights */}
              <motion.div variants={itemVariants}>
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-purple-400" />
                  Must-Experience Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="glass-panel rounded-xl p-3 flex items-center gap-3 border border-white/10 hover:border-cyan-400/40 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-medium text-slate-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stay Length & Budget Estimate Breakdown */}
              <motion.div
                variants={itemVariants}
                className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Recommended Itinerary Duration
                    </h4>
                    <p className="text-xs text-slate-300">
                      Optimal stay: <strong className="text-cyan-300">{destination.recommendedStayDays} Days</strong> • Est. total: <strong className="text-emerald-300">${destination.recommendedStayDays * destination.dailyBudget}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <MagneticButton
                    onClick={handleShare}
                    magneticRadius={40}
                    className="flex-1 sm:flex-initial glass-pill px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Action Bar with Magnetic Add to Itinerary */}
              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Instant itinerary sync</span>
                </div>

                <MagneticButton
                  ref={actionButtonRef}
                  onClick={handleAction}
                  magneticRadius={70}
                  magneticStrength={0.4}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl ${
                    isSaved
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-space-950 shadow-glow-cyan'
                      : 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white shadow-glow-purple hover:shadow-glow-cyan'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>In Your Itinerary (Remove)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add to Itinerary</span>
                    </>
                  )}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
