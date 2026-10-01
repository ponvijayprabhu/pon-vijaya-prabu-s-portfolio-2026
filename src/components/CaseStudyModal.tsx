import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, CheckCircle, Wrench, Quote, ExternalLink } from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { selectedProject, setSelectedProject, accent } = usePortfolio();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0D0D0C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#141412] border border-[#2A2A26] shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden flex flex-col gap-8 text-[#F2EFE8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close Button */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#242420]">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-wider uppercase text-[#8C8981] mb-2">
              <span>{selectedProject.category}</span>
              <span>·</span>
              <span>{selectedProject.client}</span>
              <span>·</span>
              <span>{selectedProject.year}</span>
            </div>
            <h2 id="case-study-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F2EFE8]">
              {selectedProject.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            aria-label="Close Case Study"
            className="p-2.5 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] hover:border-[#3E3E38] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Project Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#181815] border border-[#262622]">
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8C8981]">Role</div>
            <div className="text-sm font-semibold text-[#F2EFE8] mt-1">{selectedProject.role}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8C8981]">Timeline</div>
            <div className="text-sm font-semibold text-[#F2EFE8] mt-1">{selectedProject.timeline}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8C8981]">Client</div>
            <div className="text-sm font-semibold text-[#F2EFE8] mt-1">{selectedProject.client}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8C8981]">Year</div>
            <div className="text-sm font-semibold text-[#F2EFE8] mt-1">{selectedProject.year}</div>
          </div>
        </div>

        {/* Narrative Section: The Problem & Research */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-[#F2EFE8] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            The Challenge & Research Insights
          </h3>
          <p className="text-base text-[#ABA79E] leading-relaxed">
            {selectedProject.problem}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {selectedProject.researchInsights.map((insight, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#191916] border border-[#262622] flex flex-col gap-2"
              >
                <span className="font-mono text-xs text-[#8C8981]">Insight 0{idx + 1}</span>
                <p className="text-xs sm:text-sm text-[#CBC7BD] leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Section: The Solution */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-[#F2EFE8] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            Design Solution & Experience Architecture
          </h3>
          <p className="text-base text-[#ABA79E] leading-relaxed">
            {selectedProject.solution}
          </p>
        </div>

        {/* Quantified Impact Metrics */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#181816] border border-[#2B2B26]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8C8981]">
            Quantifiable Business & UX Outcomes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {selectedProject.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-4xl font-extrabold tracking-tight tabular-nums"
                  style={{ color: accent }}
                >
                  {metric.value}
                </span>
                <span className="text-sm font-semibold text-[#F2EFE8]">{metric.label}</span>
                <span className="text-xs text-[#8C8981]">{metric.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Tool Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C8981] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A09C94]" /> Key Deliverables
            </span>
            <ul className="flex flex-col gap-2">
              {selectedProject.deliverables.map((item, i) => (
                <li key={i} className="text-sm text-[#CBC7BD] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#5A5954]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C8981] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#A09C94]" /> Tools & Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-lg bg-[#20201D] text-[#E0DDD5] border border-[#2E2E2A]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonial if available */}
        {selectedProject.testimonial && (
          <div className="p-5 rounded-2xl bg-[#181815] border border-[#282824] flex items-start gap-4">
            <Quote className="w-8 h-8 shrink-0 opacity-40" style={{ color: accent }} />
            <div className="flex flex-col gap-2">
              <p className="text-sm sm:text-base italic text-[#E2DFD6] leading-relaxed">
                "{selectedProject.testimonial.quote}"
              </p>
              <div className="text-xs font-semibold text-[#F2EFE8]">
                {selectedProject.testimonial.author} · <span className="text-[#8C8981]">{selectedProject.testimonial.title}, {selectedProject.testimonial.company}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA to Discuss Similar Project */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#242420]">
          <span className="text-sm text-[#8C8981]">
            Interested in scaling your product with similar rigor?
          </span>
          <a
            href="#contact"
            onClick={() => setSelectedProject(null)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#0D0D0C] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: accent }}
          >
            <span>Discuss this project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
