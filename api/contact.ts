import type { VercelRequest, VercelResponse } from '@vercel/node'

export interface ContactPayload {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  message: string
}

export interface ContactEnv {
  RESEND_API_KEY?: string
  EMAIL_FROM?: string
  EMAIL_TO?: string
  WHATSAPP_PHONE_NUMBER_ID?: string
  WHATSAPP_ACCESS_TOKEN?: string
  WHATSAPP_RECIPIENT_NUMBER?: string
  WHATSAPP_API_VERSION?: string
  /** Optional. When set, WhatsApp messages are sent as an approved template (required for production once the 24-hour session window has lapsed). When unset, falls back to a free-form text message. */
  WHATSAPP_TEMPLATE_NAME?: string
  WHATSAPP_TEMPLATE_LANG?: string
}

interface ChannelResult {
  success: boolean
  error?: string
}

/** Injected so the core logic can be unit-tested without real network calls. */
export interface ContactDeps {
  fetch: typeof fetch
  now: () => number
}

const MIN_SUBMIT_TIME_MS = 2500

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePayload(payload: ContactPayload): string | null {
  if (!payload.name?.trim()) return 'Name is required.'
  if (!payload.email?.trim() || !isValidEmail(payload.email)) return 'A valid email is required.'
  if (!payload.projectType?.trim()) return 'Project type is required.'
  if (!payload.message?.trim()) return 'Message is required.'
  return null
}

export function isLikelySpam(honeypot: string, formLoadedAt: number, now: number): boolean {
  if (honeypot.trim().length > 0) return true
  if (!Number.isFinite(formLoadedAt)) return true
  return now - formLoadedAt < MIN_SUBMIT_TIME_MS
}

