import { whatsappFaqs, whatsappIncluded, whatsappUseCases } from '../content/detailPages'
import { CtaBand } from '../components/sections/CtaBand'
import { WhatsAppChat } from '../components/mockups/WhatsAppChat'
import { clinicChat, remindiqChat } from '../components/mockups/chats'
import { Button } from '../components/ui/Button'
import { FaqList } from '../components/ui/FaqList'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Bullets, Section } from '../components/ui/Section'
import { Steps } from '../components/sections/common'
import type { Route } from '../site/routes'

const steps = [
  { name: 'Map the conversations', text: 'We list what customers or staff ask for and design the flows, buttons and handover points.' },
  { name: 'Connect your systems', text: 'The bot is wired to your ERP, CRM, booking or custom system so answers and actions are live.' },
  { name: 'Launch and test', text: 'Message templates are registered, flows are tested with real scenarios, then rolled out.' },
  { name: 'Improve', text: 'We review the message log and add flows as usage grows.' },
]

export default function WhatsAppBot({ route }: { route: Route }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        eyebrow="WhatsApp bots & automation"
        title={route.h1}
        intro="Bookings, confirmations, reminders, FAQs, lead capture and live ERP or CRM data on WhatsApp, with interactive buttons and handover to staff. We have built and run them for a clinic and a trading group."
        actions={
          <>
            <Button href="#enquire" arrow>
              Plan your WhatsApp bot
            </Button>
            <Button href="/case-studies" variant="secondary">
              See case studies
            </Button>
          </>
        }
        aside={
          <div className="flex justify-center gap-5">
            <WhatsAppChat title="Sample Clinic" ariaLabel="Example WhatsApp booking confirmation and reschedule conversation with fictional details" messages={clinicChat} className="w-[260px] sm:w-[280px]" />
            <WhatsAppChat title="+971 50 000 0000" ariaLabel="Example WhatsApp staff assistant conversation showing today’s reminders, with fictional details" messages={remindiqChat} className="hidden w-[280px] md:block" />
          </div>
        }
      />
      <Section border={false} eyebrow="Use cases" title="What a WhatsApp bot can handle for you.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatsappUseCases.map((u, i) => (
            <Reveal key={u.name} delay={(i % 3) * 60}>
              <div className="h-full rounded-xl border border-white/8 bg-panel p-6">
                <h3 className="text-lg font-semibold">{u.name}</h3>
                <p className="mt-2 text-sm text-mute">{u.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section eyebrow="What’s included" title="Everything from flows to integration.">
        <Bullets items={whatsappIncluded} className="max-w-3xl" />
      </Section>
      <Section eyebrow="Process" title="From first flow to live bot.">
        <Steps steps={steps} />
      </Section>
      <Section eyebrow="Proof" title="Two WhatsApp systems we built.">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['/case-studies/cliniqflow', 'CliniqFlow', 'A multi-room therapy clinic in the UAE: booking confirmations, reschedules and cancellations on WhatsApp, synced to a room-based calendar.'],
            ['/case-studies/remindiq', 'RemindiQ', 'A UAE trading group: a WhatsApp assistant for today’s reminders, creating events and assigning them to staff, with Completed and Remind tomorrow buttons.'],
          ].map(([href, name, text]) => (
            <a key={href} href={href} className="service-card block rounded-xl border border-white/8 bg-panel p-7">
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="mt-3 text-sm text-mute">{text}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-cyan">Read the case study →</span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-mute">
          Bellvix OS also has a <a href="/bellvix-os#whatsapp-assistant" className="text-cyan underline-offset-4 hover:underline">WhatsApp Assistant</a> for live stock, balances, approvals and van-sales billing.
        </p>
      </Section>
      <FaqList faqs={whatsappFaqs} />
      <CtaBand title="Plan your WhatsApp bot." defaultTopic="WhatsApp chatbot" />
    </>
  )
}
