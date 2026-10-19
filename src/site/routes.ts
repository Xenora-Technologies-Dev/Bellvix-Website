import { caseStudies } from '../content/caseStudies'
import { categories } from '../content/services'
import { osFaqs } from '../content/bellvixOs'
import { homeFaqs } from '../content/faqs'
import { article } from '../content/insights'
import { odcFaqs, whatsappFaqs, einvoicingFaqs } from '../content/detailPages'
import type { Faq } from '../content/types'

export type PageKey =
  | 'home'
  | 'about'
  | 'servicesHub'
  | 'serviceCategory'
  | 'odc'
  | 'whatsappBot'
  | 'einvoicing'
  | 'osOverview'
  | 'osEditions'
  | 'caseStudiesHub'
  | 'caseStudy'
  | 'industries'
  | 'insightsHub'
  | 'article'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'thankYou'
  | 'notFound'

export type SchemaKind =
  | 'ProfessionalService'
  | 'Service'
  | 'SoftwareApplication'
  | 'Editions'
  | 'Article'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'

export type Crumb = { name: string; path: string }

export type Route = {
  path: string
  page: PageKey
  slug?: string
  title: string
  description: string
  h1: string
  crumbs: Crumb[]
  og: string
  schema: SchemaKind[]
  faqs?: Faq[]
  noindex?: boolean
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
  serviceType?: string
  /** One line used in llms.txt */
  summary: string
  article?: { published: string; modified: string; author: string }
  cta: 'talk' | 'demo'
}

const home: Crumb = { name: 'Home', path: '/' }
const servicesCrumb: Crumb = { name: 'Services', path: '/services' }
const osCrumb: Crumb = { name: 'Bellvix OS', path: '/bellvix-os' }
const csCrumb: Crumb = { name: 'Case studies', path: '/case-studies' }
const insightsCrumb: Crumb = { name: 'Insights', path: '/insights' }

const categoryRoutes: Route[] = categories.map((c) => ({
  path: `/services/${c.slug}`,
  page: 'serviceCategory',
  slug: c.slug,
  title: c.title,
  description: c.description,
  h1: c.h1,
  crumbs: [home, servicesCrumb, { name: c.name, path: `/services/${c.slug}` }],
  og: c.slug === 'ai-automation' ? 'whatsapp' : 'services',
  schema: ['Service'],
  faqs: c.faqs.length ? c.faqs : undefined,
  priority: c.slug === 'engineering' ? 0.4 : 0.8,
  changefreq: 'monthly',
  serviceType: c.name,
  summary: c.description,
  cta: 'talk',
}))

const caseRoutes: Route[] = caseStudies.map((c) => ({
  path: `/case-studies/${c.slug}`,
  page: 'caseStudy',
  slug: c.slug,
  title: c.title,
  description: c.description,
  h1: c.h1,
  crumbs: [home, csCrumb, { name: c.name, path: `/case-studies/${c.slug}` }],
  og: 'case-studies',
  schema: ['Article'],
  priority: 0.7,
  changefreq: 'monthly',
  summary: c.summary,
  article: { published: '2026-10-19', modified: '2026-10-19', author: 'Bellvix Team' },
  cta: 'talk',
}))

