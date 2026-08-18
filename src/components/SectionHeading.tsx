import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-balance text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}
