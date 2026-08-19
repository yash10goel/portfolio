import { ThemeProvider } from '@/hooks/useTheme'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Home } from '@/pages/Home'

function App() {
  return (
    <ThemeProvider>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <WhatsAppButton />
    </ThemeProvider>
  )
}

export default App
