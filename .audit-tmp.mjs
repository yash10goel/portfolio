import { chromium } from 'playwright'

const BASE = 'http://localhost:4173/'
const OUT = process.argv[2]
const EXPECTED_NUMBER = '919084386006'
const r = []
const rep = (status, name, extra = '') => r.push(`${status.padEnd(12)} ${name}${extra ? ' — ' + extra : ''}`)
const check = (name, ok, extra) => rep(ok ? 'PASS' : 'FAIL', name, extra)
const showAll = '.reveal{opacity:1!important;transform:none!important;transition:none!important}'

const browser = await chromium.launch()

// ---------- 1. Responsive + first screen ----------
for (const vp of [
  { name: '360', width: 360, height: 640 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: vp.width < 1024 })
  const page = await ctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900) // let hero reveal animations finish
  await page.screenshot({ path: `${OUT}/${vp.name}-first-screen.png` })

  const fold = await page.evaluate(() => {
    const vh = window.innerHeight
    const inView = (el) => el && el.getBoundingClientRect().bottom <= vh && el.getBoundingClientRect().top >= 0
    const h1 = document.querySelector('h1')
    const cta = [...document.querySelectorAll('#home a')].find((a) => a.textContent.includes('Get a Website Quote'))
    const price = [...document.querySelectorAll('#home p')].find((p) => p.textContent.includes('₹10,000'))
    return { h1: inView(h1), cta: inView(cta), price: inView(price), ctaBottom: cta?.getBoundingClientRect().bottom, priceBottom: price?.getBoundingClientRect().bottom, vh }
  })
  if (vp.width < 768) {
    check(`[${vp.name}] first screen: service headline visible`, fold.h1)
    check(`[${vp.name}] first screen: starting price visible`, fold.price, `bottom=${Math.round(fold.priceBottom)} vh=${fold.vh}`)
    check(`[${vp.name}] first screen: primary CTA visible`, fold.cta, `bottom=${Math.round(fold.ctaBottom)} vh=${fold.vh}`)
  }

  await page.addStyleTag({ content: showAll })
  const layout = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const overflow = document.documentElement.scrollWidth - window.innerWidth
    const visible = (el) => {
      const s = getComputedStyle(el)
      const rc = el.getBoundingClientRect()
      return s.visibility !== 'hidden' && s.display !== 'none' && rc.width > 1 && rc.height > 1 && !el.closest('.sr-only, [aria-hidden="true"], .mask-fade-x')
    }
    // elements sticking out of the viewport horizontally (excluding the intentionally clipped marquee)
    const clipped = [...document.querySelectorAll('body *')]
      .filter((el) => visible(el) && (el.getBoundingClientRect().right > vw + 1 || el.getBoundingClientRect().left < -1))
      .map((el) => `${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? '').toString().split(' ').slice(0, 3).join('.')}`)
    // tiny text
    const tiny = new Map()
    for (const el of document.querySelectorAll('body *')) {
      if (!visible(el)) continue
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      if (!own) continue
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs < 12) {
        const t = el.textContent.trim().slice(0, 30)
        tiny.set(`${fs}px "${t}"`, (tiny.get(`${fs}px "${t}"`) ?? 0) + 1)
      }
    }
    // tap targets < 24x24 (WCAG 2.2 AA 2.5.8), excluding inline links within sentences
    const small = []
    for (const el of document.querySelectorAll('a[href], button, select, input:not([type=radio]):not(.sr-only), label:has(input[type=radio])')) {
      if (!visible(el)) continue
      const rc = el.getBoundingClientRect()
      const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline'
      const cx = rc.left + rc.width / 2, cy = rc.top + rc.height / 2
      const crowded = [...document.querySelectorAll('a[href], button, select, input:not([type=radio]):not(.sr-only)')].some((o) => {
        if (o === el || !visible(o) || el.contains(o) || o.contains(el)) return false
        const q = o.getBoundingClientRect()
        const dx = Math.max(q.left - cx, 0, cx - q.right), dy = Math.max(q.top - cy, 0, cy - q.bottom)
        return Math.hypot(dx, dy) < 12
      })
      if (!inline && (rc.width < 24 || rc.height < 24) && crowded) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 25)}" ${Math.round(rc.width)}x${Math.round(rc.height)}`)
    }
    return { overflow, clipped: [...new Set(clipped)].slice(0, 8), tiny: [...tiny.keys()], small }
  })
  check(`[${vp.name}] no horizontal page scroll`, layout.overflow <= 0, `overflow=${layout.overflow}px`)
  check(`[${vp.name}] no elements clipped off-screen`, layout.clipped.length === 0, layout.clipped.join(', '))
  check(`[${vp.name}] no text under 12px`, layout.tiny.length === 0, layout.tiny.slice(0, 12).join(' | '))
  check(`[${vp.name}] tap targets ≥ 24px or spaced (WCAG 2.5.8)`, layout.small.length === 0, layout.small.join(' | '))
  check(`[${vp.name}] no console/runtime errors`, errs.length === 0, errs.join(' | '))
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true })
  await ctx.close()
}

