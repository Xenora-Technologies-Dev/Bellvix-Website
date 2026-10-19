import { Check, Minus } from 'lucide-react'
import { comparison, editions, everyEditionIncludes } from '../content/bellvixOs'
import { CtaBand } from '../components/sections/CtaBand'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { Icon } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { Bullets, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-1 text-cyan">
        <Check size={16} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    )
  if (v === false)
    return (
      <span className="text-faint">
        <Minus size={16} aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    )
  return <span className="text-xs text-mute">{v}</span>
}

export default function OsEditions({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Bellvix OS"
        title={route.h1}
        intro="Three ways to run Bellvix OS. Every edition is e-invoicing ready, with VAT return compliance, Corporate Tax calculation, workflows, integrations and migration support. Pricing is shared on request."
        actions={
          <>
            <Button href="#book-demo" arrow>
              Book a demo
            </Button>
            <Button href="/bellvix-os" variant="secondary">
              Bellvix OS overview
            </Button>
          </>
        }
      />
      <Section border={false}>
        <div className="grid gap-4 lg:grid-cols-3">
          {editions.map((e) => (
            <article id={e.id} key={e.id} className={`scroll-mt-28 rounded-xl p-7 ${e.id === 'enterprise' ? 'gradient-border' : 'border border-white/8 bg-panel'}`}>
              <h2 className="text-2xl font-bold">{e.name}</h2>
              <p className="mt-1 text-sm text-faint">For {e.for}</p>
              <p className="mt-4 text-mute">{e.scope}</p>
              <Bullets items={e.points} className="mt-5" />
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Compare" title="Edition comparison">
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Bellvix OS edition comparison</caption>
            <thead className="bg-panel">
              <tr>
                <th scope="col" className="p-4 font-semibold">Feature</th>
                {editions.map((e) => (
                  <th key={e.id} scope="col" className="p-4 font-semibold">
                    {e.name.replace('Bellvix OS ', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-t border-white/6">
                  <th scope="row" className="p-4 font-normal text-ink/90">
                    {row.feature}
                  </th>
                  <td className="p-4"><Cell v={row.lite} /></td>
                  <td className="p-4"><Cell v={row.saas} /></td>
                  <td className="p-4"><Cell v={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-faint">“Ask us” means the option depends on your setup. “Extension” means it is added to any edition.</p>
      </Section>
      <Section eyebrow="Every edition" title="Included as standard.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {everyEditionIncludes.map((x) => (
            <li key={x.name} className="flex items-center gap-3 rounded-xl border border-white/8 bg-panel p-5 text-sm">
              <Icon name={x.icon} className="text-cyan" /> {x.name}
            </li>
          ))}
        </ul>
      </Section>
      <FaqList faqs={route.faqs ?? []} title="Which edition is right for me?" />
      <CtaBand id="book-demo" form="demo" />
    </>
  )
}
