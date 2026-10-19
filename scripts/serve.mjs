// Local static preview that behaves like Netlify for this site:
// /path -> path.html, real 404 status with 404.html, form POSTs accepted (NOT delivered).
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'

const dist = resolve(process.argv[2] ?? 'dist')
const port = Number(process.env.PORT ?? process.argv[3] ?? 4173)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.json': 'application/json', '.ico': 'image/x-icon', '.md': 'text/markdown; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8' }

function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidates = clean === '/' ? ['index.html'] : [clean, `${clean.replace(/\/$/, '')}.html`, join(clean, 'index.html')]
  for (const c of candidates) {
    const f = join(dist, c)
    if (f.startsWith(dist) && existsSync(f) && statSync(f).isFile()) return f
  }
  return null
}

createServer((req, res) => {
  if (req.method === 'POST' && (req.url ?? '').startsWith('/api/chat')) {
    // No Netlify Functions locally: answer like an unconfigured function so the widget uses its scripted fallback.
    req.resume()
    console.log('[local preview] /api/chat -> 503 (no AI function locally; Bellvixy uses its scripted fallback)')
    res.writeHead(503, { 'content-type': 'application/json' }).end(JSON.stringify({ error: 'AI not configured', fallback: true }))
    return
  }
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      const name = new URLSearchParams(body).get('form-name')
      console.log(`[local preview] form "${name}" POST received; NOT delivered (Netlify handles delivery in production)`)
      res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
    })
    return
  }
  const file = resolveFile(req.url ?? '/')
  if (!file) {
    res.writeHead(404, { 'content-type': types['.html'] })
    createReadStream(join(dist, '404.html')).pipe(res)
    return
  }
  const ext = extname(file)
  const headers = { 'content-type': types[ext] ?? 'application/octet-stream' }
  if (file.endsWith('rss.xml')) headers['content-type'] = 'application/rss+xml; charset=utf-8'
  if (file.endsWith('atom.xml')) headers['content-type'] = 'application/atom+xml; charset=utf-8'
  if (file.includes(`${join(dist, 'llms')}`)) headers['x-robots-tag'] = 'noindex, follow'
  if (file.includes(`${join(dist, 'assets')}`)) headers['cache-control'] = 'public, max-age=31536000, immutable'
  res.writeHead(200, headers)
  createReadStream(file).pipe(res)
}).listen(port, () => console.log(`Bellvix preview on http://localhost:${port}`))
