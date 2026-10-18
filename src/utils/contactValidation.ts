export interface QuoteFormValues {
  name: string
  phone: string
  email: string
  businessType: string
  city: string
  requirement: string
  budget: string
  details: string
}

export type QuoteFormField = keyof QuoteFormValues

export const NAME_MAX_LENGTH = 80
export const PHONE_MAX_LENGTH = 20
export const EMAIL_MAX_LENGTH = 120
export const SHORT_TEXT_MAX_LENGTH = 80
export const DETAILS_MAX_LENGTH = 1000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed || trimmed.length < 2 || !/[a-zA-Z]/.test(trimmed)) {
    return 'Please enter your name.'
  }
  return undefined
}

/** Required — this is how I reply. Accepts "+91 98765 43210", "09876543210", "9876543210", etc. */
export function validatePhone(value: string): string | undefined {
  const digits = value.trim().replace(/[\s()-]/g, '')
  if (!digits) return 'Please enter your phone / WhatsApp number.'
  if (!/^\+?\d{10,15}$/.test(digits)) return 'Please enter a valid phone number (at least 10 digits).'
  return undefined
}

/** Optional — only validated when the visitor provides one. */
export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim()
  if (trimmed && !EMAIL_PATTERN.test(trimmed)) return 'Please enter a valid email address, or leave it blank.'
  return undefined
}

const validators: Partial<Record<QuoteFormField, (value: string) => string | undefined>> = {
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  businessType: (value) => (value.trim().length >= 2 ? undefined : 'Please tell me your type of business.'),
  city: (value) => (value.trim().length >= 2 ? undefined : 'Please enter your city.'),
  requirement: (value) => (value ? undefined : 'Please choose what you need.'),
}

/** Fields in on-screen order, so focus goes to the first invalid one. */
export const quoteFieldOrder: QuoteFormField[] = ['name', 'phone', 'email', 'businessType', 'city', 'requirement']

export function validateQuoteField(field: QuoteFormField, value: string): string | undefined {
  return validators[field]?.(value)
}

export function validateQuoteForm(values: QuoteFormValues): Partial<Record<QuoteFormField, string>> {
  const errors: Partial<Record<QuoteFormField, string>> = {}
  for (const field of quoteFieldOrder) {
    const error = validateQuoteField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
