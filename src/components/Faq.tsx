import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faqs'
import { Reveal } from './Reveal'

export function Faq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="site-wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.6rem]">
              Answers for teams ready to move forward.
            </h2>
            <p className="mt-5 max-w-md text-mute">
              Common questions about Bellvix services, AI, software, and how we
              work with businesses from the UAE.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="divide-y divide-white/8 border-y border-white/8">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-button-${index}`

              return (
                <Reveal key={item.question} delay={index * 50}>
                  <div className="py-1">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-white"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        <span className="text-base font-semibold tracking-tight sm:text-lg">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`mt-1 shrink-0 text-cyan transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="pb-5 pr-8"
                    >
                      <p className="text-sm leading-relaxed text-mute sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
