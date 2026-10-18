import type { ReactNode } from 'react'

export const inputClasses =
  'w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-base text-text placeholder:text-subtle transition-all duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 sm:text-sm'

export const inputErrorClasses = 'border-danger/60 focus:border-danger focus:ring-danger/20'

interface FieldProps {
  label: string
  htmlFor: string
  optional?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
  trailing?: ReactNode
}

/** Label + control + error slot. The error <p> id is `${htmlFor}-error`, for aria-describedby. */
export function Field({ label, htmlFor, optional, hint, error, className, children, trailing }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-text">
          {label}
          {optional && <span className="ml-1 text-xs font-normal text-subtle">(optional)</span>}
        </label>
        {trailing}
      </div>
      {children}
      <p id={`${htmlFor}-error`} role={error ? 'alert' : undefined} className="mt-1.5 min-h-[16px] text-xs text-danger">
        {(error ?? hint) ? <span className={error ? undefined : 'text-subtle'}>{error ?? hint}</span> : null}
      </p>
    </div>
  )
}
