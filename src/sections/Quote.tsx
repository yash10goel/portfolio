import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { QuoteForm } from '@/components/QuoteForm'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ClockIcon, GlobeIcon, MailIcon } from '@/components/icons'
import { profile } from '@/data/profile'

const nextSteps = [
  'I reply on your phone or WhatsApp with a few questions about your business.',
  'You get a written quote with scope, price and timeline.',
  'Work starts only once you approve the quote.',
]

export function Quote() {
  return (
    <section id="quote" className="border-t border-border py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Get a Quote"
            title="Tell me about your business."
            description="A few quick details and I'll come back with a clear, written quote. Need a custom web app, dashboard or API instead? Choose it under “Website requirement”."
          />

          <Reveal delay={100} className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">What happens next</p>
            <ol className="mt-4 space-y-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-xs text-text">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={160} className="mt-10 space-y-4 border-t border-border pt-8">
            <WhatsAppCTA variant="secondary">Prefer to just chat? WhatsApp me</WhatsAppCTA>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <MailIcon width={15} height={15} className="shrink-0" />
              {profile.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-muted">
              <GlobeIcon width={15} height={15} className="shrink-0" />
              {profile.location} &middot; working with clients across India
            </p>
            <p className="flex items-center gap-3 text-sm text-muted">
              <ClockIcon width={15} height={15} className="shrink-0" />
              {profile.responseTime}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <QuoteForm />
        </Reveal>
      </Container>
    </section>
  )
}
