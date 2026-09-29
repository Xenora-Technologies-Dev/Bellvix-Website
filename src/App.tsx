import { useEffect, useState } from 'react'
import { About } from './components/About'
import { AISection } from './components/AISection'
import { Approach } from './components/Approach'
import { Capabilities } from './components/Capabilities'
import { CapabilityStrip } from './components/CapabilityStrip'
import { Contact } from './components/Contact'
import { CTA } from './components/CTA'
import { DigitalSection } from './components/DigitalSection'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Outcomes } from './components/Outcomes'
import { PrivacyPage } from './components/PrivacyPage'
import { Seo } from './components/Seo'
import { Services } from './components/Services'
import { TermsPage } from './components/TermsPage'
import { WhyBellvix } from './components/WhyBellvix'

type LegalPage = 'privacy' | 'terms' | null

function currentLegal(): LegalPage {
  const hash = window.location.hash.replace('#', '')
  if (hash === 'privacy') return 'privacy'
  if (hash === 'terms') return 'terms'
  return null
}

export default function App() {
  const [legal, setLegal] = useState<LegalPage>(() =>
    typeof window === 'undefined' ? null : currentLegal(),
  )

  useEffect(() => {
    const apply = () => setLegal(currentLegal())
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  useEffect(() => {
    if (legal) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = window.location.hash.replace('#', '')
    if (!id || id === 'privacy' || id === 'terms') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const move = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(move, 30)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [legal])

  return (
    <>
      <Seo />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="noise" aria-hidden="true" />
      <Navbar />
      {legal === 'privacy' ? (
        <PrivacyPage />
      ) : legal === 'terms' ? (
        <TermsPage />
      ) : (
        <main id="main">
          <Hero />
          <CapabilityStrip />
          <About />
          <Services />
          <AISection />
          <DigitalSection />
          <WhyBellvix />
          <Approach />
          <Capabilities />
          <Outcomes />
          <CTA />
          <Faq />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
