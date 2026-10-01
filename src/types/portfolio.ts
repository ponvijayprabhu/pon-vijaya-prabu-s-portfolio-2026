export type AccentColor = '#D4F36B' | '#FF8A5B' | '#8EC5FF' | '#C4B5FD' | '#FBBF24';

export interface Project {
  id: string;
  number: string;
  category: string;
  categoryType: 'mobile' | 'saas' | 'ecommerce' | 'system';
  title: string;
  tagline: string;
  client: string;
  year: string;
  role: string;
  timeline: string;
  overview: string;
  problem: string;
  researchInsights: string[];
  solution: string;
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  deliverables: string[];
  tools: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    company: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  projectRelation: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface CertificationItem {
  name: string;
  year?: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  avatarUrl: string;
  bioHeadline: string;
  bioSubtext: string;
  location: string;
  phone: string;
  experienceYears: string;
  focusArea: string;
  email: string;
  availableForHire: boolean;
  accentColor: AccentColor;
  designTools: string[];
  coreSkills: string[];
  softSkills: string[];
  certifications: CertificationItem[];
  education: EducationItem[];
  languages: string[];
  socials: {
    linkedin: string;
    github: string;
    portfolioLive: string;
    dribbble?: string;
    behance?: string;
  };
}
