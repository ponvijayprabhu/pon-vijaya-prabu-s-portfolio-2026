import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PenTool } from 'lucide-react';

export const ToolsKnownSection: React.FC = () => {
  const { accent, profile } = usePortfolio();

  return (
    <section id="tools" className="py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-12 max-w-[1560px] 2xl:max-w-[1720px] mx-auto border-t border-[#262623]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-7xl">
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
          THE CREATIVE VECTOR ARTWORK CANVAS (WIDE CINEMATIC CARD)
          Features:
          - Expansive wide widescreen container
          - Wide vector bounding boxes & corner resize handles
          - Bold typography with tall calligraphic bezier 'f'
          - Floating 3D/slanted tool badges distributed across width
          - Pen tool bezier spline with anchor nodes and nib cursor
          - Signature line: UI/UX DESIGNER • PON VIJAYA PRABU S
         ======================================================== */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#141412] p-8 sm:p-14 md:p-20 shadow-2xl">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ backgroundColor: accent }}
        />

        {/* Centerpiece Vector Stage (Expansive, Wide Layout with Generous Breathing Room) */}
        <div className="relative z-10 py-16 sm:py-24 md:py-28 min-h-[560px] sm:min-h-[640px] md:min-h-[700px] w-full flex flex-col items-center justify-center">
          {/* FLOATING SATELLITE 3D APP LOGOS (Wider Distribution Across the Canvas) */}
          
          {/* 1. Canva (3D App Tile, Far Top Left) */}
          <div
            className="absolute top-2 left-2 sm:top-6 sm:left-8 lg:left-14 xl:left-20 -rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Canva Pro"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #00C4CC 0%, #7D2AE8 70%, #250B54 100%)',
                boxShadow: '0 16px 30px -6px rgba(0, 196, 204, 0.45), 0 8px 12px -4px rgba(125, 42, 232, 0.35), inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.4)',
                transform: 'rotateX(8deg) rotateY(-8deg)',
              }}
            >
              {/* Inner glossy highlight and 3D script */}
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/20 to-transparent">
                <span className="text-white font-serif italic font-extrabold text-base sm:text-lg lg:text-xl tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Canva
                </span>
              </div>
            </div>
          </div>

          {/* 2. VN Video Editor (3D Sleek Tile, Top Center-Left) */}
          <div
            className="absolute -top-4 sm:top-0 left-1/2 -translate-x-24 sm:-translate-x-36 md:-translate-x-44 rotate-6 hover:rotate-0 transition-all duration-300 group cursor-default z-20"
            style={{ perspective: '800px' }}
            title="VN Video Editor"
          >
            <div
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 rounded-[22px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative p-0.5"
              style={{
                background: 'linear-gradient(145deg, #2A2A2D 0%, #121214 60%, #060608 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                boxShadow: '0 16px 28px -6px rgba(0, 0, 0, 0.7), inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(10deg) rotateY(6deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/12 to-transparent">
                {/* Authentic Bold 3D "VN" Brandmark */}
                <div className="flex items-center tracking-tighter select-none font-black text-white text-xl sm:text-2xl lg:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <span>V</span>
                  <span className="ml-0.5">N</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Adobe Illustrator (Ai) (3D Beveled Tile, Far Top Right) */}
          <div
            className="absolute top-2 right-2 sm:top-6 sm:right-8 lg:right-14 xl:right-20 rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Adobe Illustrator"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #331A00 0%, #1A0D00 100%)',
                border: '2px solid #FF9A00',
                boxShadow: '0 16px 30px -6px rgba(255, 154, 0, 0.45), inset 0 2px 2px rgba(255, 200, 100, 0.5), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(8deg) rotateY(10deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <span className="font-mono font-black text-2xl sm:text-3xl lg:text-4xl text-[#FF9A00] tracking-tight drop-shadow-[0_2px_4px_rgba(255,154,0,0.5)]">
                  Ai
                </span>
              </div>
            </div>
          </div>

          {/* 4. Miro (3D Yellow Tile, Far Bottom Left - Plenty of Margin) */}
          <div
            className="absolute bottom-2 left-2 sm:bottom-6 sm:left-8 lg:left-14 xl:left-20 -rotate-6 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Miro Whiteboard"
          >
            <div
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #FFE033 0%, #FFD02F 50%, #D4A000 100%)',
                boxShadow: '0 16px 30px -6px rgba(255, 208, 47, 0.45), inset 0 2px 2px rgba(255,255,255,0.7), inset 0 -3px 5px rgba(0,0,0,0.3)',
                transform: 'rotateX(-6deg) rotateY(-8deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/20 to-transparent">
                {/* Official 3D Miro Flag Stripes Icon */}
                <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 17.5L7.8 4L11.5 9.5L8.2 23L4.5 17.5Z" fill="#050038" />
                  <path d="M10.2 17.5L13.5 4L17.2 9.5L13.9 23L10.2 17.5Z" fill="#050038" />
                  <path d="M15.9 17.5L19.2 4L22.9 9.5L19.6 23L15.9 17.5Z" fill="#050038" />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Google AI Studio (3D Obsidian Glow Tile, Bottom Center-Left) */}
          <div
            className="absolute -bottom-2 sm:bottom-2 left-1/2 -translate-x-32 sm:-translate-x-44 md:-translate-x-56 rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Google AI Studio"
          >
            <div
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #182238 0%, #0D111A 60%, #05070A 100%)',
                border: '1.5px solid rgba(138, 180, 248, 0.4)',
                boxShadow: '0 16px 30px -6px rgba(66, 133, 244, 0.5), 0 8px 16px -4px rgba(197, 138, 249, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.5), inset 0 -3px 5px rgba(0, 0, 0, 0.6)',
                transform: 'rotateX(-8deg) rotateY(-6deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/15 via-transparent to-transparent">
                {/* Authentic Google AI Studio Spark Emblem */}
                <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 drop-shadow-[0_2px_8px_rgba(66,133,244,0.7)]" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="googleAiStudioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="35%" stopColor="#8AB4F8" />
                      <stop offset="68%" stopColor="#C58AF9" />
                      <stop offset="100%" stopColor="#FF7769" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2C12 7.52 16.48 12 22 12C16.48 12 12 16.48 12 22C12 16.48 7.52 12 2 12C7.52 12 12 7.52 12 2Z"
                    fill="url(#googleAiStudioGradient)"
                  />
                  <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" opacity="0.95" />
                </svg>
              </div>
            </div>
          </div>

          {/* 6. Adobe Photoshop (Ps) (3D Cyan Tile, Far Bottom Right - Plenty of Margin) */}
          <div
            className="absolute bottom-2 right-2 sm:bottom-6 sm:right-8 lg:right-14 xl:right-20 -rotate-12 hover:rotate-0 transition-all duration-300 group cursor-default"
            style={{ perspective: '800px' }}
            title="Adobe Photoshop"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-[20px] p-0.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #001A33 0%, #000D1A 100%)',
                border: '2px solid #31A8FF',
                boxShadow: '0 16px 30px -6px rgba(49, 168, 255, 0.45), inset 0 2px 2px rgba(100, 210, 255, 0.5), inset 0 -3px 5px rgba(0,0,0,0.6)',
                transform: 'rotateX(-8deg) rotateY(10deg)',
              }}
            >
              <div className="w-full h-full rounded-[18px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <span className="font-mono font-black text-2xl sm:text-3xl lg:text-4xl text-[#31A8FF] tracking-tight drop-shadow-[0_2px_4px_rgba(49,168,255,0.5)]">
                  Ps
                </span>
              </div>
            </div>
          </div>

          {/* 7. Figma (3D Glassmorphic Badge Pill, Top Floating) */}
          <div
            className="absolute -top-5 sm:-top-2 right-1/2 translate-x-36 sm:translate-x-52 md:translate-x-64 rotate-6 hover:rotate-0 transition-all duration-300 group z-20 cursor-default"
            style={{ perspective: '800px' }}
            title="Figma UI/UX"
          >
            <div
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(145deg, #2A2A28 0%, #141412 100%)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 16px 28px -6px rgba(0, 0, 0, 0.6), inset 0 2px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.5)',
                transform: 'rotateX(8deg) rotateY(4deg)',
              }}
            >
              {/* 3D Figma Spherical Color Nodes */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F24E1E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#A259FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0ACF83] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
              </div>
              <span className="text-xs sm:text-sm font-black text-white tracking-wider drop-shadow-sm">Figma</span>
            </div>
          </div>

          {/* SVG Vector Bezier Path Overlay with Pen Tool cursor (Wide Panoramic Arc) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-60 overflow-visible opacity-70"
              viewBox="0 0 800 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spline curve connecting left to center with wider panoramic wave */}
              <path
                d="M 50 115 C 190 155, 300 55, 400 95 C 500 130, 610 50, 750 95"
                stroke={accent}
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              {/* Bezier Anchor Points */}
              <circle cx="50" cy="115" r="5" fill="#FFFFFF" stroke={accent} strokeWidth="2.5" />
              <circle cx="400" cy="95" r="5" fill="#FFFFFF" stroke={accent} strokeWidth="2.5" />
              <circle cx="750" cy="95" r="5" fill="#FFFFFF" stroke={accent} strokeWidth="2.5" />

              {/* Tangent guide line */}
              <line x1="350" y1="115" x2="450" y2="75" stroke="#8C8981" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="350" cy="115" r="3" fill="#8C8981" />
              <circle cx="450" cy="75" r="3" fill="#8C8981" />
            </svg>

            {/* Pen Tool Nib Icon placed on the bezier curve */}
            <div className="absolute top-1/2 left-1/2 -translate-x-12 translate-y-8 sm:translate-y-10 pointer-events-none">
              <div className="p-1.5 rounded-md bg-[#0D0D0C] border border-[#444] shadow-md rotate-45">
                <PenTool className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>

          {/* MAIN TYPOGRAPHIC CENTERPIECE: "portfolio" WITH PROMINENT WIDE BOUNDING BOXES */}
          <div className="relative flex items-center justify-center select-none py-10 my-auto">
            {/* Vector Bounding Box around "port" in GREEN (Prominent Wide Padding) */}
            <div
              className="relative border-2 px-6 sm:px-10 md:px-14 lg:px-16 py-3 sm:py-5 md:py-6 rounded-sm flex items-center shadow-lg"
              style={{ borderColor: accent }}
            >
              {/* 4 Corner Anchor Handles in GREEN */}
              <span
                className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />

              {/* Left Word Segment: "port" */}
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] font-black tracking-wider text-[#F2EFE8] leading-none">
                port
              </span>
            </div>

            {/* THE TALL SWEEPING SCRIPT 'f' LIGATURE IN GREEN (Wide Spacing) */}
            <div className="relative mx-4 sm:mx-8 md:mx-12 lg:mx-16 z-20 flex items-center justify-center">
              {/* Top and Bottom Bezier Handle Bars in GREEN (Wide handle bars) */}
              <div
                className="absolute -top-8 sm:-top-11 w-20 sm:w-28 h-0.5 flex justify-between items-center"
                style={{ backgroundColor: accent }}
              >
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
              </div>
              <div
                className="absolute -bottom-8 sm:-bottom-11 w-20 sm:w-28 h-0.5 flex justify-between items-center"
                style={{ backgroundColor: accent }}
              >
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border"
                  style={{ borderColor: accent }}
                />
              </div>

              {/* Calligraphic Script 'f' in GREEN */}
              <span
                className="font-serif italic text-7xl sm:text-9xl md:text-[150px] lg:text-[185px] leading-none select-none drop-shadow-2xl font-normal"
                style={{
                  color: accent,
                  transform: 'translateY(-4px)',
                }}
              >
                f
              </span>
            </div>

            {/* Vector Bounding Box around "olio" in GREEN (Prominent Wide Padding) */}
            <div
              className="relative border-2 px-6 sm:px-10 md:px-14 lg:px-16 py-3 sm:py-5 md:py-6 rounded-sm flex items-center shadow-lg"
              style={{ borderColor: accent }}
            >
              {/* 4 Corner Anchor Handles in GREEN */}
              <span
                className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 rounded-xs shadow-sm"
                style={{ borderColor: accent }}
              />

              {/* Right Word Segment: "olio" */}
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] font-black tracking-wider text-[#F2EFE8] leading-none">
                olio
              </span>
            </div>
          </div>

          {/* SUB-TITLE SIGNATURE BAR (Generous breathing room and wide margins) */}
          <div className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-xs sm:text-sm font-mono tracking-widest uppercase relative z-10 px-4">
            <span className="font-extrabold text-[#F2EFE8] tracking-wider">
              UI/UX & PRODUCT DESIGNER
            </span>

            {/* Color Swatch Dots in GREEN theme */}
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                style={{ backgroundColor: accent }}
              />
              <span className="w-3.5 h-3.5 rounded-full bg-[#0D0D0C] border border-[#444] shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F2EFE8] border border-black/40 shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#8FD400] border border-black/40 shadow-sm" />
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
