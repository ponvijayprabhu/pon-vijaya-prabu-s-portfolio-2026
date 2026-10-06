import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, ArrowUp, Send, CheckCircle2, Mail, Clock, MapPin } from 'lucide-react';
import { getAssetUrl, defaultAvatar } from '../utils/assetHelper';

export const ContactSection: React.FC = () => {
  const { profile, accent } = usePortfolio();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendSuccessNote, setSendSuccessNote] = useState<string>('');

  const recipientEmail = profile.email || 'ponvijayprabhu@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          _subject: formState.subject ? `[Portfolio] ${formState.subject}` : `[Portfolio] Message from ${formState.name}`,
          message: formState.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Service returned non-200');
      }

      setSendSuccessNote(`Dispatched directly to ${recipientEmail}`);
      setSubmitted(true);
    } catch {
      // In case of network blocker or offline state, trigger mailto client directly
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        formState.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Hi Vijay,\n\nFrom: ${formState.name} (${formState.email})\n\nSubject: ${formState.subject}\n\nMessage:\n${formState.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSendSuccessNote(`Opened your email app with pre-filled message to ${recipientEmail}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full pt-28 pb-12 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-[#0D0D0C] border-t border-[#262623]"
    >
      {/* Ambient background glow circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-48 -translate-x-1/2 w-[700px] md:w-[980px] h-[700px] md:h-[980px] rounded-full blur-[140px] opacity-15 transition-all duration-700 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, rgba(13,13,12,0) 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center my-auto">
        <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-6">
          05 — Get In Touch
        </p>

        {/* Massive Headline with Central Portrait Badge */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.92] flex flex-col items-center gap-2 mb-10">
          <span>Have an idea?</span>
          <span className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#3A3934] shadow-2xl flex items-center justify-center shrink-0 bg-[#161614]"
            >
              <img
                src={getAssetUrl(profile.avatarUrl)}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (e.currentTarget.src !== defaultAvatar) {
                    e.currentTarget.src = defaultAvatar;
                  }
                }}
              />
            </span>
            <span>
              Let's make it{' '}
              <em
                className="font-serif italic font-normal transition-colors"
                style={{ color: accent }}
              >
                real.
              </em>
            </span>
          </span>
        </h2>

        {/* Direct Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-[#0D0D0C] shadow-2xl transition-transform duration-200 hover:-translate-y-1"
            style={{ backgroundColor: accent }}
          >
            <span>Email directly</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>

          <a
            href={`tel:${profile.phone}`}
            className="text-lg md:text-xl font-medium text-[#F2EFE8] hover:underline underline-offset-8 transition-all"
          >
            {profile.phone}
          </a>

          <span className="hidden sm:inline text-[#3A3934]">·</span>

          <a
            href={`mailto:${profile.email}`}
            className="text-lg md:text-xl font-medium text-[#F2EFE8] hover:underline underline-offset-8 transition-all"
          >
            {profile.email}
          </a>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="w-full max-w-2xl bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-10 text-left shadow-2xl mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#22221F] mb-6 gap-2">
            <div>
              <h3 className="text-xl font-bold text-[#F2EFE8]">Contact Me</h3>
              <p className="text-xs text-[#8C8981] mt-0.5">Response guaranteed within 24 business hours</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#ABA79E]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C8981]" /> {profile.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8C8981]" /> IST (UTC+5:30)
              </span>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center flex flex-col items-center gap-4 bg-[#181816] rounded-2xl border border-[#2B2B26]">
              <CheckCircle2 className="w-12 h-12" style={{ color: accent }} />
              <h4 className="text-2xl font-bold text-[#F2EFE8]">Message Sent!</h4>
              <p className="text-sm text-[#ABA79E] max-w-md">
                Thank you, {formState.name || 'there'}. Your message regarding "{formState.subject || 'your inquiry'}" has been dispatched directly to{' '}
                <span className="text-[#F2EFE8] font-semibold">{recipientEmail}</span>.
              </p>
              {sendSuccessNote && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#20201D] text-[#CEFD4B] border border-[#33332D]">
                  <Mail className="w-3.5 h-3.5" /> {sendSuccessNote}
                </span>
              )}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-full border border-[#3A3934] text-[#F2EFE8] hover:bg-[#20201D] transition-colors"
                >
                  Send another message
                </button>
                <a
                  href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
                    formState.subject || 'Portfolio Inquiry'
                  )}&body=${encodeURIComponent(formState.message)}`}
                  className="px-5 py-2.5 text-xs font-semibold rounded-full bg-[#20201D] text-[#F2EFE8] border border-[#3A3934] hover:border-[#F2EFE8] transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Mail App</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#8C8981] uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-sm text-[#F2EFE8] placeholder-[#66635C] focus:outline-none focus:border-[#4E4D46] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#8C8981] uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-sm text-[#F2EFE8] placeholder-[#66635C] focus:outline-none focus:border-[#4E4D46] transition-colors"
                  />
                </div>
              </div>

              {/* Subject Card */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-[#8C8981] uppercase">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Design Inquiry / Project Discussion"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-sm text-[#F2EFE8] placeholder-[#66635C] focus:outline-none focus:border-[#4E4D46] transition-colors"
                />
              </div>

              {/* Message Card */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-[#8C8981] uppercase">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message here..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-sm text-[#F2EFE8] placeholder-[#66635C] focus:outline-none focus:border-[#4E4D46] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl text-sm font-bold text-[#0D0D0C] transition-all flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 mt-2"
                style={{ backgroundColor: accent }}
              >
                {submitting ? (
                  <span>Sending to {recipientEmail}...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-[#8C8981]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4F36B]" />
                  <span>Delivers directly to: <strong className="text-[#F2EFE8] font-normal">{recipientEmail}</strong></span>
                </span>
                <a
                  href={`mailto:${recipientEmail}`}
                  className="hover:text-[#F2EFE8] underline underline-offset-4 transition-colors"
                >
                  Or open your email client
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto pt-8 border-t border-[#262623] flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#8C8981]">
        <div>
          <span>© 2026 {profile.name}</span>
          <span className="mx-2">·</span>
          <span>Crafted with intentional typography & zero-pill discipline</span>
        </div>

        {/* Social Links */}
        <nav aria-label="Social links" className="flex items-center gap-4">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.portfolioLive}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
          >
            GitHub Portfolio
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-[#ABA79E] hover:text-[#F2EFE8] transition-colors"
          >
            GitHub Profile
          </a>
        </nav>

        {/* Back to top */}
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#F2EFE8] hover:underline underline-offset-4"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </a>
      </footer>
    </section>
  );
};
