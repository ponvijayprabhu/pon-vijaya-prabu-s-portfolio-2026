import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { testimonialsData } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { accent } = usePortfolio();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            05 — Endorsements & Trust
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.95]">
            What teams{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              say
            </em>
          </h2>
        </div>

        <p className="max-w-md text-base text-[#ABA79E] leading-relaxed">
          Reflections from product leaders, engineering heads, and startup founders after shipping mission-critical interfaces together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-2xl bg-[#141412] border border-[#262622] flex flex-col justify-between gap-8 relative group transition-colors hover:border-[#383832]"
          >
            <div className="flex flex-col gap-5">
              <Quote className="w-8 h-8 opacity-30" style={{ color: accent }} />
              <p className="text-base text-[#CBC7BD] leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-[#20201D]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-[#0D0D0C]"
                style={{ backgroundColor: accent }}
              >
                {item.avatarText}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#F2EFE8]">{item.author}</span>
                <span className="text-xs text-[#8C8981]">
                  {item.role} · {item.company}
                </span>
                <span className="text-[11px] font-mono text-[#6A6862] mt-0.5">
                  Ref: {item.projectRelation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