// ---------- 2. Links, CTAs, navigation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: (a.textContent || a.getAttribute('aria-label') || '').trim(), target: a.target, rel: a.rel })))
  const hashes = links.filter((l) => l.href.startsWith('#'))
  const missing = await page.evaluate((hs) => hs.filter((h) => !document.getElementById(h.slice(1))), [...new Set(hashes.map((l) => l.href))])
  check(`all ${hashes.length} in-page links resolve to a section`, missing.length === 0, missing.join(','))

  // click every primary nav link and every hero/pricing CTA, confirm the target ends up near the top under the navbar
  const navLabels = await page.locator('nav[aria-label=Primary] a').allTextContents()
  for (const label of navLabels) {
    const link = page.locator('nav[aria-label=Primary] a', { hasText: label })
    const href = await link.getAttribute('href')
    await link.click()
    await page.waitForTimeout(1200)
    const top = await page.evaluate((id) => document.getElementById(id).getBoundingClientRect().top, href.slice(1))
    check(`nav "${label}" scrolls to ${href}`, top >= 0 && top < 200, `top=${Math.round(top)}`)
  }
  for (const [scope, text] of [['#home', 'Get a Website Quote'], ['#home', 'View My Work'], ['#home', 'See what’s included'], ['header', 'Get a Quote'], ['#packages', 'Or request a quote']]) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.addStyleTag({ content: showAll })
    const a = page.locator(`${scope} a`, { hasText: text }).first()
    const href = await a.getAttribute('href')
    await a.click()
    await page.waitForTimeout(1200)
    const top = await page.evaluate((id) => document.getElementById(id).getBoundingClientRect().top, href.slice(1))
    check(`CTA "${text}" (${scope}) → ${href}`, top >= 0 && top < 200, `top=${Math.round(top)}`)
  }

  // external links
  const ext = [...new Set(links.filter((l) => /^https?:/.test(l.href) && !l.href.includes('wa.me')).map((l) => l.href))]
  for (const l of links.filter((l) => /^https?:/.test(l.href))) {
    if (l.target === '_blank' && !l.rel.includes('noreferrer') && !l.rel.includes('noopener')) rep('FAIL', `external link missing rel noopener: ${l.href}`)
  }
  r.push(`INFO         external links: ${ext.join(', ')}`)
  const resume = await page.request.get(BASE + 'resume.pdf')
  check('resume.pdf download link serves a PDF', resume.ok() && resume.headers()['content-type']?.includes('pdf'))

  // ---------- 3. WhatsApp ----------
  const wa = links.filter((l) => l.href.includes('wa.me'))
  check('WhatsApp CTAs found', wa.length >= 8, `count=${wa.length}`)
  for (const l of wa) {
    const u = new URL(l.href)
    const num = u.pathname.slice(1)
    const raw = l.href.split('?text=')[1] ?? ''
    const decoded = decodeURIComponent(raw)
    const encodedOk = !/[\s₹'"<>]/.test(raw) && encodeURIComponent(decoded) === raw
    check(`WA "${l.text}"`, num === EXPECTED_NUMBER && encodedOk && l.target === '_blank' && l.rel.includes('noopener'), `${num} | "${decoded.slice(0, 60)}…"`)
  }
  await ctx.close()
}

