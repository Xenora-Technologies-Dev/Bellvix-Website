import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import { buildHead } from './site/head'
import { llmsFull, llmsIndex } from './site/llms'
import { seoFiles, lastmodFor } from './site/seoFiles'
import { markdownPath } from './config/seo'
import { pageFiles, pageLoaders } from './site/pages'
import { findRoute, notFoundRoute, routes, type Route } from './site/routes'

export async function render(path: string): Promise<{ html: string; head: string; route: Route; pageFile: string }> {
  const route = path === '/404' ? notFoundRoute : findRoute(path)
  const Page = await pageLoaders[route.page]()
  const html = renderToString(
    <StrictMode>
      <App route={route} Page={Page} />
    </StrictMode>,
  )
  return { html, head: buildHead(route), route, pageFile: pageFiles[route.page] }
}

export { routes, notFoundRoute, llmsFull, llmsIndex, seoFiles, lastmodFor, markdownPath }
