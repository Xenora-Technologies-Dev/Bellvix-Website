export type ServiceIcon =
  | 'network'
  | 'monitorCog'
  | 'code2'
  | 'brainCircuit'
  | 'sparkles'
  | 'trendingUp'
  | 'palette'

export type Service = {
  number: string
  name: string
  description: string
  icon: ServiceIcon
  tags?: string[]
  href: string
}

export type ServiceCategory = {
  id: string
  number: string
  heading: string
  description: string
  services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'technology',
    number: '01',
    heading: 'Technology',
    description:
      'Build the digital foundation your business needs to operate, scale and innovate.',
    services: [
      {
        number: '01',
        name: 'IT Consulting',
        icon: 'network',
        href: '#contact',
        description:
          'Technology strategy, architecture, infrastructure and advisory services that align IT with your business objectives.',
      },
      {
        number: '02',
        name: 'IT Services',
        icon: 'monitorCog',
        href: '#contact',
        description:
          'Reliable technology services designed to improve operational efficiency, performance, security and scalability.',
      },
      {
        number: '03',
        name: 'Software Development',
        icon: 'code2',
        href: '#contact',
        description:
          'Custom web, mobile, enterprise and cloud software engineered around your unique requirements.',
      },
    ],
  },
  {
    id: 'ai',
    number: '02',
    heading: 'AI & Intelligence',
    description:
      'Turn artificial intelligence from an idea into practical business value.',
    services: [
      {
        number: '04',
        name: 'AI Software Development',
        icon: 'brainCircuit',
        href: '#ai',
        description:
          'Intelligent applications powered by modern AI, automation, machine learning and generative AI technologies.',
      },
      {
        number: '05',
        name: 'AI Consulting',
        icon: 'sparkles',
        href: '#ai',
        description:
          'Identify high-value AI opportunities, define strategy, evaluate use cases and turn AI potential into measurable business outcomes.',
      },
    ],
  },
  {
    id: 'digital',
    number: '03',
    heading: 'Digital & Brand',
    description:
      'Build a memorable brand and create digital experiences that drive growth.',
    services: [
      {
        number: '06',
        name: 'Digital Marketing',
        icon: 'trendingUp',
        href: '#digital',
        description:
          'Data-driven digital marketing strategies that increase visibility, reach the right audiences, generate leads and accelerate growth.',
        tags: [
          'Digital Strategy',
          'SEO',
          'Social Media Marketing',
          'Paid Advertising',
          'Content Marketing',
          'Lead Generation',
          'Performance Marketing',
        ],
      },
      {
        number: '07',
        name: 'Branding',
        icon: 'palette',
        href: '#digital',
        description:
          'Build a distinctive brand that communicates your value, connects with your audience and creates a memorable digital presence.',
        tags: [
          'Brand Strategy',
          'Visual Identity',
          'Logo Design',
          'Brand Guidelines',
          'Creative Direction',
          'Digital Brand Experiences',
        ],
      },
    ],
  },
]

export const footerServices = [
  'IT Consulting',
  'IT Services',
  'Software Development',
  'AI Software Development',
  'AI Consulting',
  'Digital Marketing',
  'Branding',
]

export const capabilityStrip = [
  'IT Consulting',
  'Software Development',
  'AI Solutions',
  'Branding',
  'Digital Marketing',
]