// ---------- 4. The single quote form ----------
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 640 }, hasTouch: true })
  const page = await ctx.newPage()
  await page.goto(BASE + '#quote', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: showAll })
  const forms = await page.locator('form').count()
  check('exactly one form on the page', forms === 1, `forms=${forms}`)
  const form = page.locator('#quote form')
  const submit = form.locator('button[type=submit]')
  const alerts = async () => (await form.locator('[role=alert]').allTextContents()).filter(Boolean)
  let requests = 0
  page.on('request', (rq) => rq.url().includes('/api/contact') && requests++)

  await submit.click()
  const a1 = await alerts()
  check('quote: empty submit → 5 required errors (name, phone, business, city, requirement), no request', a1.length === 5 && requests === 0, a1.join(' / '))
  check('quote: invalid fields flagged with aria-invalid', (await form.locator('[aria-invalid=true]').count()) === 5)
  check('quote: errors linked via aria-describedby', await page.evaluate(() => [...document.querySelectorAll('#quote [aria-invalid=true]')].every((el) => document.getElementById(el.getAttribute('aria-describedby'))?.textContent.trim())))
  check('quote: focus moved to first invalid field (name)', (await page.evaluate(() => document.activeElement?.name)) === 'name')

  await form.locator('input[name=name]').fill('   ')
  await form.locator('input[name=phone]').fill('12345')
  await form.locator('input[name=email]').fill('bad@')
  await submit.click()
  const a2 = await alerts()
  check('quote: whitespace name, short phone and bad optional email rejected', a2.some((t) => t.includes('name')) && a2.some((t) => t.includes('valid phone')) && a2.some((t) => t.includes('email')), a2.join(' / '))
  await form.locator('input[name=email]').fill('')
  check('quote: optional email error clears when emptied', !(await alerts()).some((t) => t.includes('email')))
  await form.locator('input[name=name]').fill('Ravi & Sons')
  await form.locator('input[name=phone]').fill('+91 98765 43210')
  await form.locator('input[name=city]').fill('Noida')
  await form.locator('input[name=businessType]').fill('Real estate broker / property consultant')
  await form.locator('select[name=requirement]').selectOption('Property / project listing website')
  await form.locator('label', { hasText: '₹20,000 – ₹35,000' }).click()
  await form.locator('textarea[name=details]').fill('5 pages with listings')
  check('quote: errors clear live once corrected', (await alerts()).length === 0)
  check('quote: details counter updates', (await form.textContent()).includes('20 / 1000'))
  await page.waitForTimeout(2600) // past the server's anti-bot minimum fill time
  await page.locator('#quote').screenshot({ path: `${OUT}/360-quote-filled.png` })

  // A) Real backend isn't served by `vite preview` → must show an error + WhatsApp fallback, never success.
  await submit.click()
  await page.waitForTimeout(1500)
  const errBox = form.locator('[role=alert]').filter({ hasText: 'couldn’t be sent' })
  const errShown = (await errBox.count()) === 1
  const noFakeSuccess = !(await page.locator('#quote').textContent()).includes('has been sent')
  check('quote: unreachable API → error shown, no fake success', errShown && noFakeSuccess)
  const fb = await errBox.locator('a[href*="wa.me"]').getAttribute('href').catch(() => null)
  const fbText = fb ? new URL(fb).searchParams.get('text') : ''
  check('quote: error fallback WhatsApp link → configured number, all fields, encoded', !!fb && new URL(fb).pathname === `/${EXPECTED_NUMBER}` && ['Ravi & Sons', '+91 98765 43210', 'Noida', 'Real estate broker', 'Property / project listing website', '₹20,000 – ₹35,000', '5 pages with listings'].every((s) => fbText.includes(s)) && !/[\s₹&]/.test(fb.split('?text=')[1]), JSON.stringify(fbText))
  check('quote: input kept after a failed submit', (await form.locator('input[name=name]').inputValue()) === 'Ravi & Sons')
  await page.locator('#quote').screenshot({ path: `${OUT}/360-quote-error.png` })

  // B) Stubbed API → verifies loading / double-submit guard / success UI (front-end states only, not delivery).
  let captured = null
  requests = 0
  await page.route('**/api/contact', async (route) => { captured = route.request().postDataJSON(); await new Promise((res) => setTimeout(res, 1200)); await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) })
  await submit.click()
  await page.waitForTimeout(250)
  check('quote: loading state (button disabled, "Sending...", aria-busy)', (await submit.isDisabled()) && (await submit.textContent()).includes('Sending') && (await form.getAttribute('aria-busy')) === 'true')
  await submit.click({ force: true }).catch(() => {})
  await page.waitForTimeout(1600)
  check('quote: double submit sends one request', requests === 1, `requests=${requests}`)
  const success = page.locator('#quote [role=status]')
  check('quote: success shown only after 200, names the reply number', (await success.count()) === 1 && (await success.textContent()).includes('+91 98765 43210'))
  check('quote: payload has all fields + honeypot + timing', captured && captured.phone === '+91 98765 43210' && captured.city === 'Noida' && captured.details === '5 pages with listings' && captured.website === '' && typeof captured.formLoadedAt === 'number', JSON.stringify(captured)?.slice(0, 160))
  await page.locator('#quote').screenshot({ path: `${OUT}/360-quote-success.png` })
  await page.locator('#quote button', { hasText: 'Send another request' }).click()
  check('quote: "Send another request" returns an empty form', (await form.locator('input[name=name]').inputValue()) === '')

  // C) Stubbed 500 → error, not success
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', (route) => route.fulfill({ status: 502, body: '{"ok":false}' }))
  await form.locator('input[name=name]').fill('Asha')
  await form.locator('input[name=phone]').fill('9876543210')
  await form.locator('input[name=city]').fill('Delhi')
  await form.locator('input[name=businessType]').fill('Clinic')
  await form.locator('select[name=requirement]').selectOption({ index: 1 })
  await page.waitForTimeout(2600)
  await submit.click()
  await page.waitForTimeout(800)
  check('quote: API 502 → error state, no success', (await errBox.count()) === 1 && (await page.locator('#quote [role=status]').count()) === 0)
  await ctx.close()
}

