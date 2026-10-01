import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Sliders, Check, Volume2, ShieldCheck } from 'lucide-react';

export const DesignLabSection: React.FC = () => {
  const { accent } = usePortfolio();

  // Playground state
  const [clickCount, setClickCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'interactions' | 'contrast' | 'tokens'>('interactions');
  const [sampleBg, setSampleBg] = useState('#0D0D0C');
  const [sampleText, setSampleText] = useState('#D4F36B');
  const [buttonScale, setButtonScale] = useState(1);
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Calculate rough contrast ratio
  const getLuminance = (hex: string) => {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = ((rgb >> 0) & 0xff) / 255;
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(sampleBg);
  const lum2 = getLuminance(sampleText);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const contrastRatio = ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  const passesAA = parseFloat(contrastRatio) >= 4.5;
  const passesAAA = parseFloat(contrastRatio) >= 7.0;

  return (
    <section id="lab" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#262623]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-[#8C8981] mb-4">
            03 — Interactive Playground
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#F2EFE8] leading-[0.95]">
            Design{' '}
            <em
              className="font-serif italic font-normal transition-colors"
              style={{ color: accent }}
            >
              lab
            </em>
          </h2>
        </div>

        <p className="max-w-md text-base text-[#ABA79E] leading-relaxed">
          Interactive micro-interaction and accessibility sandboxes demonstrating front-of-the-curve UI engineering.
        </p>
      </div>

      {/* Lab Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-[#242420] pb-3">
        <button
          onClick={() => setActiveTab('interactions')}
          className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors ${
            activeTab === 'interactions'
              ? 'bg-[#22221F] text-[#F2EFE8] font-semibold'
              : 'text-[#8C8981] hover:text-[#F2EFE8]'
          }`}
          style={activeTab === 'interactions' ? { borderBottom: `2px solid ${accent}` } : {}}
        >
          Micro-Interactions
        </button>
        <button
          onClick={() => setActiveTab('contrast')}
          className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors ${
            activeTab === 'contrast'
              ? 'bg-[#22221F] text-[#F2EFE8] font-semibold'
              : 'text-[#8C8981] hover:text-[#F2EFE8]'
          }`}
          style={activeTab === 'contrast' ? { borderBottom: `2px solid ${accent}` } : {}}
        >
          WCAG Contrast Inspector
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors ${
            activeTab === 'tokens'
              ? 'bg-[#22221F] text-[#F2EFE8] font-semibold'
              : 'text-[#8C8981] hover:text-[#F2EFE8]'
          }`}
          style={activeTab === 'tokens' ? { borderBottom: `2px solid ${accent}` } : {}}
        >
          Density & Tokens
        </button>
      </div>

      {/* Tab 1: Micro-Interactions */}
      {activeTab === 'interactions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Card 1: Spring Physics Button */}
          <div className="p-8 rounded-2xl bg-[#141412] border border-[#262622] flex flex-col justify-between min-h-[280px]">
            <div>
              <span className="font-mono text-xs uppercase text-[#8C8981]">Experiment 01</span>
              <h4 className="text-xl font-semibold text-[#F2EFE8] mt-1 mb-2">Haptic Spring CTA</h4>
              <p className="text-xs text-[#ABA79E] leading-relaxed">
                Physics-based tactile feedback with scale recoil and counter state.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 my-4">
              <button
                onClick={() => {
                  setClickCount((c) => c + 1);
                  setButtonScale(0.92);
                  setTimeout(() => setButtonScale(1.08), 80);
                  setTimeout(() => setButtonScale(1), 180);
                }}
                style={{
                  backgroundColor: accent,
                  transform: `scale(${buttonScale})`,
                  transition: 'transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                className="px-6 py-3 rounded-full text-xs font-bold text-[#0D0D0C] shadow-lg flex items-center gap-2 cursor-pointer select-none"
              >
                <Sparkles className="w-4 h-4" />
                <span>Trigger Pulse ({clickCount})</span>
              </button>
              <span className="text-[11px] font-mono text-[#8C8981]">
                Tap count registered: {clickCount}
              </span>
            </div>

            <span className="text-[10px] font-mono text-[#6B6861]">
              Bezier: cubic-bezier(0.175, 0.885, 0.32, 1.275)
            </span>
          </div>

          {/* Card 2: Sound Feedback / Audio Feel */}
          <div className="p-8 rounded-2xl bg-[#141412] border border-[#262622] flex flex-col justify-between min-h-[280px]">
            <div>
              <span className="font-mono text-xs uppercase text-[#8C8981]">Experiment 02</span>
              <h4 className="text-xl font-semibold text-[#F2EFE8] mt-1 mb-2">Ambient UI Audio</h4>
              <p className="text-xs text-[#ABA79E] leading-relaxed">
                Web Audio API synthesizer generating subtle harmonic clicks for high-intent actions.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 my-4">
              <button
                onClick={() => {
                  try {
                    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5
                    gain.gain.setValueAtTime(0.08, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.08);
                  } catch {
                    // audio context fallback
                  }
                }}
                className="px-6 py-3 rounded-full text-xs font-semibold border border-[#3A3934] hover:border-[#F2EFE8] text-[#F2EFE8] bg-[#1C1C1A] hover:bg-[#252522] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Micro Audio Tone</span>
              </button>
              <span className="text-[11px] font-mono text-[#8C8981]">
                80ms harmonic chime
              </span>
            </div>

            <span className="text-[10px] font-mono text-[#6B6861]">
              Zero-asset client-side frequency synthesis
            </span>
          </div>

          {/* Card 3: Magnetic Card Focus */}
          <div className="p-8 rounded-2xl bg-[#141412] border border-[#262622] flex flex-col justify-between min-h-[280px]">
            <div>
              <span className="font-mono text-xs uppercase text-[#8C8981]">Experiment 03</span>
              <h4 className="text-xl font-semibold text-[#F2EFE8] mt-1 mb-2">Focus Halo Ring</h4>
              <p className="text-xs text-[#ABA79E] leading-relaxed">
                Adaptive focus-visible rings ensuring strict WCAG 2.2 focus appearance guidelines.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 my-4">
              <input
                type="text"
                placeholder="Tab / Click to test focus..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2E2E2A] text-xs text-[#F2EFE8] placeholder-[#7D7970] focus:outline-none focus:ring-2 transition-all"
                style={{
                  '--tw-ring-color': accent,
                } as React.CSSProperties}
              />
              <span className="text-[11px] font-mono text-[#8C8981]">
                Visible 2px contrast halo
              </span>
            </div>

            <span className="text-[10px] font-mono text-[#6B6861]">
              Complies with WCAG 2.4.11 Focus Not Obscured
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Contrast Inspector */}
      {activeTab === 'contrast' && (
        <div className="p-8 rounded-2xl bg-[#141412] border border-[#262622] grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase text-[#8C8981]">Real-time Calculation</span>
            <h4 className="text-2xl font-bold text-[#F2EFE8]">Contrast Ratio Engine</h4>
            <p className="text-sm text-[#ABA79E] leading-relaxed">
              Every design choice in this portfolio is grounded in mathematical luminance verification to prevent low-contrast inaccessibility.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <label className="text-xs text-[#ABA79E] flex items-center gap-2">
                <span>Canvas:</span>
                <input
                  type="color"
                  value={sampleBg}
                  onChange={(e) => setSampleBg(e.target.value)}
                  className="w-7 h-7 rounded border border-[#2E2E2A] bg-transparent cursor-pointer"
                />
              </label>

              <label className="text-xs text-[#ABA79E] flex items-center gap-2">
                <span>Text:</span>
                <input
                  type="color"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-7 h-7 rounded border border-[#2E2E2A] bg-transparent cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Live Preview Box */}
            <div
              className="p-6 rounded-2xl border border-white/10 transition-colors flex items-center justify-between"
              style={{ backgroundColor: sampleBg, color: sampleText }}
            >
              <div>
                <div className="text-lg font-bold">Sample Display Typography</div>
                <div className="text-xs opacity-90">16px Regular Body Text Specimen</div>
              </div>
              <div className="text-3xl font-black font-mono tabular-nums">
                {contrastRatio}:1
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#181816] border border-[#282824] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F2EFE8]">WCAG AA (4.5:1)</div>
                  <div className="text-[11px] text-[#8C8981]">Standard Body Text</div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded ${
                    passesAA ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}
                >
                  {passesAA ? 'PASS ✓' : 'FAIL ✕'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#181816] border border-[#282824] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F2EFE8]">WCAG AAA (7.0:1)</div>
                  <div className="text-[11px] text-[#8C8981]">Enhanced Legibility</div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded ${
                    passesAAA ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}
                >
                  {passesAAA ? 'PASS ✓' : 'FAIL ✕'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Density & Tokens */}
      {activeTab === 'tokens' && (
        <div className="p-8 rounded-2xl bg-[#141412] border border-[#262622] flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-bold text-[#F2EFE8]">UI Spacing Density Scale</h4>
              <p className="text-xs text-[#ABA79E] mt-1">
                Toggle between comfortable consumer spacing and high-density SaaS views.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-[#1A1A17] rounded-xl border border-[#2A2A26] self-start">
              <button
                onClick={() => setDensity('comfortable')}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  density === 'comfortable'
                    ? 'bg-[#262622] text-[#F2EFE8] font-bold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
              >
                Comfortable (24px)
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  density === 'compact'
                    ? 'bg-[#262622] text-[#F2EFE8] font-bold'
                    : 'text-[#8C8981] hover:text-[#F2EFE8]'
                }`}
              >
                Compact (12px)
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl border border-[#262622] bg-[#11110F] transition-all duration-300 flex flex-col ${
              density === 'comfortable' ? 'p-6 gap-4' : 'p-3 gap-2'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#20201D]">
              <span className="text-xs font-mono text-[#8C8981]">USER RECORD #8491</span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: `${accent}25`, color: accent }}
              >
                ACTIVE CLUSTER
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[#8C8981] block text-[10px]">CPU ALLOCATION</span>
                <span className="font-semibold text-[#F2EFE8] tabular-nums">16 Cores (4.2 GHz)</span>
              </div>
              <div>
                <span className="text-[#8C8981] block text-[10px]">MEMORY POOL</span>
                <span className="font-semibold text-[#F2EFE8] tabular-nums">64 GB DDR5</span>
              </div>
              <div>
                <span className="text-[#8C8981] block text-[10px]">NETWORK EGRESS</span>
                <span className="font-semibold text-[#F2EFE8] tabular-nums">1.2 Gbps</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
