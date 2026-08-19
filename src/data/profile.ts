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
  // Set VITE_WHATSAPP_NUMBER in .env.local / Vercel env vars (digits only, e.g. 919876543210).
  // WhatsApp CTAs stay hidden across the site until this is configured — see .env.example.
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
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
