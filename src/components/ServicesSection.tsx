import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { servicesData } from '../data/portfolioData';
import { ChevronDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { accent } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>('ux-research');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            02 — Services & Capabilities
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.95]">
            How I can{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              help
            </em>
          </h2>
        </div>

        <p className="max-w-md text-base text-[#ABA79E] leading-relaxed">
          End-to-end product design from user discovery to production handoff, or specialized assistance on specific design bottlenecks.
        </p>
      </div>

      {/* Services Expandable List */}
      <div className="flex flex-col border-b border-[#262623]">
        {servicesData.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              className="border-t border-[#262623] transition-colors duration-200 hover:bg-[#141412] group"
            >
              {/* Clickable Row Header */}
              <div
                onClick={() => toggleExpand(service.id)}
                className="py-8 md:py-10 px-4 md:px-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Number & Title */}
                <div className="flex items-center gap-6 md:gap-12 min-w-[280px] lg:min-w-[360px]">
                  <span className="font-mono text-sm tracking-wider text-[#8C8981]">
                    {service.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F2EFE8] group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Short Summary (Desktop) */}
                <p className="text-sm md:text-base text-[#ABA79E] max-w-xl hidden sm:block leading-relaxed">
                  {service.summary}
                </p>

                {/* Round Toggle Indicator Button */}
                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <span
                    className={`w-12 h-12 rounded-full border border-[#3A3934] group-hover:border-[#F2EFE8] flex items-center justify-center text-[#F2EFE8] transition-all duration-300 ${
                      isExpanded ? 'rotate-180 bg-[#1F1F1C]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Expandable Details Container */}
              {isExpanded && (
                <div className="px-4 md:px-12 pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#1F1F1C] bg-[#11110F] animate-in fade-in duration-200">
                  {/* Deep Description */}
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C8981]">
                      Approach & Methodology
                    </span>
                    <p className="text-base text-[#CBC7BD] leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
                        style={{ color: accent }}
                      >
                        <span>Inquire about {service.title}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="lg:col-span-3 flex flex-col gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C8981]">
                      Tangible Deliverables
                    </span>
                    <ul className="flex flex-col gap-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="text-sm text-[#ABA79E] flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: accent }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Tools */}
                  <div className="lg:col-span-3 flex flex-col gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C8981]">
                      Toolchain
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-md bg-[#1B1B18] border border-[#2B2B26] text-[#E0DDD5]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
