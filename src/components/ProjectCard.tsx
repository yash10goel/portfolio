import { Reveal } from '@/components/Reveal'
import { ArrowUpRightIcon } from '@/components/icons'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  delay?: number
  onOpen: (id: string) => void
}

export function ProjectCard({ project, delay = 0, onOpen }: ProjectCardProps) {
  return (
    <Reveal
      delay={delay}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-subtle">
            {project.category}
          </span>
          {project.engagement === 'freelance' && (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
              Freelance
            </span>
          )}
        </div>
        {project.liveUrl && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-medium text-success">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            Live
          </span>
        )}
        {!project.liveUrl && project.inProduction && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium text-subtle">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-subtle" />
            In Production
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-text">{project.name}</h3>
      <p className="mt-1 text-xs font-medium text-subtle">
        {project.engagement === 'freelance' ? 'Freelance Project' : 'Professional Project'} · {project.company}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-5">
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="inline-flex items-center gap-2 self-start text-sm font-medium text-text transition-colors hover:text-accent"
        >
          View Details
          <ArrowUpRightIcon
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            Live Site
            <ArrowUpRightIcon width={13} height={13} />
          </a>
        )}
      </div>
    </Reveal>
  )
}
