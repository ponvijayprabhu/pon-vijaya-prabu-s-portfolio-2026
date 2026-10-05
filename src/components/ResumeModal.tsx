import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  Loader2,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import resumePreviewImg from '../assets/resume-preview.png';

export const ResumeModal: React.FC = () => {
  const { profile, isResumeOpen, setIsResumeOpen, accent } = usePortfolio();
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewMode, setViewMode] = useState<'original' | 'web'>('original');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

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
   * Secure, reliable download via Blob.
   * Completely avoids window.open or target="_blank" navigations
   * which Chrome blocks inside iframe sandboxes.
   */
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const base = import.meta.env.BASE_URL || '/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      // Fetch via safe slugified path
      const response = await fetch(`${cleanBase}Pon-Vijaya-Prabu-S-Resume.pdf`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = 'PON VIJAYA PRABU S own.pdf';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Blob download fallback:', err);
      // Fallback direct anchor download
      const base = import.meta.env.BASE_URL || '/';
      const cleanBase = base.endsWith('/') ? base : `${base}/`;
      const fallbackLink = document.createElement('a');
      fallbackLink.href = `${cleanBase}Pon-Vijaya-Prabu-S-Resume.pdf`;
      fallbackLink.download = 'PON VIJAYA PRABU S own.pdf';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 20, 180));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 20, 60));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0D0D0C]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className="resume-modal-content relative w-full max-w-4xl my-auto rounded-2xl shadow-2xl p-3 sm:p-5 flex flex-col gap-3 bg-[#161614] border border-[#2E2E2A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* TOP CONTROLS & ACTION BAR (HIDDEN IN PRINT)                               */}
        {/* ========================================================================= */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-2 py-1.5 border-b border-[#2A2A26]">
          {/* Status Label & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[#CBC7BD]">
                PON VIJAYA PRABU S own.pdf
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg bg-[#22221F] p-0.5 border border-[#2E2E2A]">
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'original'
                    ? 'bg-[#2E2E2A] text-[#F2EFE8] shadow-xs'
                    : 'text-[#ABA79E] hover:text-[#F2EFE8]'
                }`}
                title="View authentic high-definition resume document"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Original Document</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('web')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'web'
                    ? 'bg-[#2E2E2A] text-[#F2EFE8] shadow-xs'
                    : 'text-[#ABA79E] hover:text-[#F2EFE8]'
                }`}
                title="View responsive web layout"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Web View</span>
              </button>
            </div>

            {/* Zoom Controls (when viewing original document) */}
            {viewMode === 'original' && (
              <div className="hidden md:flex items-center gap-1 rounded-lg bg-[#22221F] px-1.5 py-0.5 border border-[#2E2E2A] text-[#ABA79E]">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 60}
                  className="p-1 hover:text-[#F2EFE8] disabled:opacity-40 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="text-[11px] font-mono px-1 hover:text-[#F2EFE8] cursor-pointer"
                  title="Reset Zoom (100%)"
                >
                  {zoomLevel}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 180}
                  className="p-1 hover:text-[#F2EFE8] disabled:opacity-40 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 100 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="p-1 hover:text-[#F2EFE8] cursor-pointer ml-0.5"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Download PDF button (Safe blob download, no popup/blank navigations) */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              aria-label="Download PON VIJAYA PRABU S own.pdf"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#0D0D0C] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: accent }}
              title="Download PON VIJAYA PRABU S own.pdf"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download Resume (PDF)</span>
                </>
              )}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              aria-label="Print resume"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#2E2E2A] bg-[#1C1C1A] text-[#CBC7BD] hover:text-[#F2EFE8] transition-colors cursor-pointer"
              title="Print Resume (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Close button */}
            <button
              onClick={() => setIsResumeOpen(false)}
              aria-label="Close modal"
              className="p-1.5 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESUME DISPLAY: HIGH RESOLUTION 300DPI DOCUMENT PREVIEW                   */}
        {/* ========================================================================= */}
        {viewMode === 'original' ? (
          <div className="resume-scroll-container max-h-[calc(86vh-90px)] overflow-y-auto overflow-x-auto rounded-xl bg-[#20201D] p-2 sm:p-4 border border-[#2A2A26] flex justify-center items-start">
            <div
              className="relative shadow-2xl rounded-sm overflow-hidden bg-white max-w-[800px] w-full transition-all duration-150 origin-top"
              style={{
                width: zoomLevel !== 100 ? `${zoomLevel}%` : '100%',
                maxWidth: zoomLevel > 100 ? `${(800 * zoomLevel) / 100}px` : '800px'
              }}
            >
              <img
                src={resumePreviewImg}
                alt="Pon Vijaya Prabu S - Official Resume"
                className="w-full h-auto block select-none resume-print-image"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        ) : (
          <div className="resume-scroll-container max-h-[calc(86vh-90px)] overflow-y-auto rounded-xl">
            <div
              id="printable-resume"
              className="w-full bg-[#FFFFFF] text-[#1A1A1A] shadow-xl p-6 sm:p-8 md:p-10"
              style={{
                fontFamily: "'Times New Roman', Times, Georgia, serif"
              }}
            >
              {/* HEADER: NAME, TITLE, AND CONTACT BADGES MATRIX */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2">
                <div className="flex flex-col">
                  <h1
                    id="resume-title"
                    className="text-2xl sm:text-3xl lg:text-[34px] tracking-tight font-bold uppercase text-[#111827] leading-none"
                    style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                  >
                    PON VIJAYA PRABU S
                  </h1>
                  <div className="w-full max-w-[280px] h-[1.5px] bg-[#111827] my-1.5" />
                  <div
                    className="text-base sm:text-lg text-[#1F2937] font-normal"
                    style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                  >
                    UI/UX Designer
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-[13px] text-[#222222]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#222222]">{profile.phone}</span>
                    <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="underline underline-offset-2 text-[#222222]">{profile.email}</span>
                    <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="underline underline-offset-2 text-[#222222]">www.linkedin.com/in/pon-vijay-prabhu3774</span>
                    <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs text-[9px] font-bold">
                      <Linkedin className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 truncate max-w-xs">
                    <span className="underline underline-offset-2 text-[#222222]">https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/</span>
                    <span className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Github className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* FULL-WIDTH DIVIDER */}
              <div className="w-full h-[1px] bg-[#999999] my-2" />

              {/* PROFESSIONAL SUMMARY */}
              <div className="py-2 text-center">
                <h2
                  className="text-[13px] sm:text-[14px] tracking-[0.2em] uppercase font-bold text-[#111827] mb-1.5"
                  style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-[13px] leading-relaxed text-[#2D3748] max-w-3xl mx-auto">
                  Passionate UI/UX Designer with experience in designing responsive web and mobile applications using Figma. Skilled in wireframing, prototyping, and creating user-centered interfaces that improve usability and user experience.
                </p>
              </div>

              {/* FULL-WIDTH DIVIDER */}
              <div className="w-full h-[1px] bg-[#999999] my-2" />

              {/* TWO COLUMNS SEPARATED BY A VERTICAL DIVIDER */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
                {/* LEFT COLUMN */}
                <div className="sm:col-span-5 flex flex-col gap-4 sm:pr-4 sm:border-r sm:border-[#CCCCCC]">
                  {/* EDUCATION */}
                  <div className="flex flex-col gap-2">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        EDUCATION
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2 text-[12.5px]">
                      <div>
                        <div className="font-bold uppercase tracking-tight text-[12px] text-[#111827] leading-tight">
                          BACHELOR IN MECHANICAL ENGINEERING
                        </div>
                        <div className="text-[12px] text-[#333333]">Stella Mary's college of engineering</div>
                        <div className="text-[11.5px] text-[#555555]">Nagercoil, Kanyakumari</div>
                        <div className="font-bold text-[11.5px] text-[#111827] mt-0.5">2022-2025</div>
                      </div>

                      <div>
                        <div className="font-bold uppercase tracking-tight text-[12px] text-[#111827] leading-tight">
                          DIPLOMA IN MECHANICAL ENGINEERING
                        </div>
                        <div className="text-[12px] text-[#333333]">N.M.S Kamaraj polytechnic college</div>
                        <div className="text-[11.5px] text-[#555555]">Nagercoil, Kanyakumari</div>
                        <div className="font-bold text-[11.5px] text-[#111827] mt-0.5">2019-2022</div>
                      </div>

                      <div>
                        <div className="font-bold uppercase tracking-tight text-[12px] text-[#111827] leading-tight">
                          SSLC
                        </div>
                        <div className="text-[12px] text-[#333333]">Sri Ramji Matric.Hr.Sec.School</div>
                        <div className="text-[11.5px] text-[#555555]">Ganapathipuram, Kanyakumari</div>
                        <div className="font-bold text-[11.5px] text-[#111827] mt-0.5">2019</div>
                      </div>
                    </div>
                  </div>

                  {/* DESIGN TOOLS */}
                  <div className="flex flex-col gap-1.5">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        DESIGN TOOLS
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-0.5 pl-0.5 text-[#222222] text-[12.5px]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Figma</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Adobe XD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Adobe Photoshop</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Adobe Illustrator</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Canva</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Miro</span>
                      </li>
                    </ul>
                  </div>

                  {/* CORE UI/UX SKILLS */}
                  <div className="flex flex-col gap-1.5">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        CORE UI/UX SKILLS
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-0.5 pl-0.5 text-[#222222] text-[12.5px]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>User Research</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Wireframing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Prototyping</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>User Flows</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Responsive Design</span>
                      </li>
                    </ul>
                  </div>

                  {/* CERTIFICATIONS */}
                  <div className="flex flex-col gap-1.5">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        CERTIFICATIONS
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-1 pl-0.5 text-[#222222] text-[12px]">
                      <li className="flex items-start gap-2 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                        <span>UI/UX Design Certification</span>
                      </li>
                      <li className="flex items-start gap-2 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                        <span>AI and Machine Learning Fundamentals (2024)</span>
                      </li>
                      <li className="flex items-start gap-2 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                        <span>Internet of Things (IoT) Certification (2024)</span>
                      </li>
                      <li className="flex items-start gap-2 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                        <span>Non-Destructive Testing (NDT) Level 2 Certification (2024)</span>
                      </li>
                      <li className="flex items-start gap-2 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-1 shrink-0" />
                        <span>Master CAM-CNC Lathe and Milling Certification (2023)</span>
                      </li>
                    </ul>
                  </div>

                  {/* LANGUAGES */}
                  <div className="flex flex-col gap-1.5">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        LANGUAGES
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 pl-0.5 text-[12.5px] text-[#222222]">
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

                {/* RIGHT COLUMN */}
                <div className="sm:col-span-7 flex flex-col gap-4 sm:pl-2">
                  {/* WORK EXPERIENCE */}
                  <div className="flex flex-col gap-1.5">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        WORK EXPERIENCE
                      </h3>
                    </div>

                    <div className="flex flex-col gap-0.5 text-[12.5px]">
                      <div className="font-bold text-[13.5px] text-[#111827] leading-snug">
                        UI/UX Designer
                      </div>
                      <div className="font-bold text-[13px] text-[#1F2937]">
                        Canvendor software solutions private limited - Nagercoil
                      </div>
                      <div className="text-[#555555] text-[12px]">
                        (Nov 2025) Present
                      </div>
                      <ul className="flex flex-col gap-1 pt-1 text-[12.5px] leading-relaxed text-[#222222]">
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
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        INTERNSHIP EXPERIENCE
                      </h3>
                    </div>

                    {/* Canvendor Intern */}
                    <div className="flex flex-col gap-0.5 text-[12.5px]">
                      <div className="font-bold text-[13px] text-[#111827] leading-snug">
                        UI/UX Design Intern
                      </div>
                      <div className="font-bold text-[12.5px] text-[#1F2937]">
                        Canvendor software solutions private limited - Nagercoil
                      </div>
                      <div className="text-[#555555] text-[12px]">
                        Nagercoil, (Jun 2025 – Oct 2025)
                      </div>
                      <ul className="flex flex-col gap-1 pt-1 text-[12.5px] leading-relaxed text-[#222222]">
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
                    <div className="flex flex-col gap-0.5 text-[12.5px] pt-1">
                      <div className="font-bold text-[12.5px] text-[#111827]">
                        AK Infopark private limited
                      </div>
                      <div className="text-[#555555] text-[12px]">
                        Nagercoil, (Jan 2025 )
                      </div>
                      <ul className="flex flex-col gap-1 pt-0.5 text-[12.5px] leading-relaxed text-[#222222]">
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
                    <div className="flex flex-col gap-0.5 text-[12.5px] pt-1">
                      <div className="font-bold text-[12.5px] text-[#111827]">
                        R.K. Motors (BOSCH Car Service Center), Nagercoil
                      </div>
                      <div className="text-[#555555] text-[12px]">
                        (Jul 2024)
                      </div>
                      <p className="text-[12.5px] text-[#222222] pl-3">
                        • Assisted in vehicle diagnostics, maintenance, and repair operations.
                      </p>
                    </div>

                    {/* Bajaj Bike Service */}
                    <div className="flex flex-col gap-0.5 text-[12.5px] pt-1">
                      <div className="font-bold text-[12.5px] text-[#111827]">
                        Bajaj Bike Service Center, Nagercoil
                      </div>
                      <div className="text-[#555555] text-[12px]">
                        (Jul 2023)
                      </div>
                      <p className="text-[12.5px] text-[#222222] pl-3">
                        Gained practical experience in motorcycle maintenance and workshop operations.
                      </p>
                    </div>
                  </div>

                  {/* SOFT SKILLS */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="pb-0.5 border-b border-[#333333]">
                      <h3
                        className="text-[13px] tracking-[0.15em] uppercase font-bold text-[#111827]"
                        style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                      >
                        SOFT SKILLS
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-0.5 pl-0.5 text-[#222222] text-[12.5px]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Problem Solving</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Leadership</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Project & Time Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Team Collaboration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>Communication</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL FOOTER BAR                                                          */}
        {/* ========================================================================= */}
        <div className="no-print pt-2 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8C8981]">
          <span>
            Direct Contact: <strong className="text-[#F2EFE8]">{profile.phone}</strong> ·{' '}
            <strong className="text-[#F2EFE8]">{profile.email}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-1.5 rounded-full font-bold text-[#0D0D0C] shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 flex items-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: accent }}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download Resume (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
