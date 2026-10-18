'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Luggage } from 'lucide-react';

interface FlightItem {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  imageUrl?: string;
  name: string;
}

interface FlightContextType {
  triggerFlight: (startRect: DOMRect | { x: number; y: number }, name: string, imageUrl?: string) => void;
  isBadgeBouncing: boolean;
}

const FlightContext = createContext<FlightContextType>({
  triggerFlight: () => {},
  isBadgeBouncing: false,
});

export const useFlightAnimation = () => useContext(FlightContext);

export const FlightAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flights, setFlights] = useState<FlightItem[]>([]);
  const [isBadgeBouncing, setIsBadgeBouncing] = useState(false);

  const triggerFlight = useCallback(
    (start: DOMRect | { x: number; y: number }, name: string, imageUrl?: string) => {
      const targetEl = document.getElementById('nav-my-trip-badge');
      const targetRect = targetEl ? targetEl.getBoundingClientRect() : { left: window.innerWidth - 80, top: 25 };

      const startX = 'left' in start ? start.left + start.width / 2 : start.x;
      const startY = 'top' in start ? start.top + start.height / 2 : start.y;
      const targetX = targetRect.left + (('width' in targetRect ? targetRect.width : 20) / 2);
      const targetY = targetRect.top + (('height' in targetRect ? targetRect.height : 20) / 2);

      const id = `${Date.now()}-${Math.random()}`;
      setFlights((prev) => [...prev, { id, startX, startY, targetX, targetY, imageUrl, name }]);
    },
    []
  );

  const handleFlightComplete = (id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
    // Trigger bounce on the target badge
    setIsBadgeBouncing(true);
    setTimeout(() => setIsBadgeBouncing(false), 600);
  };

  return (
    <FlightContext.Provider value={{ triggerFlight, isBadgeBouncing }}>
      {children}
      {/* Floating Orbs in Flight */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {flights.map((flight) => (
            <motion.div
              key={flight.id}
              initial={{
                x: flight.startX - 20,
                y: flight.startY - 20,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: flight.targetX - 20,
                y: flight.targetY - 20,
                scale: [1, 1.25, 0.45],
                opacity: [1, 1, 0.9],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1], // Weightless spring curve
              }}
              onAnimationComplete={() => handleFlightComplete(flight.id)}
              className="absolute w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 shadow-glow-cyan"
            >
              <div className="w-full h-full rounded-full bg-space-900 overflow-hidden flex items-center justify-center border border-white/40">
                {flight.imageUrl ? (
                  <img src={flight.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Luggage className="w-4 h-4 text-cyan-300" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </FlightContext.Provider>
  );
};
