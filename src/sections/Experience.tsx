import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/Badge'
import { ArrowUpRightIcon } from '@/components/icons'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'

const freelanceProjects = projects.filter((project) => project.engagement === 'freelance')

const freelanceClients = Object.values(
  freelanceProjects.reduce<Record<string, { company: string; projects: typeof freelanceProjects }>>(
    (acc, project) => {
      ;(acc[project.company] ??= { company: project.company, projects: [] }).projects.push(project)
      return acc
    },
    {},
  ),
)

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where the work happened."
          description="Two roles, one continuous thread: enterprise-grade full-stack development."
          className="mb-16"
        />

        <p className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-accent">Professional Experience</p>

        <div className="relative">
          <div aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-[9px]" />

          <ol className="space-y-14">
            {experience.map((entry, index) => (
              <li key={entry.id} className="relative pl-8 sm:pl-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent ring-4 ring-accent-soft sm:h-5 sm:w-5"
                />

                <Reveal delay={index * 100}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-text">{entry.company}</h3>
                    {entry.current && <Badge dot>Current</Badge>}
                  </div>
                  {entry.companyNote && <p className="mt-1 text-sm text-subtle">{entry.companyNote}</p>}

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="font-medium text-accent">{entry.role}</span>
                    <span aria-hidden>•</span>
                    <span>{entry.location}</span>
                    <span aria-hidden>•</span>
                    <span className="font-mono text-xs">{entry.duration}</span>
                  </div>

                  <p className="mt-4 max-w-2xl text-balance leading-relaxed text-muted">{entry.summary}</p>

                  <ul className="mt-5 space-y-2.5">
                    {entry.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {freelanceProjects.length > 0 && (
          <div className="mt-20">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.15em] text-accent">Freelance Work</p>

            <div className="space-y-6">
              {freelanceClients.map((client) => {
                const tech = [...new Set(client.projects.flatMap((project) => project.tech))]
                const liveProject = client.projects.find((project) => project.liveUrl)

                return (
                  <Reveal
                    key={client.company}
                    className="rounded-2xl border border-border bg-surface p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-semibold text-text">{client.company}</h3>
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
                        Freelance Client
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                      {client.projects.map((project) => (
                        <li key={project.id} className="max-w-2xl text-balance leading-relaxed text-muted">
                          <span className="font-medium text-text">{project.name}</span> — {project.tagline}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {liveProject?.liveUrl && (
                      <a
                        href={liveProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
                      >
                        Visit Live Site
                        <ArrowUpRightIcon width={14} height={14} />
                      </a>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
