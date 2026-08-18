import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from '@/components/icons'
import { Button } from '@/components/Button'
import { submitContactForm } from '@/utils/contactService'
import { cn } from '@/utils/cn'
import {
  COMPANY_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  validateContactForm,
  validateField,
  type ContactFormField,
  type ContactFormValues,
} from '@/utils/contactValidation'

const projectTypes = [
  'Website',
  'Web Application',
  'Mobile Application',
  'Admin Dashboard',
  'API / Backend',
  'Bug Fixing',
  'Maintenance',
  'Other',
]

const budgetRanges = ['₹10k–₹25k', '₹25k–₹50k', '₹50k–₹1L', '₹1L+']

const emptyValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClasses =
  'w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-sm text-text placeholder:text-subtle transition-all duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

const inputErrorClasses = 'border-danger/60 focus:border-danger focus:ring-danger/20'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [values, setValues] = useState<ContactFormValues>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({})
  const [errors, setErrors] = useState<Partial<Record<ContactFormField, string>>>({})

  const formId = useId()
  const isSubmittingRef = useRef(false)
  const formLoadedAtRef = useRef(Date.now())
  const honeypotRef = useRef<HTMLInputElement>(null)
  const fieldRefs = useRef<Partial<Record<ContactFormField, HTMLElement | null>>>({})

  function setFieldValue(field: ContactFormField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Once a field has already been flagged invalid, re-validate live as the
    // visitor corrects it rather than waiting for the next blur/submit.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFieldValue(event.target.name as ContactFormField, event.target.value)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const field = event.target.name as ContactFormField
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Synchronous guard against double-click / duplicate submits — React state
    // updates are async, so a ref check is the only reliable way to block a
    // second submit fired before the first re-render lands.
    if (isSubmittingRef.current) return

    const validationErrors = validateContactForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched({ name: true, email: true, phone: true, projectType: true, message: true })
      const firstInvalidField = (Object.keys(validationErrors) as ContactFormField[])[0]
      fieldRefs.current[firstInvalidField]?.focus()
      return
    }

    isSubmittingRef.current = true
    setStatus('submitting')
    try {
      await submitContactForm(values, {
        honeypot: honeypotRef.current?.value ?? '',
        formLoadedAt: formLoadedAtRef.current,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      isSubmittingRef.current = false
    }
  }

  function resetForSecondMessage() {
    setValues(emptyValues)
    setTouched({})
    setErrors({})
    setStatus('idle')
    formLoadedAtRef.current = Date.now()
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-strong bg-surface p-12 text-center animate-scale-in">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon width={22} height={22} />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-text">Thanks for reaching out!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Your message has been received. I&rsquo;ll get back to you as soon as possible.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={resetForSecondMessage}>
          Send another message
        </Button>
      </div>
    )
  }

  const messageLength = values.message.length
  const isNearMessageLimit = messageLength > MESSAGE_MAX_LENGTH - 100

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-8">
      {/* Honeypot: clipped to zero size in place (not off-screen, to avoid introducing horizontal scroll) and hidden from assistive tech; real visitors never fill this in. */}
      <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${formId}-name`} error={touched.name ? errors.name : undefined}>
          <input
            ref={(el) => {
              fieldRefs.current.name = el
            }}
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX_LENGTH}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={`${formId}-name-error`}
            className={cn(inputClasses, touched.name && errors.name && inputErrorClasses)}
            placeholder="Your full name"
          />
        </Field>

        <Field label="Email" htmlFor={`${formId}-email`} error={touched.email ? errors.email : undefined}>
          <input
            ref={(el) => {
              fieldRefs.current.email = el
            }}
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.email && Boolean(errors.email)}
            aria-describedby={`${formId}-email-error`}
            className={cn(inputClasses, touched.email && errors.email && inputErrorClasses)}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone Number" htmlFor={`${formId}-phone`} optional error={touched.phone ? errors.phone : undefined}>
          <input
            ref={(el) => {
              fieldRefs.current.phone = el
            }}
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={PHONE_MAX_LENGTH}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && Boolean(errors.phone)}
            aria-describedby={`${formId}-phone-error`}
            className={cn(inputClasses, touched.phone && errors.phone && inputErrorClasses)}
            placeholder="+91 98765 43210"
          />
        </Field>

        <Field label="Company" htmlFor={`${formId}-company`} optional>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={COMPANY_MAX_LENGTH}
            value={values.company}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Company name (optional)"
          />
        </Field>

        <Field
          label="Project Type"
          htmlFor={`${formId}-projectType`}
          error={touched.projectType ? errors.projectType : undefined}
          className="sm:col-span-2"
        >
          <div className="relative">
            <select
              ref={(el) => {
                fieldRefs.current.projectType = el
              }}
              id={`${formId}-projectType`}
              name="projectType"
              value={values.projectType}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.projectType && Boolean(errors.projectType)}
              aria-describedby={`${formId}-projectType-error`}
              className={cn(inputClasses, 'appearance-none pr-10', touched.projectType && errors.projectType && inputErrorClasses)}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              width={16}
              height={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle"
            />
          </div>
        </Field>

        <Field label="Budget Range" htmlFor={`${formId}-budget`} optional className="sm:col-span-2">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {budgetRanges.map((range) => (
              <label
                key={range}
                className="flex cursor-pointer items-center justify-center rounded-xl border border-border-strong px-3 py-2.5 text-xs font-medium text-muted transition-all duration-150 has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/25"
              >
                <input
                  type="radio"
                  name="budget"
                  value={range}
                  checked={values.budget === range}
                  onChange={handleChange}
                  className="sr-only"
                />
                {range}
              </label>
            ))}
          </div>
        </Field>

        <Field
          label="Message"
          htmlFor={`${formId}-message`}
          error={touched.message ? errors.message : undefined}
          className="sm:col-span-2"
          trailing={
            <span className={cn('text-xs tabular-nums', isNearMessageLimit ? 'text-danger' : 'text-subtle')}>
              {messageLength} / {MESSAGE_MAX_LENGTH}
            </span>
          }
        >
          <textarea
            ref={(el) => {
              fieldRefs.current.message = el
            }}
            id={`${formId}-message`}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX_LENGTH}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.message && Boolean(errors.message)}
            aria-describedby={`${formId}-message-error`}
            className={cn(inputClasses, 'resize-none', touched.message && errors.message && inputErrorClasses)}
            placeholder="Tell me about your project, goals, timeline, and requirements..."
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRightIcon width={16} height={16} />
          </>
        )}
      </Button>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm text-danger">
          Something went wrong sending your message. Please try again or email me directly.
        </p>
      )}
    </form>
  )
}

interface FieldProps {
  label: string
  htmlFor: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
  trailing?: ReactNode
}

function Field({ label, htmlFor, optional, error, className, children, trailing }: FieldProps) {
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
        {error}
      </p>
    </div>
  )
}
