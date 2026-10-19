/**
 * Scripted fallback for Bellvixy, used when the AI function is unavailable (static preview, no AI_API_KEY,
 * rate limit, network error). Every answer is assembled from the site's own content files: no new facts.
 */
import { company } from '../config/company'
import { editions, everyEditionIncludes, extensions, osModules, osSummary, aiNote } from '../content/bellvixOs'
import { caseStudies } from '../content/caseStudies'
import { odcFaqs, whatsappUseCases } from '../content/detailPages'
import { aspPositioning, einvoicingMilestones, einvoicingSources } from '../content/einvoicing'
import { industries } from '../content/industries'
import { categories } from '../content/services'
import type { ChatLink } from './types'

export type Answer = { text: string; links?: ChatLink[]; lead?: string }
type Intent = { id: string; match: RegExp; answer: () => Answer }

const cat = (slug: string) => categories.find((c) => c.slug === slug)!
const catAnswer = (slug: string, lead: string, extra = ''): Answer => {
  const c = cat(slug)
  const offers = c.subservices.slice(0, 5).map((s) => s.name)
  return {
    text: `${c.intro}\n\nThis covers: ${offers.join(', ')}.${extra ? `\n\n${extra}` : ''}\n\nWant a consultant to look at your requirement? Leave your details and we'll get back to you.`,
    links: [{ label: c.name, href: `/services/${c.slug}` }],
    lead,
  }
}

const contactText = `You can reach Bellvix on ${company.phoneDisplay} (phone and WhatsApp) or ${company.email}. We're at ${company.address.line1}, ${company.address.line2}, ${company.address.line3}, UAE.`

