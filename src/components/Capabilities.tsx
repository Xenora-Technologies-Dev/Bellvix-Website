import { capabilities } from '../data/content'
import { Reveal } from './Reveal'

export function Capabilities() {
  return (
    <section className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="site-wrap grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Modern technology.
            <br />
            Practical outcomes.
          </h2>
        </Reveal>

        <ul className="grid gap-px bg-white/8 sm:grid-cols-2 lg:col-span-8">
          {capabilities.map((item, index) => (
            <li key={item} className="bg-void">
              <Reveal delay={index * 35}>
                <div className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-panel">
                  <span className="text-sm font-medium tracking-tight sm:text-base">{item}</span>
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
