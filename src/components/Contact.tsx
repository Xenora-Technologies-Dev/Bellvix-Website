import { MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  addressLines,
  displayPhone,
  hasPhone,
  telHref,
  whatsappHref,
} from '../config/company'
import { ContactForm } from './ContactForm'
import { Reveal } from './Reveal'

export function Contact() {
  const phone = displayPhone()
  const wa = whatsappHref()

  return (
    <section id="contact" className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="site-wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Let’s build what’s next.</h2>
            <p className="mt-5 text-mute">
              Tell us what you’re working on. We’ll explore how technology, AI and
              digital growth can help move it forward.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                  Location
                </p>
                <p className="mt-3 flex gap-3 text-sm leading-relaxed text-ink/90">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                  <span>
                    {addressLines().map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              </div>

              {hasPhone ? (
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                    Contact
                  </p>
                  <div className="mt-3 space-y-2">
                    <a href={telHref()} className="flex items-center gap-3 text-sm text-ink hover:text-white">
                      <Phone size={18} className="text-cyan" aria-hidden="true" />
                      {phone}
                    </a>
                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-sm text-ink hover:text-white"
                      >
                        <MessageCircle size={18} className="text-cyan" aria-hidden="true" />
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>

        <Reveal className="border border-white/8 bg-panel p-6 sm:p-8 lg:col-span-7" delay={60}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
