import { Reveal } from '@/components/Reveal'
import { ArrowUpRightIcon } from '@/components/icons'
import type { Project } from '@/types'

interface FeaturedProjectCardProps {
  project: Project
  delay?: number
  onOpenCaseStudy: (id: string) => void
}

export function FeaturedProjectCard({ project, delay = 0, onOpenCaseStudy }: FeaturedProjectCardProps) {
  const isEnterprise = !project.liveUrl && project.inProduction

  return (
    <Reveal
      delay={delay}
      className="flex h-full flex-col rounded-2xl border border-border-strong bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-subtle">
          {project.category}
        </span>
        {project.engagement === 'freelance' && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
            Freelance
          </span>
        )}
        {isEnterprise && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium text-subtle">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-subtle" />
            Enterprise Project
          </span>
        )}
        {project.liveUrl && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-medium text-success">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            Live
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold text-text">{project.name}</h3>
      <p className="mt-1 text-xs font-medium text-subtle">
        {project.engagement === 'freelance' ? 'Freelance Project' : 'Professional Project'} · {project.company}
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Problem / Purpose</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.detail.challenge}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">What I Built</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.detail.solution}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Key Features</p>
          <ul className="mt-1.5 space-y-1.5">
            {project.detail.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Technology</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project.id)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent"
        >
          Case Study
          <ArrowUpRightIcon width={14} height={14} />
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            Live Demo
            <ArrowUpRightIcon width={14} height={14} />
          </a>
        )}
      </div>
    </Reveal>
  )
}
