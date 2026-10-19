import { categories } from '../content/services'
import { CtaBand } from '../components/sections/CtaBand'
import { Steps } from '../components/sections/common'
import { howWeWork } from '../content/company'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { IconTile } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { homeFaqs } from '../content/faqs'
import type { Route } from '../site/routes'

export default function ServicesHub({ route }: { route: Route }) {
  const main = categories.filter((c) => c.slug !== 'engineering')
  const eng = categories.find((c) => c.slug === 'engineering')
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Services"
        title={route.h1}
        intro="Eight pillars, one team: from IT strategy and software to AI, compliance, websites and brand. Pick one service or combine them."
        actions={<Button href="/contact" arrow>Talk to us</Button>}
      />
      <Section border={false}>
        <div className="grid gap-5 lg:grid-cols-2">
          {main.slice(0, 3).map((c) => (
            <CategoryCard key={c.slug} slug={c.slug} />
          ))}
          <Reveal>
            <a href="/bellvix-os" className="gradient-border service-card flex h-full flex-col rounded-xl p-7">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.16em] text-faint">04</span>
                <IconTile name="layers" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Bellvix OS</h2>
              <p className="mt-2 text-mute">The company operating system: ERP, CRM, HRMS, project management and AI in one platform, e-invoicing ready.</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs text-mute">
                {['ERP', 'CRM', 'HRMS', 'Project Management', 'AI', 'WhatsApp Assistant', 'Van sales'].map((t) => (
                  <li key={t} className="rounded-full border border-white/10 px-2.5 py-1">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-6 text-sm font-semibold text-cyan">Explore Bellvix OS →</span>
            </a>
          </Reveal>
          {main.slice(3).map((c) => (
            <CategoryCard key={c.slug} slug={c.slug} />
          ))}
          {eng ? <CategoryCard slug={eng.slug} /> : null}
        </div>
      </Section>
      <Section eyebrow="Process" title="How every engagement runs.">
        <Steps steps={howWeWork} />
      </Section>
      <FaqList faqs={homeFaqs.slice(0, 5)} />
      <CtaBand />
    </>
  )
}

function CategoryCard({ slug }: { slug: string }) {
  const c = categories.find((x) => x.slug === slug)
  if (!c) return null
  return (
    <Reveal>
      <article className="flex h-full flex-col rounded-xl border border-white/8 bg-panel p-7">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tracking-[0.16em] text-faint">{c.number}</span>
          <IconTile name={c.icon} />
        </div>
        <h2 className="mt-5 text-2xl font-bold">
          <a href={`/services/${c.slug}`} className="hover:text-cyan">
            {c.name}
          </a>
        </h2>
        <p className="mt-2 text-mute">{c.short}</p>
        <ul className="mt-5 flex-1 space-y-1.5">
          {c.subservices.map((s) => (
            <li key={s.id}>
              <a href={s.href ?? `/services/${c.slug}#${s.id}`} className="text-sm text-ink/80 hover:text-cyan">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <a href={`/services/${c.slug}`} className="mt-6 text-sm font-semibold text-cyan hover:text-ink">
          {c.name} →
        </a>
      </article>
    </Reveal>
  )
}
