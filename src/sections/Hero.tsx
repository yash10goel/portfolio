import { Container } from '@/components/Container'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'

const codeLines: { tokens: { text: string; className?: string }[] }[] = [
  { tokens: [{ text: 'const ', className: 'text-accent' }, { text: 'yourWebsite ', className: 'text-text' }, { text: '= {', className: 'text-muted' }] },
  { tokens: [{ text: '  pages', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' ["Home", "Listings", "Contact"]', className: 'text-success' }, { text: ',', className: 'text-muted' }] },
  { tokens: [{ text: '  mobileFriendly', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' true', className: 'text-accent' }, { text: ',', className: 'text-muted' }] },
  { tokens: [{ text: '  enquiries', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' ["WhatsApp", "Form"]', className: 'text-success' }, { text: ',', className: 'text-muted' }] },
  { tokens: [{ text: '  builtWith', className: 'text-text' }, { text: ':', className: 'text-muted' }, { text: ' ["React", "TypeScript"]', className: 'text-success' }, { text: ',', className: 'text-muted' }] },
  { tokens: [{ text: '}', className: 'text-muted' }] },
]

export function Hero() {
  const yearsBadgeCount = experience.length
  // Only count work that has actually shipped — in-development projects are shown separately in the Projects section.
  const projectsCount = projects.filter((project) => !project.inDevelopment).length

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--color-accent)/0.14),transparent_70%)]"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          {/* Hidden on phones so the service, price and CTA fit in the first screen. */}
          <Reveal className="mb-6 hidden sm:block">
            <Badge dot>{profile.availability}</Badge>
          </Reveal>

          <Reveal delay={60}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {profile.name} &middot; {profile.role}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 text-balance font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl">
              Professional Websites for Businesses <span className="text-accent">Ready to Grow</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              I build modern, mobile-friendly websites that help local businesses showcase their services and make it
              easier for customers to contact them.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-4 text-sm text-muted sm:mt-5">
              Website packages from <span className="font-semibold text-text">₹10,000</span>
              <span aria-hidden className="mx-2 text-border-strong">•</span>
              <a href="#packages" className="whitespace-nowrap font-medium text-accent underline-offset-4 hover:underline">
                See what&rsquo;s included
              </a>
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button href="#quote" size="lg">
                Get a Website Quote
                <ArrowRightIcon width={17} height={17} />
              </Button>
              <Button href="#projects" size="lg" variant="secondary">
                View My Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <WhatsAppCTA variant="link">WhatsApp me</WhatsAppCTA>
              <a
                href={profile.resumeUrl}
                download="Yash-Goel-Resume.pdf"
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

          <Reveal delay={350}>
            <p className="mt-6 font-mono text-xs text-subtle">
              Built with React <span className="mx-1.5 text-border-strong">•</span> Next.js
              <span className="mx-1.5 text-border-strong">•</span> Angular
              <span className="mx-1.5 text-border-strong">•</span> TypeScript
              <span className="mx-1.5 text-border-strong">•</span> C# / .NET
            </p>
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
                <span className="ml-3 font-mono text-xs text-subtle">website.ts</span>
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
              <p className="font-display text-lg font-semibold text-text">Mobile-first</p>
              <p className="text-xs text-muted">Built for phone visitors</p>
            </div>

            <div className="absolute -bottom-7 -right-6 flex items-center gap-2 rounded-xl border border-border-strong bg-bg-raised px-4 py-3 shadow-card-hover">
              <ArrowUpRightIcon width={16} height={16} className="text-accent" />
              <p className="text-sm font-medium text-text">{profile.yearsExperience} years of production code</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
