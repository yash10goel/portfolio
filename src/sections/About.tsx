import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { CheckIcon } from '@/components/icons'

const approach = [
  {
    title: 'Full-stack by default',
    description:
      'Comfortable owning a feature from the database and API layer through to the interface a user actually touches.',
  },
  {
    title: 'Enterprise-grade thinking',
    description:
      'Experience building identity, access-control and utility-management systems where security and reliability aren’t optional.',
  },
  {
    title: 'Works with what exists',
    description:
      'Just as comfortable extending and fixing an existing codebase as starting a new one from scratch.',
  },
  {
    title: 'Agile & collaborative',
    description: 'Used to working in Agile teams, communicating progress clearly and adapting as requirements evolve.',
  },
]

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="About"
            title="I build the software businesses actually run on."
            description="Not a portfolio of side projects — three-plus years shipping production applications that real teams depend on every day."
          />

          <Reveal delay={100} className="mt-8 max-w-xs">
            <img
              src="/yashu.png"
              alt="Yash Goel"
              className="aspect-square w-full rounded-2xl border border-border-strong object-cover shadow-card-hover"
              width={480}
              height={480}
            />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-balance text-lg leading-relaxed text-muted">
              I&rsquo;m a full-stack developer with 3+ years of experience building scalable, high-performance web
              applications — proficient across Angular, React and Next.js on the frontend, with strong backend
              development in C# and ASP.NET Core. My work has centered on systems where correctness matters:
              identity and access management, role-based permissions, authentication, and real-time operational
              platforms for enterprise and utility clients.
            </p>
            <p className="mt-5 text-balance text-lg leading-relaxed text-muted">
              I care about clean, maintainable code and about understanding the business problem before writing
              a line of it. Whether it&rsquo;s a new product or an existing application that needs fixing and
              extending, I take it from concept through to production.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {approach.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} as="div" className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <CheckIcon width={13} height={13} />
                </span>
                <div>
                  <dt className="font-medium text-text">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{item.description}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
