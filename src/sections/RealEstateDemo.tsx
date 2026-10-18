import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { CheckIcon, ChatIcon, CloseIcon, MapPinIcon } from '@/components/icons'
import {
  buildPropertyEnquiry,
  demoBrandName,
  demoProperties,
  demoPropertyTypes,
  realEstateWebsiteMessage,
} from '@/data/realEstateDemo'
import type { DemoProperty } from '@/types'
import { cn } from '@/utils/cn'

const typeGradients: Record<DemoProperty['type'], string> = {
  Apartment: 'from-accent/30 via-accent/10 to-transparent',
  Plot: 'from-success/25 via-success/5 to-transparent',
  Commercial: 'from-[#f5a524]/25 via-[#f5a524]/5 to-transparent',
}

const demoFeatures = [
  'Property / project cards with price, size, location and status',
  'Filters so buyers can find the right type quickly',
  'One-tap WhatsApp enquiry that names the exact property',
  'Mobile-first layout — most property searches happen on phones',
]

export function RealEstateDemo() {
  const [filter, setFilter] = useState<(typeof demoPropertyTypes)[number]>('All')
  const [selected, setSelected] = useState<DemoProperty | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // On phones the preview renders below every card, so bring it into view when it opens.
  useEffect(() => {
    if (!selected) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    previewRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' })
  }, [selected])

  const visible = filter === 'All' ? demoProperties : demoProperties.filter((p) => p.type === filter)

  return (
    <section id="demo" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Real Estate Website Concept"
          title="What a property broker's website could look like."
          description="An illustrative concept to show the kind of listing site I can build for independent brokers and property consultants. Try the filters and the enquiry button."
          className="mb-12"
        />

        <Reveal className="overflow-hidden rounded-2xl border border-border-strong bg-bg-raised shadow-card-hover">
          {/* Browser chrome + honest label */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-surface px-3 py-1 font-mono text-xs text-subtle">
              yourbusiness.in/properties
            </span>
            <span className="rounded-full border border-[#f5a524]/40 bg-[#f5a524]/10 px-2.5 py-1 text-xs font-medium text-text">
              Concept · sample listings, not real properties
            </span>
          </div>

          <div className="p-4 sm:p-6">
            {/* Mini site header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-text">{demoBrandName}</p>
                <p className="text-xs text-muted">Independent property consultant · Noida &amp; NCR</p>
              </div>
              <div role="group" aria-label="Filter properties by type" className="flex flex-wrap gap-2">
                {demoPropertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilter(type)}
                    aria-pressed={filter === type}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                      filter === type
                        ? 'border-accent bg-accent-soft text-accent-strong'
                        : 'border-border-strong text-muted hover:border-accent hover:text-text',
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((property) => (
                <li key={property.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
                  <div
                    className={cn(
                      'relative flex h-28 items-end bg-gradient-to-br p-4',
                      typeGradients[property.type],
                    )}
                  >
                    <span className="rounded-full bg-bg/80 px-2.5 py-1 text-xs font-medium text-text backdrop-blur">
                      {property.status}
                    </span>
                    <span className="absolute right-4 top-4 font-mono text-xs uppercase tracking-wider text-muted">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-text">{property.title}</h3>
                      <p className="shrink-0 text-sm font-semibold text-accent">{property.price}</p>
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                      <MapPinIcon width={13} height={13} className="shrink-0" />
                      {property.location}
                      <span className="text-subtle">·</span>
                      {property.size}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {property.details.map((detail) => (
                        <li key={detail} className="rounded-md bg-bg-raised px-2 py-1 text-xs text-muted">
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setSelected(property)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-[#062b14] transition-transform active:scale-[0.97]"
                    >
                      <ChatIcon width={16} height={16} />
                      Enquire on WhatsApp
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {selected && (
              <div
                ref={previewRef}
                role="region"
                aria-live="polite"
                aria-label="Enquiry preview"
                className="mt-6 rounded-xl border border-border-strong bg-surface p-4 animate-scale-in sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text">How the enquiry works</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      On a live site, this button opens WhatsApp to <em>your</em> number with the buyer&rsquo;s message
                      ready to send:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close enquiry preview"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:text-text"
                  >
                    <CloseIcon width={16} height={16} />
                  </button>
                </div>
                <p className="mt-4 max-w-xl rounded-2xl rounded-tl-sm bg-[#25d366]/15 px-4 py-3 text-sm leading-relaxed text-text">
                  {buildPropertyEnquiry(selected)}
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppCTA
                    message={`[Website demo test] ${buildPropertyEnquiry(selected)}`}
                    variant="secondary"
                  >
                    Try it — send to Yash
                  </WhatsAppCTA>
                  <p className="text-xs text-subtle">
                    This demo sends the test message to my WhatsApp, not to a real broker.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <h3 className="font-display text-lg font-semibold text-text">What a site like this gives your buyers</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {demoFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                  <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Related real work: the live{' '}
              <a href="#projects" className="font-medium text-accent underline-offset-4 hover:underline">
                RKGC Group website
              </a>{' '}
              I built and maintain includes a real estate vertical alongside its infrastructure business.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border-strong bg-surface p-6">
            <p className="font-display text-base font-semibold text-text">Want this for your listings?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The Business Website package (from ₹20,000) includes a property showcase like this one. Extras such as
              search filters are quoted based on your scope.
            </p>
            <WhatsAppCTA message={realEstateWebsiteMessage} variant="primary" className="mt-5 w-full">
              Get a website like this
            </WhatsAppCTA>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
