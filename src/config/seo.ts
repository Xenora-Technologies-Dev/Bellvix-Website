/**
 * SEO / AEO / GEO settings. Single source for robots.txt, ai.txt, sitemaps, feeds, manifest,
 * IndexNow key, locales and verification tags. Everything is generated at build time by
 * scripts/prerender.mjs via src/site/seoFiles.ts, so the files can never drift from the content.
 */

/** Content last-reviewed date used as <lastmod> when a page has no own modified date. */
export const SITE_LASTMOD = '2026-10-19'

/** Locales. Add { lang: 'ar-AE', prefix: '/ar' } when Arabic ships; hreflang tags pick it up. */
export const LOCALES = [{ lang: 'en-AE', prefix: '' }] as const
export const DEFAULT_LOCALE = 'en-AE'

/** IndexNow key (public by design). Served at /<key>.txt; used by `npm run indexnow`. */
export const INDEXNOW_KEY = 'a10a298ef6b4da9c121f8e3daf6354cd'

/** security.txt expiry (RFC 9116 requires one; renew yearly). */
export const SECURITY_TXT_EXPIRES = '2027-10-19T23:59:59.000Z'

/** Crawler policy: everyone allowed, including AI search and AI training crawlers (approved decision). */
export const AI_SEARCH_BOTS = ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Claude-SearchBot', 'Claude-User', 'Bingbot', 'Googlebot', 'Applebot', 'DuckAssistBot', 'YouBot']
export const AI_TRAINING_BOTS = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Meta-ExternalAgent', 'Bytespider', 'Amazonbot', 'cohere-ai', 'Diffbot']

/** Search-engine verification: set these env vars at build time (Netlify UI) to render the meta tags. */
export const VERIFICATION_ENV = { google: 'GOOGLE_SITE_VERIFICATION', bing: 'BING_SITE_VERIFICATION' } as const

/** Markdown copy of a page for LLMs: / -> /llms/index.md, /bellvix-os -> /llms/bellvix-os.md */
export const markdownPath = (path: string) => (path === '/' ? '/llms/index.md' : `/llms${path}.md`)

export const FEEDS = { rss: '/insights/rss.xml', atom: '/insights/atom.xml' } as const
