import type { QuoteFormValues } from '@/utils/contactValidation'

interface SubmitQuoteOptions {
  /** Honeypot field — should always be empty when submitted by a human. */
  honeypot: string
  /** Timestamp (ms) captured when the form first mounted, used as a lightweight bot-timing check. */
  formLoadedAt: number
}

/**
 * Posts to the /api/contact serverless function, which fans the submission
 * out to an email notification (Resend) and a WhatsApp notification (Meta
 * WhatsApp Cloud API). Credentials for both live server-side only — see
 * api/contact.ts. Throws on any non-2xx response so the UI never shows a
 * success message for a request that wasn't delivered.
 */
export async function submitQuoteRequest(payload: QuoteFormValues, options: SubmitQuoteOptions): Promise<{ ok: true }> {
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
    throw new Error('Failed to send quote request')
  }

  return { ok: true }
}
