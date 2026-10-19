import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '../../content/caseStudies'
import { aspPositioning, einvoicingMilestones, einvoicingSources } from '../../content/einvoicing'
import { industries } from '../../content/industries'
import { pillars } from '../../content/services'
import { Icon, IconTile } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { Section, Bullets } from '../ui/Section'
import { Button } from '../ui/Button'
import { howWeWork, whyBellvix } from '../../content/company'

export function PillarsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((p, i) => (
        <Reveal key={p.href} delay={(i % 4) * 60}>
          <a
            href={p.href}
            className={`service-card group flex h-full flex-col rounded-xl border p-6 ${p.featured ? 'gradient-border' : 'border-white/8 bg-panel'}`}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs tracking-[0.16em] text-faint">{p.number}</span>
              <IconTile name={p.icon} />
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.short}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink/90 group-hover:text-cyan">
              {p.featured ? 'Explore Bellvix OS' : 'Learn more'} <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

export function EInvoicingTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <ol className={`grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {einvoicingMilestones.map((m, i) => (
          <Reveal key={m.iso} delay={i * 50}>
            <li className="h-full rounded-xl border border-white/8 bg-panel p-5">
              <time dateTime={m.iso} className="font-mono text-sm font-bold text-cyan">
                {m.date}
              </time>
              <p className="mt-2 text-sm font-semibold">{m.who}</p>
              <p className="mt-1 text-sm text-mute">{m.what}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <p className="mt-5 text-xs leading-relaxed text-faint">
        Sources: {einvoicingSources.join('; ')}. {aspPositioning}
      </p>
    </div>
  )
}

export function CaseStudyCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {caseStudies.map((c, i) => (
        <Reveal key={c.slug} delay={i * 80}>
          <a href={`/case-studies/${c.slug}`} className="service-card group flex h-full flex-col rounded-xl border border-white/8 bg-panel p-7">
            <ul className="flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.7rem] text-mute">
                  {t}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-2xl font-bold">{c.name}</h3>
            <p className="mt-1 text-sm text-faint">{c.client}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">{c.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-cyan">
              Read the case study <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

export function IndustriesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className={`grid gap-4 ${detailed ? 'lg:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-5'}`}>
      {industries.map((ind, i) => (
        <Reveal key={ind.id} delay={(i % 5) * 50}>
          {detailed ? (
            <article id={ind.id} className="grid gap-6 rounded-xl border border-white/8 bg-panel p-7 md:grid-cols-12">
              <div className="md:col-span-5">
                <IconTile name={ind.icon} />
                <h2 className="mt-5 text-2xl font-bold">{ind.name}</h2>
                <p className="mt-3 text-mute">{ind.summary}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">What we build</p>
                <Bullets items={ind.needs} className="mt-4" />
              </div>
              <div className="md:col-span-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Related</p>
                <ul className="mt-4 space-y-2">
                  {ind.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-sm font-semibold text-cyan hover:text-ink">
                        {l.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ) : (
            <a href={`/industries#${ind.id}`} className="service-card flex h-full flex-col rounded-xl border border-white/8 bg-panel p-5">
              <Icon name={ind.icon} className="text-cyan" size={20} />
              <h3 className="mt-4 text-base font-semibold">{ind.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{ind.summary}</p>
            </a>
          )}
        </Reveal>
      ))}
    </div>
  )
}

export function WhyAndHow() {
  return (
    <>
      <Section eyebrow="Why Bellvix" title="A technology partner that stays with the business.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyBellvix.map((w, i) => (
            <Reveal key={w.name} delay={i * 60}>
              <div className="h-full rounded-xl border border-white/8 bg-panel p-6">
                <span className="slash" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{w.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="How we work" title="Discover, strategize, build, evolve.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <li className="h-full border-t border-white/12 pt-6">
                <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  )
}

export function OsCtaButtons() {
  return (
    <>
      <Button href="/bellvix-os#book-demo" arrow>
        Book a demo
      </Button>
      <Button href="/bellvix-os/editions" variant="secondary">
        Compare editions
      </Button>
    </>
  )
}

export function Steps({ steps }: { steps: { name: string; text: string }[] }) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 ${steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
      {steps.map((s, i) => (
        <Reveal key={s.name} delay={i * 50}>
          <li className="h-full rounded-xl border border-white/8 bg-panel p-5">
            <span className="font-mono text-sm text-cyan">0{i + 1}</span>
            <h3 className="mt-3 text-base font-semibold">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}
