import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'rkgc-group',
    name: 'RKGC Group — Corporate Website',
    tagline: 'Live, full-stack marketing site for a multi-vertical construction & infrastructure group.',
    category: 'Full Stack',
    tech: ['React', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    featured: true,
    engagement: 'freelance',
    company: 'RKGC Group',
    liveUrl: 'https://www.rkgcgroup.com/',
    detail: {
      challenge:
        'RKGC Group operates across four distinct business verticals — infrastructure, real estate, agriculture and interior fit-outs — with a track record tied to major government infrastructure bodies. They needed a single site that could represent that scale credibly, capture leads and job applications, and give the team a way to manage submissions without a developer in the loop.',
      solution:
        'Independently designed and built a full-stack marketing website end to end: a public site covering Home, Projects, Investment, Careers and Contact across all four business verticals, backed by an authenticated admin panel for managing contact leads and job applications, with Supabase handling the database and résumé file storage.',
      role: 'Solo freelance full-stack developer — architected, built, deployed and currently maintain the entire application.',
      features: [
        'Multi-vertical marketing site covering Infrastructure, Realty, Agro and Spaces',
        'Animated stats counters and carousels showcasing company scale and government-linked project credentials',
        'Contact and job-application forms with submissions stored in Supabase, including résumé file uploads',
        'Admin panel with Excel export of leads/applications and on-demand company-profile PDF generation',
        'Light/dark theme system across the entire site',
      ],
      highlights: [
        'Built with React 18, Vite, React Router v6 and Redux Toolkit',
        'Tailwind CSS and Framer Motion for a polished, animation-rich, fully responsive UI',
        'Supabase (Postgres + file storage) as the sole backend — no separate server to manage',
        'Client-side PDF and Excel generation for admin workflows',
      ],
      outcome: 'Live in production as RKGC Group’s public website and the team’s day-to-day lead and job-application management tool.',
    },
  },
  {
    id: 'iam',
    name: 'Identity & Access Management (IAM)',
    tagline: 'Enterprise authentication, RBAC and session management platform.',
    category: 'Full Stack',
    tech: ['Angular', 'Redux', 'C#', 'ASP.NET', 'SCSS'],
    featured: true,
    engagement: 'professional',
    company: 'Inventia Technology Consultant Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'The organization needed a way to ensure the right people, in the right roles, could access exactly the tools they needed — no more, no less — with authentication and session handling secure enough for enterprise use.',
      solution:
        'Built a full-stack Identity & Access Management platform covering user management, role-based access control and authentication services, with a dynamic Angular interface backed by secure ASP.NET APIs.',
      role:
        'Full-stack developer — designed the Angular/Redux frontend and contributed to backend authentication and session-management logic.',
      features: [
        'User and role management with fine-grained, role-based access control',
        'Secure authentication flows and session management',
        'Dynamic, scalable admin interfaces built with Angular and Redux',
      ],
      highlights: [
        'Secure REST APIs developed in ASP.NET',
        'State managed predictably at scale with Redux',
        'Architected for maintainability across a growing permission model',
      ],
      outcome:
        'Delivered as a core module of the client’s production identity platform, used to manage user access and authentication across the organization.',
    },
  },
  {
    id: 'hes',
    name: 'Head End System (HES)',
    tagline: 'Smart-meter data acquisition and utility management platform.',
    category: 'Full Stack',
    tech: ['Angular', 'Redux', 'C#', 'ASP.NET', 'SCSS'],
    featured: true,
    engagement: 'professional',
    company: 'Inventia Technology Consultant Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'Utility providers needed a way to acquire data from smart meters, manage device connectivity, and automate control functionality across power, gas and water networks — without manual intervention.',
      solution:
        'Contributed to a high-performance, scalable meter data management platform that automates connectivity management and control functionality, with an Angular frontend and C#/ASP.NET backend services.',
      role:
        'Full-stack developer — built frontend features on Angular and contributed to backend services in C# with ASP.NET.',
      features: [
        'Real-time data acquisition from smart meters',
        'Automated connectivity and control workflows',
        'Operational dashboards for managing power, gas and water resources',
      ],
      highlights: [
        'Backend services built for high-throughput meter data',
        'Automated workflows reducing the need for manual intervention',
        'System security built into data acquisition and control paths',
      ],
      outcome:
        'Delivered as part of a production platform that helps utility operators manage connected meter infrastructure efficiently and securely.',
    },
  },
  {
    id: 'claim-to-excel',
    name: 'Claim to Excel',
    tagline: 'Automated invoice-to-spreadsheet processing for delivery & mobility vendors.',
    category: 'Frontend',
    tech: ['Next.js', 'Redux', 'SCSS'],
    featured: true,
    engagement: 'professional',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'Vendors on delivery and mobility platforms had to manually convert uploaded claim PDFs into usable spreadsheets and merge them across multiple documents — a slow, error-prone process.',
      solution:
        'Built a responsive frontend for an automated invoice-processing system that lets vendors upload claim PDFs, convert them into spreadsheets, and merge multiple documents into one.',
      role: 'Frontend developer — built and optimized the vendor-facing interface end to end.',
      features: [
        'PDF-to-spreadsheet conversion workflow',
        'Multi-document merge into a single output file',
        'Interface optimized for vendor teams at OLA, Uber, Swiggy and Zomato',
      ],
      highlights: [
        'Built with Next.js and Redux for predictable state across a multi-step workflow',
        'Focused on a fast, low-friction upload-to-output experience',
      ],
      outcome:
        'Adopted by multiple delivery and mobility vendors as their frontend for automated claims processing.',
    },
  },
  {
    id: 'leadshyne',
    name: 'LeadShyne',
    tagline: 'CRM for leads, accounts, opportunities and team operations.',
    category: 'Frontend',
    tech: ['Next.js', 'Redux', 'MUI', 'SCSS'],
    featured: true,
    engagement: 'professional',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'Sales and operations teams needed a single system to manage leads, accounts and opportunities alongside internal operations like expenses, leave and quotations — with permissions scoped by role.',
      solution:
        'Implemented lead and account management features in Next.js, integrating role-based permissions and tightening the frontend-backend integration for performance.',
      role: 'Frontend developer — implemented core CRM modules and role-permission logic.',
      features: [
        'Leads, accounts and opportunity management',
        'Expense and leave management modules',
        'Quotation generation and role-based user management',
      ],
      highlights: [
        'Built with Next.js, Redux and MUI for a consistent enterprise UI',
        'Performance improvements from tighter frontend-backend integration',
      ],
      outcome: 'Delivered as a working CRM module set for managing sales and internal team operations.',
    },
  },
  {
    id: 'baxy-mobility',
    name: 'BAXY — Mobility',
    tagline: 'Distributor management system for fleet and vehicle operations.',
    category: 'Frontend',
    tech: ['Angular', 'TypeScript', 'SCSS'],
    featured: false,
    engagement: 'professional',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'Distributors needed a way to manage user permissions, vehicle service records and sales, while tracking every registered vehicle and handling claim requests in one place.',
      solution:
        'Developed modules for user permission management and real-time vehicle tracking within a distributor management system, built with Angular and TypeScript.',
      role: 'Frontend developer — built permission management and vehicle-tracking modules.',
      features: [
        'User permission management for distributor teams',
        'Real-time vehicle tracking across the registered fleet',
        'Vehicle service records, sales management and claim requests',
      ],
      highlights: ['Built with Angular and TypeScript for a strongly-typed, maintainable codebase'],
      outcome: 'Delivered as production modules within the client’s distributor management system.',
    },
  },
  {
    id: 'lcms',
    name: 'Legal Contract Management System (LCMS)',
    tagline: 'Centralized platform for contract drafting, review and e-signature.',
    category: 'Frontend',
    tech: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap'],
    featured: false,
    engagement: 'professional',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'Legal teams needed a centralized, secure repository for contracts with standardized drafting, automated review/approval workflows, and legally binding e-signature execution.',
      solution:
        'Built a secure, scalable contract management platform in Angular with e-signature capabilities, automating contract review workflows from drafting to execution.',
      role: 'Frontend developer — built the contract lifecycle interface and review workflows.',
      features: [
        'Secure contract repository with standardized drafting',
        'Automated review and approval workflows',
        'Integrated e-signature for legally binding execution',
        'Real-time collaboration during negotiation',
      ],
      highlights: [
        'Compliance and risk-management tooling to flag potential legal risk',
        'Built with Angular, TypeScript and Bootstrap',
      ],
      outcome: 'Delivered as a working platform automating the end-to-end legal contract lifecycle.',
    },
  },
  {
    id: 'itsm',
    name: 'Ticket Management System (ITSM)',
    tagline: 'IT service management with approval-driven ticket workflows.',
    category: 'Frontend',
    tech: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap'],
    featured: false,
    engagement: 'professional',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    inProduction: true,
    detail: {
      challenge:
        'IT service teams needed a structured way to track requests through approval, rejection and pending states while keeping the process accountable and easy to monitor.',
      solution:
        'Built a user-friendly ticket management system with approval workflows, optimizing IT service delivery and task tracking end to end.',
      role: 'Frontend developer — built the ticket workflow interface and status tracking.',
      features: [
        'Approval, rejection and pending-approval ticket states',
        'End-to-end tracking for user-specific tasks',
        'Responsive, well-coordinated framework for service requests',
      ],
      highlights: ['Built with Angular, TypeScript and Bootstrap for a consistent enterprise UI'],
      outcome: 'Delivered as the production ticketing workflow for IT service delivery.',
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
