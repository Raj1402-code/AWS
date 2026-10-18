'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  X, 
  Luggage, 
  Trash2, 
  MapPin, 
  PlaneTakeoff,
  Plus,
  Minus,
  CheckCheck,
  Share2,
  GripVertical
} from 'lucide-react';
import { ItineraryItem, Destination } from '@/types/trip';
import { MagneticButton } from './MagneticButton';

interface ItineraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: ItineraryItem[];
  onReorder: (newOrder: ItineraryItem[]) => void;
  onRemoveItem: (id: string) => void;
  onUpdateDays: (id: string, days: number) => void;
  onClearAll: () => void;
  onSelectDestination: (dest: Destination) => void;
}

export const ItineraryDrawer: React.FC<ItineraryDrawerProps> = ({
  isOpen,
  onClose,
  itinerary,
  onReorder,
  onRemoveItem,
  onUpdateDays,
  onClearAll,
  onSelectDestination,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Computed summary metrics
  const totalDays = itinerary.reduce((acc, item) => acc + item.plannedDays, 0);
  const totalEstimatedCost = itinerary.reduce(
    (acc, item) => acc + item.plannedDays * item.destination.dailyBudget,
    0
  );
  const uniqueCountries = Array.from(new Set(itinerary.map((i) => i.destination.country))).length;

  const handleShareItinerary = () => {
    if (itinerary.length === 0) return;
    const summary = [
      `🚀 TRIP WISE ITINERARY SUMMARY 🚀`,
      `Destinations: ${itinerary.length} (${uniqueCountries} Countries)`,
      `Total Planned Duration: ${totalDays} Days`,
      `Estimated Total Budget: $${totalEstimatedCost}`,
      `----------------------------------------`,
      ...itinerary.map(
        (item, idx) =>
          `${idx + 1}. ${item.destination.name}, ${item.destination.country} (${item.plannedDays} days @ $${item.destination.dailyBudget}/day = $${item.plannedDays * item.destination.dailyBudget})`
      ),
      `----------------------------------------`,
      `Crafted with Trip Wise Zero-G Travel Planner`,
    ].join('\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-space-950/75 backdrop-blur-md"
          />

          {/* Container: Bottom Sheet on Mobile, Slide-out Drawer on Desktop */}
          <div className="fixed inset-y-0 right-0 max-w-full flex md:pl-10 max-md:inset-x-0 max-md:top-auto max-md:bottom-0">
            <motion.div
              initial={isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              drag={isMobile ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (isMobile && (info.offset.y > 120 || info.velocity.y > 500)) {
                  onClose();
                }
              }}
              className="w-full md:w-screen md:max-w-md lg:max-w-lg glass-card flex flex-col shadow-2xl border-l md:border-white/15 max-md:border-t max-md:rounded-t-3xl max-md:max-h-[85vh] bg-space-950/95 backdrop-blur-2xl"
            >
              {/* Mobile Drag Handle */}
              {isMobile && (
                <div className="pt-3 pb-1 flex justify-center">
                  <div className="w-12 h-1.5 rounded-full bg-white/25" />
                </div>
              )}

              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                    <div className="w-full h-full bg-space-950/80 rounded-[11px] flex items-center justify-center">
                      <Luggage className="w-5 h-5 text-cyan-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>My Trip Itinerary</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {itinerary.length}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Drag to reorder • Swipe left to delete
                    </p>
                  </div>
                </div>

                <MagneticButton
                  onClick={onClose}
                  magneticRadius={35}
                  className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </MagneticButton>
              </div>

              {/* Trip Summary Bar */}
              {itinerary.length > 0 && (
                <div className="px-5 py-3 bg-white/[0.03] border-b border-white/5 grid grid-cols-3 gap-2 text-center">
                  <div className="glass-panel py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Total Days</span>
                    <span className="text-sm font-extrabold text-cyan-300">{totalDays} d</span>
                  </div>
                  <div className="glass-panel py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Est. Cost</span>
                    <span className="text-sm font-extrabold text-emerald-300">${totalEstimatedCost}</span>
                  </div>
                  <div className="glass-panel py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Countries</span>
                    <span className="text-sm font-extrabold text-purple-300">{uniqueCountries}</span>
                  </div>
                </div>
              )}

              {/* Reorderable List of Saved Destinations */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5 no-scrollbar">
                {itinerary.length === 0 ? (
                  <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-cyan-300 shadow-glow-cyan"
                    >
                      <PlaneTakeoff className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">
                        Your itinerary is empty
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Defy the ordinary! Click the <strong>+</strong> button on any floating destination card to assemble your dream cosmic journey.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Reorder.Group
                    axis="y"
                    values={itinerary}
                    onReorder={onReorder}
                    className="space-y-3"
                  >
                    {itinerary.map((item, index) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.3,
                          filter: 'blur(10px)',
                          transition: { duration: 0.25 },
                        }}
                        whileDrag={{
                          scale: 1.04,
                          boxShadow: '0 20px 40px rgba(56, 189, 248, 0.35)',
                          zIndex: 50,
                        }}
                        className="relative"
                      >
                        {/* Swipeable Container */}
                        <motion.div
                          drag="x"
                          dragConstraints={{ left: -100, right: 0 }}
                          dragElastic={0.15}
                          onDragEnd={(_, info) => {
                            if (info.offset.x < -75 || info.velocity.x < -350) {
                              onRemoveItem(item.id);
                            }
                          }}
                          className="group rounded-2xl glass-card p-3 sm:p-3.5 border border-white/10 hover:border-cyan-400/30 transition-all flex gap-3 items-center cursor-grab active:cursor-grabbing bg-space-900/80"
                        >
                          {/* Drag handle */}
                          <div className="text-slate-500 hover:text-cyan-400 touch-none">
                            <GripVertical className="w-4 h-4" />
                          </div>

                          {/* Thumbnail */}
                          <div
                            onClick={() => {
                              onSelectDestination(item.destination);
                              onClose();
                            }}
                            className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 cursor-pointer"
                          >
                            <img
                              src={item.destination.imageUrl}
                              alt={item.destination.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-1 left-1 w-5 h-5 rounded-md bg-space-950/80 backdrop-blur-sm text-[10px] font-bold text-cyan-300 flex items-center justify-center">
                              #{index + 1}
                            </div>
                          </div>

                          {/* Info & Days Controller */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4
                                onClick={() => {
                                  onSelectDestination(item.destination);
                                  onClose();
                                }}
                                className="text-sm font-bold text-white hover:text-cyan-300 cursor-pointer truncate"
                              >
                                {item.destination.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                                title="Swipe left or click to remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span>{item.destination.country}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-medium">
                                ${item.plannedDays * item.destination.dailyBudget}
                              </span>
                            </p>

                            {/* Planned Days Controller */}
                            <div className="mt-2 flex items-center justify-between text-xs">
                              <span className="text-[10px] text-slate-400">Duration:</span>
                              <div className="flex items-center gap-2 glass-panel px-2 py-0.5 rounded-lg border border-white/10">
                                <button
                                  onClick={() =>
                                    onUpdateDays(item.id, Math.max(1, item.plannedDays - 1))
                                  }
                                  disabled={item.plannedDays <= 1}
                                  className="text-slate-400 hover:text-white disabled:opacity-30 p-0.5"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-cyan-200 min-w-[28px] text-center">
                                  {item.plannedDays} {item.plannedDays === 1 ? 'day' : 'days'}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateDays(item.id, Math.min(30, item.plannedDays + 1))
                                  }
                                  className="text-slate-400 hover:text-white p-0.5"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {itinerary.length > 0 && (
                <div className="p-5 border-t border-white/10 space-y-3 bg-space-950/90">
                  <div className="flex gap-2">
                    <MagneticButton
                      onClick={handleShareItinerary}
                      magneticRadius={40}
                      className="flex-1 py-2.5 px-3 rounded-xl glass-panel text-xs font-medium text-cyan-300 hover:text-white border border-cyan-400/30 flex items-center justify-center gap-1.5 transition-all shadow-glow-cyan"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Travel Plan!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Itinerary Plan</span>
                        </>
                      )}
                    </MagneticButton>

                    <MagneticButton
                      onClick={onClearAll}
                      magneticRadius={35}
                      className="py-2.5 px-3.5 rounded-xl glass-panel text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
                      title="Clear all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </div>

                  <p className="text-[10px] text-center text-slate-500">
                    💾 Saved in local storage • Drag items to reorder trip sequence
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
