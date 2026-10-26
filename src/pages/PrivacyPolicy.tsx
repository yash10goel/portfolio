import { useEffect, type ReactNode } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ArrowRightIcon, ChatIcon, GlobeIcon, MailIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import {
  policyBrand,
  policyLastUpdated,
  policyPhone,
  privacyPolicySections,
  type PolicyBlock,
} from '@/data/privacyPolicy'

const PAGE_TITLE = `Privacy Policy | ${policyBrand} — Yash Goel`
const PAGE_DESCRIPTION = `How ${policyBrand} collects and uses information from the website quote form, Meta lead forms, WhatsApp, phone and email.`
const PAGE_URL = 'https://yashgoeldev.vercel.app/privacy-policy'

const TOKEN = /\[NEEDS CONFIRMATION:[^\]]*\]|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

/** Renders inline `[text](url)` links and highlights `[NEEDS CONFIRMATION: …]` placeholders. */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    if (match[2]) {
      parts.push(
        <a
          key={index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          {match[1]}
        </a>,
      )
    } else {
      parts.push(
        <mark key={index} className="rounded bg-[#f5a524]/15 px-1 py-0.5 font-medium text-text ring-1 ring-[#f5a524]/40">
          {match[0]}
        </mark>,
      )
    }
    last = index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === 'ul') {
    return (
      <ul className="space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p className="leading-relaxed text-muted">
      <RichText text={block.text} />
    </p>
  )
}

/** Keeps the tab title, description and canonical URL correct for this route (the shared index.html targets the home page). */
function usePageMeta() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = PAGE_TITLE
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousDescription = description?.content
    const previousCanonical = canonical?.href
    if (description) description.content = PAGE_DESCRIPTION
    if (canonical) canonical.href = PAGE_URL
    return () => {
      document.title = previousTitle
      if (description && previousDescription !== undefined) description.content = previousDescription
      if (canonical && previousCanonical !== undefined) canonical.href = previousCanonical
    }
  }, [])
}

export function PrivacyPolicy() {
  usePageMeta()

  const tocItems = [...privacyPolicySections.map(({ id, title }) => ({ id, title })), { id: 'contact', title: 'Contact Information' }]

  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <a href="/" className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-text">
            {profile.name}
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href="/" variant="secondary" className="whitespace-nowrap">
              Back to website
            </Button>
          </div>
        </Container>
      </header>

      <main id="privacy">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{policyBrand}</span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-subtle">Last updated: {policyLastUpdated}</p>

            <nav aria-label="Privacy policy sections" className="mt-10 rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">On this page</p>
              <ol className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {tocItems.map((item, index) => (
                  <li key={item.id} className="flex gap-2">
                    <span className="w-5 shrink-0 font-mono text-xs leading-6 text-subtle">{index + 1}.</span>
                    <a href={`#${item.id}`} className="leading-6 text-muted transition-colors hover:text-accent">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-12 space-y-12">
              {privacyPolicySections.map((section, index) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                  <h2 id={`${section.id}-heading`} className="font-display text-2xl font-semibold tracking-tight text-text">
                    <span className="mr-2 font-mono text-base text-subtle">{index + 1}.</span>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} />
                    ))}
                  </div>
                </section>
              ))}

              <section id="contact" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="font-display text-2xl font-semibold tracking-tight text-text">
                  <span className="mr-2 font-mono text-base text-subtle">{tocItems.length}.</span>
                  Contact Information
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  For questions about this policy, to exercise your privacy rights, or to raise a grievance about how your
                  information has been handled, contact:
                </p>
                <div className="mt-6 rounded-2xl border border-border-strong bg-surface p-6">
                  <p className="font-display text-lg font-semibold text-text">
                    {profile.name} <span className="font-sans text-sm font-normal text-subtle">({policyBrand})</span>
                  </p>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <MailIcon width={16} height={16} className="shrink-0 text-subtle" />
                      <a href={`mailto:${profile.email}`} className="break-all font-medium text-accent underline-offset-4 hover:underline">
                        {profile.email}
                      </a>
                    </li>
                    {policyPhone && (
                      <li className="flex items-center gap-3">
                        <ChatIcon width={16} height={16} className="shrink-0 text-subtle" />
                        <span className="text-muted">
                          Phone / WhatsApp:{' '}
                          <a href={`tel:${policyPhone.replace(/\s/g, '')}`} className="font-medium text-accent underline-offset-4 hover:underline">
                            {policyPhone}
                          </a>
                        </span>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <GlobeIcon width={16} height={16} className="mt-0.5 shrink-0 text-subtle" />
                      <span className="text-muted">
                        {profile.location}.{' '}
                        <RichText text="[NEEDS CONFIRMATION: add a postal address only if you want one published; otherwise remove this note.]" />
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
                    <Button href={`mailto:${profile.email}?subject=${encodeURIComponent('Privacy request')}`}>
                      Email a privacy request
                      <ArrowRightIcon width={16} height={16} />
                    </Button>
                    <WhatsAppCTA message="Hi, I have a question about my personal information / privacy.">WhatsApp</WhatsAppCTA>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
