import { company, entityFacts } from '../config/company'
import { CtaBand } from '../components/sections/CtaBand'
import { WhyAndHow } from '../components/sections/common'
import { Button } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function About({ route }: { route: Route }) {
  return (
    <>
      <PageHero crumbs={route.crumbs} eyebrow="About" title={route.h1} intro={company.about} actions={<Button href="/contact" arrow>Talk to us</Button>} />
      <Section eyebrow="Vision & mission" title="Why we exist.">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl gradient-border p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Vision</p>
              <p className="mt-4 text-2xl font-bold leading-snug">{company.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-xl border border-white/8 bg-panel p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Mission</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{company.mission}</p>
            </div>
          </Reveal>
        </div>
      </Section>
      <WhyAndHow />
      <Section eyebrow="Delivery model" title="UAE headquarters, with an engineering team in India.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-panel p-7">
            <h3 className="text-lg font-semibold">UAE headquarters</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              {company.legalName} is registered at Al Shmookh Business Center, One UAQ, in the UAQ Free Trade Zone, and works with businesses across the UAE.
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-panel p-7">
            <h3 className="text-lg font-semibold">India: offshore development centre</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Our offshore development centre (ODC) team is based in India. It can work as a dedicated, Bellvix-managed team for your products, with the engagement model agreed mutually.
            </p>
            <a href="/services/technology-consulting/offshore-development-centre" className="mt-4 inline-block text-sm font-semibold text-cyan hover:text-ink">
              About our ODC →
            </a>
          </div>
        </div>
      </Section>
      <Section id="company-facts" eyebrow="Company facts" title="Bellvix at a glance.">
        <dl className="grid max-w-4xl gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-2">
          {entityFacts.map((f) => {
            const [k, ...v] = f.split(': ')
            return (
              <div key={k} className="bg-panel p-5">
                <dt className="text-xs font-semibold tracking-[0.16em] text-faint uppercase">{k}</dt>
                <dd className="mt-2 text-sm text-ink/90">{v.join(': ')}</dd>
              </div>
            )
          })}
        </dl>
      </Section>
      <CtaBand />
    </>
  )
}
