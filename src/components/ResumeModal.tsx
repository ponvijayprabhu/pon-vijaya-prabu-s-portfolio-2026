import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Loader2
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { profile, isResumeOpen, setIsResumeOpen, accent } = usePortfolio();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  /**
   * Downloads the official, genuine 1-page vector PDF resume file directly
   * Exactly matching the official resume document.
   */
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const base = import.meta.env.BASE_URL || '/';
      const pdfPath = `${base.replace(/\/$/, '')}/Pon_Vijaya_Prabu_S_Resume.pdf`;
      const link = document.createElement('a');
      link.href = pdfPath;
      link.setAttribute('download', 'Pon_Vijaya_Prabu_S_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading resume PDF:', err);
      window.print();
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 400);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0D0D0C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className="resume-modal-content relative w-full max-w-4xl my-auto rounded-2xl shadow-2xl p-3 sm:p-5 flex flex-col gap-3 bg-[#161614] border border-[#2E2E2A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* TOP CONTROLS & ACTION BAR (HIDDEN IN PRINT)                               */}
        {/* ========================================================================= */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-2 py-1 border-b border-[#2A2A26]">
          {/* Status Label */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[#CBC7BD]">
              Pon Vijaya Prabu S — Official Resume
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              aria-label="Download resume in official PDF format"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#0D0D0C] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: accent }}
              title="Download Official Resume PDF"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Downloading PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              aria-label="Print resume"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#2E2E2A] bg-[#1C1C1A] text-[#CBC7BD] hover:text-[#F2EFE8] transition-colors cursor-pointer"
              title="Print (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              aria-label="Close CV modal"
              className="p-1.5 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESUME DOCUMENT CONTAINER (AUTHENTIC WHITE A4 PAPER SHEET)                */}
        {/* ========================================================================= */}
        <div className="resume-scroll-container max-h-[calc(86vh-90px)] overflow-y-auto rounded-xl">
          <div
            id="printable-resume"
            className="w-full bg-[#FFFFFF] text-[#111827] shadow-xl p-6 sm:p-8 md:p-10 font-sans"
            style={{
              fontFamily: "'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}
          >
            {/* ===================================================================== */}
            {/* HEADER: NAME, TITLE, AND CONTACT BADGES MATRIX                        */}
            {/* ===================================================================== */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
              {/* Left: Name and Title with Underline */}
              <div className="flex flex-col">
                <h1
                  id="resume-title"
                  className="text-2xl sm:text-3xl lg:text-[34px] font-serif tracking-tight font-bold uppercase text-[#111827] leading-none"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  PON VIJAYA PRABU S
                </h1>
                <div className="w-full h-[1px] bg-[#111827] my-1.5" />
                <div
                  className="text-base sm:text-lg font-serif italic text-[#1F2937] font-medium"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  UI/UX Designer
                </div>
              </div>

              {/* Right: Contact Details with Circular Icon Badges */}
              <div className="flex flex-col sm:items-end gap-1.5 text-xs text-[#374151]">
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 hover:text-[#111827] transition-colors"
                >
                  <span className="font-medium text-[#111827]">{profile.phone}</span>
                  <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-[#111827] transition-colors"
                >
                  <span className="font-medium underline underline-offset-2 text-[#111827]">{profile.email}</span>
                  <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </a>

                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#111827] transition-colors"
                >
                  <span className="underline underline-offset-2 text-[#374151]">www.linkedin.com/in/pon-vijay-prabhu3774</span>
                  <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Linkedin className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </a>

                <a
                  href="https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#111827] transition-colors truncate max-w-xs"
                >
                  <span className="underline underline-offset-2 text-[#374151]">https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/</span>
                  <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Globe className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                </a>
              </div>
            </div>

            {/* FULL-WIDTH DIVIDER */}
            <div className="w-full h-[1.5px] bg-[#111827] mb-2.5" />

            {/* ===================================================================== */}
            {/* PROFESSIONAL SUMMARY (CENTERED WITH DIVIDER LINES)                    */}
            {/* ===================================================================== */}
            <div className="py-2 text-center">
              <h2
                className="text-xs sm:text-[13px] font-serif tracking-[0.2em] uppercase font-bold text-[#111827] mb-1.5"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-[12.5px] leading-relaxed text-[#374151] max-w-3xl mx-auto">
                Passionate UI/UX Designer with experience in designing responsive web and mobile applications using Figma. Skilled in wireframing, prototyping, and creating user-centered interfaces that improve usability and user experience.
              </p>
            </div>

            {/* FULL-WIDTH DIVIDER */}
            <div className="w-full h-[1px] bg-[#D1D5DB] my-2" />

            {/* ===================================================================== */}
            {/* TWO COLUMNS SEPARATED BY A VERTICAL DIVIDER                           */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
              {/* ------------------------------------------------------------------- */}
              {/* LEFT COLUMN: EDUCATION, TOOLS, CORE SKILLS, CERTS, LANGUAGES        */}
              {/* ------------------------------------------------------------------- */}
              <div className="sm:col-span-5 flex flex-col gap-4 sm:pr-4 sm:border-r sm:border-[#D1D5DB]">
                {/* EDUCATION */}
                <div className="flex flex-col gap-2">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      EDUCATION
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs">
                    {/* Bachelor */}
                    <div>
                      <div className="font-bold uppercase tracking-tight text-[11px] text-[#111827] leading-tight">
                        BACHELOR IN MECHANICAL ENGINEERING
                      </div>
                      <div className="text-[11px] text-[#4B5563]">Stella Mary's college of engineering</div>
                      <div className="text-[10.5px] text-[#6B7280]">Nagercoil, Kanyakumari</div>
                      <div className="font-semibold text-[10.5px] text-[#111827] mt-0.5">2022-2025</div>
                    </div>

                    {/* MBA */}
                    <div>
                      <div className="font-bold uppercase tracking-tight text-[11px] text-[#111827] leading-tight">
                        MASTER OF BUSINESS ADMINISTRATION (MBA)
                      </div>
                      <div className="text-[11px] text-[#4B5563]">Currently Pursuing</div>
                      <div className="text-[10.5px] text-[#6B7280]">Tamil Nadu, India</div>
                      <div className="font-semibold text-[10.5px] text-[#111827] mt-0.5">2025 – Present</div>
                    </div>

                    {/* SSLC */}
                    <div>
                      <div className="font-bold uppercase tracking-tight text-[11px] text-[#111827] leading-tight">
                        SSLC
                      </div>
                      <div className="text-[11px] text-[#4B5563]">Sri Ramji Matric.Hr.Sec.School</div>
                      <div className="text-[10.5px] text-[#6B7280]">Ganapathipuram, Kanyakumari</div>
                      <div className="font-semibold text-[10.5px] text-[#111827] mt-0.5">2019</div>
                    </div>
                  </div>
                </div>

                {/* DESIGN TOOLS */}
                <div className="flex flex-col gap-1.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      DESIGN TOOLS
                    </h3>
                  </div>
                  <ul className="text-xs flex flex-col gap-1 pl-0.5 text-[#374151]">
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Figma</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Adobe XD</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Adobe Photoshop</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Adobe Illustrator</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Canva</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Miro</span>
                    </li>
                  </ul>
                </div>

                {/* CORE UI/UX SKILLS */}
                <div className="flex flex-col gap-1.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      CORE UI/UX SKILLS
                    </h3>
                  </div>
                  <ul className="text-xs flex flex-col gap-1 pl-0.5 text-[#374151]">
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>User Research</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Wireframing</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Prototyping</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>User Flows</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Responsive Design</span>
                    </li>
                  </ul>
                </div>

                {/* CERTIFICATIONS */}
                <div className="flex flex-col gap-1.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      CERTIFICATIONS
                    </h3>
                  </div>
                  <ul className="text-xs flex flex-col gap-1.5 pl-0.5 text-[#374151]">
                    <li className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                      <span>UI/UX Design Certification</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                      <span>AI and Machine Learning Fundamentals (2024)</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                      <span>Internet of Things (IoT) Certification (2024)</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                      <span>Non-Destructive Testing (NDT) Level 2 Certification (2024)</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                      <span>Master CAM-CNC Lathe and Milling Certification (2023)</span>
                    </li>
                  </ul>
                </div>

                {/* LANGUAGES */}
                <div className="flex flex-col gap-1.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      LANGUAGES
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium pl-0.5 text-[11.5px] text-[#374151]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                      <span>Tamil</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                      <span>English</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* RIGHT COLUMN: WORK EXPERIENCE, INTERNSHIPS, SOFT SKILLS             */}
              {/* ------------------------------------------------------------------- */}
              <div className="sm:col-span-7 flex flex-col gap-4 sm:pl-2">
                {/* WORK EXPERIENCE */}
                <div className="flex flex-col gap-1.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      WORK EXPERIENCE
                    </h3>
                  </div>

                  <div className="flex flex-col gap-0.5 text-xs">
                    <div className="font-bold text-[13px] text-[#111827] leading-snug">
                      UI/UX Designer
                    </div>
                    <div className="font-bold text-[12px] text-[#1F2937]">
                      Canvendor software solutions private limited - Nagercoil
                    </div>
                    <div className="text-[#6B7280] text-[11px] font-medium">
                      (Nov 2025) Present
                    </div>
                    <ul className="flex flex-col gap-1 pt-1 text-[11.5px] leading-relaxed text-[#374151]">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Designed web and mobile interfaces for EMR, AI, HRMS, logistics, and landing page projects.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Created wireframes, user flows, and interactive prototypes using Figma.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Collaborated with developers to deliver responsive and user-friendly designs.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* INTERNSHIP EXPERIENCE */}
                <div className="flex flex-col gap-2.5">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      INTERNSHIP EXPERIENCE
                    </h3>
                  </div>

                  {/* Canvendor Intern */}
                  <div className="flex flex-col gap-0.5 text-xs">
                    <div className="font-bold text-[12.5px] text-[#111827] leading-snug">
                      UI/UX Design Intern
                    </div>
                    <div className="font-bold text-[12px] text-[#1F2937]">
                      Canvendor software solutions private limited - Nagercoil
                    </div>
                    <div className="text-[#6B7280] text-[11px] font-medium">
                      Nagercoil, (Jun 2025 – Oct 2025)
                    </div>
                    <ul className="flex flex-col gap-1 pt-1 text-[11.5px] leading-relaxed text-[#374151]">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Assisted in designing responsive web and mobile interfaces using Figma.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Created wireframes and interactive prototypes for client projects.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Contributed to EMR Healthcare System and HRMS Platform UI design projects.</span>
                      </li>
                    </ul>
                  </div>

                  {/* AK Infopark */}
                  <div className="flex flex-col gap-0.5 text-xs pt-1 border-t border-[#E5E7EB]">
                    <div className="font-bold text-[12px] text-[#111827]">
                      AK Infopark private limited
                    </div>
                    <div className="text-[#6B7280] text-[11px] font-medium">
                      Nagercoil, (Jan 2025 )
                    </div>
                    <ul className="flex flex-col gap-1 pt-0.5 text-[11.5px] leading-relaxed text-[#374151]">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Designed responsive web and mobile interfaces using Figma.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1.5 shrink-0" />
                        <span>Created wireframes and prototypes to improve user experience.</span>
                      </li>
                    </ul>
                  </div>

                  {/* R.K. Motors */}
                  <div className="flex flex-col gap-0.5 text-xs pt-1 border-t border-[#E5E7EB]">
                    <div className="font-bold text-[12px] text-[#111827]">
                      R.K. Motors (BOSCH Car Service Center), Nagercoil
                    </div>
                    <div className="text-[#6B7280] text-[11px] font-medium">
                      (Jul 2024)
                    </div>
                    <p className="text-[11.5px] text-[#374151] pl-3">
                      • Assisted in vehicle diagnostics, maintenance, and repair operations.
                    </p>
                  </div>

                  {/* Bajaj Bike Service */}
                  <div className="flex flex-col gap-0.5 text-xs pt-1 border-t border-[#E5E7EB]">
                    <div className="font-bold text-[12px] text-[#111827]">
                      Bajaj Bike Service Center, Nagercoil
                    </div>
                    <div className="text-[#6B7280] text-[11px] font-medium">
                      (Jul 2023)
                    </div>
                    <p className="text-[11.5px] text-[#374151] pl-3">
                      Gained practical experience in motorcycle maintenance and workshop operations.
                    </p>
                  </div>
                </div>

                {/* SOFT SKILLS */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-[#E5E7EB]">
                  <div className="pb-1 border-b border-[#333333]">
                    <h3
                      className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-[#111827]"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      SOFT SKILLS
                    </h3>
                  </div>
                  <ul className="text-xs flex flex-col gap-1 pl-0.5 text-[#374151]">
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Problem Solving</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Leadership</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Project & Time Management</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Team Collaboration</span>
                    </li>
                    <li className="flex items-center gap-2 text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                      <span>Communication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODAL FOOTER BAR                                                          */}
        {/* ========================================================================= */}
        <div className="no-print pt-2 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8C8981]">
          <span>
            Direct: <strong className="text-[#F2EFE8]">{profile.phone}</strong> ·{' '}
            <strong className="text-[#F2EFE8]">{profile.email}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 rounded-full font-bold text-[#0D0D0C] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 flex items-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: accent }}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Downloading PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 stroke-[2.5]" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
