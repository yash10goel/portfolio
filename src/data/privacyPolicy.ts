import { profile } from '@/data/profile'

/**
 * Privacy Policy content for /privacy-policy.
 *
 * Text may contain an inline `[link text](https://example.com)` marker, rendered as an
 * external link by src/pages/PrivacyPolicy.tsx.
 *
 * Every factual statement about data handling below reflects the current implementation
 * and the owner's confirmed practices (October 2026): the quote form
 * (src/components/QuoteForm.tsx → api/contact.ts → Resend email, no database), Vercel
 * hosting + Vercel Web Analytics, Google Fonts, the theme preference kept in
 * localStorage, WhatsApp click-to-chat links, no cookies set by the site and no Meta
 * Pixel. Update this file — and `policyLastUpdated` — if any of that changes.
 */

export type PolicyBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

export interface PolicySection {
  id: string
  title: string
  blocks: PolicyBlock[]
}

/** "919266110081" → "+91 92661 10081"; other formats are shown with a leading "+". */
function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`
  return d ? `+${d}` : ''
}

export const policyPhone = formatPhone(profile.whatsapp)
export const policyBrand = 'YashGoelDev'
export const policyLastUpdated = '26 October 2026'

const p = (text: string): PolicyBlock => ({ type: 'p', text })
const ul = (...items: string[]): PolicyBlock => ({ type: 'ul', items })

export const privacyPolicySections: PolicySection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    blocks: [
      p(
        `${policyBrand} is the freelance software development brand of ${profile.name}, an individual freelancer based in ${profile.location}. ${policyBrand} is not a registered company. It provides business website development, mobile app development, custom software development, website redesign and related development services.`,
      ),
      p(
        `This Privacy Policy explains what personal information ${policyBrand} ("we", "us", "our") collects when you visit https://yashgoeldev.vercel.app, submit the website's quote form, contact us on WhatsApp, phone or email, or submit a Meta (Facebook / Instagram) Instant Lead Form for our services — and how that information is used.`,
      ),
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    blocks: [
      p('We collect two kinds of information:'),
      ul(
        'Information you choose to give us — through the quote form on this website, a Meta Instant Lead Form, or when you message, call or email us.',
        'Limited technical information collected automatically when you visit this website — described under "Cookies and Analytics" below.',
      ),
      p('We do not ask for sensitive information such as financial account details, government ID numbers, health information or passwords, and we ask you not to send it to us.'),
    ],
  },
  {
    id: 'information-you-provide',
    title: 'Information You Provide on This Website',
    blocks: [
      p('The "Get a Website Quote" form on this website asks for:'),
      ul(
        'Your name (required)',
        'Phone / WhatsApp number (required — so we can reply with your quote)',
        'Email address (optional)',
        'Business type and city (required)',
        'Website requirement (required) and approximate budget (optional)',
        'Project details you choose to write (optional)',
      ),
      p(
        'The form also sends two technical values used only to filter spam: a hidden field that real visitors leave empty, and the time the form was opened. These do not identify you.',
      ),
      p(
        'When you submit the form, your details are sent to a server function hosted on Vercel, which emails them to our inbox using the email delivery service Resend. The website does not save your submission in a database.',
      ),
      p(
        'If you instead tap a "WhatsApp" button on this website, your WhatsApp app opens a chat with us containing a pre-written message that you can edit before sending. Nothing is sent until you press Send in WhatsApp.',
      ),
    ],
  },
  {
    id: 'meta-lead-forms',
    title: 'Information Collected Through Meta Lead Forms',
    blocks: [
      p(
        'We run advertisements on Facebook and Instagram that may include a Meta Instant Lead Form. If you submit one, Meta collects the information you enter and makes it available to us. Meta may pre-fill some fields from your Facebook or Instagram profile; you can review and edit them before submitting.',
      ),
      p('Our lead form asks for:'),
      ul(
        'Your name',
        'Phone number',
        'Email address (optional)',
        'Business type and city',
        'Service requirement',
        'Approximate budget (optional)',
        'Any additional details you choose to share (optional)',
      ),
      p(
        'We receive these leads through Meta\'s tools for advertisers. We do not store leads in our own database, and we do not copy them into a CRM, spreadsheet or other lead-management service.',
      ),
      p(
        'Meta\'s handling of information on its own platforms, including information used for ad targeting, is governed by the [Meta Privacy Policy](https://www.facebook.com/privacy/policy/), not by this policy.',
      ),
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    blocks: [
      p('We use the information you provide to:'),
      ul(
        'Respond to your enquiry and understand your requirements',
        'Prepare and send quotations and project proposals',
        'Discuss, plan and deliver the services you engage us for',
        'Follow up on your enquiry or quotation',
        'Keep relevant records of client projects',
        'Keep the website and quote form working and protected from spam and misuse',
      ),
      p('We contact you only to follow up on your enquiry and to discuss the services you asked about.'),
      p('We use aggregated website analytics only to understand how many people visit the site, which pages they view and where visits come from, so we can improve the website.'),
    ],
  },
  {
    id: 'contact-methods',
    title: 'Contact Through WhatsApp, Phone and Email',
    blocks: [
      p(
        `By submitting the quote form or a Meta Lead Form, you ask us to contact you about your enquiry. We may contact you by WhatsApp, phone call or email using the details you provide, normally from ${policyPhone} or ${profile.email}.`,
      ),
      p(
        'Messages sent on WhatsApp are handled by WhatsApp (a Meta company) under the [WhatsApp Privacy Policy](https://www.whatsapp.com/legal/privacy-policy). When you message us on WhatsApp, we can see your WhatsApp number, profile name and the messages you send.',
      ),
      p('If you no longer want to hear from us, reply "STOP" on WhatsApp, tell us on a call, or email us, and we will stop contacting you about that enquiry.'),
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing of Information',
    blocks: [
      p('We share personal information only with the service providers needed to run this website and communicate with you, and only for those purposes:'),
      ul(
        '[Vercel](https://vercel.com/legal/privacy-policy) — hosts this website and the server function that receives quote-form submissions, and provides website analytics.',
        '[Resend](https://resend.com/legal/privacy-policy) — delivers quote-form submissions to our email inbox.',
        '[Google](https://policies.google.com/privacy) — provides our email inbox (Gmail) and the fonts used on this website.',
        '[Meta](https://www.facebook.com/privacy/policy/) — provides Facebook / Instagram lead forms and WhatsApp.',
      ),
      p('We do not share enquiry information with collaborators or contractors.'),
      p('We may disclose information if required by law, by a court or government authority, or to protect our legal rights.'),
      p('We do not sell your personal information.'),
    ],
  },
  {
    id: 'storage-security',
    title: 'Data Storage and Security',
    blocks: [
      p('Your information is held in the services listed above — mainly our email inbox, WhatsApp, and Meta\'s tools for advertisers. This website does not run its own database.'),
      p('Steps we currently take include:'),
      ul(
        'This website is served over HTTPS, so information you send through the quote form travels over an encrypted connection.',
        'Credentials for the email service are kept on the server and are never sent to your browser.',
        'The quote form uses spam checks to reduce automated abuse.',
        `Only ${profile.name} has access to the inbox and accounts that receive enquiries.`,
      ),
      p('Our service providers may store or process information on servers located outside India. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.'),
    ],
  },
  {
    id: 'retention',
    title: 'Data Retention',
    blocks: [
      p('We keep enquiry information only for as long as reasonably necessary to handle your enquiry and to maintain relevant client records.'),
      p('You can ask us to delete your information at any time — see "Your Privacy Rights".'),
    ],
  },
  {
    id: 'cookies-analytics',
    title: 'Cookies and Analytics',
    blocks: [
      p('This website does not set its own cookies, and it does not currently use advertising cookies or tracking pixels such as the Meta Pixel.'),
      p(
        'Website analytics: we use Vercel Web Analytics to count page views and see aggregated information such as the referring website, approximate country, device type, browser and operating system. According to [Vercel](https://vercel.com/docs/analytics/privacy-policy), this works without third-party cookies: visitors are identified by a hash created from the incoming request, and the visitor session is discarded after 24 hours. We see aggregated statistics, not the identity of individual visitors.',
      ),
      p('Hosting logs: as with any website, Vercel processes technical request data such as your IP address, browser type and the page requested in order to deliver and protect the site.'),
      p('Fonts: this website loads fonts from Google Fonts, so your browser connects to Google\'s servers, which receive your IP address and browser information.'),
      p('Theme preference: if you switch between light and dark mode, that choice is saved in your browser\'s local storage on your device. It is not sent to us.'),
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    blocks: [
      p('Subject to applicable law in India, including the Digital Personal Data Protection Act, 2023 once its provisions apply, you may ask us to:'),
      ul(
        'Tell you what personal information we hold about you and how it is used',
        'Correct, complete or update your information',
        'Delete your information',
        'Withdraw your consent and stop contacting you',
        'Address a grievance about how your information has been handled',
      ),
      p('To make a request, contact us using the details below. We may need to confirm your identity before acting on a request. We aim to respond to privacy requests within a reasonable time.'),
      p('For information Meta holds about you, including lead form data stored on Meta\'s platforms, you can also use the privacy settings and tools provided by Meta.'),
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services and Links',
    blocks: [
      p('The services named in this policy — Vercel, Resend, Google and Meta (including Facebook, Instagram and WhatsApp) — process information under their own privacy policies, linked above. We encourage you to read them.'),
      p('This website also links to other websites, such as GitHub, LinkedIn and live websites built for clients. We are not responsible for the privacy practices of those websites.'),
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    blocks: [
      p('Our services are intended for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us personal information, contact us and we will remove it from our records.'),
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    blocks: [
      p('We may update this policy when our services, tools or legal requirements change. The "Last updated" date at the top of this page shows when it was last revised. Significant changes will be shown on this page.'),
    ],
  },
]
