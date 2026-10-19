import { categories } from '../content/services'

export type NavLink = { label: string; href: string; desc?: string }
export type NavGroup = { heading: string; href: string; links: NavLink[] }

export const serviceGroups: NavGroup[] = categories.map((c) => ({
  heading: c.name,
  href: `/services/${c.slug}`,
  links: c.subservices
    .slice(0, 6)
    .map((s) => ({ label: s.name, href: s.href ?? `/services/${c.slug}#${s.id}` })),
}))

export const osLinks: NavLink[] = [
  { label: 'Overview', href: '/bellvix-os', desc: 'The company operating system' },
  { label: 'Editions', href: '/bellvix-os/editions', desc: 'Lite, SaaS and Enterprise' },
  { label: 'ERP', href: '/bellvix-os#erp' },
  { label: 'CRM', href: '/bellvix-os#crm' },
  { label: 'HRMS', href: '/bellvix-os#hrms' },
  { label: 'Project Management', href: '/bellvix-os#project-management' },
  { label: 'AI features', href: '/bellvix-os#ai' },
  { label: 'WhatsApp Assistant', href: '/bellvix-os#whatsapp-assistant' },
  { label: 'UAE compliance', href: '/bellvix-os#compliance' },
]

export const companyLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Offshore development centre', href: '/services/technology-consulting/offshore-development-centre' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

/** Flat top-level links shown after the Services menu (desktop and mobile, same order). */
export const leadLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

export const primaryLinks: NavLink[] = [
  { label: 'Bellvix OS', href: '/bellvix-os' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]