function buildEmailText(payload: ContactPayload): string {
  return `🚀 New Freelance Inquiry

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
Company: ${payload.company || 'Not provided'}
Project Type: ${payload.projectType}
Budget: ${payload.budget || 'Not specified'}

Message:
${payload.message}

Submitted from:
My Portfolio Website`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml(payload: ContactPayload): string {
  const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;color:#6b7280;font-size:13px;width:130px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:500;">${value}</td>
      </tr>`

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="background:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#4F46E5;padding:28px 32px;">
                <p style="margin:0 0 6px;color:#c7d2fe;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Yash Goel &mdash; Portfolio</p>
                <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">🚀 New Freelance Inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" style="border-collapse:collapse;">
                  ${row('Name', escapeHtml(payload.name))}
                  ${row('Email', `<a href="mailto:${escapeHtml(payload.email)}" style="color:#4F46E5;text-decoration:none;">${escapeHtml(payload.email)}</a>`)}
                  ${row('Phone', payload.phone ? escapeHtml(payload.phone) : 'Not provided')}
                  ${row('Company', payload.company ? escapeHtml(payload.company) : 'Not provided')}
                  ${row('Project Type', escapeHtml(payload.projectType))}
                  ${row('Budget', payload.budget ? escapeHtml(payload.budget) : 'Not specified')}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 28px;">
                <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
                  <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Message</p>
                  <p style="margin:0;color:#111827;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
                <p style="margin:0;color:#9ca3af;font-size:12px;">Submitted from your portfolio website&rsquo;s contact form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildWhatsAppText(payload: ContactPayload): string {
  return `🚀 NEW FREELANCE INQUIRY

👤 Name: ${payload.name}
📧 Email: ${payload.email}
📱 Phone: ${payload.phone || 'Not provided'}
🏢 Company: ${payload.company || 'Not provided'}

💻 Project:
${payload.projectType}

💰 Budget:
${payload.budget || 'Not specified'}

📝 Message:
${payload.message}

🔗 Source:
Portfolio Website`
}

async function sendEmail(payload: ContactPayload, env: ContactEnv, deps: ContactDeps): Promise<ChannelResult> {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM || !env.EMAIL_TO) {
    return { success: false, error: 'Email is not configured (missing RESEND_API_KEY, EMAIL_FROM or EMAIL_TO).' }
  }

  try {
    const response = await deps.fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [env.EMAIL_TO],
        reply_to: payload.email,
        subject: `New Freelance Inquiry — ${payload.projectType}`,
        text: buildEmailText(payload),
        html: buildEmailHtml(payload),
      }),
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      return { success: false, error: `Resend responded with ${response.status}: ${body}` }
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown email error' }
  }
}

async function sendWhatsApp(payload: ContactPayload, env: ContactEnv, deps: ContactDeps): Promise<ChannelResult> {
  if (!env.WHATSAPP_PHONE_NUMBER_ID || !env.WHATSAPP_ACCESS_TOKEN || !env.WHATSAPP_RECIPIENT_NUMBER) {
    return {
      success: false,
      error: 'WhatsApp is not configured (missing WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN or WHATSAPP_RECIPIENT_NUMBER).',
    }
  }

  const apiVersion = env.WHATSAPP_API_VERSION || 'v21.0'
  const url = `https://graph.facebook.com/${apiVersion}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`

  const body = env.WHATSAPP_TEMPLATE_NAME
    ? {
        messaging_product: 'whatsapp',
        to: env.WHATSAPP_RECIPIENT_NUMBER,
        type: 'template',
        template: {
          name: env.WHATSAPP_TEMPLATE_NAME,
          language: { code: env.WHATSAPP_TEMPLATE_LANG || 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: payload.name },
                { type: 'text', text: payload.email },
                { type: 'text', text: payload.phone || 'Not provided' },
                { type: 'text', text: payload.company || 'Not provided' },
                { type: 'text', text: payload.projectType },
                { type: 'text', text: payload.budget || 'Not specified' },
                { type: 'text', text: payload.message },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: 'whatsapp',
        to: env.WHATSAPP_RECIPIENT_NUMBER,
        type: 'text',
        text: { body: buildWhatsAppText(payload) },
      }

  try {
    const response = await deps.fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const responseBody = await response.text().catch(() => '')
      return { success: false, error: `WhatsApp Cloud API responded with ${response.status}: ${responseBody}` }
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown WhatsApp error' }
  }
}

export interface ProcessResult {
  status: number
  body: { ok: boolean; message?: string }
}

/**
 * Core submission logic, decoupled from the HTTP layer so it can be
 * exercised directly in tests without a real Vercel request/response.
 */
export async function processContactSubmission(
  payload: ContactPayload,
  honeypot: string,
  formLoadedAt: number,
  env: ContactEnv,
  deps: ContactDeps,
): Promise<ProcessResult> {
  const validationError = validatePayload(payload)
  if (validationError) {
    return { status: 400, body: { ok: false, message: validationError } }
  }

  if (isLikelySpam(honeypot, formLoadedAt, deps.now())) {
    // Respond as if it succeeded so bots get no signal their submission was rejected.
    console.log('Contact form: submission flagged as spam, notifications skipped.')
    return { status: 200, body: { ok: true } }
  }

  const [emailResult, whatsappResult] = await Promise.all([
    sendEmail(payload, env, deps),
    sendWhatsApp(payload, env, deps),
  ])

  console.log(`Contact form submission — Email: ${emailResult.success ? 'SUCCESS' : 'FAILED'}${emailResult.error ? ` (${emailResult.error})` : ''}`)
  console.log(`Contact form submission — WhatsApp: ${whatsappResult.success ? 'SUCCESS' : 'FAILED'}${whatsappResult.error ? ` (${whatsappResult.error})` : ''}`)

  if (emailResult.success || whatsappResult.success) {
    return { status: 200, body: { ok: true } }
  }

  return { status: 502, body: { ok: false, message: 'Unable to deliver your message right now.' } }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' })
    return
  }

  const body = req.body ?? {}

  const payload: ContactPayload = {
    name: String(body.name ?? ''),
    email: String(body.email ?? ''),
    phone: String(body.phone ?? ''),
    company: String(body.company ?? ''),
    projectType: String(body.projectType ?? ''),
    budget: String(body.budget ?? ''),
    message: String(body.message ?? ''),
  }
  const honeypot = String(body.website ?? '')
  const formLoadedAt = Number(body.formLoadedAt ?? NaN)

  const env: ContactEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_RECIPIENT_NUMBER: process.env.WHATSAPP_RECIPIENT_NUMBER,
    WHATSAPP_API_VERSION: process.env.WHATSAPP_API_VERSION,
    WHATSAPP_TEMPLATE_NAME: process.env.WHATSAPP_TEMPLATE_NAME,
    WHATSAPP_TEMPLATE_LANG: process.env.WHATSAPP_TEMPLATE_LANG,
  }

  const result = await processContactSubmission(payload, honeypot, formLoadedAt, env, { fetch, now: Date.now })
  res.status(result.status).json(result.body)
}
