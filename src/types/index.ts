export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'email' | 'linkedin' | 'github'
}

export interface Profile {
  name: string
  role: string
  location: string
  timezone: string
  responseTime: string
  email: string
  linkedin: string
  github: string
  yearsExperience: string
  availability: string
  resumeUrl: string
  /** WhatsApp number in international format, digits only (e.g. "919876543210"). Empty when not configured. */
  whatsapp: string
}

export interface TechItem {
  name: string
  tier: 'core' | 'secondary' | 'familiar'
}

export interface SkillGroup {
  title: string
  description: string
  items: string[]
}

export interface ExperienceEntry {
  id: string
  company: string
  companyNote?: string
  role: string
  location: string
  duration: string
  current: boolean
  summary: string
  highlights: string[]
  tech: string[]
}

export interface ProjectDetail {
  challenge: string
  solution: string
  role: string
  features: string[]
  highlights: string[]
  outcome: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: 'Full Stack' | 'Frontend'
  tech: string[]
  detail: ProjectDetail
  featured: boolean
  /** Shown in the top 3 "spotlight" project cards on the Projects section. */
  spotlight?: boolean
  liveUrl?: string
  /** Live in production but not publicly linkable (internal/confidential enterprise system). */
  inProduction?: boolean
  /** Actively being built, not yet published/live — shown instead of a Live/In Production badge. */
  inDevelopment?: boolean
  /** Whether this was done as an employer/client engagement or independent freelance work. */
  engagement: 'professional' | 'freelance'
  /** Employer name (professional) or client name (freelance). */
  company: string
}

export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
}

export interface ProcessStep {
  index: string
  title: string
  description: string
}

export interface WebsitePackage {
  id: string
  name: string
  /** Starting price as displayed, e.g. "₹10,000". */
  price: string
  summary: string
  features: string[]
  /** Prefilled WhatsApp message for this package's CTA. */
  whatsappMessage: string
  highlighted?: boolean
}

export interface DemoProperty {
  id: string
  title: string
  type: 'Apartment' | 'Plot' | 'Commercial'
  location: string
  price: string
  size: string
  details: string[]
  status: string
}

export type WebsiteCategory = 'business' | 'service' | 'real-estate' | 'custom'

interface WebsiteExampleBase {
  id: string
  /** First entry is the label shown on the card; the example appears under every listed category. */
  categories: WebsiteCategory[]
  /** Who the site is for, in plain language, e.g. "Clinic / healthcare practice". */
  businessType: string
}

/** A genuine project from data/projects.ts — name, tech, features and links come from there. */
export interface ProjectWebsiteExample extends WebsiteExampleBase {
  kind: 'project'
  projectId: string
}

/** An illustrative concept with sample content. Always labelled as a concept, never as client work. */
export interface ConceptWebsiteExample extends WebsiteExampleBase {
  kind: 'concept'
  name: string
  summary: string
  features: string[]
  tech: string[]
  /** Drives the small mock-up rendered on the card. */
  preview: {
    brand: string
    domain: string
    headline: string
    sections: string[]
    cta: string
  }
  /** Set when a fuller interactive version exists on the page. */
  interactiveDemo?: 'real-estate'
}

export type WebsiteExample = ProjectWebsiteExample | ConceptWebsiteExample
