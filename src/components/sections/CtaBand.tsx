import { Mail, MessageCircle, Phone } from 'lucide-react'
import { company, mailtoHref, telHref, whatsappHref } from '../../config/company'
import { EnquiryForm } from '../forms/EnquiryForm'
import { Reveal } from '../ui/Reveal'

type Props = {
  id?: string
  form?: 'contact' | 'demo'
  title?: string
  intro?: string
  defaultTopic?: string
}

/** Enquiry band used at the bottom of most pages: short copy + direct channels + form. */
export function CtaBand({ id = 'enquire', form = 'contact', title, intro, defaultTopic }: Props) {
  const isDemo = form === 'demo'
  return (
    <section id={id} className="relative border-t border-white/6 py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-lime/6 blur-[110px]" aria-hidden="true" />
      <div className="site-wrap relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{isDemo ? 'Book a demo' : 'Talk to us'}</p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            {title ?? (isDemo ? 'See Bellvix OS with your own workflows.' : 'Tell us what you are building.')}
          </h2>
          <p className="mt-5 text-mute">
            {intro ??
              (isDemo
                ? 'Book a walkthrough of Bellvix OS. We will show the modules that matter to you and recommend an edition.'
                : 'Share a few details and we will come back with next steps. Prefer to chat? Message us on WhatsApp.')}
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>
              <a href={whatsappHref(isDemo ? 'Hello Bellvix, I would like a Bellvix OS demo.' : 'Hello Bellvix,')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-ink/90 hover:text-ink">
                <MessageCircle size={16} className="text-cyan" aria-hidden="true" /> WhatsApp {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={telHref()} className="inline-flex items-center gap-3 text-ink/90 hover:text-ink">
                <Phone size={16} className="text-cyan" aria-hidden="true" /> {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailtoHref(isDemo ? 'Bellvix OS demo' : undefined)} className="inline-flex items-center gap-3 text-ink/90 hover:text-ink">
                <Mail size={16} className="text-cyan" aria-hidden="true" /> {company.email}
              </a>
            </li>
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={80}>
          <div className="rounded-xl border border-white/8 bg-panel p-6 sm:p-8">
            <EnquiryForm form={form} defaultTopic={defaultTopic} footnote={<>By sending this form you agree to our <a href="/privacy" className="underline hover:text-mute">privacy policy</a>. We only use your details to reply to your enquiry.</>} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
