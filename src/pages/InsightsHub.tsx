import { article } from '../content/insights'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function InsightsHub({ route }: { route: Route }) {
  return (
    <>
      <PageHero crumbs={route.crumbs} eyebrow="Insights" title={route.h1} intro="Practical guides from the Bellvix Team on UAE compliance, ERP, automation and digital growth." />
      <Section border={false}>
        <ul className="grid gap-5 lg:grid-cols-2">
          <li>
            <a href={`/insights/${article.slug}`} className="service-card block h-full rounded-xl border border-white/8 bg-panel p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Guide · {article.readMinutes} min read</p>
              <h2 className="mt-4 text-2xl font-bold">{article.h1}</h2>
              <p className="mt-3 text-sm text-mute">{article.description}</p>
              <p className="mt-5 text-xs text-faint">
                By {article.author} · <time dateTime={article.published}>19 October 2026</time>
              </p>
            </a>
          </li>
        </ul>
      </Section>
      <CtaBand />
    </>
  )
}
