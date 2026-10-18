'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Luggage, 
  Globe, 
  ShieldCheck, 
  Zap, 
  HeartHandshake,
  ArrowDown
} from 'lucide-react';

import { Destination, FilterOptions, ItineraryItem } from '@/types/trip';
import { AntigravityBackground } from '@/components/AntigravityBackground';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { DestinationCard } from '@/components/DestinationCard';
import { DestinationModal } from '@/components/DestinationModal';
import { ItineraryDrawer } from '@/components/ItineraryDrawer';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';

const LOCAL_STORAGE_KEY = 'trip_wise_itinerary_v1';

const DEFAULT_FILTERS: FilterOptions = {
  searchQuery: '',
  continent: 'All',
  category: 'All',
  maxBudget: 500,
  minRating: 0,
  sortBy: 'featured',
};

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
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

  // 3. Fetch destinations from API route
  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.append('q', filters.searchQuery);
      if (filters.continent !== 'All') params.append('continent', filters.continent);
      if (filters.category !== 'All') params.append('category', filters.category);
      if (filters.maxBudget < 500) params.append('maxBudget', filters.maxBudget.toString());
      if (filters.minRating > 0) params.append('minRating', filters.minRating.toString());
      params.append('sortBy', filters.sortBy);

      const res = await fetch(`/api/destinations?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setDestinations(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch destinations');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDestinations();
    }, 200); // 200ms debounce
    return () => clearTimeout(timer);
  }, [fetchDestinations]);

  // 4. Itinerary management handlers
  const handleToggleItinerary = (dest: Destination, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const exists = itinerary.some((item) => item.destination.id === dest.id);

    if (exists) {
      const filtered = itinerary.filter((item) => item.destination.id !== dest.id);
      saveItinerary(filtered);
    } else {
      // Trigger confetti celebration on adding to trip!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#38bdf8', '#a855f7', '#10b981', '#ec4899'],
        });
      } catch (err) {
        // ignore if canvas-confetti isn't supported
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
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20">
      {/* Background Physics / Particle Canvas */}
      <AntigravityBackground />

      {/* Floating Glass Navbar */}
      <Navbar
        itineraryCount={itinerary.length}
        onOpenItinerary={() => setIsItineraryOpen(true)}
        onScrollToExplore={scrollToExplore}
      />

      {/* Hero Section with Antigravity Elements */}
      <section className="relative z-10 pt-12 pb-8 px-4 sm:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Anti-gravity Floating Pill */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-cyan-300" />
          <span>Defy Gravity • Smarter Itineraries</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]"
        >
          Explore Earth&apos;s wonders in{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            Zero Gravity.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8"
        >
          Discover handpicked global destinations with smooth physics, 3D interactive tilt cards, and a persistent travel canvas tailored to your wanderlust.
        </motion.p>

        {/* Quick Highlights / Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8"
        >
          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Globe className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-base font-black text-white">6 Continents</span>
            <span className="text-[10px] text-slate-400">Curated Places</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Zap className="w-4 h-4 text-purple-400 mb-1" />
            <span className="text-base font-black text-white">Instant Sync</span>
            <span className="text-[10px] text-slate-400">Local Storage</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <Compass className="w-4 h-4 text-pink-400 mb-1" />
            <span className="text-base font-black text-white">3D Tilt Cards</span>
            <span className="text-[10px] text-slate-400">Physics Based</span>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-col items-center">
            <HeartHandshake className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-base font-black text-white">Smart Budget</span>
            <span className="text-[10px] text-slate-400">Cost Estimator</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToExplore}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <span>Explore Destinations Below</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </button>
      </section>

      {/* Sticky Search & Filter Bar */}
      <SearchBar
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={handleResetFilters}
        totalResults={destinations.length}
      />

      {/* Main Destination Exploration Grid */}
      <main id="destinations-grid" className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {!loading && error && (
          <ErrorState message={error} onRetry={fetchDestinations} />
        )}

        {/* Empty State */}
        {!loading && !error && destinations.length === 0 && (
          <EmptyState
            onReset={handleResetFilters}
            searchQuery={filters.searchQuery}
          />
        )}

        {/* Destination Cards Layout */}
        {!loading && !error && destinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {destinations.map((destination, index) => {
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
          </div>
        )}
      </main>

      {/* Destination Details Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={
          selectedDestination
            ? itinerary.some((i) => i.destination.id === selectedDestination.id)
            : false
        }
        onToggleItinerary={(dest) => handleToggleItinerary(dest)}
      />

      {/* Itinerary Management Drawer ("My Trip") */}
      <ItineraryDrawer
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        itinerary={itinerary}
        onRemoveItem={handleRemoveItineraryItem}
        onUpdateDays={handleUpdatePlannedDays}
        onClearAll={handleClearAllItinerary}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
      />

      {/* Antigravity Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20 py-8 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200">Trip Wise</span>
            <span>— The Antigravity Travel Planner</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Powered by Next.js, Tailwind CSS & Framer Motion</span>
            <span>•</span>
            <span className="text-cyan-400/80">October 2026 Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
