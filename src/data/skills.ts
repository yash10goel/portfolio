import type { SkillGroup, TechItem } from '@/types'

/**
 * Tiering reflects depth of evidence on the resume: "core" technologies
 * appear across multiple production projects, "secondary" appear in
 * supporting roles, "familiar" are explicitly scoped as basic exposure.
 */
export const techStrip: TechItem[] = [
  { name: 'Angular', tier: 'core' },
  { name: 'React', tier: 'core' },
  { name: 'Next.js', tier: 'core' },
  { name: 'TypeScript', tier: 'core' },
  { name: 'C#', tier: 'core' },
  { name: '.NET / ASP.NET Core', tier: 'core' },
  { name: 'Node.js', tier: 'secondary' },
  { name: 'Redux', tier: 'secondary' },
  { name: 'Tailwind CSS', tier: 'secondary' },
  { name: 'PostgreSQL', tier: 'secondary' },
  { name: 'SQL Server', tier: 'secondary' },
  { name: 'MongoDB', tier: 'secondary' },
  { name: 'MySQL', tier: 'secondary' },
  { name: 'Docker', tier: 'familiar' },
  { name: 'Kubernetes', tier: 'familiar' },
  { name: 'Git', tier: 'secondary' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    description: 'Building dynamic, responsive interfaces for real business workflows.',
    items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend & APIs',
    description: 'Secure, RESTful services and business logic that hold up in production.',
    items: ['C#', '.NET', 'ASP.NET Core', 'Node.js', 'RESTful API Design', 'Authentication & RBAC'],
  },
  {
    title: 'Data & Storage',
    description: 'Modeling and querying data across relational and document stores.',
    items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Query Optimization'],
  },
  {
    title: 'Styling & UI Systems',
    description: 'Scalable, consistent design systems that scale with the product.',
    items: ['Tailwind CSS', 'SCSS', 'Bootstrap', 'MUI'],
  },
  {
    title: 'DevOps & Tooling',
    description: 'Containerized delivery and the day-to-day tooling of shipping software.',
    items: ['Docker', 'Kubernetes (basic exposure)', 'Jenkins (basic exposure)', 'Apache Kafka', 'Git / SVN'],
  },
  {
    title: 'Quality & Workflow',
    description: 'Keeping code reliable and teams aligned.',
    items: ['Jest', 'Chrome DevTools', 'Postman', 'Agile Collaboration'],
  },
]
