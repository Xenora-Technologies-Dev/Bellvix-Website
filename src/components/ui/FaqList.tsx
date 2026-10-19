import { ChevronDown } from 'lucide-react'
import type { Faq } from '../../content/types'
import { Section } from './Section'

/** Native <details> accordion: works without JS, answers are in the static HTML. */
export function FaqList({ faqs, title = 'Frequently asked questions', intro }: { faqs: Faq[]; title?: string; intro?: string }) {
  if (!faqs.length) return null
  return (
    <Section id="faq" eyebrow="FAQ" title={title} intro={intro}>
      <div className="max-w-4xl divide-y divide-white/8 border-y border-white/8">
        {faqs.map((f, i) => (
          <details key={f.q} className="faq group py-1" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left">
              <h3 className="text-base font-semibold tracking-tight sm:text-lg">{f.q}</h3>
              <ChevronDown size={20} className="mt-1 shrink-0 text-cyan transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="pb-5 pr-8 text-sm leading-relaxed text-mute sm:text-base">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
