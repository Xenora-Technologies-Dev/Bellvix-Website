// Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver and other participating engines).
// Run AFTER a production deploy, so the key file https://bellvix.com/<key>.txt is live:
//   npm run build && npm run indexnow              -> submits the URLs from dist/sitemap-*.xml
//   npm run indexnow -- --dry-run                  -> prints the payload, sends nothing
// The key lives in src/config/seo.ts (INDEXNOW_KEY) and is published at /<key>.txt by the build.
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const HOST = 'bellvix.com'
const key = (readFileSync(join(root, 'src/config/seo.ts'), 'utf8').match(/INDEXNOW_KEY = '([0-9a-f]{32})'/) ?? [])[1]
if (!key) throw new Error('INDEXNOW_KEY not found in src/config/seo.ts')

const dist = join(root, 'dist')
const urls = readdirSync(dist)
  .filter((n) => /^sitemap-.+\.xml$/.test(n))
  .flatMap((n) => [...readFileSync(join(dist, n), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&')))
if (!urls.length) throw new Error('No URLs found. Run `npm run build` first.')

const payload = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: [...new Set(urls)] }
if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify(payload, null, 2))
  console.log(`\n[dry run] ${payload.urlList.length} URLs would be submitted to https://api.indexnow.org/indexnow`)
  process.exit(0)
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})
// 200 OK / 202 Accepted = received. 403 = key file not reachable yet. 422 = URLs not on this host.
console.log(`IndexNow responded ${res.status} ${res.statusText} for ${payload.urlList.length} URLs`)
process.exit(res.ok ? 0 : 1)
