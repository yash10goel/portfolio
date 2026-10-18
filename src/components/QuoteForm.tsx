import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { Field, inputClasses, inputErrorClasses } from '@/components/FormField'
import { WhatsAppCTA } from '@/components/WhatsAppCTA'
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from '@/components/icons'
import { leadBudgets, leadBusinessTypes, leadRequirements } from '@/data/offer'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'
import { submitQuoteRequest } from '@/utils/contactService'
import {
  DETAILS_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  SHORT_TEXT_MAX_LENGTH,
  quoteFieldOrder,
  validateQuoteField,
  validateQuoteForm,
  type QuoteFormField,
  type QuoteFormValues,
} from '@/utils/contactValidation'

const emptyValues: QuoteFormValues = {
  name: '',
  phone: '',
  email: '',
  businessType: '',
  city: '',
  requirement: '',
  budget: '',
  details: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

function buildQuoteMessage(values: QuoteFormValues): string {
  return [
    "Hi Yash, I'd like a quote for a business website.",
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    `Business type: ${values.businessType.trim()}`,
    `City: ${values.city.trim()}`,
    `Requirement: ${values.requirement}`,
    `Approx. budget: ${values.budget || 'Not sure yet'}`,
    values.details.trim() && `Details: ${values.details.trim()}`,
  ]
    .filter((line) => line !== '')
    .join('\n')
}

/**
 * The site's single enquiry form ("Get a Website Quote"). Submits to the
 * /api/contact serverless function, which emails (and optionally WhatsApps)
 * the request to me. Success is only shown after a 2xx response; on failure
 * the visitor keeps their input and gets a WhatsApp button with it prefilled.
 */
export function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [values, setValues] = useState<QuoteFormValues>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<QuoteFormField, boolean>>>({})
  const [errors, setErrors] = useState<Partial<Record<QuoteFormField, string>>>({})

  const formId = useId()
  const isSubmittingRef = useRef(false)
  const formLoadedAtRef = useRef(Date.now())
  const honeypotRef = useRef<HTMLInputElement>(null)
  const fieldRefs = useRef<Partial<Record<QuoteFormField, HTMLElement | null>>>({})

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as QuoteFormField
    const value = event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    // Once a field has been flagged, re-validate live as the visitor corrects it.
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateQuoteField(field, value) }))
    if (status === 'error') setStatus('idle')
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as QuoteFormField
    // Don't flag an empty required field just because the visitor tabbed past it.
    if (!values[field]) return
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateQuoteField(field, values[field]) }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Synchronous guard: state updates are async, so only a ref reliably blocks a double submit.
    if (isSubmittingRef.current) return

    const validationErrors = validateQuoteForm(values)
    setErrors(validationErrors)
    setTouched(Object.fromEntries(quoteFieldOrder.map((field) => [field, true])))
    const firstInvalid = quoteFieldOrder.find((field) => validationErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    isSubmittingRef.current = true
    setStatus('submitting')
    try {
      await submitQuoteRequest(values, {
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

  function resetForAnotherRequest() {
    setValues(emptyValues)
    setTouched({})
    setErrors({})
    setStatus('idle')
    formLoadedAtRef.current = Date.now()
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-border-strong bg-surface p-8 text-center animate-scale-in sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon width={22} height={22} />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-text">Thanks — your request has been sent.</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          I&rsquo;ll get back to you on {values.phone.trim()} with a few questions and a written quote.{' '}
          {profile.responseTime}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <WhatsAppCTA message={buildQuoteMessage(values)}>Also message me on WhatsApp</WhatsAppCTA>
          <Button type="button" variant="ghost" onClick={resetForAnotherRequest}>
            Send another request
          </Button>
        </div>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'
  const fieldError = (field: QuoteFormField) => (touched[field] ? errors[field] : undefined)
  const inputProps = (field: QuoteFormField) => ({
    ref: (el: HTMLElement | null) => {
      fieldRefs.current[field] = el
    },
    id: `${formId}-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(fieldError(field)),
    'aria-describedby': `${formId}-${field}-error`,
  })
  const controlClasses = (field: QuoteFormField, extra?: string) =>
    cn(inputClasses, extra, fieldError(field) && inputErrorClasses)

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-8"
    >
      {/* Honeypot: clipped in place and hidden from assistive tech; real visitors never fill it in. */}
      <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />

      <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${formId}-name`} error={fieldError('name')}>
          <input
            {...inputProps('name')}
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX_LENGTH}
            className={controlClasses('name')}
            placeholder="Your full name"
          />
        </Field>

        <Field
          label="Phone / WhatsApp"
          htmlFor={`${formId}-phone`}
          error={fieldError('phone')}
          hint="So I can reply with your quote."
        >
          <input
            {...inputProps('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={PHONE_MAX_LENGTH}
            className={controlClasses('phone')}
            placeholder="+91 98765 43210"
          />
        </Field>

        <Field label="Email" htmlFor={`${formId}-email`} optional error={fieldError('email')}>
          <input
            {...inputProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={EMAIL_MAX_LENGTH}
            className={controlClasses('email')}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="City" htmlFor={`${formId}-city`} error={fieldError('city')}>
          <input
            {...inputProps('city')}
            type="text"
            autoComplete="address-level2"
            maxLength={SHORT_TEXT_MAX_LENGTH}
            className={controlClasses('city')}
            placeholder="e.g. Noida"
          />
        </Field>

        <Field label="Business type" htmlFor={`${formId}-businessType`} error={fieldError('businessType')} className="sm:col-span-2">
          <input
            {...inputProps('businessType')}
            type="text"
            list={`${formId}-businessTypes`}
            maxLength={SHORT_TEXT_MAX_LENGTH}
            className={controlClasses('businessType')}
            placeholder="e.g. Real estate broker"
          />
          <datalist id={`${formId}-businessTypes`}>
            {leadBusinessTypes.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        </Field>

        <Field label="Website requirement" htmlFor={`${formId}-requirement`} error={fieldError('requirement')} className="sm:col-span-2">
          <div className="relative">
            <select {...inputProps('requirement')} className={controlClasses('requirement', 'appearance-none pr-10')}>
              <option value="" disabled>
                What do you need?
              </option>
              {leadRequirements.map((requirement) => (
                <option key={requirement} value={requirement}>
                  {requirement}
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

        <fieldset className="mb-3 sm:col-span-2">
          <legend className="mb-2 block text-sm font-medium text-text">
            Approximate budget <span className="ml-1 text-xs font-normal text-subtle">(optional)</span>
          </legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {leadBudgets.map((range) => (
              <label
                key={range}
                className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl border border-border-strong px-3 py-2.5 text-center text-xs font-medium text-muted transition-all duration-150 has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-strong has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/25"
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
        </fieldset>

        <Field
          label="Project details"
          htmlFor={`${formId}-details`}
          optional
          className="sm:col-span-2"
          trailing={
            <span className="text-xs tabular-nums text-subtle">
              {values.details.length} / {DETAILS_MAX_LENGTH}
            </span>
          }
        >
          <textarea
            {...inputProps('details')}
            rows={3}
            maxLength={DETAILS_MAX_LENGTH}
            className={controlClasses('details', 'resize-none')}
            placeholder="Pages you need, an existing site to redesign, a deadline…"
          />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-4 w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending...
          </>
        ) : (
          <>
            Get a Website Quote
            <ArrowRightIcon width={16} height={16} />
          </>
        )}
      </Button>

      {status === 'error' ? (
        <div role="alert" className="mt-4 rounded-xl border border-danger/40 bg-danger-soft p-4">
          <p className="text-sm font-medium text-text">Your request couldn&rsquo;t be sent right now.</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Please send it on WhatsApp instead — your details are already filled in. Or email me at{' '}
            <a href={`mailto:${profile.email}`} className="break-all font-medium text-accent underline-offset-4 hover:underline">
              {profile.email}
            </a>
            .
          </p>
          <WhatsAppCTA message={buildQuoteMessage(values)} className="mt-3 w-full sm:w-auto">
            Send details on WhatsApp
          </WhatsAppCTA>
        </div>
      ) : (
        <p className="mt-3 text-center text-xs leading-relaxed text-subtle">
          No obligation. Your details are only used to reply to your enquiry.
        </p>
      )}
    </form>
  )
}
