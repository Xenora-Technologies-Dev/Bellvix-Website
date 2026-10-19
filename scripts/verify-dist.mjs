// Post-build checks: every prerendered page has its own title, description, canonical, OG, one H1,
// JSON-LD, and the Netlify form detection markup; 404.html is noindex.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
const files = []
const walk = (d) => readdirSync(d).forEach((n) => { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n.endsWith('.html')) files.push(p) })
walk(dist)

const decode = (s) => s?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const pick = (html, re) => decode((html.match(re) ?? [])[1])
const seen = { title: new Map(), desc: new Map(), canonical: new Map() }
const rows = []
let fail = 0
for (const f of files.sort()) {
  const html = readFileSync(f, 'utf8')
  const rel = '/' + relative(dist, f).replace(/\\/g, '/').replace(/\.html$/, '').replace(/^index$/, '')
  const title = pick(html, /<title>([^<]+)<\/title>/)
  const desc = pick(html, /<meta name="description" content="([^"]+)"/)
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/)
  const og = pick(html, /<meta property="og:title" content="([^"]+)"/)
  const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? []
  const h1 = h1s[0]?.replace(/<[^>]+>/g, '').trim()
  const ld = (html.match(/<script type="application\/ld\+json">/g) ?? []).length
  const types = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1])
  const forms = ['contact', 'demo', 'chat-lead'].every((n) => html.includes(`<form name="${n}" data-netlify="true"`))
  const noindex = html.includes('content="noindex')
  const errs = []
  if (!title) errs.push('title')
  if (!desc) errs.push('description')
  if (!og) errs.push('og:title')
  if (h1s.length !== 1) errs.push(`h1 x${h1s.length}`)
  if (!ld) errs.push('json-ld')
  if (!forms) errs.push('netlify forms')
  if (rel === '/404') { if (!noindex) errs.push('404 not noindex') } else if (!canonical) errs.push('canonical')
  if (canonical && canonical !== `https://bellvix.com${rel === '/' ? '/' : rel}`) errs.push(`canonical mismatch ${canonical}`)
  if (title && title.length > 60) errs.push(`title ${title.length} chars`)
  if (desc && desc.length > 160) errs.push(`description ${desc.length} chars`)
  for (const [k, v] of [['title', title], ['desc', desc], ['canonical', canonical]]) {
    if (!v) continue
    if (seen[k].has(v)) errs.push(`duplicate ${k} with ${seen[k].get(v)}`)
    seen[k].set(v, rel)
  }
  if (errs.length) fail++
  rows.push(`${errs.length ? 'FAIL' : 'ok  '} ${rel.padEnd(62)} | ${title} | H1: ${h1} | schema: ${[...new Set(types)].filter((t) => !['ListItem', 'Question', 'Answer', 'PostalAddress', 'ContactPoint', 'ImageObject', 'Country', 'Place', 'Offer', 'Thing', 'OfferCatalog'].includes(t)).join(',')}${errs.length ? ` | ${errs.join('; ')}` : ''}`)
}
console.log(rows.join('\n'))
console.log(`\n${files.length} HTML files, ${fail} with problems`)

// ---------------------------------------------------------------------------------------------
// SEO / AEO / GEO files
// ---------------------------------------------------------------------------------------------
const SITE = 'https://bellvix.com'
const seoErr = []
const seoOk = []
const read = (p) => readFileSync(join(dist, p), 'utf8')
const has = (p) => existsSync(join(dist, p))
const check = (label, cond, detail = '') => (cond ? seoOk.push(label) : seoErr.push(`${label}${detail ? `: ${detail}` : ''}`))
/** URL on bellvix.com -> built file (Netlify pretty URLs: /a -> a.html). */
const fileFor = (url) => {
  const p = new URL(url).pathname
  if (p === '/') return 'index.html'
  if (/\.[a-z0-9]+$/i.test(p)) return p.slice(1)
  return `${p.slice(1)}.html`
}

