import type { DemoProperty } from '@/types'

/**
 * Sample data for the illustrative real estate concept. These are NOT real
 * listings, projects or clients — the section labels them as sample data.
 */
export const demoBrandName = 'Your Realty'

export const demoProperties: DemoProperty[] = [
  {
    id: 'apt-3bhk',
    title: '3 BHK Apartment',
    type: 'Apartment',
    location: 'Sector 150, Noida',
    price: '₹1.25 Cr',
    size: '1,650 sq ft',
    details: ['3 bed · 3 bath', 'Ready to move', 'Covered parking'],
    status: 'For sale',
  },
  {
    id: 'apt-2bhk',
    title: '2 BHK Apartment',
    type: 'Apartment',
    location: 'Noida Extension',
    price: '₹68 Lakh',
    size: '1,080 sq ft',
    details: ['2 bed · 2 bath', 'Under construction', 'Possession 2027'],
    status: 'For sale',
  },
  {
    id: 'plot-yamuna',
    title: 'Residential Plot',
    type: 'Plot',
    location: 'Yamuna Expressway',
    price: '₹54 Lakh',
    size: '200 sq yd',
    details: ['East facing', 'Gated layout', 'Near main road'],
    status: 'For sale',
  },
  {
    id: 'office-62',
    title: 'Office Space',
    type: 'Commercial',
    location: 'Sector 62, Noida',
    price: '₹85,000 / month',
    size: '1,200 sq ft',
    details: ['Furnished', '2 parking slots', 'Metro nearby'],
    status: 'For rent',
  },
  {
    id: 'shop-greater-noida',
    title: 'Retail Shop',
    type: 'Commercial',
    location: 'Greater Noida West',
    price: '₹42 Lakh',
    size: '320 sq ft',
    details: ['Ground floor', 'High footfall market', 'Lease options'],
    status: 'For sale',
  },
  {
    id: 'plot-dadri',
    title: 'Residential Plot',
    type: 'Plot',
    location: 'Dadri Road',
    price: '₹36 Lakh',
    size: '150 sq yd',
    details: ['Corner plot', 'Registry ready', 'Park facing'],
    status: 'For sale',
  },
]

export const demoPropertyTypes: Array<'All' | DemoProperty['type']> = ['All', 'Apartment', 'Plot', 'Commercial']

/** The message a buyer would send to the broker from a live site built this way. */
export function buildPropertyEnquiry(property: DemoProperty): string {
  return `Hi, I'm interested in the ${property.title} (${property.size}) at ${property.location}, listed at ${property.price}. Please share more details and a suitable time for a site visit.`
}
