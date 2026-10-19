import type { Faq } from './types'

export const odcSteps = [
  { name: 'Scope', text: 'We agree the skills, seniority, tools and working hours you need.' },
  { name: 'Hire', text: 'Bellvix sources and screens engineers in India for the skills you need.' },
  { name: 'Onboard', text: 'The team is set up on your tools, repositories and processes, with access controls in place.' },
  { name: 'Deliver', text: 'Work runs in agreed sprints with delivery management and regular reporting from Bellvix.' },
  { name: 'Scale', text: 'Grow or reduce the team as your roadmap changes.' },
]

export const odcRoles = [
  'Frontend and full-stack developers',
  'Backend and API developers',
  'Mobile app developers',
  'QA and test automation engineers',
  'UI/UX designers',
  'DevOps and cloud engineers',
  'Data and AI engineers',
  'Project and delivery managers',
]

export const odcGovernance = [
  { name: 'Delivery management', text: 'A Bellvix delivery lead coordinates the team and is your single point of contact.' },
  { name: 'Reporting', text: 'Regular progress reports, sprint reviews and visibility into work in progress.' },
  { name: 'IP and confidentiality', text: 'Confidentiality and IP terms are agreed up front, and access to your systems is controlled.' },
  { name: 'Engagement model', text: 'Team size, duration and commercial model are discussed and agreed mutually.' },
]

export const odcFaqs: Faq[] = [
  {
    q: 'What is an offshore development centre (ODC)?',
    a: 'An offshore development centre is a dedicated remote team that works only on your products, like an extension of your in-house team. With Bellvix, the team is based in India and set up, managed and reported on by Bellvix.',
  },
  {
    q: 'Where is the Bellvix ODC team based?',
    a: 'The ODC team is based in India. Bellvix handles hiring, onboarding and delivery management, and coordinates with you from the UAE.',
  },
  {
    q: 'What is the engagement model?',
    a: 'There is no fixed package. Team size, roles, working hours, duration and the commercial model are discussed and agreed mutually based on your roadmap.',
  },
  {
    q: 'Who owns the code and IP?',
    a: 'IP ownership and confidentiality are agreed in writing before work starts, and access to your systems is controlled and can be revoked at any time.',
  },
  {
    q: 'Can we scale the team up or down?',
    a: 'Yes. The team can grow or shrink as your roadmap changes, with notice periods agreed as part of the engagement.',
  },
]

export const whatsappUseCases = [
  { name: 'Bookings and appointments', text: 'Customers book, confirm, reschedule or cancel without calling.' },
  { name: 'Confirmations and reminders', text: 'Automatic messages before appointments, renewals and payment dates.' },
  { name: 'Staff assistants', text: 'Staff check today’s tasks, create events or assign them to a colleague from a chat menu.' },
  { name: 'Live ERP and CRM data', text: 'Stock, prices, balances and order status on request, straight from your system.' },
  { name: 'Lead capture and FAQs', text: 'Answer common questions and qualify leads, then hand over to sales.' },
  { name: 'Approvals and summaries', text: 'Approve requests with one tap and receive daily summaries.' },
]

export const whatsappIncluded = [
  'Conversation design with interactive buttons and list menus',
  'WhatsApp Business Platform setup and message templates',
  'Integration with your ERP, CRM, booking or custom system',
  'Handover to staff with full chat history',
  'Message log and delivery tracking',
  'Optional AI for free-text questions, in multiple languages',
]

export const whatsappFaqs: Faq[] = [
  {
    q: 'What can a WhatsApp chatbot do for my business?',
    a: 'A WhatsApp chatbot can take bookings, send confirmations and reminders, answer FAQs, capture and qualify leads, share live data such as stock or order status, and route approvals, all on the app your customers and staff already use, with handover to a person when needed.',
  },
  {
    q: 'Do I need the WhatsApp Business Platform?',
    a: 'For automated, integrated chatbots, yes. We set up the WhatsApp Business Platform for your number, register message templates and connect it to your systems. A WhatsApp button on your website does not need it.',
  },
  {
    q: 'Can the chatbot connect to our ERP or booking system?',
    a: 'Yes. Our bots read and write data in your ERP, CRM, booking system or custom software, so answers are live and actions such as bookings or reminders are recorded in the system.',
  },
  {
    q: 'Can customers talk to a real person?',
    a: 'Yes. The bot hands the conversation to staff when a request is unusual, sensitive or a customer asks for a person, and staff see the full chat history.',
  },
  {
    q: 'Have you built WhatsApp bots before?',
    a: 'Yes. CliniqFlow sends booking confirmations and handles reschedules and cancellations for a therapy clinic, and RemindiQ gives a trading group a WhatsApp assistant for reminders and events. Both are described in our case studies.',
  },
]

export const einvoicingSteps = [
  { name: 'Readiness review', text: 'We review your ERP or billing system, invoice data and processes against the e-invoicing requirements.' },
  { name: 'Data clean-up', text: 'Customer, supplier, product and tax data is corrected and completed so invoices validate.' },
  { name: 'ASP connection', text: 'We connect your system to the Accredited Service Provider you appoint.' },
  { name: 'End-to-end testing', text: 'Invoices are tested from creation to submission before your deadline.' },
  { name: 'Go-live support', text: 'We stay on through go-live and fix issues as they appear.' },
]

export const einvoicingFaqs: Faq[] = [
  {
    q: 'When does UAE e-invoicing become mandatory?',
    a: 'In phases. Businesses with revenue of AED 50 million or more must appoint an Accredited Service Provider by 30 October 2026 and comply from 1 January 2027. Businesses below AED 50 million must appoint one by 31 March 2027 and comply from 1 July 2027. Government entities follow from 1 October 2027.',
  },
  {
    q: 'Is Bellvix an Accredited Service Provider?',
    a: 'No. Bellvix is not an Accredited Service Provider (ASP). We get your ERP or billing system e-invoicing ready and connect it to the ASP you appoint, then test the full flow.',
  },
  {
    q: 'Does my current ERP need to be replaced?',
    a: 'Not necessarily. Many systems can be made ready through data clean-up and an integration with your ASP. If your current software cannot support it, Bellvix OS is e-invoicing ready and we can migrate your data.',
  },
  {
    q: 'What should we do first?',
    a: 'Confirm which phase applies to you based on revenue, choose and appoint an Accredited Service Provider before your deadline, and review your invoice data. We can run the readiness review and data clean-up in parallel.',
  },
  {
    q: 'Where do these dates come from?',
    a: 'From Ministerial Decision No. 244 of 2025, Ministerial Decision No. 66 of 2026 and the UAE Ministry of Finance e-invoicing guidelines. Always confirm your obligations with the Ministry of Finance or your tax adviser.',
  },
]
