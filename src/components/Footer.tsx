import { Container } from '@/components/Container'
import { ChatIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons'
import { navLinks, profile, socialLinks } from '@/data/profile'
import { whatsappHref } from '@/utils/whatsapp'

const iconMap = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#home" className="font-display text-lg font-semibold tracking-tight text-text">
            {profile.name}
          </a>
          <p className="mt-1 text-sm font-medium text-accent">{profile.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Building modern web applications and enterprise solutions.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-text">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {socialLinks.map((social) => {
            const Icon = iconMap[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.icon === 'email' ? undefined : '_blank'}
                rel={social.icon === 'email' ? undefined : 'noreferrer'}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon width={17} height={17} />
              </a>
            )
          })}
          {profile.whatsapp && (
            <a
              href={whatsappHref(profile.whatsapp)}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ChatIcon width={17} height={17} />
            </a>
          )}
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
      </Container>
    </footer>
  )
}
