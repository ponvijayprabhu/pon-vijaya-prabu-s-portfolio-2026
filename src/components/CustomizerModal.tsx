import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { AccentColor } from '../types/portfolio';
import { getAssetUrl, defaultHeroPortrait, defaultAvatar } from '../utils/assetHelper';

const ACCENT_OPTIONS: { label: string; value: AccentColor }[] = [
  { label: 'Volt Lime', value: '#D4F36B' },
  { label: 'Solar Coral', value: '#FF8A5B' },
  { label: 'Cyan Ice', value: '#8EC5FF' },
  { label: 'Lavender', value: '#C4B5FD' },
  { label: 'Amber', value: '#FBBF24' },
];

export const CustomizerModal: React.FC = () => {
  const { profile, updateProfile, resetProfile, isCustomizerOpen, setIsCustomizerOpen, accent, setAccent } = usePortfolio();

  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '/my.jpg');
  const [bioHeadline, setBioHeadline] = useState(profile.bioHeadline);
  const [bioSubtext, setBioSubtext] = useState(profile.bioSubtext);
  const [location, setLocation] = useState(profile.location);
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears);
  const [focusArea, setFocusArea] = useState(profile.focusArea);
  const [email, setEmail] = useState(profile.email);
  const [availableForHire, setAvailableForHire] = useState(profile.availableForHire);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isCustomizerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      title,
      avatarUrl,
      bioHeadline,
      bioSubtext,
      location,
      experienceYears,
      focusArea,
      email,
      availableForHire,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsCustomizerOpen(false);
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio details back to default?')) {
      resetProfile();
      setName('Pon Vijaya Prabu S');
      setTitle('UI/UX Designer');
      setBioHeadline("Hi, I'm Pon Vijaya Prabu —");
      setBioSubtext('Passionate UI/UX Designer with experience in designing responsive web and mobile applications using Figma. Skilled in wireframing, prototyping, and creating user-centered interfaces that improve usability and user experience.');
      setLocation('Nagercoil, Kanyakumari, Tamil Nadu');
      setExperienceYears('UI/UX Designer @ Canvendor');
      setFocusArea('EMR, AI, HRMS, Logistics & Web Apps');
      setEmail('ponvijayprabhu@gmail.com');
      setAvailableForHire(true);
      setIsCustomizerOpen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0D0D0C]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsCustomizerOpen(false)}
    >
      <div
        className="relative w-full max-w-xl my-auto rounded-3xl bg-[#141412] border border-[#2A2A26] shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col gap-6 text-[#F2EFE8]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#242420]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: accent }} />
            <h3 id="customizer-title" className="text-xl font-bold text-[#F2EFE8]">
              Personalize Portfolio
            </h3>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(false)}
            aria-label="Close customizer"
            className="p-2 rounded-full border border-[#2E2E2A] bg-[#1C1C1A] text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Profile Photo Uploader */}
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#181816] border border-[#282824]">
            <img
              src={getAssetUrl(avatarUrl)}
              alt="Preview"
              className="w-14 h-14 rounded-xl object-cover border border-[#3A3934] shrink-0"
              onError={(e) => {
                if (e.currentTarget.src !== defaultHeroPortrait) {
                  e.currentTarget.src = defaultHeroPortrait;
                }
              }}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Profile Picture Selection</label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAvatarUrl('/Image.png')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    avatarUrl === '/Image.png' || !avatarUrl
                      ? 'bg-[#2E2E2A] text-[#F2EFE8] border border-[#4A4A44]'
                      : 'bg-[#1C1C1A] text-[#8C8981] hover:text-[#F2EFE8]'
                  }`}
                >
                  My Image (Image.png)
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarUrl('/avatar.png')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    avatarUrl === '/avatar.png'
                      ? 'bg-[#2E2E2A] text-[#F2EFE8] border border-[#4A4A44]'
                      : 'bg-[#1C1C1A] text-[#8C8981] hover:text-[#F2EFE8]'
                  }`}
                >
                  Avatar Icon
                </button>
                <label className="px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-[#3A3934] hover:border-[#F2EFE8] text-[#F2EFE8] bg-[#20201D] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          if (result) setAvatarUrl(result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <span>Upload File</span>
                </label>
              </div>
            </div>
          </div>

          {/* Accent Color Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-[#8C8981]">Accent Highlight Color</label>
            <div className="flex items-center gap-2">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setAccent(opt.value)}
                  className={`w-9 h-9 rounded-full border-2 transition-transform ${
                    accent === opt.value
                      ? 'scale-110 border-white shadow-lg'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.label}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Designer Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Role Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase text-[#8C8981]">Bio Headline</label>
            <input
              type="text"
              value={bioHeadline}
              onChange={(e) => setBioHeadline(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono uppercase text-[#8C8981]">Bio Subtext</label>
            <textarea
              rows={2}
              value={bioSubtext}
              onChange={(e) => setBioSubtext(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Experience</label>
              <input
                type="text"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Focus Specialty</label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-[#8C8981]">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="availCheck"
              checked={availableForHire}
              onChange={(e) => setAvailableForHire(e.target.checked)}
              className="w-4 h-4 rounded bg-[#1B1B18] border border-[#2E2E2A] text-[#D4F36B] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="availCheck" className="text-xs text-[#CBC7BD] cursor-pointer">
              Mark as "Available for new projects"
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#242420] mt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#8C8981] hover:text-[#F2EFE8] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0D0D0C] flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: accent }}
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : null}
              <span>{savedSuccess ? 'Saved!' : 'Save & Apply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
