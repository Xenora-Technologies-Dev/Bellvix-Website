import { company } from '../config/company'
import { faqs } from '../data/faqs'

const SITE_URL = 'https://www.bellvix.com'
const LOGO_URL = `${SITE_URL}/bellvix-logo.png`

function jsonLd(data: unknown): string {
  return JSON.stringify(data)
}

export function Seo() {
  const streetAddress = [company.address.line1, company.address.line2]
    .filter(Boolean)
    .join(', ')

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: 'Umm Al Quwain',
      addressRegion: 'UAQ Free Trade Zone',
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['en'],
    },
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    image: LOGO_URL,
    telephone: company.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: 'Umm Al Quwain',
      addressRegion: 'UAQ Free Trade Zone',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'AE',
    },
    areaServed: 'AE',
    description:
      'IT consulting, software development, AI software development, AI consulting, branding and digital marketing from the UAE.',
    knowsAbout: [
      'IT Consulting',
      'Software Development',
      'Artificial Intelligence',
      'Digital Marketing',
      'Branding',
    ],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    description:
      'BELLVIX TECHNOLOGIES provides IT consulting, software development, AI software development, AI consulting, branding and digital marketing services from the UAE.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-AE',
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPage) }}
      />
    </>
  )
}
