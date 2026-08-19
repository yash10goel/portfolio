import { Container } from '@/components/Container'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'

const codeLines: { tokens: { text: string; className?: string }[] }[] = [
  { tokens: [{ text: 'interface ', className: 'text-accent' }, { text: 'ProjectScope ', className: 'text-text' }, { text: '{', className: 'text-muted' }] },
  { tokens: [{ text: '  role', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' "Full-Stack Developer"', className: 'text-success' }, { text: ';', className: 'text-muted' }] },
  { tokens: [{ text: '  stack', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' ["React", "Angular", ".NET"]', className: 'text-success' }, { text: ';', className: 'text-muted' }] },
  { tokens: [{ text: '  focus', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' "APIs, RBAC, Dashboards"', className: 'text-success' }, { text: ';', className: 'text-muted' }] },
  { tokens: [{ text: '}', className: 'text-muted' }] },
]

export function Hero() {
  const yearsBadgeCount = experience.length
  const projectsCount = projects.length

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--color-accent)/0.14),transparent_70%)]"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Reveal>
            <Badge dot>{profile.availability}</Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance font-display text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl">
              Full-Stack Developer
              <span className="text-accent"> building modern web applications that help businesses grow.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
              I build modern, scalable web applications that solve real business problems — from enterprise
              dashboards to the APIs and access-control systems behind them.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 font-mono text-sm text-subtle">
              React <span className="mx-2 text-border-strong">•</span> Angular
              <span className="mx-2 text-border-strong">•</span> Next.js
              <span className="mx-2 text-border-strong">•</span> TypeScript
              <span className="mx-2 text-border-strong">•</span> C#
              <span className="mx-2 text-border-strong">•</span> .NET
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" size="lg">
                Start a Project
                <ArrowRightIcon width={17} height={17} />
              </Button>
              <Button href="#projects" size="lg" variant="secondary">
                View My Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <DownloadIcon width={15} height={15} />
                Download Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <GitHubIcon width={15} height={15} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <LinkedInIcon width={15} height={15} />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="sr-only">Years of experience</dt>
                <dd className="font-display text-2xl font-semibold text-text">{profile.yearsExperience}</dd>
                <p className="mt-1 text-xs text-muted">Years Experience</p>
              </div>
              <div>
                <dt className="sr-only">Projects delivered</dt>
                <dd className="font-display text-2xl font-semibold text-text">{projectsCount}</dd>
                <p className="mt-1 text-xs text-muted">Projects Delivered</p>
              </div>
              <div>
                <dt className="sr-only">Companies</dt>
                <dd className="font-display text-2xl font-semibold text-text">{yearsBadgeCount}</dd>
                <p className="mt-1 text-xs text-muted">Companies</p>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md animate-float">
            <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-card-hover">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-subtle">scope.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
                <code>
                  {codeLines.map((line, i) => (
                    <div key={i}>
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.className}>
                          {token.text}
                        </span>
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            <div className="absolute -left-8 -top-6 rounded-xl border border-border-strong bg-bg-raised px-4 py-3 shadow-card-hover">
              <p className="font-display text-lg font-semibold text-text">RBAC &amp; Auth</p>
              <p className="text-xs text-muted">Production IAM systems</p>
            </div>

            <div className="absolute -bottom-7 -right-6 flex items-center gap-2 rounded-xl border border-border-strong bg-bg-raised px-4 py-3 shadow-card-hover">
              <ArrowUpRightIcon width={16} height={16} className="text-accent" />
              <p className="text-sm font-medium text-text">Enterprise-ready code</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
