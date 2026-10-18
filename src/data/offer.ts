import type { WebsitePackage } from '@/types'

export const websitePackages: WebsitePackage[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    price: '₹10,000',
    summary: 'A clean, professional online presence for a business that needs the essentials done right.',
    features: [
      'Up to 3 pages',
      'Responsive design for mobile, tablet and desktop',
      'Business information and services',
      'WhatsApp enquiry button',
      'Contact form and location information',
      'One revision round',
    ],
    whatsappMessage:
      'Hi, I am interested in the Starter Website package (from ₹10,000). My business type is ____. Please share the details and quotation.',
  },
  {
    id: 'business',
    name: 'Business Website',
    price: '₹20,000',
    summary: 'More room to showcase your work — ideal for brokers, consultants and service businesses with listings or projects.',
    features: [
      'Up to 5 pages',
      'Everything in Starter, where applicable',
      'Property, service or project showcase',
      'Two revision rounds',
      'Basic on-page SEO setup (titles, descriptions, headings, sitemap)',
    ],
    whatsappMessage:
      'Hi, I am interested in the Business Website package (from ₹20,000). My business type is ____. Please share the details and quotation.',
    highlighted: true,
  },
]

export const packageExclusions = [
  'Domain name',
  'Hosting',
  'Paid third-party services, plugins or APIs',
  'Ongoing maintenance',
  'Advanced SEO or ad management',
  'E-commerce / online payments',
  'Additional pages or custom functionality',
]

export const leadBusinessTypes = [
  'Real estate broker / property consultant',
  'Builder / developer',
  'Clinic / healthcare',
  'Restaurant / café',
  'Coaching / education',
  'Retail shop',
  'Salon / fitness',
  'Professional services',
  'Startup / software product',
]

export const leadRequirements = [
  'New website',
  'Redesign of an existing website',
  'Property / project listing website',
  'Landing page for ads',
  'Custom web app, dashboard or API',
  'Fixes or new features on an existing site / app',
  'Not sure yet — need advice',
]

export const leadBudgets = [
  'Under ₹10,000',
  '₹10,000 – ₹20,000',
  '₹20,000 – ₹35,000',
  '₹35,000 – ₹1,00,000',
  '₹1,00,000+',
  'Not sure yet',
]
