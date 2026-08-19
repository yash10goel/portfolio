import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { LayersIcon, LayoutIcon, ChatIcon, SparkIcon } from '@/components/icons'

const reasons = [
  {
    icon: SparkIcon,
    title: 'Production Experience',
    description: 'Experience building real-world enterprise applications.',
  },
  {
    icon: LayersIcon,
    title: 'Full-Stack Development',
    description: 'Frontend, backend, APIs and database integration.',
  },
  {
    icon: LayoutIcon,
    title: 'Clean & Responsive UI',
    description: 'Modern interfaces that work across desktop, tablet and mobile.',
  },
  {
    icon: ChatIcon,
    title: 'Clear Communication',
    description: 'Regular updates, transparent development and clear communication.',
  },
]

export function WhyWorkWithMe() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why Work With Me"
          title="What you get, working together."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={index * 90}
              className="flex flex-col items-start rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <reason.icon width={18} height={18} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-text">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
