import type { ReactNode } from 'react'
import { company } from '../config/company'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import type { Route } from '../site/routes'

const updated = '19 October 2026'

function Shell({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <article className="pb-24 pt-28 lg:pt-36">
      <div className="site-wrap max-w-3xl">
        <Breadcrumbs crumbs={route.crumbs} />
        <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">{route.h1}</h1>
        <p className="mt-4 text-sm text-faint">Last updated {updated}</p>
        <div className="prose-bx mt-10">{children}</div>
      </div>
    </article>
  )
}

export function Privacy({ route }: { route: Route }) {
  return (
    <Shell route={route}>
      <p>
        This policy explains how {company.legalName} (“Bellvix”, “we”) handles information collected through bellvix.com. Questions can be sent to <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Enquiry and demo forms:</strong> the name, email, company, phone number and message you choose to send.</li>
        <li><strong>WhatsApp, phone and email:</strong> whatever you share with us when you contact us directly.</li>
        <li><strong>Website usage:</strong> aggregated, cookieless statistics such as page views and referrers. We do not use advertising or tracking cookies.</li>
        <li><strong>Server logs:</strong> our hosting provider processes technical data such as IP address and browser type to deliver and secure the site.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide the information or services you ask for.</li>
        <li>To understand, in aggregate, how the website is used and improve it.</li>
        <li>To keep the website secure and prevent spam.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Service providers</h2>
      <p>The website is hosted on Netlify, which also receives form submissions on our behalf. WhatsApp conversations are handled by WhatsApp under its own terms. These providers may process data outside the UAE.</p>
      <h2>Retention</h2>
      <p>We keep enquiry information for as long as needed to respond and to maintain our business records, then delete it.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete the personal information we hold about you by emailing <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
      <h2>Changes</h2>
      <p>We may update this policy. The “last updated” date above shows the latest version.</p>
      <h2>Contact</h2>
      <p>
        {company.legalName}, {company.address.line1}, {company.address.line2}, {company.address.line3}, {company.address.country}. Email <a href={`mailto:${company.email}`}>{company.email}</a> · Phone {company.phoneDisplay}.
      </p>
    </Shell>
  )
}

export function Terms({ route }: { route: Route }) {
  return (
    <Shell route={route}>
      <p>
        These terms apply to your use of bellvix.com, operated by {company.legalName}. By using the website you agree to them.
      </p>
      <h2>Website content</h2>
      <p>Content on this website is for general information. It is not professional, tax or legal advice. Product screens are illustrations shown with sample data.</p>
      <h2>Intellectual property</h2>
      <p>The Bellvix name, logo, Bellvix OS and website content belong to {company.legalName} unless stated otherwise. You may not copy or reuse them without our written permission.</p>
      <h2>Services</h2>
      <p>Any services or software we provide are governed by a separate written agreement with you. Nothing on this website is an offer that becomes binding without such an agreement.</p>
      <h2>Links</h2>
      <p>We are not responsible for the content of external websites we link to.</p>
      <h2>Liability</h2>
      <p>We work to keep the website accurate and available but do not guarantee it is error-free or uninterrupted. To the extent permitted by law, we are not liable for losses arising from use of the website.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </Shell>
  )
}
