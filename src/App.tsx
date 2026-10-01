/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerRibbon } from './components/TickerRibbon';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { DesignLabSection } from './components/DesignLabSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CustomizerModal } from './components/CustomizerModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#0D0D0C] text-[#F2EFE8] flex flex-col font-sans selection:bg-[#D4F36B] selection:text-[#0D0D0C]">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Hero />
          <TickerRibbon />
          <ProjectsSection />
          <ServicesSection />
          <DesignLabSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <CaseStudyModal />
        <CustomizerModal />
        <ResumeModal />
      </div>
    </PortfolioProvider>
  );
}
