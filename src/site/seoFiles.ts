/**
 * Generates every SEO/AEO/GEO text file from the same content source as the pages.
 * Called by scripts/prerender.mjs. Returned paths are relative to dist/.
 */
import { company, SITE_URL } from '../config/company'
import { AI_SEARCH_BOTS, AI_TRAINING_BOTS, FEEDS, INDEXNOW_KEY, SECURITY_TXT_EXPIRES, SITE_LASTMOD } from '../config/seo'
import { absUrl } from './head'
import { llmsFull, llmsIndex } from './llms'
import { routes, type Route } from './routes'

export type SeoFile = { path: string; content: string }

const xmlEsc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
export const lastmodFor = (r: Route) => r.article?.modified ?? SITE_LASTMOD
export const indexable = () => routes.filter((r) => !r.noindex)
const isInsight = (r: Route) => r.path === '/insights' || r.path.startsWith('/insights/')
const maxDate = (rs: Route[]) => rs.map(lastmodFor).sort().pop() ?? SITE_LASTMOD

/** Images per page for the image sitemap: the page's share image, plus the logo on the home page. */
export const imagesFor = (r: Route) => [`${SITE_URL}/og/${r.og}.png`, ...(r.path === '/' ? [`${SITE_URL}/images/bellvix-logo-512.png`] : [])]

