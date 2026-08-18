# Yash Goel — Portfolio

A premium, freelance-focused portfolio site for Yash Goel, Full-Stack Developer (React, Angular, .NET, TypeScript). Built with React, TypeScript, Vite and Tailwind CSS.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool & dev server
- **Tailwind CSS** — styling, with a CSS-variable-driven light/dark theme system
- No heavy UI/animation libraries — scroll reveals, marquee and hover states are hand-rolled with `IntersectionObserver` and CSS, respecting `prefers-reduced-motion`
- **Vercel Serverless Function** (`api/contact.ts`) — receives contact-form submissions and fans them out to email (Resend) and WhatsApp (Meta WhatsApp Cloud API); this is where all provider credentials live, never in the browser

## Project Structure

```text
api/
└── contact.ts    # Serverless function: validates, spam-checks, sends email + WhatsApp
src/
├── components/   # Reusable UI (Navbar, Footer, Button, ProjectCard, ProjectModal, ContactForm, icons...)
├── sections/     # Page sections (Hero, About, Skills, Experience, Projects, Services, Process, Contact...)
├── pages/        # Home.tsx composes all sections
├── data/         # Content — profile, experience, projects, skills, services (single source of truth)
├── hooks/        # useTheme, useReveal, useActiveSection, useReducedMotion, useLockBodyScroll
├── utils/        # cn() class helper, contactService (calls the /api/contact serverless function)
├── types/        # Shared TypeScript types
└── index.css     # Tailwind entry + CSS variable theme tokens
```

Content lives entirely in `src/data/*.ts`, separate from UI components — update your experience, projects or skills there without touching component code.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default. This runs the **frontend only** — the contact form's `/api/contact` call will 404 under plain `npm run dev` since Vite doesn't run serverless functions. To test the contact form end-to-end locally, use `vercel dev` instead (see "Contact Form Notifications" below).

## Available Scripts

| Command           | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start the Vite dev server (frontend only — see note above) |
| `npm run build`    | Type-check (`tsc -b`, including `api/`) and build for production |
| `npm run preview`  | Preview the production build locally      |
| `npm run lint`     | Run ESLint                                |

## Editing Content

All resume-derived content lives in `src/data/`:

- `profile.ts` — name, role, contact links, nav
- `experience.ts` — work history / timeline
- `projects.ts` — featured project case studies (edit `challenge`, `solution`, `role`, `features`, `highlights`, `outcome` per project; add `liveUrl` to link a live site)
- `skills.ts` — tech strip + skill group cards
- `services.ts` — freelance services + "How I Work" process steps

## Contact Form Notifications (Email + WhatsApp)

Every contact-form submission is sent to `api/contact.ts`, a Vercel serverless function that validates the input, runs a lightweight spam check, and then notifies you on **both** email and WhatsApp in parallel. All credentials live in environment variables on the server — nothing sensitive ever reaches the browser.

```text
Contact Form → POST /api/contact → validate + spam-check
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                     Resend (email)        Meta WhatsApp Cloud API
                              │                       │
                              ▼                       ▼
                        Your Inbox            Your WhatsApp
```

If **one** channel fails but the other succeeds, the visitor still sees the success message (per design) — the failure is only logged server-side (visible in your Vercel function logs) as e.g. `Email: SUCCESS`, `WhatsApp: FAILED (...)`. The visitor only sees a generic error if **both** channels fail, and never sees provider names, tokens, or technical details.

### Why Resend + Meta WhatsApp Cloud API

