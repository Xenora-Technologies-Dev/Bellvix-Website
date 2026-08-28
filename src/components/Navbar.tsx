import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { displayPhone, hasPhone, telHref } from '../config/company'
import { navItems } from '../data/nav'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { Button } from './Button'
import { Logo } from './Logo'

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/8 bg-void/95 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="site-wrap relative z-50 flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]" aria-label="Primary">
        <a href="#home" className="relative z-10 shrink-0" onClick={close}>
          <Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[0.82rem] font-medium xl:flex 2xl:gap-7">
          {navItems.map((item) => {
            const id = item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${active === id ? 'is-active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="relative z-50 flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="#contact" arrow variant="secondary" className="gradient-border !border-transparent" onClick={close}>
              Let's Talk
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-ink xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        className={`mobile-sheet fixed inset-0 z-40 bg-void/96 backdrop-blur-xl xl:hidden ${open ? 'is-open' : 'pointer-events-none'}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block rounded-md px-2 py-3 text-2xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4">
            <Button href="#contact" arrow className="w-full" onClick={close}>
              Let's Talk
            </Button>
            {hasPhone ? (
              <a
                href={telHref()}
                className="flex items-center justify-center gap-2 text-sm text-mute"
              >
                <Phone size={16} aria-hidden="true" />
                {displayPhone()}
              </a>
            ) : null}
            <p className="text-center text-xs tracking-[0.18em] text-faint uppercase">
              UAE
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
