import type { IconName, Link } from './types'

export type Industry = { id: string; name: string; icon: IconName; summary: string; needs: string[]; links: Link[] }

export const industries: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & clinics',
    icon: 'stethoscope',
    summary: 'Scheduling, rooms, practitioners and patient communication in one system.',
    needs: ['Room- and practitioner-based booking', 'WhatsApp confirmations and reminders', 'Patient records and reports', 'Role-based access for clinical staff'],
    links: [
      { label: 'CliniqFlow case study', href: '/case-studies/cliniqflow' },
      { label: 'WhatsApp chatbots', href: '/services/ai-automation/whatsapp-chatbot-development' },
    ],
  },
  {
    id: 'trading-distribution',
    name: 'Trading & distribution',
    icon: 'package',
    summary: 'Buying, stock, selling and collections for traders, including food trading.',
    needs: ['ERP with VAT and e-invoicing readiness', 'Batch and expiry tracking for food lines', 'Van-sales billing and route collections', 'Enquiry tracking and supplier search'],
    links: [
      { label: 'Bellvix OS', href: '/bellvix-os' },
      { label: 'RemindiQ case study', href: '/case-studies/remindiq' },
    ],
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & e-commerce',
    icon: 'store',
    summary: 'Online stores, inventory and customer messaging that stay in sync.',
    needs: ['B2C and B2B online stores', 'Stock and order sync with the ERP', 'WhatsApp order updates', 'SEO and performance marketing'],
    links: [
      { label: 'Web & commerce', href: '/services/web-commerce' },
      { label: 'Brand & marketing', href: '/services/brand-marketing' },
    ],
  },
  {
    id: 'professional-services',
    name: 'Professional services',
    icon: 'briefcase',
    summary: 'Clients, projects, time and compliance deadlines under control.',
    needs: ['CRM and quotations', 'Projects, timesheets and costing', 'Deadline and renewal reminders', 'Corporate Tax and VAT readiness'],
    links: [
      { label: 'Bellvix OS', href: '/bellvix-os' },
      { label: 'AI & automation', href: '/services/ai-automation' },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: 'truck',
    summary: 'Routes, deliveries, documents and integrations that keep goods moving.',
    needs: ['Delivery notes and proof of delivery', 'Driver apps and route billing', 'Integrations with carriers and portals', 'Document reading with OCR'],
    links: [
      { label: 'Software & apps', href: '/services/software-development' },
      { label: 'Business systems', href: '/services/business-systems' },
    ],
  },
]
