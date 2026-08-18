export interface ContactFormPayload {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  message: string
}

interface SubmitContactFormOptions {
  /** Honeypot field — should always be empty when submitted by a human. */
  honeypot: string
  /** Timestamp (ms) captured when the form first mounted, used as a lightweight bot-timing check. */
  formLoadedAt: number
}

/**
 * Posts to the /api/contact serverless function, which fans the submission
 * out to an email notification (Resend) and a WhatsApp notification (Meta
 * WhatsApp Cloud API). Credentials for both live server-side only — see
 * api/contact.ts.
 */
export async function submitContactForm(
  payload: ContactFormPayload,
  options: SubmitContactFormOptions,
): Promise<{ ok: true }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      website: options.honeypot,
      formLoadedAt: options.formLoadedAt,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return { ok: true }
}
