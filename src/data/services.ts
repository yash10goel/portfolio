import type { ProcessStep, Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-app-dev',
    title: 'Web Application Development',
    description: 'Modern, responsive and scalable web applications for businesses.',
    deliverables: ['Component-driven architecture', 'Responsive, accessible UI', 'Clean state management'],
  },
  {
    id: 'react-nextjs',
    title: 'React / Next.js Development',
    description: 'Fast, modern frontend applications using React, Next.js and TypeScript.',
    deliverables: ['Component-driven architecture', 'Reusable UI systems', 'Performance-focused rendering'],
  },
  {
    id: 'angular-dev',
    title: 'Angular Development',
    description: 'Enterprise-grade Angular applications, dashboards and management systems.',
    deliverables: ['Scalable Angular architecture', 'State management with Redux', 'Enterprise dashboard UIs'],
  },
  {
    id: 'dotnet-api',
    title: '.NET API Development',
    description: 'Secure and scalable REST APIs using C# and ASP.NET Core.',
    deliverables: ['ASP.NET Core services', 'Secure REST APIs', 'Authentication & RBAC'],
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Management Systems',
    description: 'Data-driven dashboards, admin panels and business management applications.',
    deliverables: ['Role-based access control', 'Data tables & filtering', 'Permission-aware UI'],
  },
  {
    id: 'bug-fixing',
    title: 'Bug Fixing & Existing Project Development',
    description: 'Fix bugs, improve existing applications, integrate APIs and add new features.',
    deliverables: ['Root-cause debugging', 'API integrations', 'Safe, regression-aware changes'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Talk',
    description: 'A quick WhatsApp chat or call about your business, your customers and what the website needs to do.',
  },
  {
    index: '02',
    title: 'Quote & Scope',
    description: 'You get a written quote listing the pages, features, revisions and timeline — before any work starts.',
  },
  {
    index: '03',
    title: 'Design & Build',
    description: 'I build the site and share a private preview link so you can see it on your own phone as it takes shape.',
  },
  {
    index: '04',
    title: 'Review',
    description: 'You request changes within the agreed revision rounds, and I refine the content and layout.',
  },
  {
    index: '05',
    title: 'Launch',
    description: 'The site goes live on your domain, and I hand over access and walk you through updating key details.',
  },
]
