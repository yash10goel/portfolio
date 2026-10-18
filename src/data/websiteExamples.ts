import type { WebsiteCategory, WebsiteExample } from '@/types'

export const websiteCategories: { id: WebsiteCategory; label: string }[] = [
  { id: 'business', label: 'Business Websites' },
  { id: 'service', label: 'Service Business Websites' },
  { id: 'real-estate', label: 'Real Estate Websites' },
  { id: 'custom', label: 'Custom Web Applications' },
]

/**
 * Website examples grouped by category. `kind: 'project'` entries are genuine
 * work and pull their details from data/projects.ts. `kind: 'concept'` entries
 * are illustrative demos with sample content — the UI labels them as concepts.
 */
export const websiteExamples: WebsiteExample[] = [
  {
    id: 'ex-rkgc',
    kind: 'project',
    projectId: 'rkgc-group',
    categories: ['business', 'real-estate'],
    businessType: 'Multi-vertical business group (infrastructure, realty, agro, interiors)',
  },
  {
    id: 'ex-hillberg',
    kind: 'project',
    projectId: 'hillberg',
    categories: ['business'],
    businessType: 'Apparel & home-lifestyle retail store',
  },
  {
    id: 'ex-boutique',
    kind: 'concept',
    categories: ['business'],
    businessType: 'Local boutique / retail shop',
    name: 'Boutique Catalogue Website',
    summary:
      'A showroom-style site for a neighbourhood boutique: browse the latest collection and order or reserve on WhatsApp — no online payment setup needed.',
    features: [
      'Collection gallery grouped by category',
      'WhatsApp "Ask about this item" button on every product',
      'Store timings, Google Maps location and directions',
    ],
    tech: ['React', 'Tailwind CSS'],
    preview: {
      brand: 'Your Boutique',
      domain: 'yourboutique.in',
      headline: 'New festive collection is in store',
      sections: ['Kurtas', 'Sarees', 'Accessories'],
      cta: 'Order on WhatsApp',
    },
  },
  {
    id: 'ex-clinic',
    kind: 'concept',
    categories: ['service'],
    businessType: 'Clinic / healthcare practice',
    name: 'Clinic Website',
    summary:
      'A clear, trustworthy site for a doctor or clinic: services, doctor profile, timings and a simple appointment request.',
    features: [
      'Services and treatments overview',
      'Doctor profile with qualifications and clinic timings',
      'Appointment request form with WhatsApp / call buttons',
    ],
    tech: ['React', 'Tailwind CSS'],
    preview: {
      brand: 'Your Clinic',
      domain: 'yourclinic.in',
      headline: 'Family care, close to home',
      sections: ['Services', 'Doctor', 'Timings'],
      cta: 'Book an appointment',
    },
  },
  {
    id: 'ex-home-services',
    kind: 'concept',
    categories: ['service'],
    businessType: 'Home services (plumbing, electrical, cleaning, repairs)',
    name: 'Home Services Website',
    summary:
      'A fast, mobile-first site for a local service provider: what you fix, which areas you cover, and one tap to call or WhatsApp.',
    features: [
      'Service list with "starting from" pricing you control',
      'Service areas / localities covered',
      'Sticky call and WhatsApp buttons for quick bookings',
    ],
    tech: ['React', 'Tailwind CSS'],
    preview: {
      brand: 'Your Home Services',
      domain: 'yourservices.in',
      headline: 'Same-day repairs across your city',
      sections: ['Plumbing', 'Electrical', 'Cleaning'],
      cta: 'Call now',
    },
  },
  {
    id: 'ex-real-estate',
    kind: 'concept',
    categories: ['real-estate'],
    businessType: 'Independent property broker / consultant',
    name: 'Property Listings Website',
    summary:
      'A listing site for a broker or property consultant: property cards with price, size and location, filters, and a WhatsApp enquiry that names the exact property.',
    features: [
      'Property cards with price, size, location and status',
      'Filters by property type',
      'WhatsApp enquiry prefilled with the property details',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    preview: {
      brand: 'Your Realty',
      domain: 'yourbusiness.in',
      headline: 'Homes, plots & offices in your city',
      sections: ['Apartments', 'Plots', 'Commercial'],
      cta: 'Enquire on WhatsApp',
    },
    interactiveDemo: 'real-estate',
  },
  {
    id: 'ex-leadshyne',
    kind: 'project',
    projectId: 'leadshyne',
    categories: ['custom'],
    businessType: 'Sales & operations teams (CRM)',
  },
  {
    id: 'ex-claim-to-excel',
    kind: 'project',
    projectId: 'claim-to-excel',
    categories: ['custom'],
    businessType: 'Delivery & mobility vendors (document automation)',
  },
  {
    id: 'ex-iam',
    kind: 'project',
    projectId: 'iam',
    categories: ['custom'],
    businessType: 'Enterprise (user access & security)',
  },
]
