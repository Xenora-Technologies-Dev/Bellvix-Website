import { odcFaqs, odcGovernance, odcRoles, odcSteps } from '../content/detailPages'
import { CtaBand } from '../components/sections/CtaBand'
import { Steps } from '../components/sections/common'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Bullets, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function Odc({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Offshore development centre"
        title={route.h1}
        intro="An ODC is your own dedicated remote engineering team. Ours is based in India and set up, managed and reported on by Bellvix, so you add capacity without building a new office or HR function."
        actions={
          <>
            <Button href="#enquire" arrow>
              Plan your team
            </Button>
            <Button href="/services/technology-consulting" variant="secondary">
              Technology & consulting
            </Button>
          </>
        }
      />
      <Section border={false} eyebrow="What you get" title="A team that works only on your roadmap.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Dedicated engineers', 'People who work on your products, inside your tools and rituals.'],
            ['Managed by Bellvix', 'Hiring, onboarding, delivery management and reporting handled for you.'],
            ['Flexible size', 'Scale up or down as your roadmap changes.'],
            ['Protected IP', 'Confidentiality and IP terms agreed up front, with controlled access.'],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 60}>
              <div className="h-full rounded-xl border border-white/8 bg-panel p-6">
                <span className="slash" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold">{a}</h3>
                <p className="mt-2 text-sm text-mute">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="How it works" title="Scope, hire, onboard, deliver, scale.">
        <Steps steps={odcSteps} />
      </Section>
      <Section eyebrow="Typical roles" title="Skills we can staff.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Bullets items={odcRoles} />
          <p className="text-sm leading-relaxed text-mute">Other roles can be added on request. Team composition, seniority and working hours are agreed during scoping.</p>
        </div>
      </Section>
      <Section eyebrow="Governance" title="Visibility and control, without the overhead.">
        <div className="grid gap-5 md:grid-cols-2">
          {odcGovernance.map((g) => (
            <div key={g.name} className="rounded-xl border border-white/8 bg-panel p-6">
              <h3 className="text-lg font-semibold">{g.name}</h3>
              <p className="mt-2 text-sm text-mute">{g.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <FaqList faqs={odcFaqs} />
      <CtaBand title="Plan your offshore team." intro="Tell us the skills and timeline you need. The engagement model is discussed and agreed mutually." defaultTopic="Offshore development centre (ODC)" />
    </>
  )
}
