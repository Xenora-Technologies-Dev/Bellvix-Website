import { useState } from 'react'
import { aiNote, editions, everyEditionIncludes, extensions, osFaqs, osModules, osSummary } from '../content/bellvixOs'
import { CtaBand } from '../components/sections/CtaBand'
import { EInvoicingTimeline } from '../components/sections/common'
import { OsAgeing, OsBuyingToCash, OsCashCycle, OsDashboard, OsDocument, OsEInvoicing, OsProfitSplit, type DocKind } from '../components/mockups/os'
import { WhatsAppChat } from '../components/mockups/WhatsAppChat'
import type { ChatMsg } from '../components/mockups/chats'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { Icon, IconTile } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Bullets, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

const tabs: { id: DocKind; label: string }[] = [
  { id: 'quotations', label: 'Quotations' },
  { id: 'purchase-orders', label: 'Purchase orders' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'accounts', label: 'Chart of accounts' },
]

const assistantChat: ChatMsg[] = [
  { from: 'me', text: 'Stock: basmati rice 10 kg', time: '10:12' },
  { from: 'bot', text: 'Basmati rice 10 kg\nIn stock: 340 bags\nPrice: AED 64.00\nReorder at: 120', time: '10:12' },
  { from: 'me', text: 'Balance: Demo Foods FZE', time: '10:13' },
  { from: 'bot', text: 'Demo Foods FZE\nOutstanding: AED 8,420\nOldest invoice: 21 days', time: '10:13', buttons: ['Send statement', 'Daily summary'] },
]

export default function OsOverview({ route }: { route: Route }) {
  const [tab, setTab] = useState<DocKind>('quotations')
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="The Company Operating System"
        title={route.h1}
        intro={`${osSummary} E-invoicing ready, with VAT return compliance and Corporate Tax calculation built in.`}
        actions={
          <>
            <Button href="#book-demo" arrow>
              Book a demo
            </Button>
            <Button href="/bellvix-os/editions" variant="secondary">
              Compare editions
            </Button>
          </>
        }
        aside={
          <div className="hero-device">
            <OsDashboard />
          </div>
        }
      />

      <Section border={false} id="modules" eyebrow="Modules" title="Everything your company runs on, connected." intro="Start with one module and add more as you grow. Data flows between them, so a quotation becomes an order, an invoice and a receipt without re-typing.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {osModules.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 60}>
              <article id={m.id} className="h-full scroll-mt-28 rounded-xl border border-white/8 bg-panel p-6">
                <IconTile name={m.icon} />
                <h3 className="mt-5 text-xl font-semibold">{m.name}</h3>
                <p className="mt-2 text-sm text-mute">{m.summary}</p>
                <Bullets items={m.features} className="mt-4" />
                {m.id === 'ai' ? <p className="mt-4 text-xs font-semibold text-cyan">{aiNote}</p> : null}
              </article>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center rounded-xl gradient-border p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Start small</p>
              <p className="mt-3 text-lg font-semibold">Begin with the ERP. Add CRM, HRMS, projects and AI when you need them.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Know your numbers" title="See the business, not just the books." intro="Bellvix OS turns daily transactions into plain-language views: what came in, what it cost, how long cash waits and who owes what.">
        <div className="space-y-5">
          <Reveal>
            <OsBuyingToCash />
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal>
              <OsProfitSplit />
            </Reveal>
            <Reveal delay={60}>
              <OsCashCycle />
            </Reveal>
            <Reveal delay={120}>
              <OsAgeing />
            </Reveal>
          </div>
          <p className="text-xs text-faint">All screens are shown with sample data.</p>
        </div>
      </Section>

      <Section id="erp-screens" eyebrow="ERP in action" title="From quotation to chart of accounts.">
        <div role="tablist" aria-label="Bellvix OS ERP screens" className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="erp-panel"
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${tab === t.id ? 'border-transparent bg-ink text-void' : 'border-white/12 text-mute hover:text-ink'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div id="erp-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          <OsDocument kind={tab} />
        </div>
      </Section>

      <Section id="editions" eyebrow="Editions" title="Lite, SaaS and Enterprise.">
        <div className="grid gap-4 lg:grid-cols-3">
          {editions.map((e) => (
            <article key={e.id} className={`flex h-full flex-col rounded-xl p-7 ${e.id === 'enterprise' ? 'gradient-border' : 'border border-white/8 bg-panel'}`}>
              <h3 className="text-xl font-bold">{e.name}</h3>
              <p className="mt-1 text-sm text-faint">{e.for}</p>
              <p className="mt-4 text-sm text-mute">{e.scope}</p>
              <Bullets items={e.points} className="mt-5 flex-1" />
              <a href={`/bellvix-os/editions#${e.id}`} className="mt-6 text-sm font-semibold text-cyan hover:text-ink">
                Edition details →
              </a>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-white/8 bg-panel p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Every edition includes</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {everyEditionIncludes.map((x) => (
              <li key={x.name} className="flex items-center gap-3 text-sm">
                <Icon name={x.icon} className="text-cyan" /> {x.name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="whatsapp-assistant" eyebrow="Extensions" title="WhatsApp Assistant, van sales, integrations and migration.">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {extensions.map((x) => (
              <div key={x.id} id={x.id === 'whatsapp-assistant' ? undefined : x.id} className="rounded-xl border border-white/8 bg-panel p-6">
                <IconTile name={x.icon} />
                <h3 className="mt-4 text-lg font-semibold">{x.name}</h3>
                <Bullets items={x.points} className="mt-3" />
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:col-span-5">
            <WhatsAppChat title="Bellvix OS Assistant" subtitle="Sample business · +971 50 000 0000" messages={assistantChat} ariaLabel="Example Bellvix OS WhatsApp Assistant conversation showing stock and a customer balance, with sample data" className="w-[280px]" />
          </div>
        </div>
      </Section>

      <Section id="compliance" eyebrow="UAE compliance" title="E-invoicing ready, VAT and Corporate Tax built in." intro="Bellvix OS is e-invoicing ready in every edition, and we connect it to the Accredited Service Provider you appoint.">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <OsEInvoicing />
          </div>
          <div className="lg:col-span-5">
            <EInvoicingTimeline compact />
          </div>
        </div>
      </Section>

      <FaqList faqs={osFaqs} title="Bellvix OS questions" />
      <CtaBand id="book-demo" form="demo" />
    </>
  )
}
