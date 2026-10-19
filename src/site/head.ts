import { company, sameAsUrls, SITE_URL } from '../config/company'
import { caseStudyBySlug } from '../content/caseStudies'
import { categoryBySlug } from '../content/services'
import { editions, osModules, osSummary } from '../content/bellvixOs'
import { DEFAULT_LOCALE, LOCALES, markdownPath, SITE_LASTMOD } from '../config/seo'
import type { Route } from './routes'

const ORG_ID = `${SITE_URL}/#organization`
const LB_ID = `${SITE_URL}/#localbusiness`
const WEBSITE_ID = `${SITE_URL}/#website`
const LOGO = `${SITE_URL}/images/bellvix-logo-512.png`

export const absUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

export function fullTitle(route: Route): string {
  if (route.page === 'home') return route.title
  const withBrand = `${route.title} | Bellvix`
  return withBrand.length <= 60 ? withBrand : route.title
}

const address = {
  '@type': 'PostalAddress',
  streetAddress: `${company.address.line1}, ${company.address.line2}`,
  addressLocality: company.address.locality,
  addressRegion: company.address.line3,
  addressCountry: company.address.countryCode,
}

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
    email: company.email,
    telephone: company.phone,
    address,
    sameAs: sameAsUrls(),
    slogan: company.heroLine,
    description: company.about,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        email: company.email,
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: ['en'],
      },
    ],
  }
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: company.name,
    inLanguage: 'en-AE',
    publisher: { '@id': ORG_ID },
  }
}

function localBusiness() {
  return {
    '@type': 'ProfessionalService',
    '@id': LB_ID,
    name: company.name,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    image: LOGO,
    logo: LOGO,
    telephone: company.phone,
    email: company.email,
    address,
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Place', name: 'GCC' },
    ],
    parentOrganization: { '@id': ORG_ID },
    sameAs: sameAsUrls(),
    knowsAbout: [
      'IT consulting',
      'Custom software development',
      'Mobile app development',
      'AI agents',
      'WhatsApp chatbot development',
      'ERP software',
      'UAE e-invoicing',
      'Website development',
      'E-commerce development',
      'Branding',
      'Digital marketing',
    ],
  }
}

function breadcrumb(route: Route) {
  if (!route.crumbs.length) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(route.path)}#breadcrumb`,
    itemListElement: route.crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  }
}

function webPage(route: Route) {
  const type = route.schema.includes('AboutPage')
    ? 'AboutPage'
    : route.schema.includes('ContactPage')
      ? 'ContactPage'
      : route.schema.includes('CollectionPage')
        ? 'CollectionPage'
        : 'WebPage'
  return {
    '@type': type,
    '@id': `${absUrl(route.path)}#webpage`,
    url: absUrl(route.path),
    name: fullTitle(route),
    description: route.description,
    inLanguage: 'en-AE',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...(route.crumbs.length ? { breadcrumb: { '@id': `${absUrl(route.path)}#breadcrumb` } } : {}),
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/og/${route.og}.png`, width: 1200, height: 630 },
    dateModified: route.article?.modified ?? SITE_LASTMOD,
  }
}

function service(route: Route) {
  const cat = route.slug ? categoryBySlug(route.slug) : undefined
  return {
    '@type': 'Service',
    '@id': `${absUrl(route.path)}#service`,
    name: route.serviceType ?? route.h1,
    serviceType: route.serviceType ?? route.h1,
    description: route.description,
    url: absUrl(route.path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    ...(cat && cat.subservices.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: cat.name,
            itemListElement: cat.subservices.map((s) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: s.name, description: s.summary },
            })),
          },
        }
      : {}),
  }
}

function softwareApp() {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/bellvix-os#software`,
    name: 'Bellvix OS',
    alternateName: 'Bellvix Company Operating System',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ERP',
    operatingSystem: 'Web',
    description: osSummary,
    url: `${SITE_URL}/bellvix-os`,
    publisher: { '@id': ORG_ID },
    featureList: osModules.map((m) => `${m.name}: ${m.summary}`).concat([
      'E-invoicing ready',
      'VAT return compliance',
      'Corporate Tax calculation',
      'WhatsApp Assistant',
      'Van-sales billing',
    ]),
  }
}

function editionApps() {
  return editions.map((e) => ({
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/bellvix-os/editions#${e.id}`,
    name: e.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: `${e.for}. ${e.scope}`,
    isPartOf: { '@id': `${SITE_URL}/bellvix-os#software` },
    publisher: { '@id': ORG_ID },
  }))
}

function articleNode(route: Route) {
  const cs = route.slug ? caseStudyBySlug(route.slug) : undefined
  return {
    '@type': 'Article',
    '@id': `${absUrl(route.path)}#article`,
    headline: route.h1,
    description: route.description,
    url: absUrl(route.path),
    mainEntityOfPage: { '@id': `${absUrl(route.path)}#webpage` },
    image: `${SITE_URL}/og/${route.og}.png`,
    datePublished: route.article?.published,
    dateModified: route.article?.modified,
    inLanguage: 'en-AE',
    author: { '@type': 'Organization', name: route.article?.author ?? 'Bellvix Team', url: `${SITE_URL}/about`, parentOrganization: { '@id': ORG_ID } },
    publisher: { '@id': ORG_ID },
    ...(cs ? { about: cs.tags.map((t) => ({ '@type': 'Thing', name: t })) } : {}),
  }
}

function faqPage(route: Route) {
  if (!route.faqs?.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${absUrl(route.path)}#faq`,
    mainEntity: route.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function buildJsonLd(route: Route): string {
  const graph: unknown[] = [organization(), website()]
  if (route.page !== 'notFound' && !route.noindex) graph.push(webPage(route))
  if (route.schema.includes('ProfessionalService')) graph.push(localBusiness())
  if (route.schema.includes('Service')) graph.push(service(route))
  if (route.schema.includes('SoftwareApplication')) graph.push(softwareApp())
  if (route.schema.includes('Editions')) graph.push(softwareApp(), ...editionApps())
  if (route.schema.includes('Article')) graph.push(articleNode(route))
  const bc = breadcrumb(route)
  if (bc) graph.push(bc)
  const faq = faqPage(route)
  if (faq) graph.push(faq)
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function buildHead(route: Route): string {
  const title = fullTitle(route)
  const url = absUrl(route.path)
  const og = `${SITE_URL}/og/${route.og}.png`
  const isArticle = Boolean(route.article)
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    route.page === 'notFound' ? '' : `<link rel="canonical" href="${url}" />`,
    ...(route.page === 'notFound' || route.noindex
      ? []
      : [
          ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l.lang}" href="${absUrl(`${l.prefix}${route.path === '/' && l.prefix ? '' : route.path}`)}" />`),
          `<link rel="alternate" hreflang="x-default" href="${url}" />`,
          `<link rel="alternate" type="text/markdown" title="Markdown version" href="${markdownPath(route.path)}" />`,
        ]),
    `<meta property="og:type" content="${isArticle ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(company.name)}" />`,
    `<meta property="og:locale" content="${DEFAULT_LOCALE.replace('-', '_')}" />`,
    route.page === 'notFound' ? '' : `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(title)}" />`,
    isArticle && route.article ? `<meta property="article:published_time" content="${route.article.published}" />` : '',
    isArticle && route.article ? `<meta property="article:modified_time" content="${route.article.modified}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    `<meta name="twitter:image:alt" content="${esc(title)}" />`,
    `<script type="application/ld+json">${buildJsonLd(route)}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}
