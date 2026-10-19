import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { installLinkTracking } from './lib/analytics'
import { pageLoaders } from './site/pages'
import { findRoute } from './site/routes'
import './index.css'

/** Old single-page hash links → new URLs. */
const legacyHashes: Record<string, string> = {
  '#about': '/about',
  '#services': '/services',
  '#ai': '/services/ai-automation',
  '#digital': '/services/brand-marketing',
  '#contact': '/contact',
  '#privacy': '/privacy',
  '#terms': '/terms',
}

async function start() {
  if (window.location.pathname === '/' && legacyHashes[window.location.hash]) {
    window.location.replace(legacyHashes[window.location.hash])
    return
  }
  const route = findRoute(window.location.pathname)
  const Page = await pageLoaders[route.page]()
  const root = document.getElementById('root')
  if (!root) return
  hydrateRoot(
    root,
    <StrictMode>
      <App route={route} Page={Page} />
    </StrictMode>,
  )
  installLinkTracking()
}

void start()
