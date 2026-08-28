export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'AI Solutions', href: '#ai' },
  { label: 'Digital', href: '#digital' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
]

export const sectionIds = [
  'home',
  'about',
  'services',
  'ai',
  'digital',
  'approach',
  'contact',
] as const
