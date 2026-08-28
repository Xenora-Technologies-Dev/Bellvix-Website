import { ArrowDown } from 'lucide-react'
import { Button } from './Button'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan/10 blur-[90px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-lime/8 blur-[100px]" />

      <div className="site-wrap relative grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:min-h-[calc(100svh-4.75rem)]">
        <div className="hero-copy lg:col-span-7">
          <p className="eyebrow">Technology · AI · Digital Growth</p>
          <h1 className="mt-6 max-w-4xl text-[2.55rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[5.1rem]">
            Technology.
            <br />
            <span className="gradient-text">Intelligence.</span>
            <br />
            Digital Growth.
          </h1>
          <p className="mt-5 text-lg font-medium text-ink/90 sm:text-xl">
            Building smarter businesses for a changing world.
          </p>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mute sm:text-base">
            BELLVIX TECHNOLOGIES helps businesses transform ideas into intelligent
            digital products, powerful brands, and measurable growth through
            technology consulting, software engineering, AI solutions, branding,
            and digital marketing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contact" arrow>
              Start a Conversation
            </Button>
            <Button href="#services" variant="secondary">
              Explore Our Services
            </Button>
          </div>
          <a
            href="#about"
            className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.18em] text-faint uppercase"
          >
            Scroll to explore
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="origin-center scale-[0.98] opacity-0 [animation:rise_1.1s_0.35s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none motion-reduce:opacity-100">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