- **Email — [Resend](https://resend.com):** simplest provider that supports a proper `Reply-To` header (so you can reply straight to the client) and doesn't require exposing any key in the browser. Formspree/EmailJS are valid frontend-only alternatives, but since WhatsApp *requires* a backend anyway, routing email through the same serverless function keeps everything in one place and lets each channel fail independently, as required.
- **WhatsApp — Meta WhatsApp Cloud API (direct, not Twilio):** the official API, called from the serverless function only. Twilio wraps this same underlying platform and adds its own per-message fee on top — going direct is simpler and cheaper for a single-recipient notification use case like this.

### 1. Email setup (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. Go to **API Keys** → create a new key. This is your `RESEND_API_KEY`.
3. For **testing**, you can send from `onboarding@resend.dev` immediately — no domain setup needed. For **production**, go to **Domains**, add and verify your own domain (a few DNS records), then send from an address on it (e.g. `notifications@yourdomain.com`) for proper deliverability and branding.
4. Set `EMAIL_TO` to the inbox where you want to receive inquiries (your own email).

**Environment variables:**
```text
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev   # or your verified domain address
EMAIL_TO=you@example.com
```

**Cost:** Resend's free tier covers a generous number of emails/month for a personal portfolio's inquiry volume — check current limits on their pricing page before relying on it for high volume.

### 2. WhatsApp setup (Meta WhatsApp Cloud API)

This is a genuine multi-step setup on Meta's side — there's no way around that for an official, non-hacky WhatsApp integration. Budget 20–30 minutes.

1. Go to [developers.facebook.com](https://developers.facebook.com) and create a Meta App (type: **Business**).
2. Add the **WhatsApp** product to the app. Meta automatically provisions a **test phone number** you can use immediately — no need to buy a number to get started.
3. In the WhatsApp → API Setup screen, find:
   - **Phone Number ID** → this is your `WHATSAPP_PHONE_NUMBER_ID`
   - A **temporary access token** (valid 24 hours, fine for initial testing)
4. For a **permanent token** (required for production, since the 24h one will expire): create a System User under your Meta Business Settings, assign it to the app with `whatsapp_business_messaging` permission, and generate a token for it. This is your `WHATSAPP_ACCESS_TOKEN`.
5. `WHATSAPP_RECIPIENT_NUMBER` is **your own** personal WhatsApp number (the one that should receive inquiry notifications), in international format with no `+` or spaces — e.g. `919876543210`.

**Environment variables:**
```text
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxx
WHATSAPP_RECIPIENT_NUMBER=919876543210
WHATSAPP_API_VERSION=v21.0
```

#### ⚠️ Important limitation: the 24-hour session window and message templates

This is the part most guides skip, and it will bite you if you don't plan for it:

- WhatsApp Business accounts can only send **free-form text messages** to a recipient who has messaged that WhatsApp number within the last 24 hours ("customer service window"). Outside that window, **only pre-approved message templates** can be sent.
- Since the recipient here is **you** (getting notified about new leads), you will only be able to send free-form text right after you personally send a message *to* your own test/business number to (re-)open the 24-hour window. This is fine for initial testing, but is **not reliable for unattended production use** — the window will lapse if you don't message the number periodically.
- **For production, create a message template:**
  1. In Meta Business Manager → WhatsApp Manager → Message Templates → create a new template.
  2. Category: **Utility**.
  3. Body text (exactly, so the variable order matches the code):
     ```text
     🚀 New Freelance Inquiry

     Name: {{1}}
     Email: {{2}}
     Phone: {{3}}
     Company: {{4}}
     Project Type: {{5}}
     Budget: {{6}}

     Message: {{7}}
     ```
  4. Submit for review. Simple utility templates like this are typically reviewed quickly, but Meta's approval isn't instant or guaranteed — don't assume it'll be live the same day you launch.
  5. Once **approved**, set:
     ```text
     WHATSAPP_TEMPLATE_NAME=your_template_name
     WHATSAPP_TEMPLATE_LANG=en_US
     ```
     `api/contact.ts` automatically switches to sending the approved template instead of free-form text as soon as `WHATSAPP_TEMPLATE_NAME` is set — no code changes needed.
- Until the template is approved, you can still test the free-form path by messaging your test number from your phone first, then submitting the contact form within 24 hours.

**Sandbox/testing limitations:** Meta's test phone number can message unlimited numbers during development but shows extra restrictions/branding in some views; a small number of pre-registered test recipients is standard for pre-launch testing. For production you'd typically move to your own registered number and a verified Meta Business Account.

**Cost:** Meta's WhatsApp Cloud API pricing is conversation-based and has changed more than once — check the current rates on [Meta's WhatsApp pricing page](https://developers.facebook.com/docs/whatsapp/pricing) before launch. For a single-recipient notification use case (only you receiving messages), volume is naturally low.

### 3. Testing it end to end

**Locally**, the Vite dev server (`npm run dev`) does **not** run serverless functions. To test the real integration locally:

```bash
npm i -g vercel
vercel login
vercel link      # links this folder to a Vercel project
vercel env pull .env.local   # pulls the env vars you've set in the Vercel dashboard
vercel dev
```

`vercel dev` runs the Vite frontend **and** emulates `api/contact.ts` together on one local URL, using the env vars in `.env.local`. Submit the form and check:
- Your email inbox (and spam folder, the first few times)
- Your WhatsApp
- The terminal running `vercel dev`, for the `Email: SUCCESS/FAILED` and `WhatsApp: SUCCESS/FAILED` log lines

**In production**, after deploying to Vercel with the environment variables set (see Deployment below), submit a real test inquiry through the live site the same way.

### 4. Production deployment requirements checklist

- [ ] Resend account, API key, and (recommended) a verified sending domain
- [ ] Meta App with the WhatsApp product added
- [ ] Permanent (System User) access token generated — the temporary 24h token will expire in production
- [ ] Approved WhatsApp message template (`WHATSAPP_TEMPLATE_NAME` set) — without this, notifications will silently stop working once the 24h session window lapses
- [ ] All environment variables set in Vercel Project Settings → Environment Variables (not just locally)

### Spam protection

Two lightweight, zero-infrastructure checks run server-side before any notification is sent:
- **Honeypot field** (`website`) — invisible to real users, filled in only by bots; a filled honeypot causes the request to be silently dropped (the visitor still sees success, so bots get no signal to adapt).
- **Time-trap** — a submission arriving less than ~2.5 seconds after the form loaded is treated as automated and dropped the same way.

Note: this does **not** include IP-based rate limiting — serverless functions are stateless between invocations, so an in-memory counter would be unreliable and misleading. If spam becomes a real problem, the honest next step is [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (a free, invisible-most-of-the-time CAPTCHA alternative) or a rate-limiting service like Upstash — deliberately left out here to avoid adding infrastructure you may not need.

## Before Going Live — Replace These Placeholders

- `public/og-image.svg` — swap for a real 1200×630 PNG/JPG social preview image for maximum compatibility across platforms (most modern platforms support SVG, but not all)
- `index.html` — update `og:url` / `canonical` URL once you have a real domain
- All contact-form environment variables (see above) — the form UI and backend logic are fully implemented, but notifications won't send until real credentials are configured
- Optionally add a professional photo/avatar if you'd like one in the Hero or About section

## Production Build

```bash
npm run build
```

Outputs a static site to `dist/`. Verified locally: `tsc -b` passes with no errors, and `vite build` completes cleanly.

## Deployment

The contact form's email + WhatsApp notifications depend on `api/contact.ts`, a **Vercel serverless function**. Deploy to Vercel to get that working with zero extra configuration:

**Vercel**
```bash
npm i -g vercel
vercel --prod
```
Then add every environment variable from `.env.example` in **Project Settings → Environment Variables** (for Production, and Preview/Development if you want them there too), and redeploy.

**Other static hosts (Netlify, GitHub Pages, etc.)**
The rest of the site is a static build (`dist/`) and can be hosted anywhere. However, `api/contact.ts` is written specifically for Vercel's Node serverless function signature (`VercelRequest`/`VercelResponse`) — on another platform you'd need to port it to that platform's function format (e.g. Netlify Functions) and update the fetch URL in `src/utils/contactService.ts` if the endpoint path differs. Without this, the contact form's `fetch('/api/contact')` call will simply 404 and notifications won't send.

Remember to set the correct `og:url` / `canonical` values in `index.html` once you have a production domain.
"# portfolio" 
