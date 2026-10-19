import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { company, telHref } from '../../config/company'
import { leadLinks, primaryLinks, serviceGroups, type NavLink } from '../../site/nav'
import { Button } from '../ui/Button'
import { Logo } from './Logo'

const FOCUSABLE = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Desktop nav shows at >= 1200px (class `nav-desk`, see index.css); below that the drawer is used.
 * Order everywhere: Home, About, Services (menu), Bellvix OS, Case Studies, Industries, Insights, Contact.
 */
export function Header({ path, cta }: { path: string; cta: 'talk' | 'demo' }) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const servicesBtnRef = useRef<HTMLButtonElement>(null)
  const uid = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Esc closes the services menu or the drawer and returns focus to the control that opened it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (drawer) {
        setDrawer(false)
        toggleRef.current?.focus()
      } else if (servicesOpen) {
        setServicesOpen(false)
        servicesBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawer, servicesOpen])

  // Drawer: scroll lock, focus first item, trap Tab inside drawer + toggle, close when resized to desktop.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('scroll-locked', drawer)
    if (!drawer) return
    drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true })
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current || !toggleRef.current) return
      const items = [toggleRef.current, ...drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1200px)')
    const onMq = () => mq.matches && setDrawer(false)
    document.addEventListener('keydown', onTab)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('keydown', onTab)
      mq.removeEventListener('change', onMq)
      root.classList.remove('scroll-locked')
    }
  }, [drawer])

  const isActive = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))
  const ctaHref = cta === 'demo' ? '#book-demo' : '/contact'
  const ctaLabel = cta === 'demo' ? 'Book a demo' : 'Talk to us'

  const flat = (l: NavLink) => (
    <li key={l.href}>
      <a href={l.href} className={`nav-link py-2 ${isActive(l.href) ? 'is-active' : ''}`} aria-current={path === l.href ? 'page' : undefined}>
        {l.label}
      </a>
    </li>
  )
  const drawerLink = (l: NavLink) => (
    <a
      key={l.href}
      href={l.href}
      className={`block border-b border-white/8 py-4 text-lg font-semibold ${isActive(l.href) ? 'text-cyan' : ''}`}
      aria-current={path === l.href ? 'page' : undefined}
    >
      {l.label}
    </a>
  )

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || servicesOpen || drawer ? 'border-white/8 bg-void/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div ref={navRef}>
          <nav className="site-wrap relative flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]" aria-label="Primary">
            <a href="/" className="relative z-10 shrink-0" aria-label="Bellvix Technologies home">
              <Logo />
            </a>

            <ul className="nav-desk hidden items-center gap-6 whitespace-nowrap text-[0.86rem] font-medium 2xl:gap-8">
              {leadLinks.map(flat)}
              <li>
                <button
                  ref={servicesBtnRef}
                  type="button"
                  className={`nav-link inline-flex items-center gap-1 py-2 ${isActive('/services') ? 'is-active' : ''}`}
                  aria-expanded={servicesOpen}
                  aria-controls={`${uid}-services`}
                  onClick={() => setServicesOpen((o) => !o)}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </li>
              {primaryLinks.map(flat)}
            </ul>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <Button href={ctaHref} arrow variant="secondary" className="gradient-border !border-transparent whitespace-nowrap">
                  {ctaLabel}
                </Button>
              </div>
              <button
                ref={toggleRef}
                type="button"
                className="nav-toggle inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-ink"
                aria-expanded={drawer}
                aria-controls={`${uid}-drawer`}
                aria-label={drawer ? 'Close menu' : 'Open menu'}
                onClick={() => setDrawer((d) => !d)}
              >
                {drawer ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </nav>

          {/* Desktop services mega panel */}
          <div id={`${uid}-services`} hidden={!servicesOpen} className="nav-desk-block absolute inset-x-0 top-full hidden border-b border-white/8 bg-[#070708] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="site-wrap grid grid-cols-12 gap-8 py-8">
              <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-7">
                {serviceGroups.map((g) => (
                  <div key={g.href}>
                    <a href={g.href} className="text-sm font-semibold text-ink hover:text-cyan">
                      {g.heading}
                    </a>
                    <ul className="mt-2.5 space-y-1.5">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} className="text-[0.82rem] text-mute hover:text-ink">
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <a href="/bellvix-os" className="gradient-border block rounded-xl p-5">
                  <p className="text-xs tracking-[0.18em] text-faint uppercase">Flagship product</p>
                  <p className="mt-2 text-lg font-bold">Bellvix OS</p>
                  <p className="mt-1 text-sm text-mute">The company operating system: ERP, CRM, HRMS, projects and AI.</p>
                </a>
                <a href="/services" className="text-sm font-semibold text-cyan hover:text-ink">
                  All services →
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer (outside <header>: backdrop-filter would trap position:fixed) */}
      <div
        ref={drawerRef}
        id={`${uid}-drawer`}
        className={`mobile-sheet nav-drawer fixed inset-x-0 bottom-0 z-[45] overflow-y-auto overscroll-contain border-t border-white/8 bg-void ${drawer ? 'is-open' : 'pointer-events-none'}`}
        aria-hidden={!drawer}
        inert={!drawer ? true : undefined}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setDrawer(false)
        }}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pt-2">
          {leadLinks.map(drawerLink)}
          <details className="group border-b border-white/8" open={isActive('/services') || undefined}>
            <summary className={`flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold ${isActive('/services') ? 'text-cyan' : ''}`}>
              Services
              <ChevronDown size={18} className="text-cyan transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="pb-4 pl-1">
              <a href="/services" className="block py-2 text-sm font-semibold text-cyan">
                All services
              </a>
              {serviceGroups.map((g) => (
                <a key={g.href} href={g.href} className="block py-2 text-[0.95rem] text-ink/90">
                  {g.heading}
                </a>
              ))}
            </div>
          </details>
          {primaryLinks.map(drawerLink)}
          <div className="mt-8 space-y-3">
            <Button href={ctaHref} arrow className="w-full">
              {ctaLabel}
            </Button>
            <a href={telHref()} className="flex items-center justify-center gap-2 py-2 text-sm text-mute">
              <Phone size={16} aria-hidden="true" /> {company.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
