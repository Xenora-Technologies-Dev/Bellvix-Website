import type { Faq, IconName, Link } from './types'

export type SubService = {
  id: string
  name: string
  summary: string
  bullets?: string[]
  href?: string
}

export type Category = {
  slug: string
  number: string
  name: string
  short: string
  icon: IconName
  title: string
  description: string
  h1: string
  intro: string
  subservices: SubService[]
  deliverables: string[]
  tech: string[]
  caseStudy?: 'cliniqflow' | 'remindiq'
  related: Link[]
  faqs: Faq[]
  keyword: string
}

export const categories: Category[] = [
  {
    slug: 'technology-consulting',
    number: '01',
    name: 'Technology & Consulting',
    short: 'IT strategy, cloud and dedicated offshore engineering teams.',
    icon: 'compass',
    keyword: 'IT consulting UAE',
    title: 'IT Consulting, Cloud & ODC Services in the UAE',
    description:
      'IT consulting, IT services, cloud development and offshore development centre (ODC) setup for UAE businesses, from roadmap to managed delivery.',
    h1: 'IT consulting, cloud and engineering teams for UAE businesses',
    intro:
      'We align technology with how your business actually runs: a clear roadmap, the right infrastructure and, when you need more hands, a dedicated engineering team set up and managed by Bellvix.',
    subservices: [
      {
        id: 'it-consulting',
        name: 'IT consulting & IT services',
        summary:
          'Strategy, architecture, infrastructure and advisory that align IT with business goals.',
        bullets: [
          'Technology roadmaps and digital transformation',
          'Process optimisation',
          'IT support, performance and security',
        ],
      },
      {
        id: 'cloud-development',
        name: 'Cloud development',
        summary: 'Cloud-native apps, migration and managed hosting that scale securely.',
        bullets: ['Migration and deployment', 'Backups and monitoring', 'Cost-aware architecture'],
      },
      {
        id: 'offshore-development-centre',
        name: 'Offshore development centre (ODC)',
        summary:
          'Your own dedicated remote engineering team in India, set up and managed by Bellvix.',
        bullets: [
          'Team sizing and hiring for the skills you need',
          'Delivery management and reporting',
          'Flexible scale-up or scale-down',
          'IP and confidentiality protection',
        ],
        href: '/services/technology-consulting/offshore-development-centre',
      },
    ],
    deliverables: [
      'Technology assessment and roadmap',
      'Target architecture and infrastructure plan',
      'Cloud migration runbook',
      'Monitoring, backup and security baseline',
      'ODC team plan and reporting cadence',
    ],
    tech: ['Cloud hosting', 'Docker', 'Linux', 'PostgreSQL', 'Netlify', 'Railway'],
    related: [
      { label: 'Software development', href: '/services/software-development' },
      { label: 'Business systems & compliance', href: '/services/business-systems' },
      { label: 'Bellvix OS', href: '/bellvix-os' },
    ],
    faqs: [
      {
        q: 'What does an IT consulting engagement with Bellvix include?',
        a: 'It starts with a short discovery of your processes, systems and goals. We then deliver a prioritised roadmap covering architecture, infrastructure, security and the highest-value projects, and we can stay on to build, migrate or manage what the roadmap recommends.',
      },
      {
        q: 'Can you move our systems to the cloud?',
        a: 'Yes. We plan the migration, set up the target environment, move applications and data with backups and testing, and add monitoring afterwards. The architecture is sized to your usage so you are not paying for capacity you do not need.',
      },
      {
        q: 'Where is the offshore development team based?',
        a: 'Our offshore development centre (ODC) team is based in India and managed by Bellvix, so you get dedicated engineers with UAE-side coordination. The engagement model, team size and duration are discussed and agreed mutually for each client.',
      },
      {
        q: 'Do you work with small businesses as well as larger companies?',
        a: 'Yes. We work with single-founder companies, SMEs and larger organisations. The scope is matched to the stage of the business, from a focused advisory session to an ongoing managed engagement.',
      },
    ],
  },
  {
    slug: 'software-development',
    number: '02',
    name: 'Software & Apps',
    short: 'Custom software, mobile apps, SaaS products, APIs and internal tools.',
    icon: 'code',
    keyword: 'custom software development UAE',
    title: 'Custom Software & Mobile App Development in the UAE',
    description:
      'Custom software, iOS and Android apps, SaaS products, API integrations and internal tools, built around your processes, users and data.',
    h1: 'Custom software and mobile app development in the UAE',
    intro:
      'Software built around your processes, users and data, from booking systems and dealer portals to mobile apps published on the App Store and Google Play.',
    subservices: [
      {
        id: 'custom-software-development',
        name: 'Custom software development',
        summary: 'Software built around your processes, users and data.',
        bullets: [
          'Booking and scheduling systems',
          'Inventory and order management',
          'Customer and dealer portals, B2B ordering',
          'Field and van-sales apps',
          'Dashboards and reports',
        ],
      },
      {
        id: 'mobile-app-development',
        name: 'Mobile app development & publishing',
        summary: 'Native and cross-platform iOS and Android apps, from design to launch.',
        bullets: ['UI/UX, development and backend', 'App Store and Google Play publishing', 'Updates and maintenance'],
      },
      {
        id: 'saas-product-development',
        name: 'SaaS product development',
        summary: 'Turn an idea into a subscription product.',
        bullets: ['MVP to scale', 'Multi-tenant architecture, billing and admin consoles'],
      },
      {
        id: 'api-integration',
        name: 'API integration & backend systems',
        summary:
          'Connect your apps, payment gateways, logistics, banks, ERPs and third-party platforms.',
        bullets: ['REST and webhook APIs', 'Secure, documented backends'],
      },
      {
        id: 'internal-tools',
        name: 'Internal tools',
        summary: 'Admin panels, approval flows and operations dashboards that replace spreadsheets.',
      },
    ],
    deliverables: [
      'Clickable prototype and agreed scope',
      'Web, iOS and Android applications',
      'Documented APIs and admin console',
      'Store listings and release management',
      'Maintenance and support plan',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'REST & webhooks'],
    caseStudy: 'cliniqflow',
    related: [
      { label: 'AI & automation', href: '/services/ai-automation' },
      { label: 'Web & commerce', href: '/services/web-commerce' },
      { label: 'Case studies', href: '/case-studies' },
    ],
    faqs: [
      {
        q: 'What kind of custom software do you build?',
        a: 'Business software that replaces spreadsheets and manual steps: booking and scheduling systems, inventory and order management, customer and dealer portals, B2B ordering, field and van-sales apps, internal approval tools and reporting dashboards.',
      },
      {
        q: 'Do you build both iOS and Android apps?',
        a: 'Yes. We build native or cross-platform apps depending on your needs, design the interface, build the backend and handle publishing on the App Store and Google Play, followed by updates and maintenance.',
      },
      {
        q: 'Can you connect our new software to our existing systems?',
        a: 'Yes. We integrate with payment gateways, logistics providers, banks, ERPs and other third-party platforms through REST and webhook APIs, and we document the backend so it can be maintained.',
      },
      {
        q: 'How do you scope and estimate a software project?',
        a: 'We run a short discovery to map users, workflows and integrations, agree the scope for a first release, and share a plan with milestones. Estimates are provided per project after that discovery.',
      },
    ],
  },
  {
    slug: 'ai-automation',
    number: '03',
    name: 'AI & Automation',
    short: 'AI agents, WhatsApp chatbots, workflow automation and AI vision.',
    icon: 'bot',
    keyword: 'AI automation UAE',
    title: 'AI Agents, WhatsApp Chatbots & Automation in the UAE',
    description:
      'AI consulting, custom AI software, voice and chat agents, WhatsApp chatbot development, workflow automation and AI vision for UAE businesses.',
    h1: 'AI agents, WhatsApp chatbots and automation for UAE businesses',
    intro:
      'We look for AI where it gives a real advantage, then build it into the tools your team and customers already use: WhatsApp, email, voice and your CRM or ERP.',
    subservices: [
      {
        id: 'ai-consulting',
        name: 'AI consulting & strategy',
        summary: 'Find high-value AI use cases, evaluate them and build a practical roadmap.',
      },
      {
        id: 'ai-software-development',
        name: 'AI software development',
        summary: 'Intelligent apps using generative AI, machine learning and automation.',
        bullets: ['Knowledge assistants', 'Custom AI agents', 'AI-powered products'],
      },
      {
        id: 'ai-agents',
        name: 'AI transformation: voice & chat agents',
        summary:
          'Production-ready AI agents across chat, email, voice and WhatsApp, in multiple languages, connected to your CRM and ERP.',
        bullets: [
          'Support: instant answers, with handover to staff when needed',
          'Sales: lead capture and qualification, follow-ups and meeting booking',
          'Voice: answer calls and book appointments',
          'HR: onboarding, employee reminders and surveys',
        ],
      },
      {
        id: 'whatsapp-chatbot-development',
        name: 'WhatsApp chatbot development',
        summary:
          'Bookings, FAQs, reminders, lead capture and live ERP or CRM data on WhatsApp, with interactive buttons and handover to staff.',
        href: '/services/ai-automation/whatsapp-chatbot-development',
      },
      {
        id: 'workflow-automation',
        name: 'Workflow automation',
        summary:
          'Automate repetitive multi-step tasks such as approvals, notifications, data entry and reports.',
      },
      {
        id: 'ai-vision',
        name: 'AI vision & data analytics',
        summary:
          'Computer vision and analytics for quality inspection, OCR and document reading, and decision dashboards.',
      },
    ],
    deliverables: [
      'AI use-case assessment and roadmap',
      'Working AI agent or assistant connected to your data',
      'WhatsApp bot flows with staff handover',
      'Automated workflows with audit trail',
      'Dashboards and monitoring',
    ],
    tech: ['WhatsApp Business Platform', 'Large language models', 'Node.js', 'OCR', 'REST & webhooks'],
    caseStudy: 'remindiq',
    related: [
      { label: 'WhatsApp chatbot development', href: '/services/ai-automation/whatsapp-chatbot-development' },
      { label: 'Bellvix OS', href: '/bellvix-os' },
      { label: 'RemindiQ case study', href: '/case-studies/remindiq' },
    ],
    faqs: [
      {
        q: 'Where should a business start with AI?',
        a: 'Start with one high-volume, repetitive task that has clear rules, such as answering common customer questions, booking appointments or sending reminders. We assess candidate use cases, pick the one with the best return and build it first.',
      },
      {
        q: 'Can an AI agent hand a conversation over to a person?',
        a: 'Yes. Our chat and WhatsApp agents answer what they can and hand the conversation to a staff member when a request is unusual, sensitive or explicitly asks for a person, with the history attached.',
      },
      {
        q: 'Do your AI agents support Arabic?',
        a: 'Agents can be configured for multiple languages, including Arabic and English. Language coverage is agreed in the scope for each project. For more details, contact Bellvix.',
      },
      {
        q: 'Can AI read our documents and invoices?',
        a: 'Yes. We build OCR and document-reading workflows that extract data from invoices, forms and other documents and send it to your ERP or database for review.',
      },
    ],
  },
  {
    slug: 'business-systems',
    number: '05',
    name: 'Business Systems & Compliance',
    short: 'UAE e-invoicing, Zoho/Odoo/SAP, Jira & Confluence and database migration.',
    icon: 'shield',
    keyword: 'UAE e-invoicing integration',
    title: 'UAE E-Invoicing, Zoho, Odoo & SAP Integration',
    description:
      'UAE e-invoicing integration with your Accredited Service Provider, Zoho, Odoo and SAP integration, Jira and Confluence, and database migration.',
    h1: 'Business systems and UAE compliance integration',
    intro:
      'Get your existing systems ready for UAE e-invoicing, connect them to each other and move off legacy software without losing data.',
    subservices: [
      {
        id: 'uae-e-invoicing-integration',
        name: 'UAE e-invoicing integration',
        summary:
          'Make your ERP or billing system compliant and connect it to your Accredited Service Provider (ASP).',
        bullets: ['Readiness review and data clean-up', 'End-to-end testing before your deadline'],
        href: '/services/business-systems/uae-e-invoicing-integration',
      },
      {
        id: 'zoho-odoo-sap-integration',
        name: 'Zoho, Odoo & SAP integration',
        summary:
          'Implementation support, customisation, data sync and integration with your other systems.',
      },
      {
        id: 'jira-confluence',
        name: 'Jira & Confluence development',
        summary: 'Custom workflows, automation, dashboards and knowledge spaces.',
      },
      {
        id: 'database-migration',
        name: 'Database migration',
        summary: 'Move safely from legacy software or spreadsheets.',
        bullets: ['Data mapping, cleansing and validation', 'Parallel runs before switch-over'],
      },
    ],
    deliverables: [
      'E-invoicing readiness assessment',
      'Data mapping and clean-up plan',
      'Integration with your Accredited Service Provider',
      'Test plan and sign-off before go-live',
      'Migration runbook with parallel run',
    ],
    tech: ['Zoho', 'Odoo', 'SAP', 'Jira', 'Confluence', 'PostgreSQL', 'Excel / CSV'],
    related: [
      { label: 'UAE e-invoicing integration', href: '/services/business-systems/uae-e-invoicing-integration' },
      { label: 'UAE e-invoicing 2027 guide', href: '/insights/uae-e-invoicing-guide' },
      { label: 'Bellvix OS', href: '/bellvix-os' },
    ],
    faqs: [
      {
        q: 'Is Bellvix an Accredited Service Provider for UAE e-invoicing?',
        a: 'No. Bellvix is not an Accredited Service Provider (ASP). We make your ERP or billing system e-invoicing ready, clean up the data, and connect your system to the ASP you appoint, then test the flow end to end.',
      },
      {
        q: 'Can you integrate Zoho, Odoo or SAP with our other systems?',
        a: 'Yes. We support implementation, customisation and data sync for Zoho, Odoo and SAP, and connect them with e-commerce, payment, logistics and reporting tools you already use.',
      },
      {
        q: 'How do you migrate data from old software or spreadsheets?',
        a: 'We map every field, clean and validate the data, load it into the new system and run both systems in parallel for an agreed period before switching over, so nothing is lost.',
      },
      {
        q: 'Do you build Jira and Confluence automations?',
        a: 'Yes. We set up custom Jira workflows, automation rules and dashboards, and structure Confluence spaces so teams can find and maintain knowledge.',
      },
    ],
  },
  {
    slug: 'web-commerce',
    number: '06',
    name: 'Web & Commerce',
    short: 'Websites, e-commerce stores, domains and business email.',
    icon: 'globe',
    keyword: 'website development company UAE',
    title: 'Website & E-Commerce Development in the UAE',
    description:
      'Fast, SEO-optimised websites, B2C and B2B e-commerce stores with ERP sync, and domain and business email setup for UAE businesses.',
    h1: 'Website and e-commerce development in the UAE',
    intro:
      'Fast, responsive websites that rank and convert, online stores that sync with your ERP, and professional email on your own domain.',
    subservices: [
      {
        id: 'website-development',
        name: 'Website development',
        summary:
          'Fast, responsive, SEO-optimised corporate websites with enquiry forms, WhatsApp chat and analytics.',
      },
      {
        id: 'ecommerce-development',
        name: 'E-commerce development & management',
        summary: 'B2C and B2B stores, built and run for you.',
        bullets: ['Catalogue, checkout and payments', 'Order management', 'ERP sync'],
      },
      {
        id: 'domain-business-email',
        name: 'Domain & business email',
        summary: 'Domain registration, DNS setup and professional email on your own domain.',
        bullets: ['Setup and migration', 'Security (SPF, DKIM, DMARC)', 'Ongoing support'],
      },
    ],
    deliverables: [
      'Sitemap, wireframes and content plan',
      'Responsive website or store',
      'Technical SEO, schema and analytics',
      'Payment and ERP integration',
      'Domain, DNS and email configuration',
    ],
    tech: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Netlify', 'Schema.org', 'SPF / DKIM / DMARC'],
    related: [
      { label: 'Brand, design & marketing', href: '/services/brand-marketing' },
      { label: 'Software & apps', href: '/services/software-development' },
      { label: 'Bellvix OS', href: '/bellvix-os' },
    ],
    faqs: [
      {
        q: 'Do your websites include SEO?',
        a: 'Yes. Every website ships with technical SEO: fast static HTML, unique titles and descriptions, structured data, a sitemap, clean URLs and analytics, so search engines and AI assistants can read and rank it.',
      },
      {
        q: 'Can our online store sync with our ERP?',
        a: 'Yes. We connect the store catalogue, stock, orders and payments to your ERP, including Bellvix OS, so stock and invoices stay in one place.',
      },
      {
        q: 'Can you set up email on our own domain?',
        a: 'Yes. We register or transfer the domain, configure DNS, set up business email and add SPF, DKIM and DMARC records so your emails are trusted and less likely to land in spam.',
      },
      {
        q: 'Do you add WhatsApp chat to websites?',
        a: 'Yes. Websites can include a WhatsApp button or a full WhatsApp chatbot, alongside enquiry forms that deliver to your inbox.',
      },
    ],
  },
  {
    slug: 'brand-marketing',
    number: '07',
    name: 'Brand, Design & Digital Marketing',
    short: 'Branding, UI/UX, digital marketing, video and AI video.',
    icon: 'palette',
    keyword: 'digital marketing agency UAE',
    title: 'Branding, UI/UX & Digital Marketing in the UAE',
    description:
      'Brand strategy and identity, UI/UX design, SEO, social media, paid ads, lead generation, and video and AI video creation for UAE businesses.',
    h1: 'Branding, design and digital marketing for growing businesses',
    intro:
      'A clear brand, interfaces people enjoy using and marketing that brings in qualified leads, all connected to the technology behind it.',
    subservices: [
      { id: 'branding', name: 'Branding', summary: 'Brand strategy, logo, visual identity and brand guidelines.' },
      { id: 'ui-ux-design', name: 'UI/UX design', summary: 'User research, app and web interface design, and prototypes.' },
      {
        id: 'digital-marketing',
        name: 'Digital marketing',
        summary: 'SEO, social media management, content direction, paid ads and lead generation.',
      },
      {
        id: 'video-content',
        name: 'Video & content',
        summary:
          'Videography, editing, brand and promotional films, product explainers, social ad creatives and AI video creation.',
      },
    ],
    deliverables: [
      'Brand strategy and identity system',
      'Brand guidelines',
      'UI/UX prototypes',
      'Campaign and content calendar',
      'Monthly performance reporting',
    ],
    tech: ['SEO', 'Search ads', 'Social ads', 'Analytics', 'AI video'],
    related: [
      { label: 'Web & commerce', href: '/services/web-commerce' },
      { label: 'AI & automation', href: '/services/ai-automation' },
      { label: 'Contact us', href: '/contact' },
    ],
    faqs: [
      {
        q: 'What does a branding project include?',
        a: 'Brand strategy, logo and visual identity, typography and colour system, and brand guidelines your team and partners can apply consistently across print, web and social.',
      },
      {
        q: 'Which digital marketing services do you offer?',
        a: 'SEO, social media management, content direction, paid advertising on search and social platforms, and lead generation campaigns, with regular performance reporting.',
      },
      {
        q: 'Do you produce video and AI video?',
        a: 'Yes. We handle videography, editing, brand and promotional films, product explainers, social ad creatives and AI-generated video.',
      },
      {
        q: 'Can you design the interface for our app or software?',
        a: 'Yes. Our UI/UX work covers user research, information architecture, interface design and clickable prototypes, and it hands over cleanly to our development team or yours.',
      },
    ],
  },
  {
    slug: 'engineering',
    number: '08',
    name: 'Engineering & Industrial Technology',
    short: 'Test automation, embedded systems and IoT, drones and prototyping.',
    icon: 'cpu',
    keyword: 'embedded systems and IoT UAE',
    title: 'Engineering & Industrial Technology',
    description:
      'Test and measurement automation, embedded systems and IoT, drone and UAV solutions and training, and rapid prototyping.',
    h1: 'Engineering and industrial technology',
    intro: 'Specialist engineering services for products, labs and industrial operations.',
    subservices: [
      {
        id: 'test-measurement-automation',
        name: 'Test & measurement automation',
        summary: 'Automated test and validation systems from R&D to production, for accuracy and traceability.',
      },
      {
        id: 'embedded-iot',
        name: 'Embedded systems & IoT',
        summary: 'Hardware, firmware and real-time software for connected devices and industrial automation.',
      },
      {
        id: 'drone-uav',
        name: 'Drone / UAV solutions & training',
        summary: 'UAV systems for industrial and commercial use, plus drone build and flight training programmes.',
      },
      {
        id: 'rapid-prototyping',
        name: 'Rapid prototyping',
        summary: '3D printing, functional prototypes, and custom fixtures and tooling.',
      },
    ],
    deliverables: [],
    tech: [],
    related: [
      { label: 'Technology & consulting', href: '/services/technology-consulting' },
      { label: 'Contact us', href: '/contact' },
    ],
    faqs: [],
  },
]

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)

export type Pillar = { number: string; name: string; short: string; href: string; icon: IconName; featured?: boolean }

/** 8 pillars in brand order; P4 is Bellvix OS. */
export const pillars: Pillar[] = [
  ...categories.slice(0, 3).map((c) => ({ number: c.number, name: c.name, short: c.short, href: `/services/${c.slug}`, icon: c.icon })),
  {
    number: '04',
    name: 'Bellvix OS',
    short: 'The company operating system: ERP, CRM, HRMS, projects and AI in one platform.',
    href: '/bellvix-os',
    icon: 'layers',
    featured: true,
  },
  ...categories.slice(3).map((c) => ({ number: c.number, name: c.name, short: c.short, href: `/services/${c.slug}`, icon: c.icon })),
]
