'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Globe2, 
  DollarSign, 
  Star,
  Sparkles,
  Compass
} from 'lucide-react';
import { Continent, Category, FilterOptions } from '@/types/trip';

interface SearchBarProps {
  filters: FilterOptions;
  onChangeFilters: (updater: (prev: FilterOptions) => FilterOptions) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CONTINENTS: Continent[] = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

const CATEGORIES: { label: Category; icon: string }[] = [
  { label: 'All', icon: '✨' },
  { label: 'Beach & Island', icon: '🏖️' },
  { label: 'Mountain & Nature', icon: '🏔️' },
  { label: 'Historic & Heritage', icon: '🏛️' },
  { label: 'Futuristic City', icon: '🏙️' },
  { label: 'Culinary & Art', icon: '🎨' },
];

const SORT_OPTIONS: { value: FilterOptions['sortBy']; label: string }[] = [
  { value: 'featured', label: '⭐ Top Featured' },
  { value: 'rating-desc', label: '🌟 Highest Rated' },
  { value: 'budget-asc', label: '💸 Budget: Low to High' },
  { value: 'budget-desc', label: '💎 Budget: High to Low' },
  { value: 'name-asc', label: '🔤 Alphabetical (A-Z)' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  totalResults,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const activeFiltersCount = 
    (filters.searchQuery ? 1 : 0) +
    (filters.continent !== 'All' ? 1 : 0) +
    (filters.category !== 'All' ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxBudget < 500 ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0);

  return (
    <div className="sticky top-20 z-30 w-full px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/15 backdrop-blur-xl"
        >
          {/* Main search and quick controls */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) =>
                  onChangeFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                placeholder="Search by city, country, vibe (e.g. Kyoto, balloons, aurora)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl glass-input text-sm placeholder-slate-400 focus:ring-1 focus:ring-cyan-400"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onChangeFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    onChangeFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as FilterOptions['sortBy'],
                    }))
                  }
                  aria-label="Sort destinations"
                  className="w-full md:w-48 appearance-none pl-9 pr-8 py-2.5 rounded-xl glass-input text-xs font-medium cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-space-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-400 pointer-events-none" />
              </div>

              {/* Advanced Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? 'bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 shadow-glow-cyan'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-space-950 font-bold flex items-center justify-center text-[11px]">
                    {activeFiltersCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() =>
                    onChangeFilters((prev) => ({
                      ...prev,
                      category: isSelected && cat.label !== 'All' ? 'All' : cat.label,
                    }))
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'glass-pill-active text-cyan-200'
                      : 'glass-pill text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Expandable Drawer */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/10 mt-3 pt-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Continent Filter */}
                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-2 font-medium">
                      <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                      Continent / Region
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {CONTINENTS.map((c) => (
                        <button
                          key={c}
                          onClick={() => onChangeFilters((prev) => ({ ...prev, continent: c }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            filters.continent === c
                              ? 'bg-purple-500/30 border border-purple-400/50 text-purple-200'
                              : 'bg-white/5 hover:bg-white/10 text-slate-400'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Daily Budget Slider */}
                  <div>
                    <div className="flex items-center justify-between text-slate-300 mb-2 font-medium">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        Max Daily Budget
                      </span>
                      <span className="text-emerald-300 font-bold">
                        {filters.maxBudget >= 500 ? 'Any Budget' : `$${filters.maxBudget}/day`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={500}
                      step={25}
                      value={filters.maxBudget}
                      onChange={(e) =>
                        onChangeFilters((prev) => ({
                          ...prev,
                          maxBudget: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>$50 (Backpacker)</span>
                      <span>$250</span>
                      <span>$500+ (Luxury)</span>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-2 font-medium">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      Minimum Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[0, 4.5, 4.8, 4.9].map((rate) => (
                        <button
                          key={rate}
                          onClick={() =>
                            onChangeFilters((prev) => ({ ...prev, minRating: rate }))
                          }
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                            filters.minRating === rate
                              ? 'bg-amber-500/25 border border-amber-400/50 text-amber-200'
                              : 'bg-white/5 hover:bg-white/10 text-slate-400'
                          }`}
                        >
                          {rate === 0 ? 'Any' : `${rate}★+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Footer Info & Reset */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Showing <strong className="text-cyan-300">{totalResults}</strong> gravitational destinations
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={onResetFilters}
                      className="text-pink-400 hover:text-pink-300 underline font-medium flex items-center gap-1"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
