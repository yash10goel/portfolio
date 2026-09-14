import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRightIcon, CloseIcon } from '@/components/icons'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = project !== null

  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!project) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-6 sm:py-16"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-bg/92 backdrop-blur-md animate-fade-in"
      />

      <div className="relative w-full max-w-2xl animate-scale-in rounded-2xl border border-border-strong bg-bg-raised shadow-card-hover">
        <div className="flex items-start justify-between gap-4 border-b border-border p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-subtle">
                {project.category}
              </span>
              {project.engagement === 'freelance' && (
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
                  Freelance
                </span>
              )}
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
              {!project.liveUrl && !project.inProduction && project.inDevelopment && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-[11px] font-medium text-subtle">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-subtle" />
                  In Development
                </span>
              )}
            </div>
            <h2 id="project-modal-title" className="mt-4 font-display text-2xl font-semibold text-text">
              {project.name}
            </h2>
            <p className="mt-1.5 text-xs font-medium text-subtle">
              {project.engagement === 'freelance' ? 'Freelance Project' : 'Professional Project'} — {project.company}
            </p>
            <p className="mt-2 text-sm text-muted">{project.tagline}</p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
              >
                Visit Live Site
                <ArrowUpRightIcon width={14} height={14} />
              </a>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <ModalSection title="Overview">
            <p className="text-sm leading-relaxed text-muted">{project.detail.solution}</p>
          </ModalSection>

          <ModalSection title="Challenge">
            <p className="text-sm leading-relaxed text-muted">{project.detail.challenge}</p>
          </ModalSection>

          <ModalSection title="Solution">
            <p className="text-sm leading-relaxed text-muted">{project.detail.solution}</p>
          </ModalSection>

          <ModalSection title="My Role">
            <p className="text-sm leading-relaxed text-muted">{project.detail.role}</p>
          </ModalSection>

          <ModalSection title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  {tech}
                </span>
              ))}
            </div>
          </ModalSection>

          <ModalSection title="Key Features">
            <ul className="space-y-2">
              {project.detail.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Technical Highlights">
            <ul className="space-y-2">
              {project.detail.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Outcome">
            <p className="text-sm leading-relaxed text-muted">{project.detail.outcome}</p>
          </ModalSection>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function ModalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </div>
  )
}
