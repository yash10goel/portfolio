import { Container } from '@/components/Container'
import { techStrip } from '@/data/skills'
import { cn } from '@/utils/cn'

const tierClasses: Record<string, string> = {
  core: 'text-text font-semibold text-lg sm:text-xl',
  secondary: 'text-muted font-medium text-base sm:text-lg',
  familiar: 'text-subtle font-medium text-sm sm:text-base',
}

export function TechStrip() {
  const track = [...techStrip, ...techStrip]

  return (
    <section aria-label="Core technologies" className="border-y border-border py-10">
      <Container>
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          Core Technology Stack
        </p>
      </Container>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 pl-12 motion-reduce:animate-none">
          {track.map((tech, index) => (
            <span
              key={`${tech.name}-${index}`}
              className={cn('shrink-0 whitespace-nowrap', tierClasses[tech.tier])}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
