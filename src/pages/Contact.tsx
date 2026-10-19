import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { addressLines, company, mailtoHref, telHref, whatsappHref } from '../config/company'
import { EnquiryForm } from '../components/forms/EnquiryForm'
import { PageHero } from '../components/ui/PageHero'
import type { Route } from '../site/routes'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Al Shmookh Business Center, One UAQ, UAQ Free Trade Zone, Umm Al Quwain, UAE')}`

export default function Contact({ route }: { route: Route }) {
  const channels = [
    { icon: MessageCircle, label: 'WhatsApp', value: company.phoneDisplay, href: whatsappHref('Hello Bellvix,'), external: true },
    { icon: Phone, label: 'Phone', value: company.phoneDisplay, href: telHref() },
    { icon: Mail, label: 'Email', value: company.email, href: mailtoHref() },
  ]
  return (
    <>
      <PageHero crumbs={route.crumbs} eyebrow="Contact" title={route.h1} intro="Tell us what you need and we will reply with next steps. For a quick answer, message us on WhatsApp." />
      <section className="pb-24">
        <div className="site-wrap grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-panel p-5 hover:border-cyan/40"
              >
                <c.icon size={20} className="text-cyan" aria-hidden="true" />
                <span>
                  <span className="block text-xs tracking-[0.16em] text-faint uppercase">{c.label}</span>
                  <span className="block font-semibold">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="flex gap-4 rounded-xl border border-white/8 bg-panel p-5">
              <MapPin size={20} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
              <div>
                <span className="block text-xs tracking-[0.16em] text-faint uppercase">Address</span>
                <address className="mt-1 text-sm not-italic leading-relaxed text-ink/90">
                  {addressLines().map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-cyan hover:text-ink">
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-white/8 bg-panel p-5">
              <Clock size={20} className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
              <div>
                <span className="block text-xs tracking-[0.16em] text-faint uppercase">Hours</span>
                <p className="mt-1 text-sm text-ink/90">[Business hours to be confirmed] · Gulf Standard Time (UTC+4)</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/8 bg-panel p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Send an enquiry</h2>
              <p className="mt-2 mb-6 text-sm text-mute">Fields marked * are required.</p>
              <EnquiryForm form="contact" footnote={<>We use your details only to reply to your enquiry. See our <a href="/privacy" className="underline">privacy policy</a>.</>} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
