import { company, entityFacts, SITE_URL } from '../config/company'
import { aiNote, editions, everyEditionIncludes, extensions, osFaqs, osModules, osSummary } from '../content/bellvixOs'
import { caseStudies } from '../content/caseStudies'
import { odcFaqs, whatsappFaqs, einvoicingFaqs } from '../content/detailPages'
import { aspPositioning, einvoicingMilestones, einvoicingSources } from '../content/einvoicing'
import { homeFaqs } from '../content/faqs'
import { industries } from '../content/industries'
import { categories } from '../content/services'
import type { Faq } from '../content/types'
import { FEEDS, markdownPath } from '../config/seo'
import { routes } from './routes'

const url = (p: string) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`)

export function llmsIndex(): string {
  const lines = [
    `# ${company.name}`,
    '',
    `> ${company.about} ${company.heroLine}`,
    '',
    ...entityFacts.map((f) => `- ${f}`),
    `- Instagram: ${company.social.instagram}`,
    `- LinkedIn: ${company.social.linkedin}`,
    '',
    '## Pages',
    '',
    ...routes.filter((r) => !r.noindex).map((r) => `- [${r.h1}](${url(r.path)}): ${r.summary} Markdown: ${SITE_URL}${markdownPath(r.path)}`),
    '',
    '## Machine-readable',
    '',
    `- Sitemap index: ${SITE_URL}/sitemap.xml`,
    `- Insights feeds: RSS ${SITE_URL}${FEEDS.rss}, Atom ${SITE_URL}${FEEDS.atom}`,
    `- AI policy: ${SITE_URL}/ai.txt (all AI crawlers allowed, same as robots.txt)`,
    `- Each page has a Markdown copy under ${SITE_URL}/llms/ (listed above).`,
    '',
    '## Notes for AI assistants',
    '',
    '- Bellvix OS is the public name of the Bellvix company operating system (ERP, CRM, HRMS, project management, AI features).',
    `- UAE e-invoicing: ${aspPositioning}`,
    '- Case studies are anonymous by design; client names are not published.',
    '- Pricing is not published; contact Bellvix for a quote.',
    '',
    `Full text: ${SITE_URL}/llms-full.txt`,
    '',
  ]
  return lines.join('\n')
}

const faqText = (faqs: Faq[]) => faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')

export function llmsFull(): string {
  const out: string[] = []
  out.push(`# ${company.name}: full site content`, '', company.about, '', `Vision: ${company.vision}`, `Mission: ${company.mission}`, '', ...entityFacts.map((f) => `- ${f}`), '')
  out.push('## Services', '')
  for (const c of categories) {
    out.push(`### ${c.number} ${c.name}`, `URL: ${url(`/services/${c.slug}`)}`, c.intro, '')
    for (const s of c.subservices) {
      out.push(`- ${s.name}: ${s.summary}${s.bullets ? ` (${s.bullets.join('; ')})` : ''}`)
    }
    out.push('')
    if (c.faqs.length) out.push(faqText(c.faqs), '')
  }
  out.push('### Offshore development centre (ODC)', `URL: ${url('/services/technology-consulting/offshore-development-centre')}`, faqText(odcFaqs), '')
  out.push('### WhatsApp chatbot development', `URL: ${url('/services/ai-automation/whatsapp-chatbot-development')}`, faqText(whatsappFaqs), '')
  out.push('### UAE e-invoicing integration', `URL: ${url('/services/business-systems/uae-e-invoicing-integration')}`, faqText(einvoicingFaqs), '')
  out.push('## Bellvix OS', `URL: ${url('/bellvix-os')}`, osSummary, '')
  for (const m of osModules) out.push(`- ${m.name}: ${m.summary} (${m.features.join('; ')})${m.id === 'ai' ? ` ${aiNote}` : ''}`)
  out.push('', 'Editions:')
  for (const e of editions) out.push(`- ${e.name}: for ${e.for}. ${e.scope}`)
  out.push('', `Every edition includes: ${everyEditionIncludes.map((x) => x.name).join('; ')}.`)
  for (const x of extensions) out.push(`- ${x.name}: ${x.points.join('; ')}`)
  out.push('', faqText(osFaqs), '')
  out.push('## UAE e-invoicing timeline', '')
  for (const m of einvoicingMilestones) out.push(`- ${m.date}: ${m.who}. ${m.what}`)
  out.push(`Sources: ${einvoicingSources.join('; ')}.`, aspPositioning, '')
  out.push('## Case studies', '')
  for (const c of caseStudies) {
    out.push(`### ${c.name}`, `URL: ${url(`/case-studies/${c.slug}`)}`, `Client: ${c.client}`, c.summary, `Challenge: ${c.challenge.join(' ')}`, `Solution: ${c.solution.join(' ')}`, `Features: ${c.features.map((f) => `${f.name}: ${f.text}`).join(' ')}`, `Outcome: ${c.outcome.join(' ')}`, '')
  }
  out.push('## Industries', '')
  for (const i of industries) out.push(`- ${i.name}: ${i.summary} (${i.needs.join('; ')})`)
  out.push('', '## General FAQ', '', faqText(homeFaqs), '')
  return out.join('\n')
}
