import { CtaBand } from '../components/sections/CtaBand'
import { CaseStudyCards } from '../components/sections/common'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

export default function CaseStudiesHub({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Our work"
        title={route.h1}
        intro="Systems we have designed and built for UAE businesses. Client names and data stay private; the challenges, solutions and products are real."
      />
      <Section border={false}>
        <CaseStudyCards />
      </Section>
      <CtaBand title="Have a similar challenge?" />
    </>
  )
}
