import { Button } from './Button'
import { Reveal } from './Reveal'

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/6 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,230,214,0.16),rgba(214,242,106,0.08)_42%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute left-[18%] top-[30%] h-8 w-14 skew-x-[-22deg] bg-gradient-to-r from-cyan to-lime opacity-40" />
      <div className="pointer-events-none absolute right-[16%] bottom-[28%] h-6 w-10 skew-x-[-22deg] bg-gradient-to-r from-cyan/70 to-lime opacity-30" />

      <div className="site-wrap relative grid items-end gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Have a technology challenge?
            <br />
            <span className="gradient-text">Let’s solve it.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-mute">
            Whether you’re planning a new digital product, modernizing your
            technology stack, exploring AI, building your brand or looking for
            digital growth, let’s start the conversation.
          </p>
        </Reveal>
        <Reveal delay={90} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
          <Button href="#contact" arrow>
            Talk to BELLVIX
          </Button>
          <Button href="#services" variant="secondary">
            View Our Services
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
