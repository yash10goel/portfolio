import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/Badge'
import { ContactForm } from '@/components/ContactForm'
import { ClockIcon, GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon } from '@/components/icons'
import { profile, socialLinks } from '@/data/profile'

const socialIconMap = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}

export function Contact() {
  const otherSocialLinks = socialLinks.filter((social) => social.icon !== 'email')

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something Great Together"
            description="Have a project in mind, need help with an existing application, or looking for a developer? Tell me what you're working on and I'll get back to you."
          />

          <Reveal delay={120} className="mt-10 space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong">
                <MailIcon width={15} height={15} />
              </span>
              {profile.email}
            </a>

            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong">
                <GlobeIcon width={15} height={15} />
              </span>
              <span>
                {profile.location} <span className="text-subtle">&middot;</span> {profile.timezone}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong">
                <ClockIcon width={15} height={15} />
              </span>
              <span>{profile.responseTime}</span>
            </div>

            <Badge dot className="mt-1">
              {profile.availability}
            </Badge>

            <div className="flex gap-3 pt-2">
              {otherSocialLinks.map((social) => {
                const Icon = socialIconMap[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon width={15} height={15} />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  )
}
