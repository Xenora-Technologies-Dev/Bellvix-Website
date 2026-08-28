export const company = {
  name: 'BELLVIX TECHNOLOGIES',
  shortName: 'BELLVIX',
  legalName: 'Bellvix Technologies FZE',

  /**
   * International E.164 format. Leave empty to hide phone UI everywhere.
   * Example: "+971501807814"
   */
  phone: '+971501807814',

  /**
   * Optional display override. If empty, a readable format is derived from `phone`.
   */
  phoneDisplay: '+971 50 180 7814',

  /**
   * Leave empty to hide email UI everywhere.
   */
  email: '',

  /**
   * WhatsApp number in international digits without "+" or spaces.
   * Derived from phone when empty. Leave phone empty to hide WhatsApp as well.
   */
  whatsapp: '971501807814',

  address: {
    line1: 'Al Shmookh Business Center',
    line2: 'One UAQ',
    line3: 'UAQ Free Trade Zone',
    country: 'United Arab Emirates',
  },
} as const

export const hasPhone = company.phone.trim().length > 0
export const hasEmail = company.email.trim().length > 0

export function displayPhone(): string {
  if (!hasPhone) return ''
  if (company.phoneDisplay.trim()) return company.phoneDisplay
  return company.phone
}

export function telHref(): string {
  if (!hasPhone) return ''
  return `tel:${company.phone}`
}

export function mailtoHref(): string {
  if (!hasEmail) return ''
  return `mailto:${company.email}`
}

export function whatsappHref(prefill?: string): string {
  const digits =
    company.whatsapp.trim() || company.phone.replace(/\D/g, '').replace(/^00/, '')
  if (!hasPhone || !digits) return ''
  const base = `https://wa.me/${digits}`
  if (!prefill) return base
  return `${base}?text=${encodeURIComponent(prefill)}`
}

export function addressLines(): string[] {
  const { line1, line2, line3, country } = company.address
  return [company.legalName, line1, line2, line3, country]
}

export function cityCountry(): string {
  return 'UAE'
}
