import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PenTool } from 'lucide-react';

export const ToolsKnownSection: React.FC = () => {
  const { accent, profile } = usePortfolio();

  return (
    <section id="tools" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            03 — Tools & Software Known
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.95]">
            Tools &{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              software
            </em>
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-base text-[#ABA79E] leading-relaxed">
            Industry-standard design suites, vector tools, prototyping engines, and creative software mastered across production environments.
          </p>
        </div>
      </div>

      {/* ========================================================
          THE CREATIVE VECTOR ARTWORK CANVAS (INSPIRED BY USER IMAGE)
          Features:
          - Vector bounding boxes & corner resize handles
          - Bold typography with tall calligraphic bezier 'f'
          - Floating 3D/slanted tool badges orbiting around
          - Pen tool bezier spline with anchor nodes and nib cursor
          - Credit signature line: UI/UX DESIGNER • PON VIJAYA PRABU S
         ======================================================== */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#141412] p-8 sm:p-12 md:p-16 shadow-2xl">
        {/* Subtle dot matrix background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#8C8981 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient atmospheric glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: accent }}
        />

        {/* Centerpiece Vector Stage */}
        <div className="relative z-10 py-12 sm:py-20 flex flex-col items-center justify-center">
          {/* FLOATING SATELLITE TOOL BADGES (Positions matching the inspiration graphic) */}
          
          {/* 1. Canva (Top Left) */}
          <div
            className="absolute top-4 left-4 sm:top-8 sm:left-12 lg:left-24 -rotate-12 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="Canva Pro"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#00C4CC] via-[#7D2AE8] to-[#FF6B35] p-0.5 shadow-xl hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-[#00C4CC] flex items-center justify-center text-white font-serif italic font-bold text-sm sm:text-base tracking-tight shadow-inner">
                Canva
              </div>
            </div>
            <span className="sr-only">Canva</span>
          </div>

          {/* 2. Blender (Top Center) */}
          <div
            className="absolute top-0 sm:top-4 left-1/2 -translate-x-16 sm:-translate-x-20 rotate-6 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="Blender 3D"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#E87D0D] border border-[#FFA544] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <span className="text-white font-mono font-black text-xs sm:text-sm">3D</span>
            </div>
            <span className="sr-only">Blender</span>
          </div>

          {/* 3. Adobe Illustrator (Ai) (Top Right) */}
          <div
            className="absolute top-4 right-4 sm:top-8 sm:right-16 lg:right-28 rotate-12 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="Adobe Illustrator"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#261300] border-2 border-[#FF9A00] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#FF9A00]">Ai</span>
            </div>
            <span className="sr-only">Adobe Illustrator</span>
          </div>

          {/* 4. CapCut / Miro (Bottom Left) */}
          <div
            className="absolute bottom-6 left-6 sm:bottom-12 sm:left-20 -rotate-6 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="CapCut Video"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center font-black text-xs sm:text-sm shadow-xl hover:scale-110 transition-transform border border-gray-300">
              <span className="text-black font-extrabold text-base">⧖</span>
            </div>
            <span className="sr-only">CapCut</span>
          </div>

          {/* 5. Adobe After Effects (Ae) (Bottom Center-Left) */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-24 sm:-translate-x-32 rotate-12 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="Adobe After Effects"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#000033] border-2 border-[#9999FF] flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
              <span className="font-mono font-bold text-sm sm:text-base text-[#9999FF]">Ae</span>
            </div>
            <span className="sr-only">After Effects</span>
          </div>

          {/* 6. Adobe Photoshop (Ps) (Bottom Right) */}
          <div
            className="absolute bottom-6 right-6 sm:bottom-12 sm:right-20 -rotate-12 hover:rotate-0 transition-transform duration-300 group cursor-default"
            title="Adobe Photoshop"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#001E36] border-2 border-[#31A8FF] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#31A8FF]">Ps</span>
            </div>
            <span className="sr-only">Adobe Photoshop</span>
          </div>

          {/* 7. Figma (Top Floating Banner Pill) */}
          <div
            className="absolute -top-3 sm:top-0 right-1/2 translate-x-28 sm:translate-x-36 rotate-6 hover:rotate-0 transition-transform duration-300 group z-20 cursor-default"
            title="Figma UI/UX"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-[#1E1E1E] border border-[#3E3E38] shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform">
              <div className="flex items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-[#F24E1E]" />
                <span className="w-2 h-2 rounded-full bg-[#A259FF]" />
                <span className="w-2 h-2 rounded-full bg-[#0ACF83]" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Figma</span>
            </div>
          </div>

          {/* SVG Vector Bezier Path Overlay with Pen Tool cursor */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full max-w-xl h-48 overflow-visible opacity-70"
              viewBox="0 0 500 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spline curve connecting left to center */}
              <path
                d="M 60 110 C 140 140, 180 60, 260 90 C 330 115, 390 50, 440 90"
                stroke={accent}
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              {/* Bezier Anchor Points */}
              <circle cx="60" cy="110" r="4.5" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
              <circle cx="260" cy="90" r="4.5" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
              <circle cx="440" cy="90" r="4.5" fill="#FFFFFF" stroke={accent} strokeWidth="2" />

              {/* Tangent guide line */}
              <line x1="220" y1="110" x2="300" y2="70" stroke="#8C8981" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="220" cy="110" r="2.5" fill="#8C8981" />
              <circle cx="300" cy="70" r="2.5" fill="#8C8981" />
            </svg>

            {/* Pen Tool Nib Icon placed on the bezier curve */}
            <div className="absolute top-1/2 left-1/2 -translate-x-8 translate-y-6 sm:translate-y-8 pointer-events-none">
              <div className="p-1 rounded bg-[#0D0D0C] border border-[#444] shadow-md rotate-45">
                <PenTool className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* MAIN TYPOGRAPHIC CENTERPIECE: "portfolio" WITH BOUNDING BOXES */}
          <div className="relative flex items-center justify-center select-none py-6">
            {/* Vector Bounding Box around "port" in GREEN */}
            <div
              className="relative border-2 px-2 py-1 rounded-sm flex items-center"
              style={{ borderColor: accent }}
            >
              {/* 4 Corner Anchor Handles in GREEN */}
              <span
                className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />

              {/* Left Word Segment: "port" */}
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#F2EFE8] leading-none">
                port
              </span>
            </div>

            {/* THE TALL SWEEPING SCRIPT 'f' LIGATURE IN GREEN */}
            <div className="relative mx-1 sm:mx-2 z-20 flex items-center justify-center">
              {/* Top and Bottom Bezier Handle Bars in GREEN */}
              <div
                className="absolute -top-6 sm:-top-8 w-12 sm:w-16 h-0.5 flex justify-between items-center"
                style={{ backgroundColor: accent }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
              </div>
              <div
                className="absolute -bottom-6 sm:-bottom-8 w-12 sm:w-16 h-0.5 flex justify-between items-center"
                style={{ backgroundColor: accent }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
              </div>

              {/* Calligraphic Script 'f' in GREEN */}
              <span
                className="font-serif italic text-7xl sm:text-9xl md:text-[140px] lg:text-[170px] leading-none select-none drop-shadow-2xl font-normal"
                style={{
                  color: accent,
                  transform: 'translateY(-4px)',
                }}
              >
                f
              </span>
            </div>

            {/* Vector Bounding Box around "olio" in GREEN */}
            <div
              className="relative border-2 px-2 py-1 rounded-sm flex items-center"
              style={{ borderColor: accent }}
            >
              {/* 4 Corner Anchor Handles in GREEN */}
              <span
                className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 rounded-xs"
                style={{ borderColor: accent }}
              />

              {/* Right Word Segment: "olio" */}
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#F2EFE8] leading-none">
                olio
              </span>
            </div>
          </div>

          {/* SUB-TITLE SIGNATURE BAR (Matching the layout in the uploaded graphic) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase">
            <span className="font-extrabold text-[#F2EFE8] tracking-wider">
              UI/UX & PRODUCT DESIGNER
            </span>

            {/* Color Swatch Dots in GREEN theme */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-black/40 shadow-sm"
                style={{ backgroundColor: accent }}
              />
              <span className="w-3 h-3 rounded-full bg-[#0D0D0C] border border-[#444] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#F2EFE8] border border-black/40 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#8FD400] border border-black/40 shadow-sm" />
            </div>

            <span className="font-extrabold text-[#F2EFE8] tracking-wider">
              {profile.name.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
