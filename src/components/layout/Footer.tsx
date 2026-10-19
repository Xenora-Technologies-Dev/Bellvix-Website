import { addressLines, company, mailtoHref, socialLinks, telHref, whatsappHref } from '../../config/company'
import { pillars } from '../../content/services'
import { companyLinks, osLinks } from '../../site/nav'
import { Logo } from './Logo'

function SocialIcon({ network }: { network: 'instagram' | 'linkedin' }) {
  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
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

const colHead = 'text-xs font-semibold tracking-[0.18em] text-faint uppercase'
const linkCls = 'text-sm text-mute hover:text-ink'

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-void pb-20 xl:pb-0">
      <div className="site-wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a href="/" className="inline-block" aria-label="Bellvix Technologies home">
            <Logo className="h-10 w-auto" />
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute">
            {company.heroLine} IT consulting, software, AI and automation, Bellvix OS and digital growth, from the UAE.
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

        <div className="lg:col-span-3">
          <p className={colHead}>Services</p>
          <ul className="mt-4 space-y-2">
            {pillars.map((p) => (
              <li key={p.href}>
                <a href={p.href} className={linkCls}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={colHead}>Bellvix OS</p>
          <ul className="mt-4 space-y-2">
            {osLinks.slice(0, 7).map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={`${colHead} mt-8`}>Company</p>
          <ul className="mt-4 space-y-2">
            {[{ label: 'Case studies', href: '/case-studies' }, { label: 'Industries', href: '/industries' }, ...companyLinks].map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className={colHead}>Contact</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-mute">
            {addressLines().map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <div className="mt-5 space-y-2">
            <a href={telHref()} className={`block ${linkCls}`}>
              {company.phoneDisplay}
            </a>
            <a href={whatsappHref('Hello Bellvix,')} target="_blank" rel="noopener noreferrer" className={`block ${linkCls}`}>
              WhatsApp {company.phoneDisplay}
            </a>
            <a href={mailtoHref()} className={`block ${linkCls}`}>
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="site-wrap flex flex-col gap-3 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            {'\u00A9'} 2026 {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="hover:text-mute">
              Privacy policy
            </a>
            <a href="/terms" className="hover:text-mute">
              Terms of use
            </a>
            <a href="/sitemap.xml" className="hover:text-mute">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
