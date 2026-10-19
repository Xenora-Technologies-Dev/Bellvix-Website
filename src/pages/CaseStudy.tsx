import { caseStudyBySlug } from '../content/caseStudies'
import { CtaBand } from '../components/sections/CtaBand'
import { CfAppointments, CfDashboard, CfRoomCalendar } from '../components/mockups/clinic'
import { RqNewReminder, RqPipeline, RqReminders } from '../components/mockups/remindiq'
import { WhatsAppChat } from '../components/mockups/WhatsAppChat'
import { clinicChat, remindiqChat } from '../components/mockups/chats'
import { Button } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Bullets, Chips, Section } from '../components/ui/Section'
import type { Route } from '../site/routes'

const clinicRoles = [
  { name: 'Admin', text: 'Clinic settings, rooms, therapies, users, leave approvals, reports and the WhatsApp message log.' },
  { name: 'Doctor', text: 'Consultations, patient history and their own schedule.' },
  { name: 'Therapist', text: 'Their sessions by room and time, and their leave requests.' },
]

export default function CaseStudy({ route }: { route: Route }) {
  const cs = caseStudyBySlug(route.slug ?? '')
  if (!cs) return null
  const isClinic = cs.slug === 'cliniqflow'
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="Case study"
        title={cs.h1}
        intro={cs.summary}
        actions={
          <Button href="#enquire" arrow>
            Build something similar
          </Button>
        }
      />
      <Section border={false}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <Chips items={cs.tags} />
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">The challenge</h2>
              <Bullets items={cs.challenge} className="mt-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">The solution</h2>
              <Bullets items={cs.solution} className="mt-5" />
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-xl gradient-border p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">At a glance</p>
              <dl className="mt-4 space-y-4">
                {cs.glance.map((g) => (
                  <div key={g.label}>
                    <dt className="text-xs text-faint">{g.label}</dt>
                    <dd className="text-sm font-semibold">{g.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="Inside the product" title={isClinic ? 'Dashboard and room-based scheduling' : 'Enquiries and reminders in one place'} intro="Screens are recreated with sample data. No client or patient information is shown.">
        <div className="space-y-6">
          <Reveal>{isClinic ? <CfDashboard /> : <RqPipeline />}</Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>{isClinic ? <CfRoomCalendar /> : <RqReminders />}</Reveal>
            <Reveal delay={80}>{isClinic ? <CfAppointments /> : <RqNewReminder />}</Reveal>
          </div>
        </div>
      </Section>

      <Section eyebrow="Features" title="What it does.">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {cs.features.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/8 bg-panel p-6">
                <h3 className="text-base font-semibold">{f.name}</h3>
                <p className="mt-2 text-sm text-mute">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:col-span-4">
            {isClinic ? (
              <WhatsAppChat title="Sample Clinic" ariaLabel="Example WhatsApp booking confirmation with fictional patient and clinic details" messages={clinicChat} className="w-[280px]" />
            ) : (
              <WhatsAppChat title="+971 50 000 0000" ariaLabel="Example RemindiQ WhatsApp assistant conversation with fictional staff and reminders" messages={remindiqChat} className="w-[280px]" />
            )}
          </div>
        </div>
      </Section>

      {isClinic ? (
        <Section eyebrow="Roles" title="The right access for every member of staff.">
          <div className="grid gap-4 md:grid-cols-3">
            {clinicRoles.map((r) => (
              <div key={r.name} className="rounded-xl border border-white/8 bg-panel p-6">
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <p className="mt-2 text-sm text-mute">{r.text}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section eyebrow="Outcome" title="What changed.">
        <ol className="grid gap-4 md:grid-cols-3">
          {cs.outcome.map((o, i) => (
            <li key={o} className="rounded-xl border border-white/8 bg-panel p-6">
              <span className="font-mono text-sm text-cyan">0{i + 1}</span>
              <p className="mt-3 text-sm leading-relaxed text-ink/90">{o}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Related services" title="How we can help you.">
        <ul className="flex flex-wrap gap-3">
          {cs.related.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-block rounded-md border border-white/12 px-4 py-2.5 text-sm font-semibold hover:border-cyan/50">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title={`Want a system like ${cs.name}?`} defaultTopic={isClinic ? 'Software & mobile apps' : 'WhatsApp chatbot'} />
    </>
  )
}
