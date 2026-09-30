import {
  cityCountry,
  company,
  displayPhone,
  hasEmail,
  hasPhone,
  mailtoHref,
  socialLinks,
  telHref,
} from '../config/company'
import { navItems } from '../data/nav'
import { footerServices } from '../data/services'
import { Logo } from './Logo'

function SocialIcon({ network }: { network: 'instagram' | 'linkedin' }) {
  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.84v1.98h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.58c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z" />
    </svg>
  )
}

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
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/20 hover:text-ink"
              >
                <SocialIcon network={link.network} />
              </a>
            ))}
          </div>
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
          <p>{'\u00A9'} 2026 {company.name}. All rights reserved.</p>
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