/** Cookieless analytics hook. Works with Plausible when its script is enabled; no-op otherwise. */
type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void

export function track(event: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const fn = (window as unknown as { plausible?: PlausibleFn }).plausible
  if (typeof fn === 'function') fn(event, props ? { props } : undefined)
}

/** Delegated click tracking for WhatsApp, phone and email links. */
export function installLinkTracking() {
  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement | null)?.closest('a')
    if (!link) return
    const href = link.getAttribute('href') ?? ''
    if (href.startsWith('https://wa.me/')) track('WhatsApp Click', { path: location.pathname })
    else if (href.startsWith('tel:')) track('Phone Click', { path: location.pathname })
    else if (href.startsWith('mailto:')) track('Email Click', { path: location.pathname })
  })
}
