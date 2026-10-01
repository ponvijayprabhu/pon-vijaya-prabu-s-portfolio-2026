import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { experienceData } from '../data/portfolioData';
import { Download, FileText, Briefcase, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile, accent, setIsResumeOpen } = usePortfolio();

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      {/* Top Split: Headline Philosophy vs Story Prose */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Left Column: Index & Big Statement */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981]">
            04 — About & Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F2EFE8] leading-[1.08] text-balance">
            Good design isn't decoration. It's the{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              shortest path
            </em>{' '}
            between a person and what they came to do.
          </h2>
        </div>

        {/* Right Column: Bio Prose & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:pt-10">
          <p className="text-base sm:text-lg text-[#CBC7BD] leading-relaxed">
            I'm <strong className="text-[#F2EFE8] font-semibold">{profile.name}</strong>, a UI/UX & Product Designer based in {profile.location}. Over the past 6+ years, I've partnered with seed-to-scaleup founders and enterprise engineering teams to research, design, and ship digital products people find instinctive to use.
          </p>
          <p className="text-base sm:text-lg text-[#ABA79E] leading-relaxed">
            My process is collaborative and evidence-led: understand the humans, map the systemic problem, prototype fast, test with real users, and hand off clean, tokenized systems that developers love implementing.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2.5 text-base font-semibold text-[#F2EFE8] hover:underline underline-offset-4 group transition-colors"
            >
              <FileText className="w-5 h-5 text-[#8C8981] group-hover:text-[#F2EFE8]" />
              <span>View & Download CV</span>
              <Download className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards with Tabular Numerals (Figma, 15+, B.E., MBA) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-[#262623] mb-20">
        <div className="flex flex-col gap-2 pt-4">
          <span
            className="text-7xl sm:text-8xl font-bold tracking-tight text-[#F2EFE8] tabular-nums font-sans"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Figma
          </span>
          <span className="text-sm sm:text-base text-[#ABA79E]">
            Primary design tool for responsive web & mobile UI
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <span
            className="text-7xl sm:text-8xl font-bold tracking-tight text-[#F2EFE8] tabular-nums font-sans"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            15+
          </span>
          <span className="text-sm sm:text-base text-[#ABA79E]">
            Key domain sectors: EMR, AI, HRMS & Logistics
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <span
            className="text-7xl sm:text-8xl font-bold tracking-tight text-[#F2EFE8] tabular-nums font-sans"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            B.E.
          </span>
          <span className="text-sm sm:text-base text-[#ABA79E]">
            Mechanical Engineering background from Stella Mary's
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <span
            className="text-7xl sm:text-8xl font-bold tracking-tight text-[#F2EFE8] tabular-nums font-sans"
            style={{
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            Dip.
          </span>
          <span className="text-sm sm:text-base text-[#ABA79E]">
            Diploma in Mechanical Engineering from N.M.S Kamaraj (2019–2022)
          </span>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="flex flex-col gap-8 pt-8 border-t border-[#262623]">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#F2EFE8] flex items-center gap-2.5">
            <Briefcase className="w-5 h-5" style={{ color: accent }} />
            Work History & Trajectory
          </h3>
          <span className="text-xs font-mono text-[#8C8981]">2019 — PRESENT</span>
        </div>

        <div className="flex flex-col divide-y divide-[#22221F]">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 font-mono text-xs sm:text-sm text-[#8C8981]">
                {exp.period}
              </div>

              <div className="md:col-span-4 flex flex-col gap-1">
                <h4 className="text-xl font-semibold text-[#F2EFE8]">{exp.role}</h4>
                <div className="text-sm text-[#CBC7BD] font-medium">
                  {exp.company} · <span className="text-[#8C8981]">{exp.location}</span>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-3">
                <p className="text-sm text-[#ABA79E] leading-relaxed">
                  {exp.description}
                </p>
                <ul className="flex flex-col gap-1.5 pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#8C8981] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
