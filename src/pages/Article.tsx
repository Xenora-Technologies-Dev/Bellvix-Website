import { aspPositioning, einvoicingSources } from '../content/einvoicing'
import { article } from '../content/insights'
import { CtaBand } from '../components/sections/CtaBand'
import { EInvoicingTimeline } from '../components/sections/common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { FaqList } from '../components/ui/FaqList'
import type { Route } from '../site/routes'

export default function Article({ route }: { route: Route }) {
  return (
    <>
      <article className="pb-10 pt-28 lg:pt-36">
        <div className="site-wrap max-w-3xl">
          <Breadcrumbs crumbs={route.crumbs} />
          <p className="eyebrow mt-8">Guide · UAE e-invoicing</p>
          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.06] sm:text-5xl">{article.h1}</h1>
          <p className="mt-5 text-sm text-faint">
            By {article.author} · Published <time dateTime={article.published}>19 October 2026</time> · {article.readMinutes} min read
          </p>
          <div className="prose-bx mt-10">
            <p className="text-lg text-ink/90">{article.lead}</p>

            <h2>The key dates</h2>
            <p>The UAE is introducing e-invoicing in phases, based on revenue and entity type:</p>
            <ul>
              <li>
                <strong>Revenue of AED 50 million or more:</strong> appoint an Accredited Service Provider (ASP) by <strong>30 October 2026</strong>. E-invoicing becomes mandatory from <strong>1 January 2027</strong>.
              </li>
              <li>
                <strong>Revenue below AED 50 million:</strong> appoint an ASP by <strong>31 March 2027</strong>. E-invoicing becomes mandatory from <strong>1 July 2027</strong>.
              </li>
              <li>
                <strong>Government entities:</strong> e-invoicing becomes mandatory from <strong>1 October 2027</strong>.
              </li>
              <li>
                <strong>Pilot:</strong> the e-invoicing pilot started on <strong>1 July 2026</strong>.
              </li>
            </ul>
          </div>
        </div>
        <div className="site-wrap mt-8 max-w-5xl">
          <EInvoicingTimeline />
        </div>
        <div className="site-wrap max-w-3xl">
          <div className="prose-bx mt-10">
            <h2>What an Accredited Service Provider does</h2>
            <p>
              Each phase starts with a deadline to appoint an Accredited Service Provider (ASP). Your ERP or billing system then has to be connected to that provider, so choosing it early leaves time to integrate and test.
            </p>
            <p>{aspPositioning}</p>

            <h2>What to do now</h2>
            <ol>
              <li>
                <strong>Confirm your phase.</strong> Check whether your revenue puts you in the AED 50 million or more group, or below it.
              </li>
              <li>
                <strong>Appoint an Accredited Service Provider</strong> before your deadline: 30 October 2026 or 31 March 2027.
              </li>
              <li>
                <strong>Review your system.</strong> Can your ERP or billing software produce the required invoice data and connect to your ASP?
              </li>
              <li>
                <strong>Clean up your data.</strong> Customer and supplier records, tax registration numbers and item tax categories should be complete and correct.
              </li>
              <li>
                <strong>Test end to end</strong> well before your mandatory date, so there is time to fix issues.
              </li>
            </ol>

            <h2>How Bellvix can help</h2>
            <p>
              We run e-invoicing readiness reviews, clean up invoice data and connect your existing ERP or billing system to the ASP you appoint, then test the full flow. If your current software cannot support e-invoicing, <a href="/bellvix-os">Bellvix OS</a> is e-invoicing ready in every edition and includes VAT return compliance and Corporate Tax calculation. See our{' '}
              <a href="/services/business-systems/uae-e-invoicing-integration">UAE e-invoicing integration service</a>.
            </p>

            <h2>Sources</h2>
            <ul>
              {einvoicingSources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="text-sm text-faint">
              This guide is general information, not tax or legal advice. Confirm your obligations with the UAE Ministry of Finance or your tax adviser.
            </p>
          </div>
        </div>
      </article>
      <FaqList faqs={article.faqs} title="E-invoicing questions" />
      <CtaBand title="Get your system e-invoicing ready." defaultTopic="UAE e-invoicing" />
    </>
  )
}
