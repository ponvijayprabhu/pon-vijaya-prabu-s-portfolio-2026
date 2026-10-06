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
          {/* FLOATING SATELLITE 3D APP LOGOS (High-Fidelity 3D Lighting & Geometry) */}
          
          {/* 1. Canva (3D App Tile, Top Left) */}
          <div
            className="absolute top-4 left-4 sm:top-8 sm:left-12 lg:left-24 -rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Canva Pro"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #00C4CC 0%, #7D2AE8 70%, #250B54 100%)',
                boxShadow: '0 16px 30px -6px rgba(0, 196, 204, 0.45), 0 8px 12px -4px rgba(125, 42, 232, 0.35), inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.4)',
                transform: 'rotateX(8deg) rotateY(-8deg)',
              }}
            >
              {/* Inner glossy highlight and 3D script */}
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/20 to-transparent">
                <span className="text-white font-serif italic font-extrabold text-base sm:text-lg tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Canva
                </span>
              </div>
            </div>
          </div>

          {/* 2. Blender 3D (Authentic 3D Blender Logo, Top Center) */}
          <div
            className="absolute -top-2 sm:top-2 left-1/2 -translate-x-16 sm:-translate-x-20 rotate-6 hover:rotate-0 transition-all duration-300 group cursor-default z-20"
            style={{ perspective: '800px' }}
            title="Blender 3D"
          >
            <div
              className="w-13 h-13 sm:w-15 sm:h-15 rounded-[22px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative"
              style={{
                background: 'linear-gradient(145deg, #FF9E2C 0%, #E87D0D 60%, #994800 100%)',
                boxShadow: '0 16px 28px -6px rgba(232, 125, 13, 0.55), inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.4)',
                transform: 'rotateX(10deg) rotateY(6deg)',
              }}
            >
              {/* 3D Blender Vector Emblem */}
              <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none">
                {/* 3 radiating 3D arms */}
                <path d="M12 4.5L12 9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M5.5 8L9.5 10.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M18.5 8L14.5 10.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                {/* Orange outer circle with white ring */}
                <circle cx="12" cy="14" r="6" fill="#EA7600" stroke="#FFFFFF" strokeWidth="2.2" />
                {/* 3D blue pupil core */}
                <circle cx="12" cy="14" r="3" fill="#2255EE" />
                <circle cx="11.2" cy="13.2" r="1" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* 3. Adobe Illustrator (Ai) (3D Beveled Tile, Top Right) */}
          <div
            className="absolute top-4 right-4 sm:top-8 sm:right-16 lg:right-28 rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Adobe Illustrator"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #331A00 0%, #1A0D00 100%)',
                border: '2px solid #FF9A00',
                boxShadow: '0 16px 30px -6px rgba(255, 154, 0, 0.45), inset 0 2px 2px rgba(255, 200, 100, 0.5), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(8deg) rotateY(10deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <span className="font-mono font-black text-2xl sm:text-3xl text-[#FF9A00] tracking-tight drop-shadow-[0_2px_4px_rgba(255,154,0,0.5)]">
                  Ai
                </span>
              </div>
            </div>
          </div>

          {/* 4. CapCut (3D Circular Token, Bottom Left) */}
          <div
            className="absolute bottom-6 left-6 sm:bottom-12 sm:left-20 -rotate-6 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="CapCut Video"
          >
            <div
              className="w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, #E0E0E0 60%, #B8B8B8 100%)',
                boxShadow: '0 14px 26px -6px rgba(0, 0, 0, 0.6), inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -3px 4px rgba(0,0,0,0.3)',
                transform: 'rotateX(-6deg) rotateY(-8deg)',
              }}
            >
              {/* Authentic 3D CapCut Polygon Ribbon Icon */}
              <svg className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6L11 11L4 16L7 12L4 6Z"
                  fill="#0D0D0C"
                />
                <path
                  d="M20 6L13 11L20 16L17 12L20 6Z"
                  fill="#0D0D0C"
                />
              </svg>
            </div>
          </div>

          {/* 5. Adobe After Effects (Ae) (3D Indigo Tile, Bottom Center-Left) */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-24 sm:-translate-x-32 rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Adobe After Effects"
          >
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-[18px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1A0033 0%, #0A0019 100%)',
                border: '2px solid #9999FF',
                boxShadow: '0 16px 28px -6px rgba(153, 153, 255, 0.45), inset 0 2px 2px rgba(200, 200, 255, 0.5), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(-8deg) rotateY(-6deg)',
              }}
            >
              <div className="w-full h-full rounded-[16px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <span className="font-mono font-black text-xl sm:text-2xl text-[#9999FF] tracking-tight drop-shadow-[0_2px_4px_rgba(153,153,255,0.5)]">
                  Ae
                </span>
              </div>
            </div>
          </div>

          {/* 6. Adobe Photoshop (Ps) (3D Cyan Tile, Bottom Right) */}
          <div
            className="absolute bottom-6 right-6 sm:bottom-12 sm:right-20 -rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Adobe Photoshop"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #001A33 0%, #000D1A 100%)',
                border: '2px solid #31A8FF',
                boxShadow: '0 16px 30px -6px rgba(49, 168, 255, 0.45), inset 0 2px 2px rgba(100, 210, 255, 0.5), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(-8deg) rotateY(10deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <span className="font-mono font-black text-2xl sm:text-3xl text-[#31A8FF] tracking-tight drop-shadow-[0_2px_4px_rgba(49,168,255,0.5)]">
                  Ps
                </span>
              </div>
            </div>
          </div>

          {/* 7. Figma (3D Glassmorphic Badge Pill, Top Floating) */}
          <div
            className="absolute -top-3 sm:top-0 right-1/2 translate-x-28 sm:translate-x-36 rotate-6 hover:rotate-0 transition-all duration-300 group z-20 cursor-default"
            style={{ perspective: '800px' }}
            title="Figma UI/UX"
          >
            <div
              className="px-4 py-2 rounded-full flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(145deg, #2A2A28 0%, #141412 100%)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 16px 28px -6px rgba(0, 0, 0, 0.6), inset 0 2px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.5)',
                transform: 'rotateX(8deg) rotateY(4deg)',
              }}
            >
              {/* 3D Figma Spherical Color Nodes */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F24E1E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#A259FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#0ACF83] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
              </div>
              <span className="text-xs font-black text-white tracking-wider drop-shadow-sm">Figma</span>
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
