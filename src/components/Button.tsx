import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-strong shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset] hover:shadow-glow',
  secondary: 'bg-surface text-text border border-border-strong hover:border-accent hover:text-accent',
  ghost: 'text-text hover:text-accent',
}

const sizeStyles: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

const sharedClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

interface ButtonOwnProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsAnchor = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type Props = ButtonAsButton | ButtonAsAnchor

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  const classes = cn(sharedClasses, variantStyles[variant], sizeStyles[size], className)

  if ('href' in props && props.href) {
    const { href, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
