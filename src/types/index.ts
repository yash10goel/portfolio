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
  liveUrl?: string
  /** Live in production but not publicly linkable (internal/confidential enterprise system). */
  inProduction?: boolean
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
