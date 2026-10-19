import { aspPositioning } from '../content/einvoicing'
import { einvoicingFaqs, einvoicingSteps } from '../content/detailPages'
import { CtaBand } from '../components/sections/CtaBand'
import { EInvoicingTimeline, Steps } from '../components/sections/common'
import { OsEInvoicing } from '../components/mockups/os'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { PageHero } from '../components/ui/PageHero'
import { Bullets, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function EInvoicing({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="UAE e-invoicing"
        title={route.h1}
        intro="UAE e-invoicing becomes mandatory in phases from 1 January 2027. We review your system, clean up your data, connect it to the Accredited Service Provider you appoint and test it end to end before your deadline."
        actions={
          <>
            <Button href="#enquire" arrow>
              Book a readiness review
            </Button>
            <Button href="/insights/uae-e-invoicing-guide" variant="secondary">
              Read the 2027 guide
            </Button>
          </>
        }
      />
      <Section border={false} eyebrow="Key dates" title="Who must comply, and when.">
        <EInvoicingTimeline />
      </Section>
      <Section eyebrow="How we help" title="Five steps to e-invoicing readiness.">
        <Steps steps={einvoicingSteps} />
        <p className="mt-8 max-w-3xl rounded-xl border border-white/8 bg-panel p-5 text-sm text-mute">{aspPositioning}</p>
      </Section>
      <Section eyebrow="Works with" title="Your current system, or Bellvix OS.">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Bullets
              items={[
                'Existing ERP and accounting systems, including Zoho, Odoo and SAP',
                'Custom billing and invoicing software',
                'Bellvix OS, which is e-invoicing ready in every edition',
                'Data moved from spreadsheets or legacy tools with database migration',
              ]}
            />
            <div className="mt-6">
              <Button href="/bellvix-os" variant="secondary" arrow>
                Explore Bellvix OS
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <OsEInvoicing />
          </div>
        </div>
      </Section>
      <FaqList faqs={einvoicingFaqs} />
      <CtaBand title="Get ready before your deadline." defaultTopic="UAE e-invoicing" />
    </>
  )
}
