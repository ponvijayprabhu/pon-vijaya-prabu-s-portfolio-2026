import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import { getAssetUrl, defaultAvatar } from '../utils/assetHelper';

export const Navbar: React.FC = () => {
  const { profile, accent, updateProfile, setIsResumeOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0C]/90 backdrop-blur-md border-b border-[#22221F] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Profile Photo Icon + Brand Name */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="relative group/avatar flex items-center gap-3 cursor-pointer"
            title={profile.name}
          >
            <div className="relative">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-[#2E2E2A] bg-[#161614] shadow-md group-hover/avatar:border-[#CEFD4B] transition-all">
                <img
                  src={getAssetUrl(profile.avatarUrl || '/My_pic.jpg')}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    if (e.currentTarget.src !== defaultAvatar) {
                      e.currentTarget.src = defaultAvatar;
                    }
                  }}
                />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0D0D0C]"
                style={{ backgroundColor: accent }}
              />
            </div>

            <span className="text-lg md:text-xl font-bold tracking-tight text-[#F2EFE8] group-hover/avatar:text-white transition-colors">
              {profile.name}
            </span>
          </a>
        </div>

        {/* Zone 2: Centered Floating Capsule Nav Pill (Work, Services, About, Contact) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 px-7 py-2.5 rounded-full border border-[#2A2A26] bg-[#161614]/90 backdrop-blur-md shadow-xl"
        >
          <a
            href="#work"
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap"
          >
            Work
          </a>
          <a
            href="#services"
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#tools"
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap"
          >
            Tools
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap"
          >
            About
          </a>
          <button
            onClick={() => setIsResumeOpen(true)}
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <span>Resume</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          </button>
          <a
            href="#contact"
            className="text-sm font-medium text-[#9E9B93] hover:text-[#F2EFE8] transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Resume + Single Clean CTA Button (Let's connect ↗) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#CBC7BD] border border-[#2E2E2A] bg-[#161614] hover:text-[#F2EFE8] hover:border-[#4A4A44] transition-all cursor-pointer shadow-sm"
            title="View & Print Verified CV"
          >
            <FileText className="w-3.5 h-3.5 text-[#8C8981]" />
            <span>Resume / CV</span>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#0D0D0C] transition-all hover:scale-105 active:scale-95 shadow-md"
            style={{ backgroundColor: accent }}
          >
            <span>Let's connect</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-[#ABA79E] hover:text-[#F2EFE8] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#22221F] bg-[#111110] px-6 py-4 flex flex-col gap-3">
          <button
            onClick={() => {
              setIsResumeOpen(true);
              setMobileMenuOpen(false);
            }}
            className="text-base text-left text-[#F2EFE8] py-1 font-semibold flex items-center gap-2 cursor-pointer"
            style={{ color: accent }}
          >
            <FileText className="w-4 h-4" />
            <span>View & Print Verified CV</span>
          </button>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#F2EFE8] py-1 font-medium"
          >
            Selected Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#F2EFE8] py-1 font-medium"
          >
            Services & Deliverables
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#F2EFE8] py-1 font-medium"
          >
            Tools & Software Known
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#F2EFE8] py-1 font-medium"
          >
            About & Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-[#F2EFE8] py-1 font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
};
