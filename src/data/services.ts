import type { ProcessStep, Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-app-dev',
    title: 'Web Application Development',
    description:
      'Modern, responsive web applications built with React, Angular or Next.js — architected for maintainability, not just a working demo.',
    deliverables: ['Component-driven architecture', 'Responsive, accessible UI', 'Clean state management'],
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Development',
    description:
      'End-to-end ownership from database to UI — frontend, backend, and the API layer that connects them.',
    deliverables: ['Frontend + backend integration', 'Database modeling', 'REST API design'],
  },
  {
    id: 'dotnet-api',
    title: '.NET & API Development',
    description:
      'Reliable C# / ASP.NET Core backends and REST APIs built for business applications that need to hold up under real use.',
    deliverables: ['ASP.NET Core services', 'Secure REST APIs', 'Authentication & RBAC'],
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & RBAC Systems',
    description:
      'Business dashboards with tables, filters, roles and permissions — built on real IAM and ITSM experience, not a generic template.',
    deliverables: ['Role-based access control', 'Data tables & filtering', 'Permission-aware UI'],
  },
  {
    id: 'bug-fixing',
    title: 'Bug Fixing & Existing App Development',
    description:
      'Stepping into an existing React, Angular or .NET codebase to fix issues, extend features, or stabilize what is already there.',
    deliverables: ['Root-cause debugging', 'Safe, incremental changes', 'Regression-aware fixes'],
  },
  {
    id: 'maintenance',
    title: 'Application Maintenance',
    description:
      'Ongoing development, bug fixing and technical support for applications already in production.',
    deliverables: ['Scheduled or on-demand support', 'Dependency & security upkeep', 'Incremental improvements'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Understand',
    description: 'Understand business requirements, goals and constraints before writing a line of code.',
  },
  {
    index: '02',
    title: 'Plan',
    description: 'Define architecture, features and a development approach that fits the scope and timeline.',
  },
  {
    index: '03',
    title: 'Build',
    description: 'Develop the frontend, backend, APIs and integrations, with regular progress check-ins.',
  },
  {
    index: '04',
    title: 'Test',
    description: 'Test functionality, responsiveness and edge cases before anything ships.',
  },
  {
    index: '05',
    title: 'Deploy',
    description: 'Deploy to production and provide support as the application goes live.',
  },
]
