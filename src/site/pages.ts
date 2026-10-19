import type { ComponentType } from 'react'
import type { PageKey, Route } from './routes'

export type PageComponent = ComponentType<{ route: Route }>
type Loader = () => Promise<PageComponent>

/** Route-level code splitting: each page template is its own chunk. */
export const pageLoaders: Record<PageKey, Loader> = {
  home: () => import('../pages/Home').then((m) => m.default),
  about: () => import('../pages/About').then((m) => m.default),
  servicesHub: () => import('../pages/ServicesHub').then((m) => m.default),
  serviceCategory: () => import('../pages/ServiceCategory').then((m) => m.default),
  odc: () => import('../pages/Odc').then((m) => m.default),
  whatsappBot: () => import('../pages/WhatsAppBot').then((m) => m.default),
  einvoicing: () => import('../pages/EInvoicing').then((m) => m.default),
  osOverview: () => import('../pages/OsOverview').then((m) => m.default),
  osEditions: () => import('../pages/OsEditions').then((m) => m.default),
  caseStudiesHub: () => import('../pages/CaseStudiesHub').then((m) => m.default),
  caseStudy: () => import('../pages/CaseStudy').then((m) => m.default),
  industries: () => import('../pages/Industries').then((m) => m.default),
  insightsHub: () => import('../pages/InsightsHub').then((m) => m.default),
  article: () => import('../pages/Article').then((m) => m.default),
  contact: () => import('../pages/Contact').then((m) => m.default),
  privacy: () => import('../pages/Legal').then((m) => m.Privacy),
  terms: () => import('../pages/Legal').then((m) => m.Terms),
  thankYou: () => import('../pages/Misc').then((m) => m.ThankYou),
  notFound: () => import('../pages/Misc').then((m) => m.NotFound),
}

/** Source file per page (used by the prerender script to add modulepreload hints). */
export const pageFiles: Record<PageKey, string> = {
  home: 'src/pages/Home.tsx',
  about: 'src/pages/About.tsx',
  servicesHub: 'src/pages/ServicesHub.tsx',
  serviceCategory: 'src/pages/ServiceCategory.tsx',
  odc: 'src/pages/Odc.tsx',
  whatsappBot: 'src/pages/WhatsAppBot.tsx',
  einvoicing: 'src/pages/EInvoicing.tsx',
  osOverview: 'src/pages/OsOverview.tsx',
  osEditions: 'src/pages/OsEditions.tsx',
  caseStudiesHub: 'src/pages/CaseStudiesHub.tsx',
  caseStudy: 'src/pages/CaseStudy.tsx',
  industries: 'src/pages/Industries.tsx',
  insightsHub: 'src/pages/InsightsHub.tsx',
  article: 'src/pages/Article.tsx',
  contact: 'src/pages/Contact.tsx',
  privacy: 'src/pages/Legal.tsx',
  terms: 'src/pages/Legal.tsx',
  thankYou: 'src/pages/Misc.tsx',
  notFound: 'src/pages/Misc.tsx',
}
