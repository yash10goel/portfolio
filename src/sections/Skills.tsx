import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="A stack built for real applications, not demos."
          description="Depth where it counts: frontend architecture, backend APIs, and the data layer that ties them together."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={(index % 3) * 90}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover"
            >
              <h3 className="font-display text-lg font-semibold text-text">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-muted"
                  >
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
