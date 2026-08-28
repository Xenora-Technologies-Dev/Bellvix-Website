import { aiCapabilities } from '../data/content'
import { Button } from './Button'
import { AIVisual } from './AIVisual'
import { Reveal } from './Reveal'

export function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden border-t border-white/6 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,230,214,0.07),transparent_42%)]" />
      <div className="site-wrap relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">AI & Intelligence</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Turn AI from an idea into an advantage.
            </h2>
            <p className="mt-5 max-w-xl text-mute">
              We help organizations move beyond AI experimentation and build
              intelligent systems that solve real business problems.
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
            {aiCapabilities.map((item, index) => (
              <Reveal key={item.number} delay={index * 70}>
                <article className="group grid grid-cols-[3.2rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-cyan/90">{item.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm text-mute">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8">
              <Button href="#contact" arrow>
                Explore AI Solutions
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="overflow-hidden border border-white/8 bg-panel lg:col-span-6" delay={100}>
          <AIVisual />
        </Reveal>
      </div>
    </section>
  )
}
