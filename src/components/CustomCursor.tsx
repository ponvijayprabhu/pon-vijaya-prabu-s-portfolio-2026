import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { accent } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Raw mouse coordinates
  const mouseRef = useRef({ x: -200, y: -200 });
  // Interpolated smooth ring coordinates
  const ringPosRef = useRef({ x: -200, y: -200 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch-only mobile devices (phones, tablets)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        // Snap ring immediately on initial entry to prevent sliding in from offscreen
        ringPosRef.current.x = e.clientX;
        ringPosRef.current.y = e.clientY;
      }

      // Immediately place central dot with 0 lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Fast check for interactive elements without expensive getComputedStyle
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      );

      setIsHovered(interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth physics loop for the trailing outer ring (direct DOM, 0 React re-renders)
    const render = () => {
      // Fluid lerp damping
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.28;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none select-none"
      style={{ overflowAnchor: 'none' }}
      aria-hidden="true"
    >
      {/* 1. Fast Sharp Center Dot Core (Locked exactly to mouse cursor tip) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999]"
        style={{
          transform: `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`,
          backgroundColor: accent,
          willChange: 'transform',
        }}
      />

      {/* 2. Outer Smooth Position Container (Handles ONLY translation, NEVER jumping on click) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          transform: `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`,
          width: '56px',
          height: '56px',
          willChange: 'transform',
        }}
      >
        {/* 3. Scaled Inner Breathing Ring (Handles scale, hover expansion & click compression smoothly centered) */}
        <div
          className={`w-full h-full rounded-full flex items-center justify-center transition-transform duration-200 ease-out ${
            isClicked ? 'scale-75' : isHovered ? 'scale-125' : 'scale-100'
          }`}
        >
          {/* Breathing Animated Circle */}
          <div
            className="w-8 h-8 rounded-full border-2 transition-colors duration-200 animate-cursor-breathe"
            style={{
              borderColor: accent,
              backgroundColor: isHovered ? `${accent}25` : 'transparent',
              boxShadow: `0 0 14px ${accent}60, inset 0 0 6px ${accent}30`,
            }}
          />

          {/* Ambient Breathing Halo */}
          <div
            className="absolute inset-2 rounded-full blur-[6px] opacity-40 pointer-events-none animate-pulse-glow"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    </div>
  );
};
