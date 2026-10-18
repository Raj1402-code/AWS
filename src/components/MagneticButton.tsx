'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number; // Distance in px to trigger magnetic pull
  magneticStrength?: number; // How far the button moves (0 to 1)
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className = '',
      magneticRadius = 60,
      magneticStrength = 0.35,
      onClick,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLButtonElement);

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // Exact spring physics specified: stiffness 150, damping 15
    const springX = useSpring(rawX, { stiffness: 150, damping: 15 });
    const springY = useSpring(rawY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isTouchDevice || disabled || !internalRef.current) return;

      const rect = internalRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < rect.width / 2 + magneticRadius) {
        rawX.set(distX * magneticStrength);
        rawY.set(distY * magneticStrength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    return (
      <motion.button
        ref={internalRef}
        style={{
          x: isTouchDevice ? 0 : springX,
          y: isTouchDevice ? 0 : springY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        disabled={disabled}
        className={`relative will-change-transform ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
