// Build-time prerender: renders every route to static HTML with its own head, writes 404.html,
// a Markdown copy of every indexable page (dist/llms/...), and every SEO/AEO/GEO file from
// src/site/seoFiles.ts (robots, ai.txt, sitemaps, feeds, manifest, llms files, IndexNow key, ...).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { htmlToMarkdown } from './html-to-md.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')
const SITE = 'https://bellvix.com'

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(readFileSync(join(dist, '.vite', 'manifest.json'), 'utf8'))
const { render, routes, seoFiles, lastmodFor, markdownPath } = await import(pathToFileURL(ssrEntry).href)

function preloadsFor(file) {
  const seen = new Set()
  const js = []
  const css = []
  const walk = (key) => {
    if (seen.has(key) || !manifest[key]) return
    seen.add(key)
    const chunk = manifest[key]
    if (!chunk.isEntry) js.push(`/${chunk.file}`)
    for (const c of chunk.css ?? []) css.push(`/${c}`)
    for (const i of chunk.imports ?? []) walk(i)
  }
  walk(file)
  return [
    ...[...new Set(css)].filter((h) => !template.includes(`href="${h}"`)).map((h) => `<link rel="stylesheet" crossorigin href="${h}" />`),
    ...[...new Set(js)].map((h) => `<link rel="modulepreload" crossorigin href="${h}" />`),
  ].join('\n    ')
}

const plausible = process.env.PLAUSIBLE_DOMAIN
  ? `<script defer data-domain="${process.env.PLAUSIBLE_DOMAIN}" src="https://plausible.io/js/script.outbound-links.tagged-events.js"></script>`
  : ''

// Search-engine verification tags: rendered on the home page only when the env vars are set.
const attrEsc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const verification = [
  process.env.GOOGLE_SITE_VERIFICATION ? `<meta name="google-site-verification" content="${attrEsc(process.env.GOOGLE_SITE_VERIFICATION)}" />` : '',
  process.env.BING_SITE_VERIFICATION ? `<meta name="msvalidate.01" content="${attrEsc(process.env.BING_SITE_VERIFICATION)}" />` : '',
]
  .filter(Boolean)
  .join('\n    ')

function page({ html, head, pageFile, route }) {
  return template
    .replace('<!--app-head-->', head)
    .replace('<!--app-preload-->', preloadsFor(pageFile))
    .replace('<!--verification-->', route.path === '/' ? verification : '')
    .replace('<!--analytics-->', plausible)
    .replace('<!--app-html-->', html)
}

const outFile = (path) => (path === '/' ? join(dist, 'index.html') : path === '/404' ? join(dist, '404.html') : join(dist, `${path.slice(1)}.html`))

const problems = []
const written = []
const mdSource = new Map()
for (const path of [...routes.map((r) => r.path), '/404']) {
  const result = await render(path)
  const doc = page(result)
  const h1 = (doc.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g) ?? []).length
  if (!doc.includes('<title>')) problems.push(`${path}: no <title>`)
  if (h1 !== 1) problems.push(`${path}: ${h1} <h1> elements`)
  const file = outFile(path)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, doc)
  mdSource.set(path, doc)
  written.push(path)
}

// Markdown copies for LLMs
const decodeAttr = (v) => v.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
let mdCount = 0
for (const r of routes.filter((x) => !x.noindex)) {
  const html = mdSource.get(r.path)
  const main = (html.match(/<main id="main">([\s\S]*?)<\/main>/) ?? [])[1] ?? ''
  const url = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`
  const fm = ['---', `title: ${JSON.stringify(decodeAttr(r.title))}`, `description: ${JSON.stringify(r.description)}`, `canonical: ${url}`, `updated: ${lastmodFor(r)}`, '---', '']
  const body = htmlToMarkdown(main, url)
  const foot = ['', '---', '', `Source: ${url}. Bellvix Technologies FZE, UAE. Contact: info@bellvix.com, +971 50 180 7814.`, '']
  const file = join(dist, markdownPath(r.path).slice(1))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, [...fm, body, ...foot].join('\n'))
  mdCount++
}

// SEO / AEO / GEO files
const generated = seoFiles()
for (const f of generated) {
  const file = join(dist, f.path)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, f.content)
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
rmSync(join(dist, '.vite'), { recursive: true, force: true })

console.log(`Prerendered ${written.length} pages (incl. 404), ${mdCount} Markdown copies, ${generated.length} SEO files: ${generated.map((f) => f.path).join(', ')}`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
