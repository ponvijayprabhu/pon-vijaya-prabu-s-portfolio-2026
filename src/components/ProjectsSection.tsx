import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { ArrowUpRight, Check, Eye } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export const ProjectsSection: React.FC = () => {
  const { projects, accent, setSelectedProject, activeCategory, setActiveCategory } = usePortfolio();

  // Local state for interactive preview card widgets
  const [fintechCardBalance, setFintechCardBalance] = useState(24850);
  const [isFintechRebalanced, setIsFintechRebalanced] = useState(false);
  const [selectedDashboardRange, setSelectedDashboardRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [ecommerceMaterial, setEcommerceMaterial] = useState<'Travertine' | 'Burnt Oak' | 'Brushed Brass'>('Travertine');
  const [designSystemSwitch, setDesignSystemSwitch] = useState(true);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'mobile', label: 'EMR Healthcare' },
    { id: 'saas', label: 'HRMS Platform' },
    { id: 'ecommerce', label: 'AI Applications' },
    { id: 'system', label: 'Logistics' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.categoryType === activeCategory);

  // Dynamic bar data based on selected range
  const barData = {
    '24h': [38, 52, 44, 66, 58, 72, 50, 80, 64, 92, 74, 62],
    '7d': [45, 60, 52, 78, 65, 85, 70, 95, 82, 88, 79, 94],
    '30d': [30, 42, 48, 55, 62, 70, 75, 82, 86, 90, 84, 88],
  }[selectedDashboardRange];

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            01 — Selected work
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.95]">
            Selected{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              work
            </em>
          </h2>
        </div>

        <div className="max-w-md flex flex-col gap-4">
          <p className="text-base text-[#ABA79E] leading-relaxed">
            Case studies spanning research, behavioral architecture, wireframing, and shipped high-impact interfaces.
          </p>

          {/* Category Filter Buttons (Functional Segmented Control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#171715] rounded-xl border border-[#262623] self-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#262622] text-[#F2EFE8] shadow-sm font-semibold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
                style={
                  activeCategory === cat.id
                    ? { borderBottom: `2px solid ${accent}` }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid with Asymmetric Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {filteredProjects.map((project, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={project.id}
              className={`flex flex-col gap-6 group ${
                isEven ? 'lg:mt-16' : ''
              }`}
            >
              {/* Card Interactive Preview Frame */}
              <div
                className="relative h-[440px] rounded-2xl overflow-hidden border border-[#262623] transition-all duration-500 hover:border-[#3E3E38] shadow-lg cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Top Corner Metadata (Unboxed text with mono labels) */}
                <div className="absolute top-4 left-5 right-5 z-20 flex justify-between items-center pointer-events-none text-xs font-mono tracking-wider uppercase text-[#8C8981]">
                  <span>{project.client}</span>
                  <span>{project.year}</span>
                </div>

                {/* PROJECT 1: EMR HEALTHCARE CLINICAL COVER IMAGE */}
                {project.categoryType === 'mobile' && (
                  <div className="relative w-full h-full bg-[#141611] overflow-hidden group/img">
                    <img
                      src={getAssetUrl(project.coverImage || '/Healthcare.jpg')}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Cinematic vignette & contrast gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-[#0D0D0C]/25 to-[#0D0D0C]/60" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-bold text-[#0D0D0C] shadow-lg flex items-center gap-1.5"
                        style={{ backgroundColor: accent }}
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>View Clinical Case Study</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#F2EFE8]/90 bg-[#0D0D0C]/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#2E2E2A]">
                        EMR Healthcare
                      </span>
                    </div>
                  </div>
                )}

                {/* PROJECT 2: HRMS WORKFORCE DASHBOARD CONSOLE */}
                {project.categoryType === 'saas' && (
                  <div className="relative w-full h-full bg-[#111317] flex justify-center items-start pt-14 px-4 transition-transform duration-500 group-hover:scale-[1.01]">
                    <div className="w-full max-w-[560px] h-[370px] rounded-xl border border-[#262B33] bg-[#0B0D10] overflow-hidden flex flex-col shadow-2xl">
                      {/* Browser Mockup Top Bar */}
                      <div className="h-9 px-3 bg-[#151920] border-b border-[#20252E] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E05252]/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E0A852]/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#52E073]/80" />
                          <span className="ml-2 font-mono text-[10px] text-[#7A8394]">canvendor-hrms.app/workforce/attendance</span>
                        </div>

                        {/* Interactive Range Selector */}
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {(['24h', '7d', '30d'] as const).map((range) => (
                            <button
                              key={range}
                              onClick={() => setSelectedDashboardRange(range)}
                              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                                selectedDashboardRange === range
                                  ? 'bg-[#293240] text-[#F2EFE8] font-bold'
                                  : 'text-[#6A7282] hover:text-[#CCD2DC]'
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dashboard Interior */}
                      <div className="flex-1 p-4 flex flex-col gap-3">
                        {/* 3 Metric Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-[#14181F] border border-[#212732]">
                            <div className="text-[10px] font-mono text-[#7A8394]">ATTENDANCE</div>
                            <div className="text-base font-bold text-[#F2EFE8] tabular-nums">98.2% On-time</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#14181F] border border-[#212732]">
                            <div className="text-[10px] font-mono text-[#7A8394]">LEAVE REQUESTS</div>
                            <div className="text-base font-bold text-[#F2EFE8] tabular-nums">3 Pending</div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#14181F] border border-[#212732]">
                            <div className="text-[10px] font-mono text-[#7A8394]">PAYROLL AUDIT</div>
                            <div className="text-base font-bold text-[#F2EFE8] tabular-nums">100% Synced</div>
                          </div>
                        </div>

                        {/* Interactive Live Bar Chart */}
                        <div className="flex-1 p-3 rounded-lg bg-[#14181F] border border-[#212732] flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[10px] font-mono text-[#7A8394]">
                            <span>DEPARTMENT ENGAGEMENT INDEX · {selectedDashboardRange.toUpperCase()}</span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                              Active Shifts
                            </span>
                          </div>

                          <div className="h-32 flex items-end gap-1.5 sm:gap-2.5 pt-2 pb-1">
                            {barData.map((h, i) => (
                              <div
                                key={i}
                                className="flex-1 rounded-t-sm transition-all duration-300"
                                style={{
                                  height: `${h}%`,
                                  backgroundColor: i === 9 ? accent : '#2A313E',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 3: AI SMART STUDIO & PROMPT INTERACTION */}
                {project.categoryType === 'ecommerce' && (
                  <div className="relative w-full h-full bg-[#181512] flex justify-center items-start pt-14 px-4 transition-transform duration-500 group-hover:scale-[1.01]">
                    <div className="w-full max-w-[560px] h-[370px] rounded-xl border border-[#2E2822] bg-[#110E0B] overflow-hidden flex flex-col shadow-2xl">
                      {/* Browser header */}
                      <div className="h-9 px-3 bg-[#1B1612] border-b border-[#29221C] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3D332B]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3D332B]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3D332B]" />
                          <span className="ml-2 font-mono text-[10px] text-[#8C7D70]">ai-studio.internal/prompt-generator</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#8C7D70]">LATENCY: 42ms</span>
                      </div>

                      {/* AI Studio Interface */}
                      <div className="flex-1 p-4 flex flex-col gap-3">
                        {/* Prompt Mode Selector */}
                        <div
                          className="flex items-center justify-between pb-2 border-b border-[#241D17]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs font-serif italic text-[#EAE2D8]">
                            AI Workflow Studio
                          </span>
                          <div className="flex items-center gap-1.5">
                            {(['Summary', 'Analysis', 'Code Flow'] as const).map((mode) => (
                              <button
                                key={mode}
                                onClick={() => setEcommerceMaterial(mode as unknown as typeof ecommerceMaterial)}
                                className={`px-2.5 py-0.5 text-[10px] rounded-full transition-colors ${
                                  ecommerceMaterial === (mode as unknown as typeof ecommerceMaterial)
                                    ? 'bg-[#EAE2D8] text-[#0D0D0C] font-semibold'
                                    : 'text-[#8C7D70] hover:text-[#EAE2D8]'
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Prompt Cards */}
                        <div className="grid grid-cols-3 gap-2.5 flex-1">
                          <div className="rounded-lg bg-[#1B1612] border border-[#2B231D] p-2.5 flex flex-col justify-between">
                            <div className="w-full h-16 rounded bg-[#251E18] flex items-center justify-center text-xs font-mono text-[#D4F36B]" style={{ color: accent }}>
                              ⚡ Summarizer
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#F2EFE8]">Executive Brief</div>
                              <div className="text-[10px] text-[#8C7D70]">1-Click document digest</div>
                            </div>
                          </div>

                          <div className="rounded-lg bg-[#1B1612] border border-[#2B231D] p-2.5 flex flex-col justify-between">
                            <div className="w-full h-16 rounded bg-[#251E18] flex items-center justify-center text-xs font-mono text-[#D4F36B]" style={{ color: accent }}>
                              📊 Predictive AI
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#F2EFE8]">Trend Forecast</div>
                              <div className="text-[10px] text-[#8C7D70]">Historical extrapolation</div>
                            </div>
                          </div>

                          <div className="rounded-lg bg-[#1B1612] border border-[#2B231D] p-2.5 flex flex-col justify-between">
                            <div className="w-full h-16 rounded bg-[#251E18] flex items-center justify-center text-xs font-mono text-[#D4F36B]" style={{ color: accent }}>
                              💬 Assistant
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#F2EFE8]">Chat Copilot</div>
                              <div className="text-[10px] text-[#8C7D70]">Contextual responses</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 4: LOGISTICS FLEET & ROUTE DISPATCH TRACKER */}
                {project.categoryType === 'system' && (
                  <div className="relative w-full h-full bg-[#121416] flex justify-center items-start pt-14 px-4 transition-transform duration-500 group-hover:scale-[1.01]">
                    <div className="w-full max-w-[560px] h-[370px] rounded-xl border border-[#23292E] bg-[#0C0E10] p-4 flex flex-col justify-between shadow-2xl">
                      {/* Top Fleet Specimen */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#1E2328]">
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-black text-[#F2EFE8] leading-none">GPS</span>
                          <div>
                            <div className="text-xs font-semibold text-[#F2EFE8]">Fleet Dispatch & Telemetry</div>
                            <div className="text-[10px] font-mono text-[#7D8894]">Route: Nagercoil ⇄ Chennai Express</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#283138] text-[#93A1B0]">
                          LIVE DISPATCH
                        </span>
                      </div>

                      {/* Interactive Logistics Route Info */}
                      <div
                        className="grid grid-cols-2 gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Driver & Truck Status */}
                        <div className="p-3 rounded-lg bg-[#14171A] border border-[#20262C] flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-[#7D8894]">ACTIVE SHIPMENT</span>
                          <div className="text-xs font-bold text-[#F2EFE8]">TRK-9824 · Express Van</div>
                          <div className="text-[11px] text-[#8FD400]">On Schedule (ETA 2.4 hrs)</div>
                        </div>

                        {/* Interactive Toggle */}
                        <div className="p-3 rounded-lg bg-[#14171A] border border-[#20262C] flex flex-col gap-2">
                          <span className="text-[10px] font-mono text-[#7D8894]">GPS RADAR SYNC</span>
                          <div className="flex items-center justify-between pt-1">
                            <button
                              onClick={() => setDesignSystemSwitch(!designSystemSwitch)}
                              className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                                designSystemSwitch ? '' : 'bg-[#29323C]'
                              }`}
                              style={{
                                backgroundColor: designSystemSwitch ? accent : undefined,
                              }}
                            >
                              <div
                                className={`w-5 h-5 rounded-full bg-[#0D0D0C] transition-transform ${
                                  designSystemSwitch ? 'translate-x-6' : 'translate-x-0'
                                }`}
                              />
                            </button>

                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center text-[#0D0D0C]"
                              style={{ backgroundColor: accent }}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Route Waypoints */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1E2328] text-xs">
                        <span className="text-[10px] font-mono text-[#7D8894]">WAYPOINTS:</span>
                        <span className="text-[#8C8981]">Origin: Warehouse A</span>
                        <span className="text-[#8C8981]">→</span>
                        <span className="text-[#8C8981]">Hub: Madurai</span>
                        <span className="text-[#8C8981]">→</span>
                        <span className="text-[#F2EFE8] font-bold">Destination: Chennai</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#0D0D0C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
                  <span
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#0D0D0C] flex items-center gap-1.5 shadow-xl"
                    style={{ backgroundColor: accent }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Read Case Study
                  </span>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono text-xs tracking-wider uppercase text-[#8C8981]">
                    {project.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#F2EFE8] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#ABA79E] leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Round Arrow Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Open case study for ${project.title}`}
                  className="w-13 h-13 rounded-full border border-[#3A3934] hover:border-[#F2EFE8] hover:bg-[#1C1C1A] text-[#F2EFE8] flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
