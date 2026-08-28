import { approachSteps } from '../data/content'
import { Reveal } from './Reveal'

export function Approach() {
  return (
    <section id="approach" className="relative border-t border-white/6 bg-panel py-24 lg:py-32">
      <div className="site-wrap">
        <Reveal>
          <p className="eyebrow">Our Approach</p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">From challenge to solution.</h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-0 md:grid-cols-4">
          <span
            className="pointer-events-none absolute left-5 top-3 hidden h-px bg-gradient-to-r from-cyan via-white/20 to-lime md:left-[12.5%] md:right-[12.5%] md:top-7 md:block"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-cyan via-white/20 to-lime md:hidden"
            aria-hidden="true"
          />
          {approachSteps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 90} className="h-full px-4 py-6 md:px-6 md:py-0">
                <div className="flex items-start gap-4 md:block">
                  <span className="relative z-10 mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-void font-mono text-xs text-cyan md:mx-auto md:mb-6">
                    {step.number}
                  </span>
                  <div className="md:text-center">
                    <h3 className="text-lg font-semibold tracking-[0.14em] uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
