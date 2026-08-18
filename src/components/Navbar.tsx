import { useEffect, useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MenuIcon, CloseIcon } from '@/components/icons'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { navLinks, profile } from '@/data/profile'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useActiveSection(navLinks.map((link) => link.href.replace('#', '')))

  useLockBodyScroll(isMenuOpen)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'border-b border-border bg-bg/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-text"
          onClick={() => setIsMenuOpen(false)}
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                  isActive ? 'text-text' : 'text-muted hover:text-text',
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="#contact" size="md">
            Let&rsquo;s Talk
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-text"
          >
            {isMenuOpen ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="border-t border-border bg-bg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-text transition-colors hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" size="md" className="mt-3 w-full" onClick={() => setIsMenuOpen(false)}>
              Let&rsquo;s Talk
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
