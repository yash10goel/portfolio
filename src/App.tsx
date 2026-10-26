import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/hooks/useTheme'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Home } from '@/pages/Home'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'

// No client-side router: the only other page is /privacy-policy, which Vercel serves
// via the rewrite in vercel.json, so a pathname check on load is enough.
const isPrivacyPolicy = window.location.pathname.replace(/\/+$/, '') === '/privacy-policy'

function App() {
  return (
    <ThemeProvider>
      <a
        href={isPrivacyPolicy ? '#privacy' : '#home'}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      {isPrivacyPolicy ? (
        <>
          <PrivacyPolicy />
          <Footer linkBase="/" />
        </>
      ) : (
        <>
          <Navbar />
          <main>
            <Home />
          </main>
          <Footer />
          <WhatsAppButton />
        </>
      )}
      {/* Vercel Web Analytics: page views only (no custom events). Requires Analytics enabled for the project in Vercel. */}
      <Analytics />
    </ThemeProvider>
  )
}

export default App