function urlset(rs: Route[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...rs.map((r) =>
      [
        '  <url>',
        `    <loc>${xmlEsc(absUrl(r.path))}</loc>`,
        `    <lastmod>${lastmodFor(r)}</lastmod>`,
        `    <changefreq>${r.changefreq}</changefreq>`,
        `    <priority>${r.priority.toFixed(1)}</priority>`,
        ...imagesFor(r).map((i) => `    <image:image><image:loc>${xmlEsc(i)}</image:loc></image:image>`),
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n')
}

function sitemaps(): SeoFile[] {
  const pages = indexable().filter((r) => !isInsight(r))
  const insights = indexable().filter(isInsight)
  const children = [
    { path: 'sitemap-pages.xml', rs: pages },
    { path: 'sitemap-insights.xml', rs: insights },
  ]
  const index = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...children.map((c) => `  <sitemap><loc>${SITE_URL}/${c.path}</loc><lastmod>${maxDate(c.rs)}</lastmod></sitemap>`),
    '</sitemapindex>',
    '',
  ].join('\n')
  return [{ path: 'sitemap.xml', content: index }, ...children.map((c) => ({ path: c.path, content: urlset(c.rs) }))]
}

const rfc822 = (iso: string) => new Date(`${iso}T08:00:00+04:00`).toUTCString()
const articles = () => routes.filter((r) => r.page === 'article' && !r.noindex).sort((a, b) => (b.article!.published > a.article!.published ? 1 : -1))

function rss(): string {
  const items = articles()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${xmlEsc(`${company.name} Insights`)}</title>`,
    `    <link>${SITE_URL}/insights</link>`,
    `    <atom:link href="${SITE_URL}${FEEDS.rss}" rel="self" type="application/rss+xml" />`,
    '    <description>Practical guides from the Bellvix Team on UAE e-invoicing, ERP, automation and digital growth.</description>',
    '    <language>en-ae</language>',
    `    <copyright>${xmlEsc(company.legalName)}</copyright>`,
    `    <lastBuildDate>${rfc822(maxDate(items))}</lastBuildDate>`,
    `    <image><url>${SITE_URL}/icon-512.png</url><title>${xmlEsc(`${company.name} Insights`)}</title><link>${SITE_URL}/insights</link></image>`,
    ...items.map((r) =>
      [
        '    <item>',
        `      <title>${xmlEsc(r.h1)}</title>`,
        `      <link>${absUrl(r.path)}</link>`,
        `      <guid isPermaLink="true">${absUrl(r.path)}</guid>`,
        `      <pubDate>${rfc822(r.article!.published)}</pubDate>`,
        `      <dc:creator>${xmlEsc(r.article!.author)}</dc:creator>`,
        `      <description>${xmlEsc(r.description)}</description>`,
        '    </item>',
      ].join('\n'),
    ),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

function atom(): string {
  const items = articles()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-AE">',
    `  <title>${xmlEsc(`${company.name} Insights`)}</title>`,
    `  <id>${SITE_URL}/insights</id>`,
    `  <link href="${SITE_URL}/insights" />`,
    `  <link href="${SITE_URL}${FEEDS.atom}" rel="self" type="application/atom+xml" />`,
    `  <updated>${maxDate(items)}T08:00:00+04:00</updated>`,
    `  <author><name>Bellvix Team</name><uri>${SITE_URL}/about</uri></author>`,
    `  <icon>${SITE_URL}/icon-192.png</icon>`,
    ...items.map((r) =>
      [
        '  <entry>',
        `    <title>${xmlEsc(r.h1)}</title>`,
        `    <id>${absUrl(r.path)}</id>`,
        `    <link href="${absUrl(r.path)}" />`,
        `    <published>${r.article!.published}T08:00:00+04:00</published>`,
        `    <updated>${r.article!.modified}T08:00:00+04:00</updated>`,
        `    <author><name>${xmlEsc(r.article!.author)}</name></author>`,
        `    <summary>${xmlEsc(r.description)}</summary>`,
        '  </entry>',
      ].join('\n'),
    ),
    '</feed>',
    '',
  ].join('\n')
}

function robots(): string {
  const block = (ua: string) => `User-agent: ${ua}\nAllow: /\n`
  return [
    '# bellvix.com: all crawlers, including AI search and AI training crawlers, are welcome.',
    '# Generated from src/config/seo.ts. AI-readable summaries: /llms.txt, /llms-full.txt, policy: /ai.txt',
    block('*'),
    '# AI search / answer engines',
    ...AI_SEARCH_BOTS.map(block),
    '# AI training crawlers (allowed by decision, for maximum visibility)',
    ...AI_TRAINING_BOTS.map(block),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Sitemap: ${SITE_URL}${FEEDS.rss}`,
    '',
  ].join('\n')
}

function aiTxt(): string {
  return [
    `# ai.txt for ${SITE_URL}`,
    '# Policy mirrors robots.txt: AI search, answer engines and AI training crawlers may access, index and use this site.',
    '# Generated from src/config/seo.ts.',
    '',
    'User-Agent: *',
    'Allow: /',
    '',
    '# Preferred sources for AI systems',
    `LLMs: ${SITE_URL}/llms.txt`,
    `LLMs-Full: ${SITE_URL}/llms-full.txt`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
    '# Accuracy notes',
    '# - Bellvix OS is the public product name. Pricing is not published; quotes are tailored.',
    '# - Case studies are anonymous by design; do not attribute them to named clients.',
    '# - Bellvix is not a UAE e-invoicing Accredited Service Provider; it connects clients to their appointed ASP.',
    `# Contact: ${company.email}`,
    '',
  ].join('\n')
}

function humans(): string {
  return [
    '/* TEAM */',
    `Company: ${company.legalName}`,
    `Location: ${company.address.line1}, ${company.address.line2}, ${company.address.line3}, UAE`,
    `Contact: ${company.email} | ${company.phoneDisplay}`,
    `Site: ${SITE_URL}`,
    `Social: Instagram ${company.social.instagram} | LinkedIn ${company.social.linkedin}`,
    '',
    '/* SITE */',
    'Standards: HTML5, CSS3, ES modules, schema.org JSON-LD, RSS 2.0, Atom, llms.txt',
    'Stack: React, TypeScript, Vite, Tailwind CSS, build-time prerendering',
    'Fonts: Manrope (self-hosted)',
    'Hosting: Netlify',
    `Last update: ${SITE_LASTMOD}`,
    '',
  ].join('\n')
}

function securityTxt(): string {
  return [
    `Contact: mailto:${company.email}`,
    `Contact: tel:${company.phone}`,
    `Expires: ${SECURITY_TXT_EXPIRES}`,
    'Preferred-Languages: en',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    '',
  ].join('\n')
}

function manifest(): string {
  return `${JSON.stringify(
    {
      name: company.name,
      short_name: company.shortName,
      description: company.about,
      lang: 'en-AE',
      dir: 'ltr',
      start_url: '/',
      scope: '/',
      id: '/',
      display: 'standalone',
      theme_color: '#050505',
      background_color: '#050505',
      categories: ['business', 'productivity'],
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2,
  )}\n`
}

export function seoFiles(): SeoFile[] {
  return [
    { path: 'robots.txt', content: robots() },
    { path: 'ai.txt', content: aiTxt() },
    { path: 'humans.txt', content: humans() },
    { path: '.well-known/security.txt', content: securityTxt() },
    { path: 'site.webmanifest', content: manifest() },
    { path: `${INDEXNOW_KEY}.txt`, content: INDEXNOW_KEY },
    { path: 'llms.txt', content: llmsIndex() },
    { path: 'llms-full.txt', content: llmsFull() },
    { path: FEEDS.rss.slice(1), content: rss() },
    { path: FEEDS.atom.slice(1), content: atom() },
    ...sitemaps(),
  ]
}