/** Minimal XML well-formedness check: one root, balanced tags, quoted attributes, valid entities. */
function xmlWellFormed(xml) {
  const src = xml.replace(/^\uFEFF/, '')
  if (!/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(src)) return 'missing XML declaration'
  const body = src.replace(/^<\?xml[^?]*\?>/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '')
  const stack = []
  let roots = 0
  const re = /<([^>]*)>|([^<]+)/g
  let m
  while ((m = re.exec(body))) {
    if (m[2] !== undefined) {
      if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(m[2])) return `bad entity in text near "${m[2].trim().slice(0, 30)}"`
      if (!stack.length && m[2].trim()) return 'text outside root'
      continue
    }
    const t = m[1]
    if (t.startsWith('/')) {
      const name = t.slice(1).trim()
      if (stack.pop() !== name) return `mismatched </${name}>`
      continue
    }
    const sc = t.endsWith('/')
    const [name, ...rest] = t.replace(/\/$/, '').trim().split(/\s+/)
    const attrs = t.slice(name.length).replace(/\/$/, '')
    if (!/^[A-Za-z_][\w.:-]*$/.test(name)) return `bad tag name ${name}`
    const stripped = attrs.replace(/\s+[\w.:-]+="[^"<]*"/g, '').trim()
    if (stripped) return `bad attributes on <${name}>: ${stripped.slice(0, 30)}`
    if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(attrs)) return `bad entity in attribute of <${name}>`
    void rest
    if (!stack.length) roots++
    if (!sc) stack.push(name)
  }
  if (stack.length) return `unclosed <${stack.pop()}>`
  if (roots !== 1) return `${roots} root elements`
  return null
}
const locs = (xml, tag = 'loc') => [...xml.matchAll(new RegExp(`<${tag}>([^<]+)</${tag}>`, 'g'))].map((x) => x[1].replace(/&amp;/g, '&'))

