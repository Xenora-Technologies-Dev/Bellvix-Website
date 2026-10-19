import { SiteLayout } from './components/layout/SiteLayout'
import type { PageComponent } from './site/pages'
import type { Route } from './site/routes'

export function App({ route, Page }: { route: Route; Page: PageComponent }) {
  return (
    <SiteLayout route={route}>
      <Page route={route} />
    </SiteLayout>
  )
}
