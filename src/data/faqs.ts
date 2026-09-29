export type FaqItem = {
  question: string
  answer: string
}

/**
 * Visible FAQ copy and FAQPage JSON-LD must stay identical.
 * Used by Faq.tsx and Seo.tsx.
 */
export const faqs: FaqItem[] = [
  {
    question: 'What does Bellvix Technologies do?',
    answer:
      'Bellvix Technologies FZE is a UAE-based technology and digital growth company. We help organizations with IT consulting, IT services, custom software development, AI software development, AI consulting, branding, and digital marketing — from strategy through delivery.',
  },
  {
    question: 'Where is Bellvix located?',
    answer:
      'Bellvix Technologies FZE is based at Al Shmookh Business Center, One UAQ, UAQ Free Trade Zone, United Arab Emirates. We work with clients across the UAE and the wider region.',
  },
  {
    question: 'What AI services does Bellvix offer?',
    answer:
      'We provide AI consulting to identify high-value use cases and define strategy, plus AI software development for intelligent applications, generative AI experiences, automation, and custom AI-powered products tailored to your business.',
  },
  {
    question: 'Does Bellvix build custom software?',
    answer:
      'Yes. We engineer custom web, mobile, enterprise, and cloud software around your requirements — including APIs, system integration, automation, and scalable architectures designed for real-world use and future growth.',
  },
  {
    question: 'Can Bellvix help with branding and digital marketing?',
    answer:
      'Yes. Our digital and brand services include brand strategy, visual identity, logo design, and brand guidelines, as well as SEO, social media marketing, paid advertising, content marketing, lead generation, and performance marketing.',
  },
  {
    question: 'How do I contact Bellvix?',
    answer:
      'Call or WhatsApp +971 50 180 7814, or use the contact form on https://www.bellvix.com. Tell us what you are working on and we will explore how technology, AI, and digital growth can help.',
  },
]
