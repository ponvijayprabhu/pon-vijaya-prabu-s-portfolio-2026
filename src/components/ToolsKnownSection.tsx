import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PenTool, CheckCircle2, Sparkles, Layers, Sliders, ExternalLink } from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  category: 'uiux' | 'graphics' | 'motion' | 'collab';
  categoryLabel: string;
  badgeBg: string;
  badgeTextColor: string;
  shortCode: string;
  proficiency: number;
  experience: string;
  description: string;
  deliverables: string[];
  projectsUsedIn: string[];
}

export const ToolsKnownSection: React.FC = () => {
  const { accent, profile } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'uiux' | 'graphics' | 'motion' | 'collab'>('all');
  const [selectedToolId, setSelectedToolId] = useState<string>('figma');

  const tools: ToolItem[] = [
    {
      id: 'figma',
      name: 'Figma',
      category: 'uiux',
      categoryLabel: 'UI/UX Design',
      badgeBg: 'bg-[#1E1E1E]',
      badgeTextColor: 'text-[#0ACF83]',
      shortCode: 'Fg',
      proficiency: 98,
      experience: 'Primary Daily Workflow',
      description: 'Core tool for end-to-end product design, autolayout architectures, design token variables, component libraries, and interactive high-fidelity prototypes.',
      deliverables: ['Design Systems', 'Auto-Layout Wireframes', 'Clickable Prototypes', 'Responsive Breakpoints'],
      projectsUsedIn: ['EMR Healthcare', 'HRMS Platform', 'AI Smart Studio', 'Logistics Tracker'],
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      category: 'graphics',
      categoryLabel: 'Vector & Branding',
      badgeBg: 'bg-[#330000]',
      badgeTextColor: 'text-[#FF9A00]',
      shortCode: 'Ai',
      proficiency: 94,
      experience: 'Advanced Vector Creation',
      description: 'Used for crafting precision SVG icons, geometric typography, scalable brand marks, vector illustrations, and visual guidelines.',
      deliverables: ['Custom Icon Sets', 'Vector Assets (SVG)', 'Logo Marks', 'Brand Guidelines'],
      projectsUsedIn: ['Brand Visuals', 'App Iconography', 'Design System Assets'],
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      category: 'graphics',
      categoryLabel: 'Visual Design',
      badgeBg: 'bg-[#001E36]',
      badgeTextColor: 'text-[#31A8FF]',
      shortCode: 'Ps',
      proficiency: 90,
      experience: 'Visual Polish & Mockups',
      description: 'Image retouching, realistic 3D device mockup composition, high-resolution texture preparation, and pixel-level visual art.',
      deliverables: ['Device Mockups', 'Image Post-Processing', 'Marketing Banners', 'Visual Composites'],
      projectsUsedIn: ['Project Case Study Covers', 'Marketing Creatives', 'Hero Imagery'],
    },
    {
      id: 'canva',
      name: 'Canva Pro',
      category: 'graphics',
      categoryLabel: 'Layout & Presentation',
      badgeBg: 'bg-[#00C4CC]',
      badgeTextColor: 'text-[#0D0D0C]',
      shortCode: 'Canva',
      proficiency: 95,
      experience: 'Fast Turnaround Layouts',
      description: 'Rapid design execution for stakeholder pitch decks, social media banners, client sprint reports, and marketing presentations.',
      deliverables: ['Client Pitch Decks', 'Social Collateral', 'Executive Summaries', 'Brand Decks'],
      projectsUsedIn: ['Client Presentations', 'Portfolio Assets', 'Design Briefs'],
    },
    {
      id: 'adobexd',
      name: 'Adobe XD',
      category: 'uiux',
      categoryLabel: 'UI/UX Prototyping',
      badgeBg: 'bg-[#470137]',
      badgeTextColor: 'text-[#FF61F6]',
      shortCode: 'Xd',
      proficiency: 88,
      experience: 'Interaction Flows',
      description: 'Experience wireframing, rapid user flows, micro-interaction mockups, and client handoff assets.',
      deliverables: ['Screen Flows', 'Interactive Wireframes', 'Component States', 'Spec Sheets'],
      projectsUsedIn: ['Mobile App Layouts', 'Enterprise Systems'],
    },
    {
      id: 'miro',
      name: 'Miro',
      category: 'collab',
      categoryLabel: 'Research & Whiteboard',
      badgeBg: 'bg-[#FFD02F]',
      badgeTextColor: 'text-[#050038]',
      shortCode: 'Miro',
      proficiency: 92,
      experience: 'Discovery & Journey Maps',
      description: 'Collaborative user journey mapping, design sprint discovery workshops, information architecture schematics, and affinity mapping.',
      deliverables: ['User Journey Maps', 'Information Architecture', 'Sprint Whiteboards', 'Affinity Diagrams'],
      projectsUsedIn: ['EMR Healthcare Discovery', 'HRMS User Journey'],
    },
    {
      id: 'aftereffects',
      name: 'Adobe After Effects',
      category: 'motion',
      categoryLabel: 'UI Motion & Animation',
      badgeBg: 'bg-[#00005B]',
      badgeTextColor: 'text-[#9999FF]',
      shortCode: 'Ae',
      proficiency: 85,
      experience: 'UI Micro-Interactions',
      description: 'Motion design for seamless UI state transitions, animated icon choreography, Lottie animation export, and portfolio sizzle reels.',
      deliverables: ['Lottie JSON Animations', 'Micro-Interactions', 'Video Prototype Reels', 'Loading Loops'],
      projectsUsedIn: ['Interaction Demos', 'Interactive States'],
    },
    {
      id: 'blender',
      name: 'Blender 3D',
      category: 'motion',
      categoryLabel: '3D & Spatial Assets',
      badgeBg: 'bg-[#E87D0D]',
      badgeTextColor: 'text-[#F2EFE8]',
      shortCode: '3D',
      proficiency: 80,
      experience: '3D Elements & Mockups',
      description: 'Isometric 3D modeling for landing page hero illustrations, spatial hardware mockups, and dynamic lighting renders.',
      deliverables: ['3D Device Models', 'Isometric Illustrations', 'Ambient Product Renders'],
      projectsUsedIn: ['Case Study 3D Frames', 'Hero Visuals'],
    },
    {
      id: 'capcut',
      name: 'CapCut',
      category: 'motion',
      categoryLabel: 'Video & Prototype Demos',
      badgeBg: 'bg-[#161616]',
      badgeTextColor: 'text-[#FFFFFF]',
      shortCode: 'CC',
      proficiency: 90,
      experience: 'Fast Video Editing',
      description: 'Recording and editing mobile app walkthroughs, UX demo videos, speed-design reels, and client product video overviews.',
      deliverables: ['App Walkthrough Clips', 'Prototype Screen Recordings', 'Social UX Reels'],
      projectsUsedIn: ['Interactive Video Overviews', 'Social Showcase'],
    },
  ];

  const filteredTools = activeFilter === 'all'
    ? tools
    : tools.filter((t) => t.category === activeFilter);

  const selectedTool = tools.find((t) => t.id === selectedToolId) || tools[0];

  return (
    <section id="tools" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            03 — Content & Tools Known
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

        <div className="max-w-md flex flex-col gap-4">
          <p className="text-base text-[#ABA79E] leading-relaxed">
            Industry-standard design suites, vector tools, prototyping engines, and collaborative whiteboards mastered across client projects.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#171715] rounded-xl border border-[#262623] self-start">
            {[
              { id: 'all', label: 'All Tools (9)' },
              { id: 'uiux', label: 'UI/UX' },
              { id: 'graphics', label: 'Graphic & Vector' },
              { id: 'motion', label: 'Motion & 3D' },
              { id: 'collab', label: 'Whiteboard' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-[#262622] text-[#F2EFE8] shadow-sm font-semibold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
                style={
                  activeFilter === f.id
                    ? { borderBottom: `2px solid ${accent}` }
                    : {}
                }
              >
                {f.label}
              </button>
            ))}
          </div>
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
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#141412] p-8 sm:p-12 md:p-16 mb-16 shadow-2xl">
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

        {/* Top canvas bar: Vector Mode indicator */}
        <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[#242420] text-xs font-mono text-[#8C8981] mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="uppercase tracking-wider">Vector Canvas · 100% Bezier Precision</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>TOOLBOX: ACTIVE</span>
            <span>ZOOM: 100%</span>
            <span>SNAP: ON</span>
          </div>
        </div>

        {/* Centerpiece Vector Stage */}
        <div className="relative z-10 py-12 sm:py-20 flex flex-col items-center justify-center">
          {/* FLOATING SATELLITE TOOL BADGES (Positions matching the inspiration graphic) */}
          
          {/* 1. Canva (Top Left) */}
          <div
            onClick={() => setSelectedToolId('canva')}
            className="absolute top-4 left-4 sm:top-8 sm:left-12 lg:left-24 -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="Canva Pro - Click to inspect"
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
            onClick={() => setSelectedToolId('blender')}
            className="absolute top-0 sm:top-4 left-1/2 -translate-x-16 sm:-translate-x-20 rotate-6 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="Blender 3D - Click to inspect"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#E87D0D] border border-[#FFA544] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <span className="text-white font-mono font-black text-xs sm:text-sm">3D</span>
            </div>
            <span className="sr-only">Blender</span>
          </div>

          {/* 3. Adobe Illustrator (Ai) (Top Right) */}
          <div
            onClick={() => setSelectedToolId('illustrator')}
            className="absolute top-4 right-4 sm:top-8 sm:right-16 lg:right-28 rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="Adobe Illustrator - Click to inspect"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#261300] border-2 border-[#FF9A00] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#FF9A00]">Ai</span>
            </div>
            <span className="sr-only">Adobe Illustrator</span>
          </div>

          {/* 4. CapCut / Miro (Bottom Left) */}
          <div
            onClick={() => setSelectedToolId('capcut')}
            className="absolute bottom-6 left-6 sm:bottom-12 sm:left-20 -rotate-6 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="CapCut Video - Click to inspect"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center font-black text-xs sm:text-sm shadow-xl hover:scale-110 transition-transform border border-gray-300">
              <span className="text-black font-extrabold text-base">⧖</span>
            </div>
            <span className="sr-only">CapCut</span>
          </div>

          {/* 5. Adobe After Effects (Ae) (Bottom Center-Left) */}
          <div
            onClick={() => setSelectedToolId('aftereffects')}
            className="absolute bottom-2 left-1/2 -translate-x-24 sm:-translate-x-32 rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="Adobe After Effects - Click to inspect"
          >
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#000033] border-2 border-[#9999FF] flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
              <span className="font-mono font-bold text-sm sm:text-base text-[#9999FF]">Ae</span>
            </div>
            <span className="sr-only">After Effects</span>
          </div>

          {/* 6. Adobe Photoshop (Ps) (Bottom Right) */}
          <div
            onClick={() => setSelectedToolId('photoshop')}
            className="absolute bottom-6 right-6 sm:bottom-12 sm:right-20 -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer group"
            title="Adobe Photoshop - Click to inspect"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#001E36] border-2 border-[#31A8FF] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#31A8FF]">Ps</span>
            </div>
            <span className="sr-only">Adobe Photoshop</span>
          </div>

          {/* 7. Figma (Top Floating Banner Pill) */}
          <div
            onClick={() => setSelectedToolId('figma')}
            className="absolute -top-3 sm:top-0 right-1/2 translate-x-28 sm:translate-x-36 rotate-6 hover:rotate-0 transition-transform duration-300 cursor-pointer group z-20"
            title="Figma UI/UX - Click to inspect"
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
            {/* Vector Bounding Box around "port" */}
            <div className="relative border-2 border-[#FF6B35]/70 px-2 py-1 rounded-sm flex items-center">
              {/* 4 Corner Anchor Handles */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />

              {/* Left Word Segment: "port" */}
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#F2EFE8] leading-none">
                port
              </span>
            </div>

            {/* THE TALL SWEEPING SCRIPT 'f' LIGATURE */}
            <div className="relative mx-1 sm:mx-2 z-20 flex items-center justify-center">
              {/* Top and Bottom Bezier Handle Bars */}
              <div className="absolute -top-6 sm:-top-8 w-12 sm:w-16 h-0.5 bg-[#FF6B35] flex justify-between items-center">
                <span className="w-2 h-2 rounded-full bg-white border border-[#FF6B35]" />
                <span className="w-2 h-2 rounded-full bg-white border border-[#FF6B35]" />
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 w-12 sm:w-16 h-0.5 bg-[#FF6B35] flex justify-between items-center">
                <span className="w-2 h-2 rounded-full bg-white border border-[#FF6B35]" />
                <span className="w-2 h-2 rounded-full bg-white border border-[#FF6B35]" />
              </div>

              {/* Calligraphic Script 'f' */}
              <span
                className="font-serif italic text-7xl sm:text-9xl md:text-[140px] lg:text-[170px] leading-none select-none drop-shadow-2xl font-normal"
                style={{
                  color: accent === '#D4F36B' ? '#FF6B35' : accent,
                  transform: 'translateY(-4px)',
                }}
              >
                f
              </span>
            </div>

            {/* Vector Bounding Box around "olio" */}
            <div className="relative border-2 border-[#FF6B35]/70 px-2 py-1 rounded-sm flex items-center">
              {/* 4 Corner Anchor Handles */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#FF6B35] rounded-xs" />

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

            {/* Color Swatch Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF6B35] border border-black/40 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#0D0D0C] border border-[#444] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#F2EFE8] border border-black/40 shadow-sm" />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
            </div>

            <span className="font-extrabold text-[#F2EFE8] tracking-wider">
              {profile.name.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          DETAILED "TOOLS KNOWN" CARDS GRID
          Shows proficiency, key deliverables, and client project uses
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const isSelected = tool.id === selectedToolId;

          return (
            <div
              key={tool.id}
              onClick={() => setSelectedToolId(tool.id)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 ${
                isSelected
                  ? 'bg-[#181815] border-[#4A4A42] shadow-xl ring-1 ring-white/10'
                  : 'bg-[#131311] border-[#242420] hover:border-[#383832] hover:bg-[#161614]'
              }`}
            >
              <div>
                {/* Header: Badge & Category */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${tool.badgeBg} ${tool.badgeTextColor} flex items-center justify-center font-mono font-bold text-base shadow-md border border-white/10`}
                    >
                      {tool.shortCode}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#F2EFE8] leading-tight">
                        {tool.name}
                      </h3>
                      <span className="text-xs font-mono text-[#8C8981]">
                        {tool.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#20201D] border border-[#2E2E2A] text-[#CBC7BD]">
                    {tool.proficiency}%
                  </span>
                </div>

                {/* Proficiency Progress Bar */}
                <div className="w-full h-1.5 bg-[#20201D] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tool.proficiency}%`,
                      backgroundColor: accent,
                    }}
                  />
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#ABA79E] leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Key Deliverables Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1A1A17] text-[#CBC7BD] border border-[#282824]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Client Projects reference */}
              <div className="pt-3 border-t border-[#22221E] flex items-center justify-between text-[11px] font-mono text-[#8C8981]">
                <span>Experience: {tool.experience}</span>
                <span className="flex items-center gap-1 text-[#CBC7BD]">
                  <CheckCircle2 className="w-3 h-3 text-[#8FD400]" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
