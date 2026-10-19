import type { ReactNode } from 'react'
import type { Route } from '../../site/routes'
import { ChatDock } from '../chat/ChatDock'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="noise" aria-hidden="true" />
      <Header path={route.path} cta={route.cta} />
      <main id="main">{children}</main>
      <Footer />
      <ChatDock page={route.path} />
    </>
  )
}
