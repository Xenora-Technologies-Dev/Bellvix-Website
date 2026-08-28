import { Button } from './Button'
import { Reveal } from './Reveal'

const brandingCaps = [
  'Brand Strategy',
  'Visual Identity',
  'Logo Design',
  'Brand Guidelines',
  'Creative Direction',
]

const marketingCaps = [
  'Digital Strategy',
  'SEO',
  'Social Media',
  'Paid Advertising',
  'Content Marketing',
  'Lead Generation',
  'Performance Marketing',
]

export function DigitalSection() {
  return (
    <section id="digital" className="relative border-t border-white/6 bg-panel py-24 lg:py-32">
      <div className="site-wrap">
        <Reveal>
          <p className="eyebrow">Brand & Growth</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.7rem]">
            Build a brand people remember.
            <br />
            Create growth people can measure.
          </h2>
          <p className="mt-5 max-w-2xl text-mute">
            Great technology needs a strong identity and a powerful digital presence.
            Our branding and digital marketing services help businesses turn ideas
            into recognizable brands and measurable growth.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="group relative overflow-hidden border border-white/8 bg-raised p-7 sm:p-10">
              <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-lime/10 blur-3xl" />
              <div className="pointer-events-none absolute right-8 top-8 flex gap-1.5" aria-hidden="true">
                <span className="h-10 w-6 skew-x-[-22deg] bg-white/8" />
                <span className="h-10 w-6 skew-x-[-22deg] bg-gradient-to-b from-cyan to-lime opacity-70" />
                <span className="h-10 w-6 skew-x-[-22deg] bg-white/8" />
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] text-mute uppercase">Branding</p>
              <h3 className="mt-8 text-2xl font-bold sm:text-3xl">Build Your Brand</h3>
              <p className="mt-3 text-lg text-ink/90">Shape how the world sees your business.</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">
                We create distinctive brand identities that communicate your value,
                establish credibility and create memorable experiences across every
                touchpoint.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {brandingCaps.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/8 px-3 py-1 text-xs text-mute"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="#contact" variant="secondary" arrow>
                  Build Your Brand
                </Button>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="group relative overflow-hidden border border-white/8 bg-raised p-7 sm:p-10">
              <div className="pointer-events-none absolute -right-6 bottom-0 h-44 w-44 rounded-full bg-cyan/10 blur-3xl" />
              <div className="pointer-events-none absolute right-8 top-10 flex h-12 items-end gap-1.5" aria-hidden="true">
                {[40, 70, 52, 88, 64].map((h) => (
                  <span
                    key={h}
                    className="w-1.5 bg-gradient-to-t from-cyan/30 to-lime"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] text-mute uppercase">
                Digital Marketing
              </p>
              <h3 className="mt-8 text-2xl font-bold sm:text-3xl">Digital Marketing</h3>
              <p className="mt-3 text-lg text-ink/90">Turn attention into meaningful growth.</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">
                Connect with the right audience through strategic digital marketing
                designed to increase visibility, generate qualified leads and create
                measurable business outcomes.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {marketingCaps.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/8 px-3 py-1 text-xs text-mute"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="#contact" variant="secondary" arrow>
                  Grow Your Business
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
