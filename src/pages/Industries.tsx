import { CtaBand } from '../components/sections/CtaBand'
import { IndustriesGrid } from '../components/sections/common'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function Industries({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Industries"
        title={route.h1}
        intro="Our services and Bellvix OS adapt to how each industry works. These are the sectors where we build most often."
      />
      <Section border={false}>
        <IndustriesGrid detailed />
      </Section>
      <CtaBand title="Tell us about your industry." />
    </>
  )
}
