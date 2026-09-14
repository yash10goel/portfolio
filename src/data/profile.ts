import type { NavLink, Profile, SocialLink } from '@/types'

export const profile: Profile = {
  name: 'Yash Goel',
  role: 'Full-Stack Developer',
  location: 'Noida / NCR, India',
  timezone: 'IST (UTC+5:30)',
  responseTime: 'Usually within 24 hours',
  email: 'goelyash501@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yashgoel10',
  github: 'https://github.com/yash10goel',
  yearsExperience: '3+',
  availability: 'Available for Freelance Projects',
  resumeUrl: '/resume.pdf',
  // VITE_WHATSAPP_NUMBER (set in .env.local / Vercel env vars) overrides this if present.
  // Falls back to the real number directly so WhatsApp CTAs work even without that env var set.
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '919084386006',
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'email' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: profile.github, icon: 'github' },
]
