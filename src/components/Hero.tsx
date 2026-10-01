import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { getAssetUrl, defaultHeroPortrait } from '../utils/assetHelper';

export const Hero: React.FC = () => {
  const { profile, accent } = usePortfolio();

  // Mouse tracking state for fluid parallax kinetic movement
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) return;

      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      setMouseOffset({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const textShiftX = mouseOffset.x * 40;
  const textShiftY = mouseOffset.y * 18;
  const textSkew = mouseOffset.x * -2.4;
  const textRotate = mouseOffset.x * 1.2;

  const portraitShiftX = mouseOffset.x * -10;
  const portraitShiftY = mouseOffset.y * -5;

  const letters = 'DESIGNER'.split('');

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen lg:h-[100vh] min-h-[880px] w-full pt-24 pb-8 flex flex-col justify-between overflow-hidden bg-[#0D0D0C]"
    >
      {/* Subtle ambient depth behind center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[850px] h-[600px] lg:h-[850px] rounded-full blur-[160px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, rgba(13,13,12,0) 70%)`,
        }}
      />

      {/* TOP HEADER ROW: Availability pill badge on left & UI/UX portfolio tag on right */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-30 flex items-center justify-between">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#262622] bg-[#161614]/90 backdrop-blur-sm">
          <span
            className="w-2 h-2 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: accent }}
          />
          <span className="text-xs font-medium text-[#EAE6DE] tracking-wide">
            {profile.availableForHire ? 'Available for new projects' : 'Currently in design mode'}
          </span>
        </div>

        {/* Right Monospace Tag */}
        <div className="text-xs font-mono tracking-widest text-[#787870] uppercase">
          UI / UX — PORTFOLIO 2026
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: LAYER 1 - GIANT SOLID "DESIGNER" TYPOGRAPHY (Z-0)            */}
      {/* Kinetic mouse tracking & hover letter interaction                         */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[18%] sm:top-[16%] lg:top-[14%] flex justify-center pointer-events-auto select-none z-0 overflow-hidden"
      >
        <span
          className="font-['Anton',sans-serif] text-[22vw] sm:text-[20vw] lg:text-[18.5vw] tracking-normal leading-none uppercase text-[#E8E4DA] whitespace-nowrap inline-flex cursor-default transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${textShiftX}px, ${textShiftY}px, 0) skewX(${textSkew}deg) rotate(${textRotate}deg)`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          {letters.map((char, index) => {
            const isHover = activeLetter === index;
            return (
              <span
                key={index}
                onMouseEnter={() => setActiveLetter(index)}
                onMouseLeave={() => setActiveLetter(null)}
                className="inline-block transition-all duration-300 transform hover:-translate-y-5 hover:scale-105"
                style={{
                  color: isHover ? accent : '#E8E4DA',
                  textShadow: isHover ? `0 0 35px ${accent}70` : 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: LAYER 2 - HERO PORTRAIT (Z-10)                               */}
      {/* Centered, rising up through DESIGNER, clean and uninterrupted              */}
      {/* ========================================================================= */}
      <div
        className="absolute bottom-0 left-1/2 z-10 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] h-[72vh] sm:h-[80vh] lg:h-[86vh] max-h-[860px] flex items-end justify-center pointer-events-none overflow-visible transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${portraitShiftX}px), ${portraitShiftY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <img
          src={getAssetUrl(profile.avatarUrl)}
          alt={`Portrait of ${profile.name}`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          style={{
            transform: 'scale(1.15)',
            transformOrigin: 'center bottom',
          }}
          className="max-h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300 pointer-events-auto select-none"
          onError={(e) => {
            if (e.currentTarget.src !== defaultHeroPortrait) {
              e.currentTarget.src = defaultHeroPortrait;
            }
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CONTENT ROW: Left Intro & CTAs vs Right Metadata Specs (Z-30)      */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-30 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
        {/* Left Column: Italic Serif Headline, Description, and Pill CTAs */}
        <div className="max-w-lg flex flex-col gap-4">
          <h1 className="font-['Instrument_Serif',serif] italic font-normal text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] text-[#F5F2EB] leading-[1.1] tracking-tight">
            Hi, I'm {profile.name} —
          </h1>

          <p className="text-[#A3A099] text-sm sm:text-[15px] leading-relaxed max-w-md">
            a UI/UX designer crafting clear, human-centred web and mobile products, from the first research question to the final pixel.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-[#0D0D0C] shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: accent }}
            >
              <span>Let's connect</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center px-6 py-3.5 rounded-full text-sm font-medium text-[#F5F2EB] border border-[#2E2E2A] bg-[#161614]/80 hover:border-[#4A4A44] transition-colors"
            >
              See my work
            </a>
          </div>
        </div>

        {/* Right Column: Metadata Specification Rows (Based In, Experience, Focus) */}
        <div className="flex flex-col md:items-end">
          <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col">
            {/* BASED IN */}
            <div className="border-b border-[#22221F] pb-3 mb-3">
              <div className="text-[10px] font-mono tracking-widest text-[#73736C] uppercase mb-1">
                BASED IN
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F5F2EB] tracking-tight">
                {profile.location}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="border-b border-[#22221F] pb-3 mb-3">
              <div className="text-[10px] font-mono tracking-widest text-[#73736C] uppercase mb-1">
                EXPERIENCE
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F5F2EB] tracking-tight">
                {profile.experienceYears}
              </div>
            </div>

            {/* FOCUS */}
            <div className="pb-1">
              <div className="text-[10px] font-mono tracking-widest text-[#73736C] uppercase mb-1">
                FOCUS
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F5F2EB] tracking-tight">
                {profile.focusArea}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING SCROLL DOWN CIRCLE BADGE (Bottom Right Corner)                   */}
      {/* ========================================================================= */}
      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="hidden lg:flex absolute right-8 xl:right-12 bottom-6 z-30 w-24 h-24 items-center justify-center rounded-full group"
      >
        {/* Rotating Circular Text SVG */}
        <svg
          className="animate-spin-slow w-24 h-24 absolute inset-0 pointer-events-none"
          viewBox="0 0 116 116"
          aria-hidden="true"
        >
          <defs>
            <path id="scroll-ring" d="M58 58m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" />
          </defs>
          <text fill="#8C8981" className="font-mono text-[9px] tracking-[3.2px] uppercase font-medium">
            <textPath href="#scroll-ring">SCROLL DOWN • SCROLL DOWN • </textPath>
          </text>
        </svg>

        {/* Center Circular Button with Down Arrow */}
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg text-[#0D0D0C]"
          style={{ backgroundColor: accent }}
        >
          <ArrowDown className="w-4 h-4 stroke-[2.5]" />
        </span>
      </a>
    </section>
  );
};
