export interface ContactFormValues {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  message: string
}

export type ContactFormField = keyof ContactFormValues

export const MESSAGE_MIN_LENGTH = 20
export const MESSAGE_MAX_LENGTH = 2000
export const COMPANY_MAX_LENGTH = 100
export const NAME_MAX_LENGTH = 80
export const PHONE_MAX_LENGTH = 20

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed || trimmed.length < 2 || !/[a-zA-Z]/.test(trimmed)) {
    return 'Please enter your name.'
  }
  return undefined
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address.'
  }
  return undefined
}

/** Phone is optional — only validated when the visitor actually provides one. */
export function validatePhone(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined

  const digits = trimmed.replace(/[^\d+]/g, '')
  if (!/^\+?\d{7,15}$/.test(digits)) {
    return 'Please enter a valid phone number.'
  }
  return undefined
}

export function validateProjectType(value: string): string | undefined {
  return value.trim() ? undefined : 'Please select a project type.'
}

export function validateMessage(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed || trimmed.length < MESSAGE_MIN_LENGTH) {
    return 'Please provide a few details about your project.'
  }
  return undefined
}

const validators: Partial<Record<ContactFormField, (value: string) => string | undefined>> = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  projectType: validateProjectType,
  message: validateMessage,
}

export function validateField(field: ContactFormField, value: string): string | undefined {
  return validators[field]?.(value)
}

export function validateContactForm(values: ContactFormValues): Partial<Record<ContactFormField, string>> {
  const errors: Partial<Record<ContactFormField, string>> = {}

  for (const field of Object.keys(validators) as ContactFormField[]) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }

  return errors
}
