import { outcomes } from '../data/content'
import { Reveal } from './Reveal'

export function Outcomes() {
  return (
    <section className="relative border-t border-white/6 bg-panel py-24 lg:py-32">
      <div className="site-wrap">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.6rem]">
            Technology is only valuable when it creates impact.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-white/8 border-y border-white/8">
          {outcomes.map((item, index) => (
            <Reveal key={item.word} delay={index * 70}>
              <article className="grid items-baseline gap-3 py-8 sm:grid-cols-12 sm:gap-8">
                <p className="font-mono text-xs text-faint sm:col-span-1">0{index + 1}</p>
                <h3 className="text-4xl font-extrabold tracking-tight sm:col-span-4 sm:text-5xl lg:text-6xl">
                  {item.word}
                </h3>
                <p className="text-mute sm:col-span-7 sm:text-lg">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
