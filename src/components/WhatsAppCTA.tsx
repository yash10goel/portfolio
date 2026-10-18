import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/Button'
import { ChatIcon } from '@/components/icons'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'
import { BUSINESS_ENQUIRY_MESSAGE, whatsappHref } from '@/utils/whatsapp'

type ButtonVariant = NonNullable<ComponentProps<typeof Button>['variant']>
type ButtonSize = ComponentProps<typeof Button>['size']

interface WhatsAppCTAProps {
  /** Prefilled chat text; defaults to the general business-website enquiry. */
  message?: string
  /** Button variants, or "link" for an inline text link (e.g. alongside the Resume/GitHub links). */
  variant?: ButtonVariant | 'link'
  size?: ButtonSize
  className?: string
  children?: ReactNode
}

/**
 * Click-to-chat CTA reused across the hero, packages, demo, quote form and
 * footer. Renders nothing when no WhatsApp number is configured, so a missing
 * env var never ships a broken link.
 */
export function WhatsAppCTA({
  message = BUSINESS_ENQUIRY_MESSAGE,
  variant = 'secondary',
  size = 'md',
  className,
  children = 'Chat on WhatsApp',
}: WhatsAppCTAProps) {
  if (!profile.whatsapp) return null

  const linkProps = {
    href: whatsappHref(profile.whatsapp, message),
    target: '_blank',
    rel: 'noopener noreferrer',
  }

  if (variant === 'link') {
    return (
      <a
        {...linkProps}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent',
          className,
        )}
      >
        <ChatIcon width={15} height={15} />
        {children}
      </a>
    )
  }

  return (
    <Button {...linkProps} variant={variant} size={size} className={className}>
      <ChatIcon width={17} height={17} />
      {children}
    </Button>
  )
}
