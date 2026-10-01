import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Printer, Download, Mail, Phone, Globe, Linkedin, Award, GraduationCap, Briefcase, Wrench, CheckCircle } from 'lucide-react';
import { getAssetUrl, defaultAvatar } from '../utils/assetHelper';

export const ResumeModal: React.FC = () => {
  const { profile, isResumeOpen, setIsResumeOpen, accent } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsResumeOpen(false);
    };
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeOpen, setIsResumeOpen]);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0D0D0C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#141412] border border-[#2A2A26] shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden flex flex-col gap-6 text-[#F2EFE8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-[#242420]">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="font-mono text-xs tracking-wider uppercase text-[#8C8981]">
              Verified Resume · Pon Vijaya Prabu S
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print or save as PDF"
              className="p-2 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsResumeOpen(false)}
              aria-label="Close CV dialog"
              className="p-2 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="flex flex-col gap-8 max-h-[75vh] overflow-y-auto pr-2">
          {/* Header with Photo */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#22221F]">
            <div className="flex items-center gap-4">
              <img
                src={getAssetUrl(profile.avatarUrl)}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2E2E2A] shadow-lg shrink-0"
                onError={(e) => {
                  if (e.currentTarget.src !== defaultAvatar) {
                    e.currentTarget.src = defaultAvatar;
                  }
                }}
              />
              <div>
                <h2 id="resume-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F2EFE8]">
                  {profile.name}
                </h2>
                <p className="text-base font-medium mt-0.5" style={{ color: accent }}>
                  {profile.title}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-[#ABA79E]">
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 hover:text-[#F2EFE8] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8C8981]" /> {profile.phone}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:text-[#F2EFE8] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C8981]" /> {profile.email}
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F2EFE8] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#8C8981]" /> linkedin.com/in/pon-vijay-prabhu3774
              </a>
              <a
                href={profile.socials.portfolioLive}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F2EFE8] transition-colors truncate max-w-xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#8C8981]" /> ponvijayprabhu.github.io/portfolio
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981]">
              Professional Summary
            </h3>
            <p className="text-sm text-[#CBC7BD] leading-relaxed">
              {profile.bioSubtext}
            </p>
          </div>

          {/* 2-Column Split: Work & Internship vs Education & Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Work & Internship Experience */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Work Experience */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#A09C94]" /> Work Experience
                </h3>

                <div className="p-4 rounded-2xl bg-[#181816] border border-[#262622] flex flex-col gap-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-sm text-[#F2EFE8]">
                      UI/UX Designer
                    </span>
                    <span className="font-mono text-xs text-[#8C8981]">
                      (Nov 2025 – Present)
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#CBC7BD]">
                    Canvendor software solutions private limited — Nagercoil
                  </div>
                  <ul className="flex flex-col gap-1.5 pt-1 text-xs text-[#A8A59E]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Designed web and mobile interfaces for EMR, AI, HRMS, logistics, and landing page projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Created wireframes, user flows, and interactive prototypes using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Collaborated with developers to deliver responsive and user-friendly designs.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Internship Experience */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#A09C94]" /> Internship Experience
                </h3>

                {/* Canvendor Intern */}
                <div className="p-4 rounded-2xl bg-[#181816] border border-[#262622] flex flex-col gap-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-sm text-[#F2EFE8]">
                      UI/UX Design Intern
                    </span>
                    <span className="font-mono text-xs text-[#8C8981]">
                      Jun 2025 – Oct 2025
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#CBC7BD]">
                    Canvendor software solutions private limited — Nagercoil
                  </div>
                  <ul className="flex flex-col gap-1.5 pt-1 text-xs text-[#A8A59E]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Assisted in designing responsive web and mobile interfaces using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Created wireframes and interactive prototypes for client projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Contributed to EMR Healthcare System and HRMS Platform UI design projects.</span>
                    </li>
                  </ul>
                </div>

                {/* AK Infopark Intern */}
                <div className="p-4 rounded-2xl bg-[#181816] border border-[#262622] flex flex-col gap-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-sm text-[#F2EFE8]">
                      UI/UX Design Intern
                    </span>
                    <span className="font-mono text-xs text-[#8C8981]">
                      Jan 2025
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#CBC7BD]">
                    AK Infopark private limited — Nagercoil
                  </div>
                  <ul className="flex flex-col gap-1.5 pt-1 text-xs text-[#A8A59E]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Designed responsive web and mobile interfaces using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: accent }} />
                      <span>Created wireframes and prototypes to improve user experience.</span>
                    </li>
                  </ul>
                </div>

                {/* Engineering Internships */}
                <div className="p-4 rounded-2xl bg-[#181816] border border-[#262622] flex flex-col gap-3">
                  <div className="text-xs font-bold text-[#E2DFD7]">Engineering Apprenticeships</div>
                  <div className="text-xs text-[#CBC7BD]">
                    <div className="flex justify-between">
                      <span className="font-semibold">R.K. Motors (BOSCH Car Service Center), Nagercoil</span>
                      <span className="font-mono text-[#8C8981]">Jul 2024</span>
                    </div>
                    <p className="text-[11px] text-[#8C8981] mt-0.5">Assisted in vehicle diagnostics, maintenance, and repair operations.</p>
                  </div>
                  <div className="text-xs text-[#CBC7BD] pt-2 border-t border-[#22221F]">
                    <div className="flex justify-between">
                      <span className="font-semibold">Bajaj Bike Service Center, Nagercoil</span>
                      <span className="font-mono text-[#8C8981]">Jul 2023</span>
                    </div>
                    <p className="text-[11px] text-[#8C8981] mt-0.5">Gained practical experience in motorcycle maintenance and workshop operations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Education, Tools, Skills & Certifications */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Education */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#A09C94]" /> Education
                </h3>
                <div className="flex flex-col gap-3">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#181816] border border-[#262622]">
                      <div className="flex justify-between items-start text-xs">
                        <span className="font-bold text-[#F2EFE8]">{edu.degree}</span>
                        <span className="font-mono text-[10px] text-[#8C8981] shrink-0 ml-2">{edu.year}</span>
                      </div>
                      <div className="text-xs text-[#CBC7BD] mt-0.5">{edu.institution}</div>
                      <div className="text-[11px] text-[#8C8981]">{edu.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Tools */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#A09C94]" /> Design Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.designTools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-lg bg-[#20201D] text-[#E0DDD5] border border-[#2E2E2A]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core UI/UX Skills */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A09C94]" /> Core UI/UX Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-lg bg-[#181816] text-[#CBC7BD] border border-[#262622]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#8C8981] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#A09C94]" /> Certifications
                </h3>
                <div className="flex flex-col gap-1.5 text-xs text-[#CBC7BD]">
                  {profile.certifications.map((cert, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-[#20201D] last:border-0">
                      <span>{cert.name}</span>
                      {cert.year && <span className="font-mono text-[10px] text-[#8C8981]">{cert.year}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills & Languages */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <h4 className="text-[11px] font-mono uppercase text-[#8C8981] mb-1.5">Soft Skills</h4>
                  <ul className="text-xs text-[#CBC7BD] flex flex-col gap-1">
                    {profile.softSkills.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase text-[#8C8981] mb-1.5">Languages</h4>
                  <ul className="text-xs text-[#CBC7BD] flex flex-col gap-1">
                    {profile.languages.map((l, i) => (
                      <li key={i}>• {l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Print Button */}
        <div className="pt-4 border-t border-[#242420] flex items-center justify-between">
          <span className="text-xs text-[#8C8981]">
            Phone: <strong className="text-[#F2EFE8]">{profile.phone}</strong> · Email: <strong className="text-[#F2EFE8]">{profile.email}</strong>
          </span>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-[#0D0D0C] flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: accent }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save / Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
