import { company } from '../config/company'
import { osModules, editions } from '../content/bellvixOs'
import { homeFaqs } from '../content/faqs'
import { CtaBand } from '../components/sections/CtaBand'
import { CaseStudyCards, EInvoicingTimeline, IndustriesGrid, PillarsGrid, WhyAndHow } from '../components/sections/common'
import { OsBuyingToCash, OsDashboard } from '../components/mockups/os'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'

const strip = ['IT consulting', 'Custom software', 'Mobile apps', 'AI agents', 'WhatsApp chatbots', 'Bellvix OS', 'UAE e-invoicing', 'Websites & e-commerce', 'Branding & marketing']

export default function Home() {
  return (
    <>
      <section id="home" className="relative overflow-hidden pt-28 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[110px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-lime/8 blur-[110px]" aria-hidden="true" />
        <div className="site-wrap relative grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          <div className="hero-copy lg:col-span-6">
            <p className="eyebrow">IT · Software · AI · Digital · UAE</p>
            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.0] sm:text-6xl lg:text-[4.3rem]">
              Building <span className="gradient-text">smarter businesses</span> for a changing world.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              {company.name} is a UAE technology partner. We consult, engineer software and AI, automate on WhatsApp, get you ready for
              e-invoicing, and run the whole company on Bellvix OS.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" arrow>
                Talk to us
              </Button>
              <Button href="/bellvix-os" variant="secondary">
                Explore Bellvix OS
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="hero-device">
              <OsDashboard />
            </div>
            <p className="mt-3 text-center text-xs text-faint">Bellvix OS dashboard, shown with sample data.</p>
          </div>
        </div>
        <div className="border-y border-white/6 bg-panel/40">
          <ul className="site-wrap flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-xs font-semibold tracking-[0.16em] text-faint uppercase">
            {strip.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <Section eyebrow="What we do" title="Eight ways we help businesses move forward." intro={company.about} border={false}>
        <PillarsGrid />
        <div className="mt-8">
          <Button href="/services" variant="secondary" arrow>
            All services
          </Button>
        </div>
      </Section>

      <Section eyebrow="Bellvix OS" title={<>The company operating system, <span className="gradient-text">ready for UAE compliance.</span></>} intro="One connected platform for your entire company. Use the full suite, or start with one module and add more as you grow.">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <ul className="grid gap-3 sm:grid-cols-2">
              {osModules.map((m) => (
                <li key={m.id}>
                  <a href={`/bellvix-os#${m.id}`} className="flex h-full items-start gap-3 rounded-lg border border-white/8 bg-panel p-4 hover:border-cyan/40">
                    <Icon name={m.icon} className="mt-0.5 text-cyan" />
                    <span>
                      <span className="block text-sm font-semibold">{m.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-mute">{m.summary}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-mute">
              Editions: {editions.map((e) => e.name.replace('Bellvix OS ', '')).join(' · ')}. Every edition is e-invoicing ready, with VAT return compliance and Corporate Tax calculation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/bellvix-os#book-demo" arrow>
                Book a demo
              </Button>
              <Button href="/bellvix-os/editions" variant="secondary">
                Compare editions
              </Button>
            </div>
          </div>
          <Reveal className="lg:col-span-7">
            <OsBuyingToCash />
          </Reveal>
        </div>
      </Section>

      <Section id="e-invoicing" eyebrow="UAE e-invoicing" title="E-invoicing becomes mandatory in phases from 1 January 2027." intro="Bellvix makes your ERP or billing system e-invoicing ready and connects it to your Accredited Service Provider, so you comply on time.">
        <EInvoicingTimeline />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/services/business-systems/uae-e-invoicing-integration" arrow>
            E-invoicing integration
          </Button>
          <Button href="/insights/uae-e-invoicing-guide" variant="secondary">
            Read the 2027 guide
          </Button>
        </div>
      </Section>

      <Section eyebrow="Case studies" title="Systems we have designed and built." intro="Client details stay private. The products and what they do are real.">
        <CaseStudyCards />
      </Section>

      <Section eyebrow="Industries" title="Built for how UAE businesses work.">
        <IndustriesGrid />
      </Section>

      <WhyAndHow />

      <FaqList faqs={homeFaqs} intro="Short answers about Bellvix, Bellvix OS and how we work." />
      <CtaBand />
    </>
  )
}
