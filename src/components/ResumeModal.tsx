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
  Award,
  GraduationCap,
  Briefcase,
  Wrench,
  CheckCircle,
  FileText,
  Sun,
  Moon,
  MapPin,
  Loader2,
  Sparkles
} from 'lucide-react';
import { getAssetUrl, defaultAvatar } from '../utils/assetHelper';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ResumeModal: React.FC = () => {
  const { profile, isResumeOpen, setIsResumeOpen, accent } = usePortfolio();
  const [viewMode, setViewMode] = useState<'paper' | 'dark'>('paper');
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
   * Generates and downloads the resume strictly in PDF format (.pdf)
   * Captures a high-resolution, pixel-perfect executive white paper document.
   */
  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    try {
      const resumeEl = document.getElementById('printable-resume');
      if (!resumeEl) {
        window.print();
        return;
      }

      // Create an offscreen A4 container to ensure consistent white-paper rendering
      const clone = resumeEl.cloneNode(true) as HTMLElement;
      clone.id = 'temp-pdf-export-node';
      clone.style.width = '794px'; // Standard A4 width at 96 DPI
      clone.style.maxWidth = '794px';
      clone.style.padding = '28px 32px';
      clone.style.background = '#FFFFFF';
      clone.style.color = '#111827';
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.zIndex = '-9999';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';

      // Override colors for print clarity
      const allTexts = clone.querySelectorAll('*');
      allTexts.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.classList.contains('bg-dark-card')) {
          htmlEl.style.backgroundColor = '#F9FAFB';
          htmlEl.style.borderColor = '#E5E7EB';
          htmlEl.style.color = '#111827';
        }
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2, // 2x Retina resolution
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      if (contentHeight <= pdfHeight - margin * 2) {
        // Fits cleanly onto a single A4 page
        pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
      } else {
        // Multi-page handling with proper margins
        let heightLeft = contentHeight;
        let position = margin;

        pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
        heightLeft -= (pdfHeight - margin * 2);

        while (heightLeft > 0) {
          position = heightLeft - contentHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
          heightLeft -= (pdfHeight - margin * 2);
        }
      }

      // Download ONLY in .pdf format
      pdf.save('Pon_Vijaya_Prabu_S_Resume.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to browser print/save PDF
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const isPaper = viewMode === 'paper';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0D0D0C]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className={`resume-modal-content relative w-full max-w-4xl my-auto rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-7 overflow-hidden flex flex-col transition-colors duration-200 ${
          isPaper
            ? 'bg-[#FFFFFF] text-[#111827] border border-[#E5E7EB]'
            : 'bg-[#141412] text-[#F2EFE8] border border-[#2A2A26]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* TOP CONTROLS & ACTION BAR (HIDDEN IN PRINT)                               */}
        {/* ========================================================================= */}
        <div
          className={`no-print flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b transition-colors ${
            isPaper ? 'border-[#E5E7EB]' : 'border-[#242420]'
          }`}
        >
          {/* Left: Status & View Toggle */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span
              className={`font-mono text-xs tracking-wider uppercase font-semibold ${
                isPaper ? 'text-[#4B5563]' : 'text-[#8C8981]'
              }`}
            >
              Verified CV · Pon Vijaya Prabu S
            </span>

            {/* Paper / Dark Mode Toggle */}
            <div
              className={`hidden sm:flex items-center p-0.5 rounded-full border text-xs font-medium ml-2 ${
                isPaper ? 'bg-[#F3F4F6] border-[#E5E7EB]' : 'bg-[#1C1C1A] border-[#2A2A26]'
              }`}
            >
              <button
                onClick={() => setViewMode('paper')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                  isPaper
                    ? 'bg-white text-[#111827] shadow-sm font-semibold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
                title="White Paper Print-Ready View"
              >
                <Sun className="w-3 h-3" />
                <span>Paper View</span>
              </button>
              <button
                onClick={() => setViewMode('dark')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                  !isPaper
                    ? 'bg-[#2A2A26] text-[#F2EFE8] shadow-sm font-semibold'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                title="Dark Studio View"
              >
                <Moon className="w-3 h-3" />
                <span>Studio View</span>
              </button>
            </div>
          </div>

          {/* Right: Download PDF & Print Buttons */}
          <div className="flex items-center gap-2">
            {/* Primary Action: Download PDF Only */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              aria-label="Download resume in PDF format"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#0D0D0C] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: accent }}
              title="Download Resume (.pdf format)"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Secondary Action: Print */}
            <button
              onClick={handlePrint}
              aria-label="Print resume"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                isPaper
                  ? 'border-[#D1D5DB] bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  : 'border-[#2E2E2A] bg-[#1C1C1A] text-[#CBC7BD] hover:text-[#F2EFE8]'
              }`}
              title="Print (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              aria-label="Close CV modal"
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                isPaper
                  ? 'border-[#D1D5DB] bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827]'
                  : 'border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESUME DOCUMENT CONTAINER (COMPACT, NO BOTTOM GAP, CRISP A4 ALIGNMENT)   */}
        {/* ========================================================================= */}
        <div
          id="printable-resume"
          className="resume-scroll-container flex flex-col gap-4 sm:gap-5 max-h-[calc(84vh-115px)] overflow-y-auto pr-1 sm:pr-2"
        >
          {/* Header Row: Portrait + Identity + Direct Contact Matrix */}
          <div
            className={`resume-avoid-break flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
              isPaper ? 'border-[#E5E7EB]' : 'border-[#22221F]'
            }`}
          >
            {/* Identity with Portrait */}
            <div className="flex items-center gap-3.5">
              <img
                src={getAssetUrl(profile.avatarUrl)}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 shadow-sm shrink-0 ${
                  isPaper ? 'border-[#E5E7EB]' : 'border-[#2E2E2A]'
                }`}
                onError={(e) => {
                  if (e.currentTarget.src !== defaultAvatar) {
                    e.currentTarget.src = defaultAvatar;
                  }
                }}
              />
              <div>
                <h1
                  id="resume-title"
                  className={`text-xl sm:text-2xl font-extrabold tracking-tight resume-print-text-dark ${
                    isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                  }`}
                >
                  {profile.name}
                </h1>
                <p
                  className="text-xs sm:text-sm font-semibold mt-0.5"
                  style={{ color: isPaper ? '#1F2937' : accent }}
                >
                  {profile.title} <span className="opacity-75 font-normal">· Canvendor Solutions</span>
                </p>
                <div
                  className={`flex items-center gap-1.5 text-xs mt-0.5 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Matrix */}
            <div
              className={`flex flex-col gap-1 text-xs ${
                isPaper ? 'text-[#4B5563]' : 'text-[#ABA79E]'
              }`}
            >
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8C8981] shrink-0" />
                <span className="font-medium text-inherit">{profile.phone}</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C8981] shrink-0" />
                <span className="font-medium text-inherit">{profile.email}</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#8C8981] shrink-0" />
                <span>linkedin.com/in/pon-vijay-prabhu3774</span>
              </a>
              <a
                href="https://ponvijayprabhu.github.io/pon-vijaya-prabu-s-portfolio-2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline transition-colors truncate max-w-xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#8C8981] shrink-0" />
                <span>ponvijayprabhu.github.io/portfolio</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="resume-avoid-break flex flex-col gap-1.5">
            <h2
              className={`text-xs font-mono uppercase tracking-widest font-bold ${
                isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
              }`}
            >
              Professional Summary
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'
              }`}
            >
              {profile.bioSubtext}
            </p>
          </div>

          {/* 2-Column Balanced Grid (Left: Work & Internships | Right: Education, Skills, Certs, Apprenticeships) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left Column (7 cols): Work Experience & Internships */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Work Experience */}
              <div className="flex flex-col gap-2.5">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#8C8981]" /> Work Experience
                </h2>

                <div
                  className={`resume-avoid-break bg-dark-card p-3.5 rounded-xl border flex flex-col gap-2 ${
                    isPaper
                      ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                      : 'bg-[#181816] border-[#262622]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span
                      className={`font-bold text-sm ${
                        isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                      }`}
                    >
                      UI/UX Designer
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isPaper ? 'text-[#2563EB]' : 'text-[#D4F36B]'
                      }`}
                    >
                      Nov 2025 – Present
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isPaper ? 'text-[#4B5563]' : 'text-[#CBC7BD]'
                    }`}
                  >
                    Canvendor software solutions private limited — Nagercoil, India
                  </div>
                  <ul
                    className={`flex flex-col gap-1.5 pt-0.5 text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#A8A59E]'
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#2563EB]" />
                      <span>
                        Designed web and mobile interfaces for <strong>EMR Healthcare</strong>, <strong>AI Chat Assistants</strong>, <strong>HRMS Enterprise</strong>, and <strong>Logistics</strong> platforms.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#2563EB]" />
                      <span>
                        Created intuitive wireframes, responsive design systems, interactive Figma prototypes, and developer token specs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#2563EB]" />
                      <span>
                        Conducted usability testing, refined navigation architectures, and delivered pixel-perfect handoffs to frontend engineers.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Internship Experience */}
              <div className="flex flex-col gap-2.5">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#8C8981]" /> Internship Experience
                </h2>

                {/* Canvendor Intern */}
                <div
                  className={`resume-avoid-break bg-dark-card p-3.5 rounded-xl border flex flex-col gap-2 ${
                    isPaper
                      ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                      : 'bg-[#181816] border-[#262622]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span
                      className={`font-bold text-sm ${
                        isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                      }`}
                    >
                      UI/UX Design Intern
                    </span>
                    <span className="font-mono text-xs text-[#6B7280]">
                      Jun 2025 – Oct 2025
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isPaper ? 'text-[#4B5563]' : 'text-[#CBC7BD]'
                    }`}
                  >
                    Canvendor software solutions private limited — Nagercoil
                  </div>
                  <ul
                    className={`flex flex-col gap-1.5 pt-0.5 text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#A8A59E]'
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#6B7280]" />
                      <span>Assisted in designing responsive web and mobile interfaces using Figma component libraries.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#6B7280]" />
                      <span>Created wireframes and interactive prototypes for active client deployments.</span>
                    </li>
                  </ul>
                </div>

                {/* AK Infopark Intern */}
                <div
                  className={`resume-avoid-break bg-dark-card p-3 rounded-xl border flex flex-col gap-1.5 ${
                    isPaper
                      ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                      : 'bg-[#181816] border-[#262622]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span
                      className={`font-bold text-sm ${
                        isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                      }`}
                    >
                      UI/UX Design Intern
                    </span>
                    <span className="font-mono text-xs text-[#6B7280]">
                      Jan 2025
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isPaper ? 'text-[#4B5563]' : 'text-[#CBC7BD]'
                    }`}
                  >
                    AK Infopark private limited — Nagercoil
                  </div>
                  <p
                    className={`text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#A8A59E]'
                    }`}
                  >
                    Designed responsive web and mobile interfaces in Figma with interactive component states.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Education, Skills, Certs & Engineering Background */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Education */}
              <div className="flex flex-col gap-2">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#8C8981]" /> Education
                </h2>
                <div className="flex flex-col gap-2">
                  {profile.education.map((edu, i) => (
                    <div
                      key={i}
                      className={`resume-avoid-break bg-dark-card p-2.5 rounded-xl border ${
                        isPaper
                          ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                          : 'bg-[#181816] border-[#262622]'
                      }`}
                    >
                      <div className="flex justify-between items-start text-xs">
                        <span
                          className={`font-bold ${
                            isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                          }`}
                        >
                          {edu.degree}
                        </span>
                        <span className="font-mono text-[10px] text-[#6B7280] shrink-0 ml-2">
                          {edu.year}
                        </span>
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isPaper ? 'text-[#4B5563]' : 'text-[#CBC7BD]'
                        }`}
                      >
                        {edu.institution}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{edu.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Tools & Core Skills */}
              <div className="resume-avoid-break flex flex-col gap-2">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-[#8C8981]" /> Tools & Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {profile.designTools.map((tool, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-xs rounded-md font-semibold border ${
                        isPaper
                          ? 'bg-[#F3F4F6] text-[#1F2937] border-[#E5E7EB]'
                          : 'bg-[#20201D] text-[#E0DDD5] border-[#2E2E2A]'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                  {profile.coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-xs rounded-md border ${
                        isPaper
                          ? 'bg-[#F9FAFB] text-[#374151] border-[#E5E7EB]'
                          : 'bg-[#181816] text-[#CBC7BD] border-[#262622]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="resume-avoid-break flex flex-col gap-1.5">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#8C8981]" /> Certifications
                </h2>
                <div
                  className={`flex flex-col gap-1 text-xs ${
                    isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'
                  }`}
                >
                  {profile.certifications.map((cert, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center py-0.5 border-b last:border-0 ${
                        isPaper ? 'border-[#E5E7EB]' : 'border-[#20201D]'
                      }`}
                    >
                      <span>{cert.name}</span>
                      {cert.year && (
                        <span className="font-mono text-[10px] text-[#6B7280]">
                          {cert.year}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Soft Skills */}
              <div className="resume-avoid-break grid grid-cols-2 gap-2 text-xs">
                <div>
                  <h3
                    className={`font-mono text-[10px] uppercase font-bold mb-0.5 ${
                      isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                    }`}
                  >
                    Languages
                  </h3>
                  <div className={isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'}>
                    {profile.languages.join(', ')}
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-mono text-[10px] uppercase font-bold mb-0.5 ${
                      isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                    }`}
                  >
                    Soft Skills
                  </h3>
                  <div className={isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'}>
                    Problem Solving, Team Collaboration, Communication
                  </div>
                </div>
              </div>

              {/* Engineering Apprenticeships (Clean balanced bottom block) */}
              <div
                className={`resume-avoid-break bg-dark-card p-2.5 rounded-xl border flex flex-col gap-1.5 ${
                  isPaper
                    ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                    : 'bg-[#181816] border-[#262622]'
                }`}
              >
                <div className="text-[10px] font-mono uppercase font-bold text-[#8C8981]">
                  Apprenticeships (Systems Thinking)
                </div>
                <div className="text-xs flex flex-col gap-1 text-[#6B7280]">
                  <div className="flex justify-between">
                    <span className="font-medium text-inherit">R.K. Motors (BOSCH Center), Nagercoil</span>
                    <span className="font-mono text-[10px]">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-inherit">Bajaj Bike Service Center, Nagercoil</span>
                    <span className="font-mono text-[10px]">2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIGHT BOTTOM BAR (NO GAP, DIRECTLY ATTACHED, HIDDEN IN PRINT)             */}
        {/* ========================================================================= */}
        <div
          className={`no-print pt-3 mt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${
            isPaper ? 'border-[#E5E7EB] text-[#6B7280]' : 'border-[#242420] text-[#8C8981]'
          }`}
        >
          <span>
            Direct: <strong className={isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'}>{profile.phone}</strong> ·{' '}
            <strong className={isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'}>{profile.email}</strong>
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
                  <span>Downloading...</span>
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
