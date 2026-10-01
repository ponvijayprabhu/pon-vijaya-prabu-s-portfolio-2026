import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const TickerRibbon: React.FC = () => {
  const { accent } = usePortfolio();

  const primaryItems = [
    'Product Design',
    'UX Research',
    'Interaction Design',
    'Design Systems',
    'Prototyping',
    'Usability Testing',
    'Design Strategy',
  ];

  const secondaryItems = [
    'Research',
    'Wireframes',
    'Visual Design',
    'Interactive Prototypes',
    'A/B Testing',
    'Engineering Handoff',
    'Micro-Interactions',
    'Accessibility Audits',
  ];

  return (
    <div
      aria-hidden="true"
      className="relative z-20 w-full h-32 my-6 overflow-hidden select-none pointer-events-none"
    >
      {/* Ribbon 1: Subdued dark ribbon tilted 2.5deg */}
      <div className="absolute left-[-5%] right-[-5%] top-8 h-12 bg-[#181816] border-y border-[#262623] transform rotate-2 flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-mono tracking-widest uppercase text-[#7A7770]">
          {secondaryItems.concat(secondaryItems).map((text, i) => (
            <React.Fragment key={i}>
              <span>{text}</span>
              <span className="text-[#3A3934]">—</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Ribbon 2: Bold High-Contrast Accent ribbon tilted -2deg */}
      <div
        className="absolute left-[-5%] right-[-5%] top-5 py-3 transform -rotate-2 flex items-center overflow-hidden shadow-2xl transition-colors duration-500"
        style={{ backgroundColor: accent, color: '#0D0D0C' }}
      >
        <div className="animate-marquee-reverse flex items-center gap-8 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          {primaryItems.concat(primaryItems).map((text, i) => (
            <React.Fragment key={i}>
              <span>{text}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C12.9 7.1 16.9 11.1 24 12C16.9 12.9 12.9 16.9 12 24C11.1 16.9 7.1 12.9 0 12C7.1 11.1 11.1 7.1 12 0Z" />
              </svg>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