// Order matters: the first matching intent wins.
const intents: Intent[] = [
  {
    id: 'human',
    match: /\b(human|real person|someone|talk to (a|an|the|your)|speak (to|with)|call me|call back|callback|sales( team)?|consultant|representative)\b/i,
    answer: () => ({
      text: `Of course. Leave your details below and a Bellvix consultant will contact you. If you prefer, continue on WhatsApp now. ${contactText}`,
      links: [{ label: 'Contact page', href: '/contact' }],
      lead: 'Talk to a human',
    }),
  },
  {
    id: 'pricing',
    match: /\b(price|pricing|prices|cost|costs|how much|quote|quotation|rate|rates|fee|fees|budget|subscription|package|plans?)\b/i,
    answer: () => ({
      text: "We don't publish prices because every project and Bellvix OS setup is scoped to the business. A Bellvix consultant will share a tailored quote once we understand your requirement. Leave your details and we'll get in touch.",
      lead: 'Something else',
    }),
  },
  {
    id: 'einvoicing',
    match: /(e-?\s?invoic|einvoice|\basp\b|accredited service provider|peppol|\bfta\b|mandatory|2027|ministerial decision)/i,
    answer: () => ({
      text: [
        'UAE e-invoicing timeline (verified):',
        ...einvoicingMilestones.map((m) => `• ${m.date}: ${m.who}: ${m.what}`),
        '',
        aspPositioning,
        `Sources: ${einvoicingSources.join('; ')}.`,
      ].join('\n'),
      links: [
        { label: 'E-invoicing guide', href: '/insights/uae-e-invoicing-guide' },
        { label: 'E-invoicing integration', href: '/services/business-systems/uae-e-invoicing-integration' },
      ],
      lead: 'E-invoicing 2027',
    }),
  },
  {
    id: 'tax',
    match: /\b(vat|corporate tax|tax return|tax)\b/i,
    answer: () => ({
      text: `Every Bellvix OS edition includes ${everyEditionIncludes.map((i) => i.name).join(', ')}. For your specific setup, a consultant can walk you through it in a demo.`,
      links: [{ label: 'Bellvix OS', href: '/bellvix-os' }],
      lead: 'Bellvix OS demo',
    }),
  },
  {
    id: 'editions',
    match: /\b(editions?|lite|saas edition|enterprise|which version|versions?)\b/i,
    answer: () => ({
      text: `Bellvix OS comes in three editions:\n${editions.map((e) => `• ${e.name}: for ${e.for}. ${e.scope}`).join('\n')}\n\nPricing is tailored; book a demo and a consultant will recommend the right edition.`,
      links: [{ label: 'Compare editions', href: '/bellvix-os/editions' }],
      lead: 'Bellvix OS demo',
    }),
  },
  {
    id: 'os',
    match: /(bellvix os|\berp\b|\bcrm\b|\bhrms?\b|payroll|inventory|stock|accounting|accounts|project management|van.?sales|operating system|\bdemo\b|migration)/i,
    answer: () => ({
      text: `Bellvix OS is the company operating system. ${osSummary}\n\nModules: ${osModules.map((m) => `${m.name} (${m.summary.replace(/\.$/, '').toLowerCase()})`).join('; ')}. Extensions: ${extensions.map((e) => e.name).join(', ')}. ${aiNote}\n\nThe best way to see it is a short demo. Leave your details or continue on WhatsApp.`,
      links: [
        { label: 'Bellvix OS', href: '/bellvix-os' },
        { label: 'Book a demo', href: '/bellvix-os#book-demo' },
      ],
      lead: 'Bellvix OS demo',
    }),
  },
  {
    id: 'whatsapp',
    match: /(whats\s?app|chat\s?bot|\bbot\b|chatbot)/i,
    answer: () => ({
      text: `We design and build WhatsApp chatbots and automations:\n${whatsappUseCases.map((u) => `• ${u.name}: ${u.text}`).join('\n')}\n\nSee RemindiQ and CliniqFlow for examples.`,
      links: [
        { label: 'WhatsApp chatbot development', href: '/services/ai-automation/whatsapp-chatbot-development' },
        { label: 'Case studies', href: '/case-studies' },
      ],
      lead: 'WhatsApp bot',
    }),
  },
  { id: 'ai', match: /(\bai\b|artificial intelligence|automation|automate|\bagents?\b|voice|machine learning|\bllm\b|\bgpt\b)/i, answer: () => catAnswer('ai-automation', 'AI & automation', aiNote) },
  {
    id: 'odc',
    match: /\b(odc|offshore|dedicated team|india|outsourc\w*|extended team|developers? for hire|staff augmentation)\b/i,
    answer: () => ({
      text: `${odcFaqs[0].a} ${odcFaqs[1].a} The engagement model is agreed together with you.`,
      links: [{ label: 'Offshore development centre', href: '/services/technology-consulting/offshore-development-centre' }],
      lead: 'Offshore development centre',
    }),
  },
  { id: 'web', match: /(website|web ?site|web design|e-?commerce|online store|shop|seo|domain|hosting|email hosting)/i, answer: () => catAnswer('web-commerce', 'Website or e-commerce') },
  { id: 'brand', match: /\b(brand\w*|marketing|logo|social media|ads|advertising|ui|ux|design)\b/i, answer: () => catAnswer('brand-marketing', 'Branding & marketing') },
  { id: 'software', match: /(software|\bapps?\b|mobile|ios|android|portal|\bapi\b|integration|backend|develop\w*|custom|system)/i, answer: () => catAnswer('software-development', 'Custom software') },
  { id: 'consulting', match: /\b(consult\w*|cloud|it services?|it support|roadmap|strategy|infrastructure)\b/i, answer: () => catAnswer('technology-consulting', 'Something else') },
  { id: 'engineering', match: /\bengineering\b/i, answer: () => catAnswer('engineering', 'Something else') },
  {
    id: 'cases',
    match: /(case stud|portfolio|clients?|customers?|your work|examples?|projects? you|cliniqflow|remindiq|references?)/i,
    answer: () => ({
      text: `Two recent builds (client names stay private by design):\n${caseStudies.map((c) => `• ${c.name}: ${c.summary}`).join('\n')}`,
      links: caseStudies.map((c) => ({ label: c.name, href: `/case-studies/${c.slug}` })),
      lead: 'Custom software',
    }),
  },
  {
    id: 'industries',
    match: /(industr|sector|clinic|healthcare|hospital|trading|distribution|food|retail|logistics|professional services)/i,
    answer: () => ({
      text: `We work with:\n${industries.map((i) => `• ${i.name}: ${i.summary}`).join('\n')}`,
      links: [{ label: 'Industries', href: '/industries' }],
    }),
  },
  {
    id: 'contact',
    match: /\b(contact|phone|number|call|email|e-mail|address|location|located|where|office|visit|hours|open)\b/i,
    answer: () => ({ text: contactText, links: [{ label: 'Contact', href: '/contact' }], lead: 'Something else' }),
  },
  {
    id: 'about',
    match: /(who are you|about (you|bellvix|the company)|what (is|does) bellvix|bellvix technologies|company|vision|mission)/i,
    answer: () => ({ text: `${company.about}\n\nVision: ${company.vision}`, links: [{ label: 'About Bellvix', href: '/about' }] }),
  },
  {
    id: 'services',
    match: /\b(services?|what do you (do|offer)|offer|help with)\b/i,
    answer: () => ({
      text: `Bellvix covers: ${categories.map((c) => c.name).join(', ')}, plus Bellvix OS, our company operating system. What are you looking to solve?`,
      links: [{ label: 'All services', href: '/services' }],
    }),
  },
  {
    id: 'greeting',
    match: /^\s*(hi|hello|hey|hiya|salam|salaam|assalam\w*|marhaba|good (morning|afternoon|evening))\b/i,
    answer: () => ({ text: 'Hello! What can I help you with today? Pick a topic below or type your question.' }),
  },
  {
    id: 'thanks',
    match: /\b(thanks|thank you|thx|great|perfect|ok(ay)?)\b/i,
    answer: () => ({ text: "You're welcome! If you'd like a consultant to follow up, leave your details and we'll be in touch." }),
  },
]

export const chipAnswers: Record<string, string> = {
  'Bellvix OS demo': 'Bellvix OS demo',
  'Custom software': 'custom software development',
  'WhatsApp bot': 'WhatsApp chatbot',
  'AI & automation': 'AI and automation',
  'E-invoicing 2027': 'e-invoicing 2027',
  'Talk to a human': 'talk to a human',
}

/** Matching intent (used to add page links and a lead button to AI replies). */
export function matchIntent(input: string): Answer | null {
  const hit = intents.find((i) => i.match.test(input))
  return hit ? hit.answer() : null
}

export function fallbackAnswer(input: string): Answer {
  const hit = matchIntent(input)
  if (hit) return hit
  return {
    text: `I don't have a confirmed answer for that yet, and I'd rather not guess. A Bellvix consultant can help: leave your details, or reach us on ${company.phoneDisplay} or ${company.email}.`,
    lead: 'Something else',
  }
}
