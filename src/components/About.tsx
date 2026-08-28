import { principles } from '../data/content'
import { Mark } from './Mark'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="relative border-t border-white/6 py-24 lg:py-32">
      <div className="site-wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">About BELLVIX</p>
            <Mark className="mt-6 h-10 w-10" />
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
              Technology that moves your business forward.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-6 text-[1.02rem] leading-relaxed text-mute lg:col-span-7">
          <Reveal delay={80}>
            <p>
              BELLVIX TECHNOLOGIES is a technology and digital growth company focused
              on helping organizations solve complex business challenges through
              modern technology, artificial intelligence, software, branding and
              digital marketing.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p>
              From technology strategy and custom software development to
              AI-powered applications, brand development and digital marketing, we
              bring together technical expertise and creative thinking to help
              businesses build, launch and grow.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="border-l-2 border-cyan/70 pl-5 text-ink">
              We combine technology, intelligence and creativity to create
              meaningful business outcomes.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="site-wrap mt-16 grid gap-4 md:grid-cols-3">
        {principles.map((item, index) => (
          <Reveal key={item.number} delay={index * 90}>
            <article className="h-full border border-white/8 bg-panel p-6 lg:p-8">
              <span className="font-mono text-sm text-cyan">{item.number}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
