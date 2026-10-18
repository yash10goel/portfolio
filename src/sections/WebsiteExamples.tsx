import { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/Button'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ProjectModal } from '@/components/ProjectModal'
import { RealEstateDemoPreview } from '@/components/RealEstateDemoPreview'
import { WebsiteExampleCard } from '@/components/WebsiteExampleCard'
import { ArrowRightIcon } from '@/components/icons'
import { projects } from '@/data/projects'
import { websiteCategories, websiteExamples } from '@/data/websiteExamples'
import { websitePackages } from '@/data/offer'
import type { WebsiteCategory } from '@/types'
import { cn } from '@/utils/cn'

type Filter = 'all' | WebsiteCategory

const filters: { id: Filter; label: string }[] = [{ id: 'all', label: 'All' }, ...websiteCategories]

export function WebsiteExamples() {
  const [filter, setFilter] = useState<Filter>('all')
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [scrollToDemo, setScrollToDemo] = useState(false)
  const demoRef = useRef<HTMLDivElement>(null)

  const visible = filter === 'all' ? websiteExamples : websiteExamples.filter((example) => example.categories.includes(filter))
  const activeProject = useMemo(() => projects.find((project) => project.id === activeProjectId) ?? null, [activeProjectId])

  // "Try the interactive demo" switches to the Real Estate filter; scroll once the demo has rendered.
  useEffect(() => {
    if (!scrollToDemo || filter !== 'real-estate') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    demoRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    setScrollToDemo(false)
  }, [scrollToDemo, filter])

  const startingPrice = websitePackages[0]?.price

  return (
    <section id="examples" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Website Examples"
          title="Websites for all kinds of small businesses."
          description="Shops, clinics, coaching centres, consultants, home services and real estate. Below is a mix of live client websites, professional projects and clearly labelled concept demos."
          className="mb-10"
        />

        <div role="group" aria-label="Filter website examples by category" className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                'min-h-[36px] rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === item.id
                  ? 'border-accent bg-accent-soft text-accent-strong'
                  : 'border-border-strong text-muted hover:border-accent hover:text-text',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-subtle">
          Concept demos use sample content to show what I can build. They are not client projects.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((example, index) => (
            <WebsiteExampleCard
              key={example.id}
              example={example}
              project={example.kind === 'project' ? projects.find((project) => project.id === example.projectId) : undefined}
              delay={(index % 3) * 80}
              onOpenCaseStudy={setActiveProjectId}
              onTryInteractiveDemo={() => {
                setFilter('real-estate')
                setScrollToDemo(true)
              }}
            />
          ))}
        </div>

        {filter === 'real-estate' && (
          <div ref={demoRef} id="real-estate-demo" className="mt-12">
            <h3 className="font-display text-xl font-semibold text-text">Try the real estate concept</h3>
            <p className="mb-6 mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Filter the sample listings and tap &ldquo;Enquire on WhatsApp&rdquo; to see the message a buyer would send.
            </p>
            <RealEstateDemoPreview />
          </div>
        )}

        <Reveal className="mt-14 flex flex-col items-start gap-6 rounded-2xl border border-border-strong bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-text">Need a Website for Your Business?</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Packages start at {startingPrice}. Tell me what your business does and I&rsquo;ll send a clear, written
              quote — whichever industry you&rsquo;re in.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="#quote">
              Get a Website Quote
              <ArrowRightIcon width={16} height={16} />
            </Button>
            <WhatsAppCTA>WhatsApp me</WhatsAppCTA>
          </div>
        </Reveal>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProjectId(null)} />
    </section>
  )
}
