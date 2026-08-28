import { whyItems } from '../data/content'
import { Reveal } from './Reveal'

export function WhyBellvix() {
  return (
    <section className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="site-wrap">
        <Reveal>
          <p className="eyebrow">Why BELLVIX</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.7rem]">
            Built around your business.
            <br />
            Driven by what’s next.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {whyItems.map((item, index) => {
            const span = index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
            return (
              <Reveal key={item.number} delay={index * 70} className={span}>
                <article className="group h-full border border-white/8 bg-panel p-7 transition-colors duration-300 hover:border-cyan/30 sm:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-4xl font-bold tracking-tight text-white/12 transition-colors group-hover:text-cyan/40 sm:text-5xl">
                      {item.number}
                    </span>
                    <span className="h-px w-16 bg-gradient-to-r from-cyan to-lime opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight uppercase sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-mute">{item.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
