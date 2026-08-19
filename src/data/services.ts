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
    title: 'Discuss',
    description: 'Understand your idea, requirements and goals.',
  },
  {
    index: '02',
    title: 'Plan',
    description: 'Define features, architecture and development approach.',
  },
  {
    index: '03',
    title: 'Build',
    description: 'Develop the application and provide regular progress updates.',
  },
  {
    index: '04',
    title: 'Review',
    description: 'Test, refine and make improvements based on feedback.',
  },
  {
    index: '05',
    title: 'Launch',
    description: 'Deploy the completed solution and provide handover.',
  },
]
