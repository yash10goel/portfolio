import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { CheckIcon } from '@/components/icons'
import { services } from '@/data/services'

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          description="Focused services built directly on production experience — not a generic freelancer menu."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 3) * 90}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover sm:p-7"
            >
              <h3 className="font-display text-lg font-semibold text-text">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <CheckIcon width={14} height={14} className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