export const routes: Route[] = [
  {
    path: '/',
    page: 'home',
    title: 'Bellvix Technologies | IT, Software, AI & Digital in the UAE',
    description:
      'UAE technology partner for IT consulting, custom software, AI and WhatsApp automation, UAE e-invoicing, websites and Bellvix OS, the company operating system.',
    h1: 'Building smarter businesses for a changing world.',
    crumbs: [],
    og: 'default',
    schema: ['ProfessionalService'],
    faqs: homeFaqs,
    priority: 1,
    changefreq: 'weekly',
    summary: 'Home: who Bellvix is, the 8 service pillars, Bellvix OS, UAE e-invoicing and case studies.',
    cta: 'talk',
  },
  {
    path: '/about',
    page: 'about',
    title: 'About Bellvix Technologies FZE',
    description:
      'Bellvix Technologies FZE is a UAE technology company in the UAQ Free Trade Zone. Our vision, mission, how we work and our UAE + India delivery model.',
    h1: 'About Bellvix Technologies',
    crumbs: [home, { name: 'About', path: '/about' }],
    og: 'default',
    schema: ['AboutPage', 'ProfessionalService'],
    priority: 0.7,
    changefreq: 'monthly',
    summary: 'Company facts, vision, mission, why Bellvix, how we work and the delivery model.',
    cta: 'talk',
  },
  {
    path: '/services',
    page: 'servicesHub',
    title: 'IT, Software, AI & Digital Services in the UAE',
    description:
      'Eight service pillars: technology consulting, software and apps, AI and automation, Bellvix OS, business systems and e-invoicing, web, brand and engineering.',
    h1: 'Technology services for every stage of your business',
    crumbs: [home, servicesCrumb],
    og: 'services',
    schema: ['CollectionPage'],
    priority: 0.9,
    changefreq: 'monthly',
    summary: 'Services hub listing all 8 pillars and their sub-services.',
    cta: 'talk',
  },
  ...categoryRoutes,
  {
    path: '/services/technology-consulting/offshore-development-centre',
    page: 'odc',
    title: 'Offshore Development Centre (ODC) in India for UAE Firms',
    description:
      'A dedicated engineering team in India, set up and managed by Bellvix for UAE companies: hiring, onboarding, delivery management, reporting and IP protection.',
    h1: 'Offshore development centre in India, managed by Bellvix',
    crumbs: [home, servicesCrumb, { name: 'Technology & Consulting', path: '/services/technology-consulting' }, { name: 'Offshore development centre', path: '/services/technology-consulting/offshore-development-centre' }],
    og: 'services',
    schema: ['Service'],
    faqs: odcFaqs,
    priority: 0.8,
    changefreq: 'monthly',
    serviceType: 'Offshore development centre',
    summary: 'ODC: a dedicated team in India managed by Bellvix; engagement model agreed mutually.',
    cta: 'talk',
  },
  {
    path: '/services/ai-automation/whatsapp-chatbot-development',
    page: 'whatsappBot',
    title: 'WhatsApp Chatbot Development in the UAE',
    description:
      'WhatsApp chatbots and automation for UAE businesses: bookings, confirmations, reminders, FAQs, lead capture and live ERP or CRM data, with staff handover.',
    h1: 'WhatsApp chatbot and automation development in the UAE',
    crumbs: [home, servicesCrumb, { name: 'AI & Automation', path: '/services/ai-automation' }, { name: 'WhatsApp chatbot development', path: '/services/ai-automation/whatsapp-chatbot-development' }],
    og: 'whatsapp',
    schema: ['Service'],
    faqs: whatsappFaqs,
    priority: 0.9,
    changefreq: 'monthly',
    serviceType: 'WhatsApp chatbot development',
    summary: 'WhatsApp bot and automation development; proof: CliniqFlow and RemindiQ.',
    cta: 'talk',
  },
  {
    path: '/services/business-systems/uae-e-invoicing-integration',
    page: 'einvoicing',
    title: 'UAE E-Invoicing Integration for Your ERP',
    description:
      'Get your ERP or billing system ready for UAE e-invoicing. Bellvix cleans your data, connects you to your Accredited Service Provider and tests end to end.',
    h1: 'UAE e-invoicing integration for your ERP or billing system',
    crumbs: [home, servicesCrumb, { name: 'Business Systems & Compliance', path: '/services/business-systems' }, { name: 'UAE e-invoicing integration', path: '/services/business-systems/uae-e-invoicing-integration' }],
    og: 'einvoicing',
    schema: ['Service'],
    faqs: einvoicingFaqs,
    priority: 0.9,
    changefreq: 'monthly',
    serviceType: 'UAE e-invoicing integration',
    summary: 'E-invoicing readiness and ASP integration with the official phased dates. Bellvix is not an ASP.',
    cta: 'talk',
  },
  {
    path: '/bellvix-os',
    page: 'osOverview',
    title: 'Bellvix OS: ERP Software for UAE Businesses',
    description:
      'Bellvix OS is the company operating system: ERP, CRM, HRMS, projects and AI in one platform, e-invoicing ready with VAT and Corporate Tax built in.',
    h1: 'Bellvix OS, the company operating system',
    crumbs: [home, osCrumb],
    og: 'bellvix-os',
    schema: ['SoftwareApplication'],
    faqs: osFaqs,
    priority: 0.95,
    changefreq: 'weekly',
    summary: 'Bellvix OS overview: modules, editions, compliance, WhatsApp Assistant, van sales, integrations.',
    cta: 'demo',
  },
  {
    path: '/bellvix-os/editions',
    page: 'osEditions',
    title: 'Bellvix OS Editions: Lite, SaaS & Enterprise',
    description:
      'Compare Bellvix OS Lite, SaaS and Enterprise. Every edition is e-invoicing ready with VAT return compliance, Corporate Tax, workflows and migration.',
    h1: 'Bellvix OS editions: Lite, SaaS and Enterprise',
    crumbs: [home, osCrumb, { name: 'Editions', path: '/bellvix-os/editions' }],
    og: 'bellvix-os',
    schema: ['Editions'],
    faqs: osFaqs.slice(1, 5),
    priority: 0.8,
    changefreq: 'monthly',
    summary: 'Editions comparison: Lite (SMEs), SaaS (hosted subscription), Enterprise (full suite, multi-branch).',
    cta: 'demo',
  },
  {
    path: '/case-studies',
    page: 'caseStudiesHub',
    title: 'Case Studies: Software & WhatsApp Automation',
    description:
      'Anonymous case studies of systems Bellvix has built for UAE businesses: CliniqFlow for a therapy clinic and RemindiQ for a trading group.',
    h1: 'Case studies',
    crumbs: [home, csCrumb],
    og: 'case-studies',
    schema: ['CollectionPage'],
    priority: 0.7,
    changefreq: 'monthly',
    summary: 'Case-study hub.',
    cta: 'talk',
  },
  ...caseRoutes,
  {
    path: '/industries',
    page: 'industries',
    title: 'Industries We Serve in the UAE',
    description:
      'Technology for healthcare and clinics, trading and distribution, retail and e-commerce, professional services and logistics businesses in the UAE.',
    h1: 'Industries we serve',
    crumbs: [home, { name: 'Industries', path: '/industries' }],
    og: 'default',
    schema: ['CollectionPage'],
    priority: 0.6,
    changefreq: 'monthly',
    summary: 'Industries: healthcare & clinics, trading & distribution, retail & e-commerce, professional services, logistics.',
    cta: 'talk',
  },
  {
    path: '/insights',
    page: 'insightsHub',
    title: 'Insights: UAE Technology & Compliance Guides',
    description:
      'Practical guides from the Bellvix Team on UAE e-invoicing, ERP, automation and digital growth.',
    h1: 'Insights',
    crumbs: [home, insightsCrumb],
    og: 'insights',
    schema: ['CollectionPage'],
    priority: 0.6,
    changefreq: 'weekly',
    summary: 'Articles and guides.',
    cta: 'talk',
  },
  {
    path: '/insights/uae-e-invoicing-guide',
    page: 'article',
    slug: article.slug,
    title: article.title,
    description: article.description,
    h1: article.h1,
    crumbs: [home, insightsCrumb, { name: 'UAE e-invoicing 2027 guide', path: '/insights/uae-e-invoicing-guide' }],
    og: 'einvoicing',
    schema: ['Article'],
    faqs: article.faqs,
    priority: 0.8,
    changefreq: 'monthly',
    summary: 'UAE e-invoicing 2027 guide: phased dates, ASP appointment, what to do now.',
    article: { published: article.published, modified: article.modified, author: 'Bellvix Team' },
    cta: 'talk',
  },
  {
    path: '/contact',
    page: 'contact',
    title: 'Contact Bellvix Technologies',
    description:
      'Talk to Bellvix: call or WhatsApp +971 50 180 7814, email info@bellvix.com or send an enquiry. Al Shmookh Business Center, UAQ Free Trade Zone, UAE.',
    h1: 'Contact Bellvix',
    crumbs: [home, { name: 'Contact', path: '/contact' }],
    og: 'default',
    schema: ['ContactPage', 'ProfessionalService'],
    priority: 0.8,
    changefreq: 'yearly',
    summary: 'Contact form, phone, WhatsApp, email and address.',
    cta: 'talk',
  },
  {
    path: '/privacy',
    page: 'privacy',
    title: 'Privacy Policy',
    description: 'How Bellvix Technologies FZE collects, uses and protects information submitted through bellvix.com.',
    h1: 'Privacy policy',
    crumbs: [home, { name: 'Privacy policy', path: '/privacy' }],
    og: 'default',
    schema: [],
    priority: 0.2,
    changefreq: 'yearly',
    summary: 'Privacy policy.',
    cta: 'talk',
  },
  {
    path: '/terms',
    page: 'terms',
    title: 'Terms of Use',
    description: 'Terms of use for the Bellvix Technologies FZE website, bellvix.com.',
    h1: 'Terms of use',
    crumbs: [home, { name: 'Terms of use', path: '/terms' }],
    og: 'default',
    schema: [],
    priority: 0.2,
    changefreq: 'yearly',
    summary: 'Website terms of use.',
    cta: 'talk',
  },
  {
    path: '/thank-you',
    page: 'thankYou',
    title: 'Thank You',
    description: 'Thanks for contacting Bellvix Technologies. We will reply soon.',
    h1: 'Thank you, we have your message',
    crumbs: [],
    og: 'default',
    schema: [],
    noindex: true,
    priority: 0,
    changefreq: 'yearly',
    summary: '',
    cta: 'talk',
  },
]

export const notFoundRoute: Route = {
  path: '/404',
  page: 'notFound',
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist on bellvix.com.',
  h1: 'Page not found',
  crumbs: [],
  og: 'default',
  schema: [],
  noindex: true,
  priority: 0,
  changefreq: 'yearly',
  summary: '',
  cta: 'talk',
}

export function normalisePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\.html$/, '').replace(/\/index$/, '/')
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1)
  return clean || '/'
}

export function findRoute(path: string): Route {
  const p = normalisePath(path)
  return routes.find((r) => r.path === p) ?? notFoundRoute
}
