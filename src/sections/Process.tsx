import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { processSteps } from '@/data/services'

export function Process() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="How I Work" title="A clear process, from idea to production." className="mb-16" />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.index} delay={index * 90} className="bg-surface p-6 sm:p-7">
              <span className="font-mono text-sm text-accent">{step.index}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