// 1. Required files
const required = ['robots.txt', 'ai.txt', 'humans.txt', '.well-known/security.txt', 'llms.txt', 'llms-full.txt', 'sitemap.xml', 'sitemap-pages.xml', 'sitemap-insights.xml', 'insights/rss.xml', 'insights/atom.xml', 'site.webmanifest', 'favicon.ico', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']
for (const f of required) check(`exists ${f}`, has(f))

// 2. XML well-formed
for (const f of ['sitemap.xml', 'sitemap-pages.xml', 'sitemap-insights.xml', 'insights/rss.xml', 'insights/atom.xml']) {
  const e = has(f) ? xmlWellFormed(read(f)) : 'missing'
  check(`well-formed ${f}`, !e, e ?? '')
}

// 3. Sitemaps: index -> children; every URL built + indexable; every indexable page listed; images exist
const indexXml = read('sitemap.xml')
check('sitemap.xml is a <sitemapindex>', indexXml.includes('<sitemapindex'))
const childMaps = locs(indexXml)
const listed = new Set()
for (const child of childMaps) {
  const f = fileFor(child)
  check(`sitemap child exists ${f}`, has(f))
  if (!has(f)) continue
  const xml = read(f)
  check(`${f} declares image namespace`, xml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'))
  for (const u of [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((x) => x[1])) {
    const loc = locs(u)[0]
    const lastmod = locs(u, 'lastmod')[0]
    listed.add(loc)
    const page = fileFor(loc)
    check(`sitemap URL built ${loc}`, has(page))
    if (has(page)) check(`sitemap URL indexable ${loc}`, !read(page).includes('content="noindex'))
    check(`sitemap lastmod ${loc}`, /^\d{4}-\d{2}-\d{2}$/.test(lastmod ?? ''), lastmod)
    const imgs = locs(u, 'image:loc')
    check(`sitemap image entries ${loc}`, imgs.length > 0)
    for (const i of imgs) check(`sitemap image exists ${i}`, has(fileFor(i)))
  }
}
for (const f of files) {
  const html = readFileSync(f, 'utf8')
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/)
  if (canonical && !html.includes('content="noindex')) check(`indexable page in sitemap ${canonical}`, listed.has(canonical))
}

// 4. Feeds
const rss = read('insights/rss.xml')
check('rss version 2.0 + atom:link self', rss.includes('<rss version="2.0"') && rss.includes(`href="${SITE}/insights/rss.xml" rel="self"`))
const rssItems = locs(rss, 'link').filter((l) => l.includes('/insights/'))
check('rss has items', rssItems.length >= 1)
for (const l of rssItems) check(`rss link built ${l}`, has(fileFor(l)))
const atom = read('insights/atom.xml')
check('atom feed has entries', /<entry>/.test(atom))

// 5. Manifest
try {
  const man = JSON.parse(read('site.webmanifest'))
  check('manifest name/short_name/start_url/display', Boolean(man.name && man.short_name && man.start_url && man.display))
  check('manifest colours #050505', man.theme_color === '#050505' && man.background_color === '#050505')
  for (const size of ['192x192', '512x512']) check(`manifest icon ${size}`, man.icons.some((i) => i.sizes === size && i.purpose !== 'maskable'))
  check('manifest maskable icon', man.icons.some((i) => i.purpose === 'maskable'))
  for (const i of man.icons) {
    check(`manifest icon file ${i.src}`, has(i.src.slice(1)))
    if (i.type === 'image/png' && has(i.src.slice(1))) {
      const b = readFileSync(join(dist, i.src.slice(1)))
      const w = b.readUInt32BE(16)
      const h = b.readUInt32BE(20)
      check(`manifest icon size matches ${i.src}`, `${w}x${h}` === i.sizes, `${w}x${h}`)
    }
  }
} catch (e) {
  check('site.webmanifest parses as JSON', false, String(e))
}
const ico = readFileSync(join(dist, 'favicon.ico'))
check('favicon.ico has ICO header', ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1)

// 6. Text files
const robots = read('robots.txt')
check('robots.txt allows all', /User-agent: \*\nAllow: \//.test(robots) && !/Disallow: \/\s/.test(robots))
for (const line of robots.match(/^Sitemap: .+$/gm) ?? []) check(`robots ${line}`, has(fileFor(line.slice(9).trim())))
check('robots lists sitemap + rss', robots.includes(`Sitemap: ${SITE}/sitemap.xml`) && robots.includes(`Sitemap: ${SITE}/insights/rss.xml`))
const ai = read('ai.txt')
check('ai.txt allows all and points to llms.txt', ai.includes('User-Agent: *') && ai.includes('Allow: /') && ai.includes(`${SITE}/llms.txt`))
const sec = read('.well-known/security.txt')
const exp = (sec.match(/^Expires: (.+)$/m) ?? [])[1]
check('security.txt Contact + future Expires', sec.includes('Contact: mailto:') && exp && new Date(exp) > new Date(), exp)
const keyFiles = readdirSync(dist).filter((n) => /^[0-9a-f]{32}\.txt$/.test(n))
check('IndexNow key file', keyFiles.length === 1 && read(keyFiles[0]) === keyFiles[0].replace('.txt', ''), keyFiles.join(','))

// 7. llms.txt -> Markdown copies
const llms = read('llms.txt')
const mdLinks = [...llms.matchAll(/Markdown: (https:\/\/bellvix\.com\/llms\/[^\s]+\.md)/g)].map((x) => x[1])
check('llms.txt lists Markdown copies', mdLinks.length === listed.size, `${mdLinks.length} vs ${listed.size}`)
for (const l of mdLinks) {
  const f = fileFor(l)
  check(`markdown copy ${f}`, has(f) && read(f).startsWith('---\ntitle:') && read(f).includes('\n# '))
}

// 8. Head tags on every indexable page
for (const f of files) {
  const html = readFileSync(f, 'utf8')
  if (html.includes('content="noindex')) continue
  const rel = relative(dist, f)
  const md = pick(html, /<link rel="alternate" type="text\/markdown"[^>]*href="([^"]+)"/)
  check(`head ${rel}: manifest, rss, atom, hreflang, x-default, max-image-preview`, html.includes('rel="manifest" href="/site.webmanifest"') && html.includes('type="application/rss+xml"') && html.includes('type="application/atom+xml"') && /hreflang="en-AE"/.test(html) && /hreflang="x-default"/.test(html) && html.includes('max-image-preview:large'))
  check(`head ${rel}: markdown alternate exists`, Boolean(md) && has(md.slice(1)), md)
  check(`head ${rel}: favicon.ico link`, html.includes('href="/favicon.ico"'))
}

// 9. JSON-LD structure lint (schema.org + Google required properties we rely on)
const REQUIRED = {
  Organization: ['name', 'url', 'logo'],
  WebSite: ['name', 'url'],
  WebPage: ['url', 'name'],
  AboutPage: ['url', 'name'],
  ContactPage: ['url', 'name'],
  CollectionPage: ['url', 'name'],
  ProfessionalService: ['name', 'address', 'telephone', 'url', 'image'],
  Service: ['name', 'provider'],
  SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem'],
  Article: ['headline', 'image', 'datePublished', 'dateModified', 'author', 'publisher'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
}
let ldNodes = 0
for (const f of files) {
  const rel = relative(dist, f)
  const html = readFileSync(f, 'utf8')
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data
    try {
      data = JSON.parse(block[1])
    } catch (e) {
      check(`JSON-LD parses ${rel}`, false, String(e))
      continue
    }
    check(`JSON-LD @context ${rel}`, data['@context'] === 'https://schema.org')
    const graph = data['@graph'] ?? [data]
    const ids = new Set(graph.map((n) => n['@id']).filter(Boolean))
    const refs = []
    const walkRefs = (v) => {
      if (Array.isArray(v)) v.forEach(walkRefs)
      else if (v && typeof v === 'object') {
        if (Object.keys(v).length === 1 && v['@id']) refs.push(v['@id'])
        else Object.values(v).forEach(walkRefs)
      }
    }
    graph.forEach((n) => Object.values(n).forEach(walkRefs))
    for (const r of refs) check(`JSON-LD @id ref resolves ${rel} ${r}`, ids.has(r))
    const idCount = graph.map((n) => n['@id']).filter(Boolean)
    check(`JSON-LD unique @id ${rel}`, idCount.length === new Set(idCount).size)
    for (const n of graph) {
      ldNodes++
      const req = REQUIRED[n['@type']]
      if (!req) {
        check(`JSON-LD known type ${n['@type']} (${rel})`, false)
        continue
      }
      const missing = req.filter((k) => n[k] === undefined || n[k] === '' || (Array.isArray(n[k]) && !n[k].length))
      check(`JSON-LD ${n['@type']} required props (${rel})`, !missing.length, missing.join(','))
      if (n['@type'] === 'BreadcrumbList') n.itemListElement.forEach((it, i) => check(`breadcrumb item ${rel} #${i + 1}`, it['@type'] === 'ListItem' && it.position === i + 1 && it.name && /^https:\/\/bellvix\.com\//.test(it.item)))
      if (n['@type'] === 'FAQPage') n.mainEntity.forEach((q, i) => check(`FAQ question ${rel} #${i + 1}`, q['@type'] === 'Question' && q.name && q.acceptedAnswer?.['@type'] === 'Answer' && q.acceptedAnswer.text))
      if (n['@type'] === 'Article') check(`Article author name ${rel}`, Boolean(n.author?.name) && /^\d{4}-\d{2}-\d{2}/.test(n.datePublished))
      if (n['@type'] === 'ProfessionalService' || n['@type'] === 'Organization') check(`${n['@type']} address ${rel}`, n.address?.['@type'] === 'PostalAddress' && n.address.addressCountry === 'AE')
      for (const [k, v] of Object.entries(n)) if (/url|image|logo|item/i.test(k) && typeof v === 'string' && v.startsWith('/')) check(`absolute URL ${rel} ${k}`, false, v)
    }
  }
}

// 10. netlify.toml serves each SEO file with an explicit Content-Type
const toml = readFileSync(resolve(import.meta.dirname, '..', 'netlify.toml'), 'utf8')
for (const f of ['/robots.txt', '/ai.txt', '/humans.txt', '/llms.txt', '/llms-full.txt', '/.well-known/security.txt', `/${keyFiles[0]}`, '/sitemap.xml', '/sitemap-pages.xml', '/sitemap-insights.xml', '/insights/rss.xml', '/insights/atom.xml', '/site.webmanifest', '/favicon.ico', '/llms/*']) {
  const block = toml.split('[[headers]]').find((b) => b.includes(`for = "${f}"`))
  check(`netlify.toml Content-Type for ${f}`, Boolean(block && /Content-Type = "/.test(block)))
}

console.log(`\nSEO/AEO/GEO: ${seoOk.length} checks passed, ${seoErr.length} failed, ${ldNodes} JSON-LD nodes linted`)
if (seoErr.length) console.log(seoErr.map((e) => `  FAIL ${e}`).join('\n'))
process.exit(fail || seoErr.length ? 1 : 0)
