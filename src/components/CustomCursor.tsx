import React, { useEffect, useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { accent } = usePortfolio();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position interpolation for fluid organic follow
  const cursorDotRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const cursorRingRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch-only screen
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      cursorDotRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Detect clickable element under cursor
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    // Smooth animation loop
    const animateCursor = () => {
      // Ease outer ring towards mouse coordinates (smooth trailing)
      cursorRingRef.current.x += (cursorDotRef.current.x - cursorRingRef.current.x) * 0.22;
      cursorRingRef.current.y += (cursorDotRef.current.y - cursorRingRef.current.y) * 0.22;

      setPosition({
        x: cursorRingRef.current.x,
        y: cursorRingRef.current.y,
      });

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Don't render custom cursor on touch-only mobile devices
  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* 1. Fast Sharp Center Dot Core */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-sm"
        style={{
          transform: `translate3d(${cursorDotRef.current.x}px, ${cursorDotRef.current.y}px, 0)`,
          backgroundColor: accent,
        }}
      />

      {/* 2. The Main Circular Breathing Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered ? 'w-14 h-14' : 'w-9 h-9'
        } ${isClicked ? 'scale-75' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {/* Breathing Animation Outer Circle */}
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-300 animate-cursor-breathe ${
            isHovered ? 'border-opacity-100 bg-opacity-20' : 'border-opacity-80'
          }`}
          style={{
            borderColor: accent,
            backgroundColor: isHovered ? `${accent}25` : 'transparent',
            boxShadow: `0 0 16px ${accent}60, inset 0 0 8px ${accent}30`,
          }}
        />

        {/* Ambient Pulsing Aura Halo */}
        <div
          className="absolute -inset-1 rounded-full blur-[6px] opacity-40 pointer-events-none animate-pulse-glow"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
};
