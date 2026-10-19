import type { Faq, IconName } from './types'

export const osTagline = 'The Company Operating System'
export const osSummary =
  'One connected platform for your entire company. Use the full suite, or start with one module and add more as you grow.'
export const aiNote = 'For more details, contact Bellvix.'

export type OsModule = { id: string; name: string; icon: IconName; summary: string; features: string[] }

export const osModules: OsModule[] = [
  {
    id: 'erp',
    name: 'ERP',
    icon: 'chart',
    summary: 'Run buying, selling, stock and accounts from one place.',
    features: ['Sales: quotations, orders, delivery notes, invoices, returns', 'Purchase: orders, goods received, vendor bills', 'Inventory: stock items, levels, batches and expiry', 'Finance: receipts, payments, journals, cheques, bank reconciliation, ledger', 'Chart of accounts, VAT and e-invoicing'],
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: 'users',
    summary: 'Track every lead from first enquiry to signed quotation.',
    features: ['Leads and enquiry capture', 'Pipeline stages and ownership', 'Quotations linked to ERP', 'Follow-ups and reminders'],
  },
  {
    id: 'hrms',
    name: 'HRMS',
    icon: 'briefcase',
    summary: 'People, time and payroll without the spreadsheets.',
    features: ['Employee records', 'Attendance and leave', 'Payroll', 'Document expiry alerts'],
  },
  {
    id: 'project-management',
    name: 'Project Management',
    icon: 'kanban',
    summary: 'Plan work, log time and see what every project costs.',
    features: ['Tasks and milestones', 'Timesheets', 'Project costing'],
  },
  {
    id: 'ai',
    name: 'AI features',
    icon: 'sparkles',
    summary: 'Ask questions of your business in plain language.',
    features: ['Business insights', 'Natural-language reports', 'Smart reminders'],
  },
]

export type Edition = { id: 'lite' | 'saas' | 'enterprise'; name: string; for: string; scope: string; points: string[] }

export const editions: Edition[] = [
  {
    id: 'lite',
    name: 'Bellvix OS Lite',
    for: 'SMEs, small and single-person companies',
    scope: 'Sales, purchase, inventory, finance and VAT, with e-invoicing readiness.',
    points: ['Sales and purchase', 'Inventory', 'Finance and accounts', 'VAT', 'E-invoicing ready'],
  },
  {
    id: 'saas',
    name: 'Bellvix OS SaaS',
    for: 'Small businesses that want subscription cloud access',
    scope: 'The Lite scope, hosted and maintained by Bellvix on a subscription.',
    points: ['Everything in Lite', 'Hosted by Bellvix', 'Subscription access', 'Updates and backups handled for you'],
  },
  {
    id: 'enterprise',
    name: 'Bellvix OS Enterprise',
    for: 'MSMEs and high-end clients',
    scope: 'The full suite with multi-branch operations and custom workflows.',
    points: ['ERP, CRM, HRMS, projects and AI', 'Multi-branch', 'Custom workflows', 'Integrations and migration'],
  },
]

export const everyEditionIncludes: { name: string; icon: IconName }[] = [
  { name: 'Standard and custom workflows', icon: 'kanban' },
  { name: 'E-invoicing ready', icon: 'receipt' },
  { name: 'Corporate Tax calculation', icon: 'chart' },
  { name: 'VAT return compliance', icon: 'shield' },
  { name: 'Integration with existing and third-party systems', icon: 'plug' },
  { name: 'Database migration support', icon: 'database' },
]

export const extensions = [
  { id: 'whatsapp-assistant', name: 'WhatsApp Assistant', icon: 'message' as IconName, points: ['Live stock, prices, balances and sales figures on WhatsApp', 'Approvals and daily summaries', 'Fully customisable'] },
  { id: 'van-sales', name: 'Van-sales billing', icon: 'truck' as IconName, points: ['Drivers invoice and record collections by route', 'Synced to the ERP in real time'] },
  { id: 'integrations', name: 'Integrations', icon: 'plug' as IconName, points: ['E-commerce, payment and logistics platforms', 'Your Accredited Service Provider for e-invoicing', 'Existing ERP, accounting and HR tools'] },
  { id: 'migration', name: 'Database migration', icon: 'database' as IconName, points: ['From spreadsheets or legacy software', 'Data mapping, cleansing and validation', 'Parallel runs before switch-over'] },
]

/** Editions comparison table rows. Only what the brief states; unknown packaging = "Ask us". */
export const comparison: { feature: string; lite: boolean | string; saas: boolean | string; enterprise: boolean | string }[] = [
  { feature: 'Sales, purchase and inventory', lite: true, saas: true, enterprise: true },
  { feature: 'Finance, accounts and VAT', lite: true, saas: true, enterprise: true },
  { feature: 'E-invoicing ready', lite: true, saas: true, enterprise: true },
  { feature: 'Corporate Tax calculation', lite: true, saas: true, enterprise: true },
  { feature: 'VAT return compliance', lite: true, saas: true, enterprise: true },
  { feature: 'Standard and custom workflows', lite: true, saas: true, enterprise: true },
  { feature: 'Integration with existing and third-party systems', lite: true, saas: true, enterprise: true },
  { feature: 'Database migration support', lite: true, saas: true, enterprise: true },
  { feature: 'Hosted and maintained by Bellvix (subscription)', lite: 'Ask us', saas: true, enterprise: 'Ask us' },
  { feature: 'Full suite: CRM, HRMS, projects and AI', lite: 'Ask us', saas: 'Ask us', enterprise: true },
  { feature: 'Multi-branch operations', lite: 'Ask us', saas: 'Ask us', enterprise: true },
  { feature: 'WhatsApp Assistant and van-sales billing', lite: 'Extension', saas: 'Extension', enterprise: 'Extension' },
]

export const osFaqs: Faq[] = [
  {
    q: 'What is Bellvix OS?',
    a: 'Bellvix OS is a company operating system from Bellvix Technologies: one connected platform for ERP, CRM, HRMS, project management and AI features. You can use the full suite or start with one module, such as the ERP, and add more as you grow.',
  },
  {
    q: 'Is Bellvix OS ready for UAE e-invoicing?',
    a: 'Yes. Every edition of Bellvix OS is e-invoicing ready, and Bellvix connects it to the Accredited Service Provider (ASP) you appoint. Bellvix is not an ASP itself. The platform also covers VAT return compliance and Corporate Tax calculation.',
  },
  {
    q: 'Which Bellvix OS edition is right for my business?',
    a: 'Lite suits SMEs and single-person companies that need sales, purchase, inventory, finance and VAT. SaaS gives the same scope as a hosted subscription. Enterprise is for MSMEs and larger clients that need the full suite, multiple branches and custom workflows.',
  },
  {
    q: 'Can we move our data from spreadsheets or another system?',
    a: 'Yes. Database migration support is included with every edition. We map, clean and validate your data, then run old and new systems in parallel before you switch over.',
  },
  {
    q: 'How much does Bellvix OS cost?',
    a: 'Pricing depends on the edition, modules, users and any custom workflows or integrations. Book a demo or message us on WhatsApp and we will recommend a setup and share a quote.',
  },
  {
    q: 'Does Bellvix OS work on WhatsApp?',
    a: 'Yes, through the WhatsApp Assistant extension: staff can check live stock, prices, balances and sales figures, approve requests and receive daily summaries on WhatsApp, and van-sales drivers can invoice and record collections by route.',
  },
]
