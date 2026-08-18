import type { ElementType, ReactNode, CSSProperties } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/utils/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
}

export function Reveal({ children, className, as: Tag = 'div', delay = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={cn('reveal', isVisible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
