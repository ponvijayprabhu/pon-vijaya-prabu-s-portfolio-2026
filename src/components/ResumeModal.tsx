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
  Sun,
  Moon,
  Loader2
} from 'lucide-react';
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
   * Generates and downloads the exact official resume strictly as a PDF file (.pdf)
   * Captures the high-resolution, pixel-accurate executive layout matching the user's official resume.
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

      // Clone node to create a clean white A4 page offscreen for pixel-perfect export
      const clone = resumeEl.cloneNode(true) as HTMLElement;
      clone.id = 'temp-pdf-export-node';
      clone.style.width = '794px'; // Standard A4 width (210mm @ 96 DPI)
      clone.style.maxWidth = '794px';
      clone.style.padding = '36px 42px';
      clone.style.background = '#FFFFFF';
      clone.style.color = '#111827';
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.zIndex = '-9999';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
      clone.style.border = 'none';
      clone.style.boxShadow = 'none';

      // Force white paper styles on all child elements in clone
      const allElements = clone.querySelectorAll('*');
      allElements.forEach((el) => {
        const hEl = el as HTMLElement;
        if (hEl.dataset.themeColor === 'accent') {
          hEl.style.color = '#111827';
        }
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2.2, // Ultra-sharp 2.2x resolution
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      if (contentHeight <= pdfHeight - margin * 2) {
        pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
      } else {
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

      pdf.save('Pon_Vijaya_Prabu_S_Resume.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
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
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0D0D0C]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className={`resume-modal-content relative w-full max-w-4xl my-auto rounded-2xl shadow-2xl p-4 sm:p-6 overflow-hidden flex flex-col transition-colors duration-200 ${
          isPaper
            ? 'bg-[#FFFFFF] text-[#111827] border border-[#E5E7EB]'
            : 'bg-[#121210] text-[#F2EFE8] border border-[#2A2A26]'
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
          {/* Status & View Switcher */}
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
              Official Resume · Pon Vijaya Prabu S
            </span>

            {/* Paper / Studio Mode Switcher */}
            <div
              className={`hidden sm:flex items-center p-0.5 rounded-full border text-xs font-medium ml-2 ${
                isPaper ? 'bg-[#F3F4F6] border-[#E5E7EB]' : 'bg-[#1C1C1A] border-[#2A2A26]'
              }`}
            >
              <button
                onClick={() => setViewMode('paper')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isPaper
                    ? 'bg-white text-[#111827] shadow-sm font-semibold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
                title="Exact White Paper Resume View"
              >
                <Sun className="w-3 h-3" />
                <span>Paper View</span>
              </button>
              <button
                onClick={() => setViewMode('dark')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  !isPaper
                    ? 'bg-[#2A2A26] text-[#F2EFE8] shadow-sm font-semibold'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                title="Studio Dark Theme"
              >
                <Moon className="w-3 h-3" />
                <span>Studio View</span>
              </button>
            </div>
          </div>

          {/* Action Buttons: PDF Download Only & Print */}
          <div className="flex items-center gap-2">
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
        {/* RESUME DOCUMENT CONTAINER (MATCHES OFFICIAL RESUME PDF 1:1)               */}
        {/* ========================================================================= */}
        <div
          id="printable-resume"
          className="resume-scroll-container max-h-[calc(84vh-100px)] overflow-y-auto pr-1 sm:pr-2 flex flex-col font-sans"
        >
          {/* ===================================================================== */}
          {/* HEADER: NAME, TITLE, AND CONTACT BADGES MATRIX                        */}
          {/* ===================================================================== */}
          <div className="resume-avoid-break flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b-2 border-current">
            {/* Left: Name and Title with Underline */}
            <div className="flex flex-col">
              <h1
                id="resume-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight font-bold uppercase leading-none"
              >
                PON VIJAYA PRABU S
              </h1>
              <div className="w-full h-[1.5px] bg-current my-1.5" />
              <div className="text-base sm:text-lg font-serif italic text-inherit font-medium">
                UI/UX Designer
              </div>
            </div>

            {/* Right: Contact Details with Circular Icon Badges */}
            <div className="flex flex-col sm:items-end gap-1.5 text-xs">
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <span className="font-sans font-medium text-inherit">{profile.phone}</span>
                <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 text-current" />
                </span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <span className="font-sans font-medium text-inherit underline underline-offset-2">{profile.email}</span>
                <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3 text-current" />
                </span>
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline transition-colors"
              >
                <span className="font-sans text-inherit underline underline-offset-2">www.linkedin.com/in/pon-vijay-prabhu3774</span>
                <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center shrink-0">
                  <Linkedin className="w-3 h-3 text-current" />
                </span>
              </a>

              <a
                href="https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline transition-colors truncate max-w-xs"
              >
                <span className="font-sans text-inherit underline underline-offset-2">https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/</span>
                <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center shrink-0">
                  <Globe className="w-3 h-3 text-current" />
                </span>
              </a>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* PROFESSIONAL SUMMARY (CENTERED WITH DIVIDER LINES)                    */}
          {/* ===================================================================== */}
          <div className="resume-avoid-break py-3 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex-1 h-[1px] bg-current/25" />
              <h2 className="text-xs sm:text-sm font-serif tracking-[0.2em] uppercase font-bold text-inherit">
                PROFESSIONAL SUMMARY
              </h2>
              <div className="flex-1 h-[1px] bg-current/25" />
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed max-w-3xl mx-auto opacity-90">
              Passionate UI/UX Designer with experience in designing responsive web and mobile applications using Figma. Skilled in wireframing, prototyping, and creating user-centered interfaces that improve usability and user experience.
            </p>
          </div>

          {/* ===================================================================== */}
          {/* TWO COLUMNS SEPARATED BY A VERTICAL DIVIDER                           */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1 border-t border-current/20">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: EDUCATION, TOOLS, CORE SKILLS, CERTS, LANGUAGES        */}
            {/* ------------------------------------------------------------------- */}
            <div className="md:col-span-5 flex flex-col gap-4 md:pr-4 md:border-r border-current/20">
              {/* EDUCATION */}
              <div className="resume-avoid-break flex flex-col gap-2">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    EDUCATION
                  </h3>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  {/* Bachelor */}
                  <div>
                    <div className="font-bold uppercase tracking-tight text-[11px] leading-tight">
                      BACHELOR IN MECHANICAL ENGINEERING
                    </div>
                    <div className="opacity-80 text-[11px]">Stella Mary's college of engineering</div>
                    <div className="opacity-70 text-[10.5px]">Nagercoil, Kanyakumari</div>
                    <div className="font-medium text-[10.5px] mt-0.5">2022-2025</div>
                  </div>

                  {/* Diploma */}
                  <div>
                    <div className="font-bold uppercase tracking-tight text-[11px] leading-tight">
                      DIPLOMA IN MECHANICAL ENGINEERING
                    </div>
                    <div className="opacity-80 text-[11px]">N.M.S Kamaraj polytechnic college</div>
                    <div className="opacity-70 text-[10.5px]">Nagercoil, Kanyakumari</div>
                    <div className="font-medium text-[10.5px] mt-0.5">2019-2022</div>
                  </div>

                  {/* SSLC */}
                  <div>
                    <div className="font-bold uppercase tracking-tight text-[11px] leading-tight">
                      SSLC
                    </div>
                    <div className="opacity-80 text-[11px]">Sri Ramji Matric.Hr.Sec.School</div>
                    <div className="opacity-70 text-[10.5px]">Ganapathipuram, Kanyakumari</div>
                    <div className="font-medium text-[10.5px] mt-0.5">2019</div>
                  </div>
                </div>
              </div>

              {/* DESIGN TOOLS */}
              <div className="resume-avoid-break flex flex-col gap-1.5">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    DESIGN TOOLS
                  </h3>
                </div>
                <ul className="text-xs flex flex-col gap-1 pl-1">
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Figma</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Adobe XD</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Adobe Photoshop</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Adobe Illustrator</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Canva</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Miro</span>
                  </li>
                </ul>
              </div>

              {/* CORE UI/UX SKILLS */}
              <div className="resume-avoid-break flex flex-col gap-1.5">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    CORE UI/UX SKILLS
                  </h3>
                </div>
                <ul className="text-xs flex flex-col gap-1 pl-1">
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>User Research</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Wireframing</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Prototyping</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>User Flows</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Responsive Design</span>
                  </li>
                </ul>
              </div>

              {/* CERTIFICATIONS */}
              <div className="resume-avoid-break flex flex-col gap-1.5">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    CERTIFICATIONS
                  </h3>
                </div>
                <ul className="text-xs flex flex-col gap-1.5 pl-1">
                  <li className="flex items-start gap-2 text-[11px] leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1 shrink-0" />
                    <span>UI/UX Design Certification</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1 shrink-0" />
                    <span>AI and Machine Learning Fundamentals (2024)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1 shrink-0" />
                    <span>Internet of Things (IoT) Certification (2024)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1 shrink-0" />
                    <span>Non-Destructive Testing (NDT) Level 2 Certification (2024)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1 shrink-0" />
                    <span>Master CAM-CNC Lathe and Milling Certification (2023)</span>
                  </li>
                </ul>
              </div>

              {/* LANGUAGES */}
              <div className="resume-avoid-break flex flex-col gap-1.5">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    LANGUAGES
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium pl-1 text-[11.5px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>Tamil</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>English</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: WORK EXPERIENCE, INTERNSHIPS, SOFT SKILLS             */}
            {/* ------------------------------------------------------------------- */}
            <div className="md:col-span-7 flex flex-col gap-4 md:pl-2">
              {/* WORK EXPERIENCE */}
              <div className="resume-avoid-break flex flex-col gap-2">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    WORK EXPERIENCE
                  </h3>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <div className="font-bold text-[13px] leading-snug">
                    UI/UX Designer
                  </div>
                  <div className="font-semibold opacity-90 text-[12px]">
                    Canvendor software solutions private limited - Nagercoil
                  </div>
                  <div className="opacity-70 text-[11px] font-mono">
                    (Nov 2025) Present
                  </div>
                  <ul className="flex flex-col gap-1 pt-1 text-[11.5px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Designed web and mobile interfaces for EMR, AI, HRMS, logistics, and landing page projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Created wireframes, user flows, and interactive prototypes using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Collaborated with developers to deliver responsive and user-friendly designs.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* INTERNSHIP EXPERIENCE */}
              <div className="resume-avoid-break flex flex-col gap-2.5">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    INTERNSHIP EXPERIENCE
                  </h3>
                </div>

                {/* Canvendor Intern */}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="font-bold text-[12.5px] leading-snug">
                    UI/UX Design Intern
                  </div>
                  <div className="font-semibold opacity-90 text-[12px]">
                    Canvendor software solutions private limited - Nagercoil
                  </div>
                  <div className="opacity-70 text-[11px] font-mono">
                    Nagercoil, (Jun 2025 – Oct 2025)
                  </div>
                  <ul className="flex flex-col gap-1 pt-1 text-[11.5px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Assisted in designing responsive web and mobile interfaces using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Created wireframes and interactive prototypes for client projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Contributed to EMR Healthcare System and HRMS Platform UI design projects.</span>
                    </li>
                  </ul>
                </div>

                {/* AK Infopark */}
                <div className="flex flex-col gap-1 text-xs pt-1 border-t border-current/15">
                  <div className="font-bold text-[12px]">
                    AK Infopark private limited
                  </div>
                  <div className="opacity-70 text-[11px] font-mono">
                    Nagercoil, (Jan 2025 )
                  </div>
                  <ul className="flex flex-col gap-1 pt-0.5 text-[11.5px] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Designed responsive web and mobile interfaces using Figma.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                      <span>Created wireframes and prototypes to improve user experience.</span>
                    </li>
                  </ul>
                </div>

                {/* R.K. Motors */}
                <div className="flex flex-col gap-0.5 text-xs pt-1 border-t border-current/15">
                  <div className="font-bold text-[12px]">
                    R.K. Motors (BOSCH Car Service Center), Nagercoil
                  </div>
                  <div className="opacity-70 text-[11px] font-mono">
                    (Jul 2024)
                  </div>
                  <p className="text-[11.5px] opacity-90 pl-3">
                    • Assisted in vehicle diagnostics, maintenance, and repair operations.
                  </p>
                </div>

                {/* Bajaj Bike Service */}
                <div className="flex flex-col gap-0.5 text-xs pt-1 border-t border-current/15">
                  <div className="font-bold text-[12px]">
                    Bajaj Bike Service Center, Nagercoil
                  </div>
                  <div className="opacity-70 text-[11px] font-mono">
                    (Jul 2023)
                  </div>
                  <p className="text-[11.5px] opacity-90 pl-3">
                    Gained practical experience in motorcycle maintenance and workshop operations.
                  </p>
                </div>
              </div>

              {/* SOFT SKILLS */}
              <div className="resume-avoid-break flex flex-col gap-1.5 pt-1 border-t border-current/20">
                <div className="pb-1 border-b border-current/30">
                  <h3 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-inherit">
                    SOFT SKILLS
                  </h3>
                </div>
                <ul className="text-xs flex flex-col gap-1 pl-1">
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Problem Solving</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Leadership</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Project & Time Management</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Team Collaboration</span>
                  </li>
                  <li className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>Communication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODAL FOOTER (NO GAP, DIRECTLY ANCHORED)                                  */}
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
