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
  ExternalLink
} from 'lucide-react';
import { getAssetUrl, defaultAvatar } from '../utils/assetHelper';

export const ResumeModal: React.FC = () => {
  const { profile, isResumeOpen, setIsResumeOpen, accent } = usePortfolio();
  // View mode: 'paper' (Clean White Paper CV) or 'dark' (Dark Studio View)
  const [viewMode, setViewMode] = useState<'paper' | 'dark'>('paper');

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

  // Generate a clean offline-ready HTML file of the resume that can be opened or saved
  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${profile.name} — UI/UX Designer Resume</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    @page { margin: 12mm 15mm; size: A4; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.45;
      font-size: 13px;
      padding: 32px 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #111827;
      padding-bottom: 18px;
      margin-bottom: 20px;
    }
    .name { font-size: 28px; font-weight: 800; color: #111827; letter-spacing: -0.5px; }
    .role { font-size: 15px; font-weight: 600; color: #4b5563; margin-top: 2px; }
    .contact { font-size: 11.5px; color: #4b5563; text-align: right; line-height: 1.6; }
    .contact a { color: #111827; text-decoration: none; font-weight: 500; }
    .section-title {
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      color: #6b7280;
      margin-bottom: 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e5e7eb;
    }
    .summary { margin-bottom: 22px; font-size: 12.5px; color: #374151; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: 7fr 5fr; gap: 24px; }
    .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; }
    .card-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #111827; }
    .card-sub { font-size: 11.5px; font-weight: 600; color: #4b5563; margin-top: 2px; }
    .bullets { margin-top: 8px; padding-left: 16px; font-size: 11.5px; color: #374151; }
    .bullets li { margin-bottom: 4px; }
    .tag-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .tag { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 3px 8px; border-radius: 6px; font-size: 11px; color: #1f2937; font-weight: 500; }
    .print-bar { background: #111827; color: #ffffff; padding: 10px 16px; border-radius: 8px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .print-btn { background: #22c55e; color: #000; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px; }
    @media print { .print-bar { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="print-bar">
    <span>Pon Vijaya Prabu S — Verified UI/UX Resume</span>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <div class="header">
    <div>
      <div class="name">${profile.name}</div>
      <div class="role">${profile.title}</div>
    </div>
    <div class="contact">
      <div>📞 ${profile.phone}</div>
      <div>✉️ <a href="mailto:${profile.email}">${profile.email}</a></div>
      <div>📍 ${profile.location}</div>
      <div>🔗 <a href="${profile.socials.linkedin}" target="_blank">LinkedIn Profile</a></div>
    </div>
  </div>

  <div class="section-title">Professional Summary</div>
  <p class="summary">${profile.bioSubtext}</p>

  <div class="grid">
    <div>
      <div class="section-title">Work Experience</div>
      <div class="card">
        <div class="card-header">
          <span>UI/UX Designer</span>
          <span style="font-family: monospace; font-size: 11px;">Nov 2025 – Present</span>
        </div>
        <div class="card-sub">Canvendor software solutions private limited — Nagercoil</div>
        <ul class="bullets">
          <li>Designed web and mobile interfaces for EMR Healthcare, AI, HRMS, logistics, and landing page projects.</li>
          <li>Created wireframes, user flows, and high-fidelity interactive prototypes in Figma.</li>
          <li>Collaborated closely with developers to deliver tokenized, responsive, user-friendly UI designs.</li>
        </ul>
      </div>

      <div class="section-title">Internship Experience</div>
      <div class="card">
        <div class="card-header">
          <span>UI/UX Design Intern</span>
          <span style="font-family: monospace; font-size: 11px;">Jun 2025 – Oct 2025</span>
        </div>
        <div class="card-sub">Canvendor software solutions private limited — Nagercoil</div>
        <ul class="bullets">
          <li>Assisted in designing responsive web and mobile interfaces using Figma.</li>
          <li>Created wireframes and interactive prototypes for client projects.</li>
          <li>Contributed to EMR Healthcare System and HRMS Platform UI design projects.</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          <span>UI/UX Design Intern</span>
          <span style="font-family: monospace; font-size: 11px;">Jan 2025</span>
        </div>
        <div class="card-sub">AK Infopark private limited — Nagercoil</div>
        <ul class="bullets">
          <li>Designed responsive web and mobile interfaces using Figma.</li>
          <li>Created wireframes and prototypes to enhance usability and conversion.</li>
        </ul>
      </div>
    </div>

    <div>
      <div class="section-title">Education</div>
      ${profile.education.map(edu => `
        <div class="card" style="margin-bottom: 8px;">
          <div class="card-header" style="font-size: 12px;">
            <span>${edu.degree}</span>
            <span style="font-family: monospace; font-size: 10px;">${edu.year}</span>
          </div>
          <div class="card-sub" style="font-size: 11px;">${edu.institution}</div>
          <div style="font-size: 10.5px; color: #6b7280;">${edu.location}</div>
        </div>
      `).join('')}

      <div class="section-title" style="margin-top: 14px;">Design Tools</div>
      <div class="tag-container">
        ${profile.designTools.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <div class="section-title">Core UI/UX Skills</div>
      <div class="tag-container">
        ${profile.coreSkills.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>

      <div class="section-title">Certifications</div>
      <div style="font-size: 11.5px; color: #374151; margin-bottom: 12px;">
        ${profile.certifications.map(c => `<div style="padding: 3px 0; border-bottom: 1px dotted #e5e7eb;">• ${c.name} ${c.year ? `(${c.year})` : ''}</div>`).join('')}
      </div>

      <div class="section-title">Languages</div>
      <div style="font-size: 11.5px; color: #4b5563;">
        ${profile.languages.join(' · ')}
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Pon_Vijaya_Prabu_S_Resume.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isPaper = viewMode === 'paper';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="resume-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#0D0D0C]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsResumeOpen(false)}
    >
      <div
        className={`resume-modal-content relative w-full max-w-4xl my-auto rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 overflow-hidden flex flex-col gap-6 transition-colors duration-200 ${
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
          className={`no-print flex flex-wrap items-center justify-between gap-3 pb-4 border-b transition-colors ${
            isPaper ? 'border-[#E5E7EB]' : 'border-[#242420]'
          }`}
        >
          {/* Left: Status & View Toggle */}
          <div className="flex items-center gap-3">
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

          {/* Right: Print, Download, Close Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print or save as PDF"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0D0D0C] shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: accent }}
              title="Print or Save PDF (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              aria-label="Download offline CV file"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isPaper
                  ? 'border-[#D1D5DB] bg-[#F9FAFB] text-[#374151] hover:bg-[#F3F4F6]'
                  : 'border-[#2E2E2A] bg-[#1C1C1A] text-[#CBC7BD] hover:text-[#F2EFE8]'
              }`}
              title="Download Offline HTML Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download CV</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              aria-label="Close CV modal"
              className={`p-1.5 rounded-full border transition-colors ${
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
        {/* RESUME DOCUMENT CONTAINER (PRINTS ACCURATELY ON A4)                       */}
        {/* ========================================================================= */}
        <div
          id="printable-resume"
          className="resume-scroll-container flex flex-col gap-7 max-h-[76vh] overflow-y-auto pr-1 sm:pr-2"
        >
          {/* Header Row: Portrait + Identity + Direct Contact Matrix */}
          <div
            className={`resume-avoid-break flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b ${
              isPaper ? 'border-[#E5E7EB]' : 'border-[#22221F]'
            }`}
          >
            {/* Identity with Portrait */}
            <div className="flex items-center gap-4">
              <img
                src={getAssetUrl(profile.avatarUrl)}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 shadow-md shrink-0 ${
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
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight resume-print-text-dark ${
                    isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'
                  }`}
                >
                  {profile.name}
                </h1>
                <p
                  className="text-sm sm:text-base font-semibold mt-0.5"
                  style={{ color: isPaper ? '#1F2937' : accent }}
                >
                  {profile.title} <span className="opacity-75 font-normal">· Canvendor Solutions</span>
                </p>
                <div
                  className={`flex items-center gap-1.5 text-xs mt-1 ${
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
              className={`flex flex-col gap-1.5 text-xs ${
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
          <div className="resume-avoid-break flex flex-col gap-2">
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

          {/* 2-Column Split: Experience (Left) vs Skills & Education (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {/* Left Column (7 cols): Work & Internship Experience */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Work Experience */}
              <div className="flex flex-col gap-3">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#8C8981]" /> Work Experience
                </h2>

                <div
                  className={`resume-avoid-break p-4 rounded-2xl border flex flex-col gap-2.5 ${
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
                    className={`flex flex-col gap-1.5 pt-1 text-xs ${
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
              <div className="flex flex-col gap-3">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#8C8981]" /> Internship Experience
                </h2>

                {/* Canvendor Intern */}
                <div
                  className={`resume-avoid-break p-4 rounded-2xl border flex flex-col gap-2.5 ${
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
                    className={`flex flex-col gap-1.5 pt-1 text-xs ${
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
                  className={`resume-avoid-break p-4 rounded-2xl border flex flex-col gap-2.5 ${
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
                  <ul
                    className={`flex flex-col gap-1.5 pt-1 text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#A8A59E]'
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#6B7280]" />
                      <span>Designed intuitive responsive web and mobile application prototypes in Figma.</span>
                    </li>
                  </ul>
                </div>

                {/* Practical Engineering Background */}
                <div
                  className={`resume-avoid-break p-3.5 rounded-2xl border flex flex-col gap-2 ${
                    isPaper
                      ? 'bg-[#F9FAFB] border-[#E5E7EB]'
                      : 'bg-[#181816] border-[#262622]'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                    Engineering Apprenticeships (Applied Systems Thinking)
                  </div>
                  <div className="text-xs text-[#4B5563] flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <span className="font-semibold text-inherit">R.K. Motors (BOSCH Car Service), Nagercoil</span>
                      <span className="font-mono text-[10px]">Jul 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-inherit">Bajaj Bike Service Center, Nagercoil</span>
                      <span className="font-mono text-[10px]">Jul 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Education, Tools, Skills & Certifications */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Education */}
              <div className="flex flex-col gap-2.5">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#8C8981]" /> Education
                </h2>
                <div className="flex flex-col gap-2.5">
                  {profile.education.map((edu, i) => (
                    <div
                      key={i}
                      className={`resume-avoid-break p-3 rounded-xl border ${
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

              {/* Design Tools */}
              <div className="resume-avoid-break flex flex-col gap-2">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-[#8C8981]" /> Design Tools
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {profile.designTools.map((tool, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium border ${
                        isPaper
                          ? 'bg-[#F3F4F6] text-[#1F2937] border-[#E5E7EB]'
                          : 'bg-[#20201D] text-[#E0DDD5] border-[#2E2E2A]'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core UI/UX Skills */}
              <div className="resume-avoid-break flex flex-col gap-2">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#8C8981]" /> Core UI/UX Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {profile.coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 text-xs rounded-md border ${
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
              <div className="resume-avoid-break flex flex-col gap-2">
                <h2
                  className={`text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${
                    isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                  }`}
                >
                  <Award className="w-4 h-4 text-[#8C8981]" /> Certifications
                </h2>
                <div
                  className={`flex flex-col gap-1 text-xs ${
                    isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'
                  }`}
                >
                  {profile.certifications.map((cert, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center py-1 border-b last:border-0 ${
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
              <div className="resume-avoid-break grid grid-cols-2 gap-3 pt-1">
                <div>
                  <h3
                    className={`text-[11px] font-mono uppercase font-bold mb-1 ${
                      isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                    }`}
                  >
                    Languages
                  </h3>
                  <div
                    className={`text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'
                    }`}
                  >
                    {profile.languages.join(', ')}
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-[11px] font-mono uppercase font-bold mb-1 ${
                      isPaper ? 'text-[#6B7280]' : 'text-[#8C8981]'
                    }`}
                  >
                    Soft Skills
                  </h3>
                  <div
                    className={`text-xs ${
                      isPaper ? 'text-[#374151]' : 'text-[#CBC7BD]'
                    }`}
                  >
                    {profile.softSkills.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM MODAL BAR (HIDDEN IN PRINT)                                       */}
        {/* ========================================================================= */}
        <div
          className={`no-print pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isPaper ? 'border-[#E5E7EB] text-[#6B7280]' : 'border-[#242420] text-[#8C8981]'
          }`}
        >
          <span>
            Contact: <strong className={isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'}>{profile.phone}</strong> ·{' '}
            <strong className={isPaper ? 'text-[#111827]' : 'text-[#F2EFE8]'}>{profile.email}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full font-bold text-[#0D0D0C] shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              Print / Save PDF (Ctrl+P)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
