'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Compass, 
  Globe, 
  Zap, 
  HeartHandshake,
  ArrowDown
} from 'lucide-react';

import { Destination, FilterOptions, ItineraryItem } from '@/types/trip';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { FlightAnimationProvider } from '@/components/FlightAnimation';
import { AntigravityBackground } from '@/components/AntigravityBackground';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { DestinationCard } from '@/components/DestinationCard';
import { DestinationModal } from '@/components/DestinationModal';
import { ItineraryDrawer } from '@/components/ItineraryDrawer';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { MagneticButton } from '@/components/MagneticButton';
import TechText from '@/components/TechText';

const LOCAL_STORAGE_KEY = 'trip_wise_itinerary_v1';

const DEFAULT_FILTERS: FilterOptions = {
  searchQuery: '',
  continent: 'All',
  category: 'All',
  maxBudget: 500,
  minRating: 0,
  sortBy: 'featured',
};

function TripWiseContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  // 1. Initialize Itinerary from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItinerary(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load itinerary from localStorage:', e);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // 2. Persist Itinerary to localStorage on change
  const saveItinerary = (updated: ItineraryItem[]) => {
    setItinerary(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save itinerary to localStorage:', e);
    }
  };

  // 3. Client-side Search, Filter & Sort Logic (100% Frontend)
  const filteredDestinations = useMemo(() => {
    let list = [...INITIAL_DESTINATIONS];

    const q = filters.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (dest) =>
          dest.name.toLowerCase().includes(q) ||
          dest.country.toLowerCase().includes(q) ||
          dest.description.toLowerCase().includes(q) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          dest.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (filters.continent !== 'All') {
      list = list.filter((dest) => dest.continent === filters.continent);
    }

    if (filters.category !== 'All') {
      list = list.filter((dest) => dest.category === filters.category);
    }

    if (filters.maxBudget < 500) {
      list = list.filter((dest) => dest.dailyBudget <= filters.maxBudget);
    }

    if (filters.minRating > 0) {
      list = list.filter((dest) => dest.rating >= filters.minRating);
    }

    switch (filters.sortBy) {
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'budget-asc':
        list.sort((a, b) => a.dailyBudget - b.dailyBudget);
        break;
      case 'budget-desc':
        list.sort((a, b) => b.dailyBudget - a.dailyBudget);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [filters]);

  // 4. Itinerary management handlers
  const handleToggleItinerary = (dest: Destination, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const exists = itinerary.some((item) => item.destination.id === dest.id);

    if (exists) {
      const filtered = itinerary.filter((item) => item.destination.id !== dest.id);
      saveItinerary(filtered);
    } else {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#38bdf8', '#a855f7', '#10b981', '#ec4899'],
        });
      } catch (err) {
        // ignore
      }

      const newItem: ItineraryItem = {
        id: `${dest.id}-${Date.now()}`,
        destination: dest,
        addedAt: new Date().toISOString(),
        plannedDays: dest.recommendedStayDays || 3,
      };
      saveItinerary([...itinerary, newItem]);
    }
  };

  const handleRemoveItineraryItem = (id: string) => {
    saveItinerary(itinerary.filter((item) => item.id !== id));
  };

  const handleReorderItinerary = (newOrder: ItineraryItem[]) => {
    saveItinerary(newOrder);
  };

  const handleUpdatePlannedDays = (id: string, days: number) => {
    saveItinerary(
      itinerary.map((item) =>
        item.id === id ? { ...item, plannedDays: days } : item
      )
    );
  };

  const handleClearAllItinerary = () => {
    if (window.confirm('Are you sure you want to clear your entire itinerary?')) {
      saveItinerary([]);
    }
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('destinations-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20">
      {/* Background with React Bits WebGL Particles and Cosmic Glow */}
      <AntigravityBackground />

      {/* Floating Glass Navbar with HoldButton */}
      <Navbar
        itineraryCount={itinerary.length}
        onOpenItinerary={() => setIsItineraryOpen(true)}
        onScrollToExplore={scrollToExplore}
      />

      {/* Hero Section with React Bits TechText in the Centre */}
      <section className="relative z-10 pt-10 pb-6 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Floating Top Badge */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Curated Travel Planning • Live Discovery</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Centre Wordmark: React Bits TechText Component */}
        <div className="w-full max-w-3xl h-32 sm:h-40 md:h-48 relative my-2 flex items-center justify-center">
          <TechText
            text="TRIP WISE"
            fontWeight={800}
            fontSize={130}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            clickKick={true}
            draggable={true}
            guides={false}
            color="#ffffff"
            accentColor="#38bdf8"
          />
        </div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 mt-2"
        >
          Discover handpicked global destinations, explore interactive 3D preview cards, and craft a personalized travel itinerary saved directly in your browser.
        </motion.p>

        {/* Quick Highlights / Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8"
        >
          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Globe className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-base font-black text-white">6 Continents</span>
            <span className="text-[10px] text-slate-400">Curated Destinations</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Zap className="w-4 h-4 text-purple-400 mb-1" />
            <span className="text-base font-black text-white">Instant Save</span>
            <span className="text-[10px] text-slate-400">Offline Persistence</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Compass className="w-4 h-4 text-pink-400 mb-1" />
            <span className="text-base font-black text-white">3D Preview</span>
            <span className="text-[10px] text-slate-400">Interactive Tilt</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <HeartHandshake className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-base font-black text-white">Smart Budget</span>
            <span className="text-[10px] text-slate-400">Daily Calculator</span>
          </div>
        </motion.div>

        {/* Scroll indicator with Magnetic pull */}
        <MagneticButton
          onClick={scrollToExplore}
          magneticRadius={45}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors py-2 px-3 rounded-xl"
        >
          <span>Explore Destinations Below</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </MagneticButton>
      </section>

      {/* Sticky Search & Morphing Filter Bar */}
      <SearchBar
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={handleResetFilters}
        totalResults={filteredDestinations.length}
      />

      {/* Main Destination Exploration Grid with Automatic Grid Reordering */}
      <main id="destinations-grid" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {!loading && error && (
          <ErrorState message={error} onRetry={() => setError(null)} />
        )}

        {/* Empty State */}
        {!loading && !error && filteredDestinations.length === 0 && (
          <EmptyState
            onReset={handleResetFilters}
            searchQuery={filters.searchQuery}
          />
        )}

        {/* Destination Cards Layout with Automatic Reordering and Smooth Morphing */}
        {!loading && !error && filteredDestinations.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((destination, index) => {
                const isSaved = itinerary.some(
                  (item) => item.destination.id === destination.id
                );
                return (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    index={index}
                    isSaved={isSaved}
                    onSelect={(dest) => setSelectedDestination(dest)}
                    onToggleItinerary={handleToggleItinerary}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Shared Layout Portal Destination Details Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <DestinationModal
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            isSaved={itinerary.some((i) => i.destination.id === selectedDestination.id)}
            onToggleItinerary={(dest) => handleToggleItinerary(dest)}
          />
        )}
      </AnimatePresence>

      {/* Itinerary Management Drawer ("My Trip") with Drag-to-Reorder & Mobile Bottom Sheet */}
      <ItineraryDrawer
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        itinerary={itinerary}
        onReorder={handleReorderItinerary}
        onRemoveItem={handleRemoveItineraryItem}
        onUpdateDays={handleUpdatePlannedDays}
        onClearAll={handleClearAllItinerary}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20 py-8 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg overflow-hidden border border-cyan-400/30 p-0.5 bg-space-900/60 flex items-center justify-center">
              <img src="/logo.png" alt="TripWise Logo" className="w-full h-full object-contain rounded" />
            </div>
            <span className="font-bold text-slate-200">Trip Wise</span>
            <span>— Smart Travel Planner</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with Next.js, Tailwind CSS & Framer Motion</span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">Trip Wise Travel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <FlightAnimationProvider>
        <TripWiseContent />
      </FlightAnimationProvider>
    </SmoothScrollProvider>
  );
}
