import {
  cityCountry,
  company,
  displayPhone,
  hasEmail,
  hasPhone,
  mailtoHref,
  telHref,
} from '../config/company'
import { navItems } from '../data/nav'
import { footerServices } from '../data/services'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-void">
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#home" className="inline-block">
            <Logo className="h-10 w-auto" />
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">
            Technology consulting, software engineering, AI solutions, branding and
            digital growth for businesses ready to move forward.
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Navigation</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-mute hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Services</p>
          <ul className="mt-4 space-y-2">
            {footerServices.map((item) => (
              <li key={item}>
                <a href="#services" className="text-sm text-mute hover:text-ink">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Location</p>
          <p className="mt-4 text-sm text-mute">{cityCountry()}</p>
          {hasPhone || hasEmail ? (
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">Contact</p>
              <div className="mt-3 space-y-2">
                {hasPhone ? (
                  <a href={telHref()} className="block text-sm text-mute hover:text-ink">
                    {displayPhone()}
                  </a>
                ) : null}
                {hasEmail ? (
                  <a href={mailtoHref()} className="block text-sm text-mute hover:text-ink">
                    {company.email}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="site-wrap flex flex-col gap-3 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-mute">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-mute">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
