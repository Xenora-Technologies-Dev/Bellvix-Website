// Fails if any forbidden string (partner names, client names, internal names,
// real people or numbers seen in reference screenshots) appears in src/ or dist/.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const forbidden = [
  /zarvia/i, /onrender/i, /hamlog/i, /\bhami\b/i, /dar\s*al\s*majaz/i, /al\s*majaz/i, /abc\s*trade/i,
  /ryx\s*ai/i, /tigrid/i, /aerovantix/i, /\bdam\.com\b/i,
  // people visible in reference screenshots
  /sahala/i, /aslam/i, /salman/i, /faris/i, /praveena/i, /prakashan/i, /anandu/i, /tince/i, /sukumaran/i,
  /jinsa/i, /nambiar/i, /rishana/i, /faisal/i, /\bshali\b/i, /akbar/i, /athira/i, /soman\b/i, /sudhakaran/i,
  /renjith/i, /akhila/i, /shamim/i, /\bbano\b/i, /saba khan/i, /yasmeen/i, /shafeena/i, /lini george/i,
  /rasheed/i, /\bliyo\b/i, /ashwathy/i, /shamaila/i, /\basim\b/i, /feroza/i, /abeesh/i, /adil haider/i, /afsal/i,
  // numbers / records from screenshots
  /502308024/, /50\s*230\s*8024/, /\b1688\b/, /tenancy/i, /municipality/i, /office 01/i, /\bSTEAM\b/,
  // ERP demo company / customer / vendor names from screenshots
  /sahar valley/i, /royal feast/i, /green basket/i, /al madina/i, /coral bay/i, /solar valley/i, /bright star/i,
  /gulf grain/i, /desert mill/i, /horizon packaged/i, /spice route/i,
]
const exts = /\.(tsx?|mts|mjs|js|css|html|txt|xml|json|md)$/
const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (exts.test(name) && !p.endsWith('check-content.mjs')) files.push(p)
  }
}
for (const d of ['src', 'dist', 'public', 'scripts', 'netlify']) {
  try {
    walk(join(root, d))
  } catch {
    /* folder may not exist */
  }
}
for (const f of ['index.html', 'netlify.toml', 'README.md']) files.push(join(root, f))

let hits = 0
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  for (const re of forbidden) {
    const m = text.match(re)
    if (m) {
      hits++
      console.error(`FORBIDDEN ${re} in ${f.replace(root, '.')}: "${m[0]}"`)
    }
  }
}
console.log(`Checked ${files.length} files against ${forbidden.length} patterns: ${hits ? `${hits} hit(s)` : 'clean'}`)
process.exit(hits ? 1 : 0)
