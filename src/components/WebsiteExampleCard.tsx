import { Reveal } from '@/components/Reveal'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons'
import { websiteCategories } from '@/data/websiteExamples'
import type { ConceptWebsiteExample, Project, WebsiteExample } from '@/types'

interface WebsiteExampleCardProps {
  example: WebsiteExample
  /** The genuine project an example refers to (undefined for concepts). */
  project?: Project
  delay?: number
  onOpenCaseStudy: (projectId: string) => void
  onTryInteractiveDemo: () => void
}

const quoteLinkLabel: Record<WebsiteExample['categories'][number], string> = {
  business: 'Get a similar website',
  service: 'Get a similar website',
  'real-estate': 'Get a similar website',
  custom: 'Discuss a custom app',
}

/** Small decorative mock-up of a concept site, built from its preview data. */
function ConceptPreview({ preview }: { preview: ConceptWebsiteExample['preview'] }) {
  return (
    <div aria-hidden className="overflow-hidden rounded-xl border border-border bg-bg-raised">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="ml-2 truncate font-mono text-xs text-subtle">{preview.domain}</span>
      </div>
      <div className="bg-gradient-to-br from-accent/15 via-transparent to-transparent p-4">
        <p className="text-xs font-semibold text-text">{preview.brand}</p>
        <p className="mt-2 font-display text-base font-semibold leading-snug text-text">{preview.headline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {preview.sections.map((section) => (
            <span key={section} className="rounded-md bg-surface px-2 py-1 text-xs text-muted">
              {section}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex rounded-full bg-[#25d366] px-3 py-1 text-xs font-semibold text-[#062b14]">
          {preview.cta}
        </span>
      </div>
    </div>
  )
}

export function WebsiteExampleCard({ example, project, delay = 0, onOpenCaseStudy, onTryInteractiveDemo }: WebsiteExampleCardProps) {
  const categoryLabel = websiteCategories.find((category) => category.id === example.categories[0])?.label
  const isConcept = example.kind === 'concept'

  const name = isConcept ? example.name : project?.name
  const summary = isConcept ? example.summary : project?.tagline
  const features = isConcept ? example.features : (project?.detail.features.slice(0, 3) ?? [])
  const tech = isConcept ? example.tech : (project?.tech ?? [])
  const liveUrl = isConcept ? undefined : project?.liveUrl

  return (
    <Reveal
      delay={delay}
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium uppercase tracking-wide text-subtle">
          {categoryLabel}
        </span>
        {isConcept ? (
          <span className="rounded-full border border-[#f5a524]/40 bg-[#f5a524]/10 px-3 py-1 text-xs font-medium text-text">
            Concept demo
          </span>
        ) : liveUrl ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            Live client site
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-subtle">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-subtle" />
            {project?.engagement === 'freelance' ? 'Client project' : 'Professional project'}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-text">{name}</h3>
      <p className="mt-1 text-xs font-medium text-subtle">
        {isConcept
          ? 'Illustrative concept with sample content — not a client project'
          : `${project?.engagement === 'freelance' ? 'Freelance client' : 'Built at'} · ${project?.company}`}
      </p>

      <dl className="mt-4">
        <dt className="font-mono text-xs uppercase tracking-[0.15em] text-accent">Business type</dt>
        <dd className="mt-1 text-sm text-text">{example.businessType}</dd>
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-muted">{summary}</p>

      {isConcept && (
        <div className="mt-5">
          <ConceptPreview preview={example.preview} />
        </div>
      )}

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-accent">Key features</p>
      <ul className="mt-2 space-y-1.5">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span key={item} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            {item}
          </span>
        ))}
      </div>

      {/* Spacer keeps the action row aligned across cards of different heights. */}
      <div aria-hidden className="flex-1" />
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
        {!isConcept && project && (
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent"
          >
            Case study
            <ArrowUpRightIcon width={14} height={14} />
          </button>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            Live site
            <ArrowUpRightIcon width={14} height={14} />
          </a>
        )}
        {isConcept && example.interactiveDemo && (
          <button
            type="button"
            onClick={onTryInteractiveDemo}
            className="inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent"
          >
            Try the interactive demo
            <ArrowRightIcon width={14} height={14} />
          </button>
        )}
        <a
          href="#quote"
          className="inline-flex min-h-[24px] items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {quoteLinkLabel[example.categories[0]]}
          <ArrowRightIcon width={14} height={14} />
        </a>
      </div>
    </Reveal>
  )
}
