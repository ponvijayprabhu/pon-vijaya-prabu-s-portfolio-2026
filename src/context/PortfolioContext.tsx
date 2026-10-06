import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioProfile, Project, AccentColor } from '../types/portfolio';
import { initialProfile, projectsData } from '../data/portfolioData';

interface PortfolioContextType {
  profile: PortfolioProfile;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  updateProfile: (updated: Partial<PortfolioProfile>) => void;
  resetProfile: () => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  projects: Project[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const STORAGE_KEY = 'portfolio_profile_custom_data_v11';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.avatarUrl ||
          parsed.avatarUrl === '/account_avatar.jpg' ||
          parsed.avatarUrl === '/my.jpg' ||
          parsed.avatarUrl === '/profile.jpg' ||
          parsed.avatarUrl === '/Image.png' ||
          parsed.avatarUrl === 'Image.png'
        ) {
          parsed.avatarUrl = '/My_pic.jpg';
        }
        return { ...initialProfile, ...parsed };
      }
    } catch {
      // ignore
    }
    return initialProfile;
  });

  const [accent, setAccentState] = useState<AccentColor>(profile.accentColor || '#D4F36B');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    updateProfile({ accentColor: newAccent });
  };

  const updateProfile = (updated: Partial<PortfolioProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProfile(initialProfile);
    setAccentState(initialProfile.accentColor);
  };

  useEffect(() => {
    // apply accent color variable to document root
    document.documentElement.style.setProperty('--color-accent', accent);
  }, [accent]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        accent,
        setAccent,
        updateProfile,
        resetProfile,
        selectedProject,
        setSelectedProject,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isResumeOpen,
        setIsResumeOpen,
        projects: projectsData,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
