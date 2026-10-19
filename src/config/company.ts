/** Single source of truth for company facts (NAP). Used by layout, schema, llms files. */
export const SITE_URL = 'https://bellvix.com'

export const company = {
  name: 'Bellvix Technologies',
  shortName: 'Bellvix',
  legalName: 'Bellvix Technologies FZE',
  tagline: 'IT, Software, AI & Digital Solutions',
  heroLine: 'Building smarter businesses for a changing world.',
  phone: '+971501807814',
  phoneDisplay: '+971 50 180 7814',
  email: 'info@bellvix.com',
  whatsapp: '971501807814',
  address: {
    line1: 'Al Shmookh Business Center',
    line2: 'One UAQ',
    line3: 'UAQ Free Trade Zone',
    locality: 'Umm Al Quwain',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
  social: {
    instagram: 'https://www.instagram.com/bellvix.tech',
    linkedin: 'https://www.linkedin.com/company/bellvix-technologies',
  },
  vision:
    'To be the established technology partner that businesses across every industry trust to power their digital needs.',
  mission:
    'We help businesses succeed in a digital-first world. We understand their challenges, engineer the right technology, and keep it evolving as they grow, so it always serves the business and never the other way round.',
  about:
    'Bellvix Technologies is a UAE-based technology and digital growth company. We help organisations solve business challenges through modern technology, AI, software, branding and digital marketing, from strategy through delivery.',
} as const

/** Entity facts block: identical wording on About, footer, llms.txt. */
export const entityFacts = [
  `Legal name: ${company.legalName}`,
  'Type: Free Zone Establishment (FZE), UAE',
  `Address: ${company.address.line1}, ${company.address.line2}, ${company.address.line3}, ${company.address.country}`,
  'Offer: IT consulting, software and mobile apps, AI and automation, WhatsApp chatbots, Bellvix OS (company operating system: ERP, CRM, HRMS, project management), UAE e-invoicing integration, websites and e-commerce, branding and digital marketing',
  `Phone and WhatsApp: ${company.phoneDisplay}`,
  `Email: ${company.email}`,
]

export const socialLinks = [
  { network: 'instagram' as const, label: 'Instagram', ariaLabel: 'Bellvix on Instagram', url: company.social.instagram },
  { network: 'linkedin' as const, label: 'LinkedIn', ariaLabel: 'Bellvix on LinkedIn', url: company.social.linkedin },
]

export const sameAsUrls = (): string[] => socialLinks.map((l) => l.url)
export const telHref = () => `tel:${company.phone}`
export const mailtoHref = (subject?: string) =>
  `mailto:${company.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
export function whatsappHref(prefill?: string): string {
  const base = `https://wa.me/${company.whatsapp}`
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base
}
export const addressLines = () => [
  company.legalName,
  company.address.line1,
  company.address.line2,
  company.address.line3,
  company.address.country,
]
