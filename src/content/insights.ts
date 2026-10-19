import type { Faq } from './types'

export const article = {
  slug: 'uae-e-invoicing-guide',
  title: 'UAE E-Invoicing 2027: Dates, ASPs & What to Do Now',
  description:
    'Plain-English guide to UAE e-invoicing: who must comply and when, appointing an Accredited Service Provider, and how to get your ERP ready for 2027.',
  h1: 'UAE e-invoicing in 2027: key dates and what to do now',
  published: '2026-10-19',
  modified: '2026-10-19',
  author: 'Bellvix Team',
  readMinutes: 5,
  lead:
    'UAE e-invoicing becomes mandatory in phases from 1 January 2027. If your revenue is AED 50 million or more, you need to appoint an Accredited Service Provider by 30 October 2026. Everyone else has until 31 March 2027 to appoint one and must comply from 1 July 2027.',
  faqs: [
    {
      q: 'Who has to comply with UAE e-invoicing first?',
      a: 'Businesses with revenue of AED 50 million or more. They must appoint an Accredited Service Provider by 30 October 2026, and e-invoicing becomes mandatory for them from 1 January 2027.',
    },
    {
      q: 'When must smaller businesses comply?',
      a: 'Businesses with revenue below AED 50 million must appoint an Accredited Service Provider by 31 March 2027, and e-invoicing becomes mandatory for them from 1 July 2027.',
    },
    {
      q: 'When do government entities have to comply?',
      a: 'E-invoicing becomes mandatory for government entities from 1 October 2027.',
    },
    {
      q: 'What is an Accredited Service Provider?',
      a: 'An Accredited Service Provider (ASP) is the accredited provider a business appoints for UAE e-invoicing. Each phase has a deadline to appoint one. Bellvix is not an ASP; we connect your system to the ASP you choose.',
    },
  ] as Faq[],
}
