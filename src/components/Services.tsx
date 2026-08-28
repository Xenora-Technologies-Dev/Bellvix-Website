import { serviceCategories } from '../data/services'
import { Reveal } from './Reveal'
import { ServiceCard } from './ServiceCard'

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/6 bg-panel py-24 lg:py-32">
      <div className="site-wrap">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            Technology, intelligence and digital growth — under one roof.
          </h2>
          <p className="mt-5 max-w-2xl text-mute">
            From technology strategy and custom software to AI, branding and digital
            marketing, BELLVIX TECHNOLOGIES helps businesses build, launch, and grow
            in a digital-first world.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {serviceCategories.map((category, index) => (
            <div key={category.id} className="grid gap-8 lg:grid-cols-12">
              <Reveal delay={index * 40} className="lg:col-span-4">
                <p className="font-mono text-xs tracking-[0.2em] text-cyan">
                  Category {category.number}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{category.heading}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
                  {category.description}
                </p>
              </Reveal>
              <div
                className={`grid gap-4 lg:col-span-8 ${
                  category.services.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
                }`}
              >
                {category.services.map((service, serviceIndex) => (
                  <Reveal key={service.number} delay={serviceIndex * 80}>
                    <ServiceCard service={service} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