// ---------- 5. Every quote CTA leads to the form ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const quoteLinks = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /quote/i.test(a.textContent) && !a.href.includes('wa.me')).map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href') })))
  check('every non-WhatsApp "quote" CTA points to #quote', quoteLinks.length > 0 && quoteLinks.every((l) => l.href === '#quote'), quoteLinks.map((l) => `${l.text}→${l.href}`).join(', '))
  await ctx.close()
}

// ---------- 6. Keyboard ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const first = await page.evaluate(() => document.activeElement.textContent.trim())
  check('kbd: first Tab lands on "Skip to content"', first === 'Skip to content')
  let noOutline = []
  let reached = new Set()
  for (let i = 0; i < 160; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      const s = getComputedStyle(el)
      const label = (el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 30)
      const ring = s.boxShadow !== 'none'
      const outline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
      const hidden = el.classList.contains('sr-only') && !el.matches(':focus-within')
      return { label, visibleFocus: outline || ring, tag: el.tagName, type: el.type }
    })
    reached.add(info.label)
    if (info.tag !== 'BODY' && !info.visibleFocus && info.type !== 'radio') noOutline.push(info.label)
  }
  check('kbd: every focused control shows a focus indicator', noOutline.length === 0, [...new Set(noOutline)].join(' | '))
  check('kbd: key CTAs reachable by Tab', ['Get a Website Quote', 'Ask about this package', 'Enquire on WhatsApp', 'All', 'phone'].every((t) => [...reached].some((x) => x.includes(t))))

  // radio budget group reachable + selectable with keyboard
  await page.locator('#quote input[name=budget]').first().focus()
  await page.keyboard.press('ArrowRight')
  const picked = await page.evaluate(() => document.querySelector('#quote input[name=budget]:checked')?.value)
  check('kbd: budget options selectable with arrow keys', !!picked, picked)

  // modal
  await page.evaluate(() => document.getElementById('projects').scrollIntoView())
  await page.addStyleTag({ content: showAll })
  const opener = page.locator('#projects button').first()
  await opener.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(400)
  const dialog = await page.locator('[role=dialog]').count()
  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  const closed = (await page.locator('[role=dialog]').count()) === 0
  const restored = await page.evaluate(() => document.activeElement?.closest('#projects') !== null)
  check('kbd: project modal opens with Enter and closes with Escape', dialog === 1 && closed)
  check('kbd: focus returns to the project card after closing modal', restored)

  // mobile menu
  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.getByRole('button', { name: 'Open menu' }).focus()
  await page.keyboard.press('Enter')
  const expanded = await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  const escClosed = await page.getByRole('button', { name: 'Open menu' }).count()
  check('kbd: mobile menu toggles with Enter and reports aria-expanded', expanded === 'true')
  check('kbd: mobile menu closes with Escape', escClosed === 1)
  await ctx.close()
}

