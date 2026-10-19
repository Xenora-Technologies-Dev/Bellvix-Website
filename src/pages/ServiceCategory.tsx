import { caseStudyBySlug } from '../content/caseStudies'
import { categoryBySlug } from '../content/services'
import { CtaBand } from '../components/sections/CtaBand'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { IconTile } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Bullets, Chips, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

const topicFor: Record<string, string> = {
  'technology-consulting': 'Technology & consulting',
  'software-development': 'Software & mobile apps',
  'ai-automation': 'AI & automation',
  'business-systems': 'UAE e-invoicing',
  'web-commerce': 'Website & e-commerce',
  'brand-marketing': 'Brand & digital marketing',
  engineering: 'Engineering & industrial',
}

export default function ServiceCategory({ route }: { route: Route }) {
  const c = categoryBySlug(route.slug ?? '')
  if (!c) return null
  const cs = c.caseStudy ? caseStudyBySlug(c.caseStudy) : undefined
  const minimal = c.slug === 'engineering'
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow={`${c.number} · ${c.name}`}
        title={c.h1}
        intro={c.intro}
        actions={
          <>
            <Button href="#enquire" arrow>
              Discuss your project
            </Button>
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </>
        }
      />
      <Section border={false} eyebrow="What we offer" title={minimal ? undefined : `${c.name} services`}>
        <div className="grid gap-5 md:grid-cols-2">
          {c.subservices.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 70}>
              <article id={s.id} className="h-full scroll-mt-28 rounded-xl border border-white/8 bg-panel p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, '0')}</span>
                  {s.href ? <IconTile name={c.icon} /> : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.summary}</p>
                {s.bullets ? <Bullets items={s.bullets} className="mt-5" /> : null}
                {s.href ? (
                  <a href={s.href} className="mt-6 inline-block text-sm font-semibold text-cyan hover:text-ink">
                    {s.name} in detail →
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      {c.deliverables.length ? (
        <Section eyebrow="Deliverables" title="What you get.">
          <div className="grid gap-8 lg:grid-cols-2">
            <Bullets items={c.deliverables} />
            {c.tech.length ? (
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-faint uppercase">Technologies and platforms</p>
                <Chips items={c.tech} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}
      {cs ? (
        <Section eyebrow="Related case study" title={cs.name}>
          <a href={`/case-studies/${cs.slug}`} className="service-card block max-w-3xl rounded-xl border border-white/8 bg-panel p-7">
            <p className="text-sm text-faint">{cs.client}</p>
            <p className="mt-3 text-mute">{cs.summary}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-cyan">Read the case study →</span>
          </a>
        </Section>
      ) : null}
      <Section eyebrow="Related" title={minimal ? 'Explore more' : 'Keep exploring'}>
        <ul className="flex flex-wrap gap-3">
          {c.related.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-block rounded-md border border-white/12 px-4 py-2.5 text-sm font-semibold hover:border-cyan/50">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <FaqList faqs={c.faqs} />
      <CtaBand defaultTopic={topicFor[c.slug]} />
    </>
  )
}
