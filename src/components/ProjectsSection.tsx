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

                {/* PROJECT 2: HRMS WORKFORCE DASHBOARD COVER IMAGE */}
                {project.categoryType === 'saas' && (
                  <div className="relative w-full h-full bg-[#111317] overflow-hidden group/img">
                    <img
                      src={getAssetUrl(project.coverImage || '/HRMS-Banner.jpg')}
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
                        <span>View HRMS Case Study</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#F2EFE8]/90 bg-[#0D0D0C]/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#2E2E2A]">
                        HRMS Workforce Platform
                      </span>
                    </div>
                  </div>
                )}

                {/* PROJECT 3: AI SMART STUDIO COVER IMAGE */}
                {project.categoryType === 'ecommerce' && (
                  <div className="relative w-full h-full bg-[#181512] overflow-hidden group/img">
                    <img
                      src={getAssetUrl(project.coverImage || '/AI-Smart-Studio.jpg')}
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
                        <span>View AI Studio Case Study</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#F2EFE8]/90 bg-[#0D0D0C]/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#2E2E2A]">
                        AI Smart Studio
                      </span>
                    </div>
                  </div>
                )}

                {/* PROJECT 4: LOGISTICS FLEET COVER IMAGE */}
                {project.categoryType === 'system' && (
                  <div className="relative w-full h-full bg-[#121416] overflow-hidden group/img">
                    <img
                      src={getAssetUrl(project.coverImage || '/Logistics.jpg')}
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
                        <span>View Logistics Case Study</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#F2EFE8]/90 bg-[#0D0D0C]/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#2E2E2A]">
                        Logistics Fleet & Route Tracker
                      </span>
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
