import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/Button'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons'
import { profile, socialLinks } from '@/data/profile'
import { whatsappHref } from '@/utils/whatsapp'
import { ArrowRightIcon } from '@/components/icons'

const iconMap = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}

export function FreelanceCTA() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(50%_60%_at_50%_0%,rgb(var(--color-accent)/0.12),transparent_70%)]"
          />

          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Have a project in mind? Let&rsquo;s build it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg leading-relaxed text-muted">
            Tell me what you&rsquo;re looking to build, and let&rsquo;s discuss how I can help turn your idea into a
            working product.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#contact" size="lg">
              Start a Project
              <ArrowRightIcon width={17} height={17} />
            </Button>
            {profile.whatsapp && (
              <Button href={whatsappHref(profile.whatsapp)} target="_blank" rel="noreferrer" size="lg" variant="secondary">
                WhatsApp Mes
                <ArrowRightIcon width={17} height={17} />
              </Button>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border pt-8">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.icon === 'email' ? undefined : '_blank'}
                  rel={social.icon === 'email' ? undefined : 'noreferrer'}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  <Icon width={16} height={16} />
                  {social.icon === 'email' ? profile.email : social.label}
                </a>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
