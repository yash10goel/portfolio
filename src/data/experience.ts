import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'inventia',
    company: 'Inventia Technology Consultant Pvt. Ltd.',
    companyNote: 'Deployed via Cyber Matrix Solutions Pvt. Ltd.',
    role: 'Software Developer — Full Stack',
    location: 'Noida, Uttar Pradesh',
    duration: 'Jan 2024 — Present',
    current: true,
    summary:
      'Building enterprise identity and utility-management platforms end to end — from Angular interfaces down to ASP.NET services and the authentication logic that secures them.',
    highlights: [
      'Developed user management, role-based access control (RBAC) and authentication services for a comprehensive Identity & Access Management (IAM) platform.',
      'Designed dynamic, scalable interfaces using Angular and Redux, paired with secure APIs built in ASP.NET.',
      'Contributed to backend logic for user authentication and session management to ensure secure, seamless user experiences.',
      'Contributed to a high-performance, scalable meter data management platform (Head End System) for smart utility meters, using Angular on the frontend and C# / ASP.NET on the backend.',
      'Worked on automating connectivity management and control functionality that helps utilities manage power, gas and water resources efficiently.',
      'Built features for real-time data acquisition, automated workflows and system security.',
    ],
    tech: ['Angular', 'Redux', 'C#', 'ASP.NET', 'SCSS'],
  },
  {
    id: 'cyber-matrix',
    company: 'Cyber Matrix Solutions Pvt. Ltd.',
    role: 'Software Developer',
    location: 'Noida, Uttar Pradesh',
    duration: 'Jan 2023 — Dec 2023',
    current: false,
    summary:
      'Shipped five distinct client-facing applications in a single year — from invoice automation to legal contract management — working primarily on frontend architecture and integration.',
    highlights: [
      'Built a responsive frontend for an automated invoice-processing system used by delivery and mobility platform vendors.',
      'Implemented lead and account management features in Next.js, integrating user role permissions with seamless frontend-backend integration.',
      'Developed modules for user permission management and real-time vehicle tracking in a distributor management system using Angular and TypeScript.',
      'Created a secure, scalable contract management platform with e-signature capabilities, automating contract review workflows in Angular.',
      'Built a ticket management system with approval workflows, optimizing IT service delivery and task tracking.',
    ],
    tech: ['Angular', 'Next.js', 'TypeScript', 'Redux', 'SCSS', 'Bootstrap'],
  },
]
