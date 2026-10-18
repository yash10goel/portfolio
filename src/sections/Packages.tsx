import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/Button'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ArrowRightIcon, CheckIcon, CloseIcon } from '@/components/icons'
import { packageExclusions, websitePackages } from '@/data/offer'
import { cn } from '@/utils/cn'

export function Packages() {
  return (
    <section id="packages" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Website Packages"
          title="Simple packages, clearly scoped."
          description="Starting prices for the most common business websites. Your final quote depends on the pages, content and features we agree on — and you'll have it in writing before any work starts."
          align="center"
          className="mb-16"
        />

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {websitePackages.map((pkg, index) => (
            <Reveal
              key={pkg.id}
              delay={index * 100}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-surface p-6 sm:p-8',
                pkg.highlighted ? 'border-accent/60 shadow-glow' : 'border-border-strong',
              )}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent-fill px-3 py-1 text-xs font-medium text-white">
                  Best for showcasing services or listings
                </span>
              )}

              <h3 className="font-display text-xl font-semibold text-text">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.summary}</p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-sm text-muted">Starting at</span>
                <span className="font-display text-4xl font-semibold tracking-tight text-text">{pkg.price}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <WhatsAppCTA message={pkg.whatsappMessage} variant={pkg.highlighted ? 'primary' : 'secondary'} className="w-full">
                  Ask about this package
                </WhatsAppCTA>
                <Button href="#quote" variant="ghost" className="w-full">
                  Or request a quote
                  <ArrowRightIcon width={15} height={15} />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border bg-bg-raised p-6 sm:p-7">
          <h3 className="font-display text-base font-semibold text-text">Not included unless agreed in your quote</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {packageExclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <CloseIcon width={14} height={14} className="mt-0.5 shrink-0 text-subtle" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-muted">
            These can be added and quoted separately. I don&rsquo;t promise guaranteed traffic, leads or sales — a
            good website makes it easier for customers to find and contact you, but results depend on your market,
            offer and promotion.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