// ---------- 7. Contrast (computed per text element, both themes) ----------
for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.addInitScript((t) => { try { localStorage.setItem('portfolio-theme', t) } catch {} }, theme)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: showAll })
  await page.evaluate(() => document.querySelectorAll('#demo button').forEach((b) => b.textContent.includes('Enquire') && b.click()))
  const fails = await page.evaluate(() => {
    const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null }
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
    const blend = (fg, bg) => { const a = fg[3] ?? 1; return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)) }
    const bgOf = (el) => {
      const stack = []
      for (let n = el; n; n = n.parentElement) {
        const s = getComputedStyle(n)
        if (s.backgroundImage !== 'none' && s.backgroundImage.includes('gradient') && n !== document.body) return null // can't compute reliably
        const c = parse(s.backgroundColor)
        if (c && (c[3] ?? 1) > 0) { stack.push(c); if ((c[3] ?? 1) >= 1) break }
      }
      let base = [255, 255, 255]
      for (const c of stack.reverse()) base = blend(c, base)
      return base
    }
    const out = new Map()
    for (const el of document.querySelectorAll('body *')) {
      if (!el.checkVisibility?.() || el.closest('.sr-only, [aria-hidden="true"]')) continue
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue
      const s = getComputedStyle(el)
      const bg = bgOf(el)
      if (!bg) continue
      const fg = blend(parse(s.color), bg)
      const L1 = lum(fg), L2 = lum(bg)
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
      const size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 700
      const large = size >= 24 || (bold && size >= 18.66)
      const need = large ? 3 : 4.5
      if (ratio < need) {
        const key = `${ratio.toFixed(2)}:1 "${el.textContent.trim().slice(0, 28)}" (${size}px, need ${need})`
        out.set(key, true)
      }
    }
    return [...out.keys()]
  })
  check(`contrast [${theme}]: all text meets WCAG AA`, fails.length === 0, `${fails.length} issues: ` + fails.slice(0, 14).join(' | '))
  await ctx.close()
}

// ---------- 8. Metadata + performance ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage()
  await page.addInitScript(() => {
    window.__lcp = 0
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const meta = await page.evaluate(() => {
    const m = (sel) => document.querySelector(sel)?.getAttribute('content') ?? document.querySelector(sel)?.getAttribute('href')
    let ld = null
    try { ld = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent) } catch {}
    return {
      lang: document.documentElement.lang, title: document.title, desc: m('meta[name=description]'), canonical: m('link[rel=canonical]'),
      ogTitle: m('meta[property="og:title"]'), ogDesc: m('meta[property="og:description"]'), ogImage: m('meta[property="og:image"]'), ogUrl: m('meta[property="og:url"]'),
      tw: m('meta[name="twitter:card"]'), viewport: m('meta[name=viewport]'), ld: !!ld, h1s: document.querySelectorAll('h1').length, favicon: m('link[rel=icon]'),
    }
  })
  check('meta: <html lang>, viewport, single <h1>', meta.lang === 'en' && meta.viewport?.includes('width=device-width') && meta.h1s === 1, `lang=${meta.lang} h1=${meta.h1s}`)
  check('meta: title ≤ 60 chars', meta.title.length <= 60, `${meta.title.length}: ${meta.title}`)
  check('meta: description 70–160 chars', meta.desc.length >= 70 && meta.desc.length <= 160, `${meta.desc.length}`)
  check('meta: canonical/og:url are absolute live URL', meta.canonical === 'https://yashgoeldev.vercel.app/' && meta.ogUrl === meta.canonical)
  check('meta: og:title/description/image + twitter card present', !!(meta.ogTitle && meta.ogDesc && meta.ogImage?.startsWith('https://') && meta.tw))
  check('meta: JSON-LD parses', meta.ld)
  const og = await page.request.get(BASE + 'og-image.png')
  check('meta: og-image.png served locally', og.ok() && og.headers()['content-type'] === 'image/png')

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  const perf = await page.evaluate(() => {
    const res = performance.getEntriesByType('resource')
    const nav = performance.getEntriesByType('navigation')[0]
    const imgs = [...document.images].map((i) => ({ src: i.currentSrc.split('/').pop(), natural: `${i.naturalWidth}x${i.naturalHeight}`, shown: `${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}`, lazy: i.loading, bytes: res.find((r) => r.name === i.currentSrc)?.encodedBodySize ?? res.find((r) => r.name === i.currentSrc)?.transferSize }))
    const total = res.reduce((s, x) => s + (x.encodedBodySize || 0), 0) + (nav?.encodedBodySize || 0)
    return { lcp: Math.round(window.__lcp), dcl: Math.round(nav.domContentLoadedEventEnd), imgs, total, n: res.length }
  })
  r.push(`INFO         perf (local, no throttling): LCP ${perf.lcp}ms, DCL ${perf.dcl}ms, ${perf.n} requests, ~${Math.round(perf.total / 1024)} KB total`)
  for (const i of perf.imgs) check(`perf: image ${i.src} sized for display`, (i.bytes ?? 0) < 200 * 1024, `natural ${i.natural}, shown ${i.shown}, ${Math.round((i.bytes ?? 0) / 1024)} KB, loading=${i.lazy}`)
  await ctx.close()
}

await browser.close()
console.log(r.join('\n'))
