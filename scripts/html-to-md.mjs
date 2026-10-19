// Minimal HTML -> Markdown for the LLM copies of each page (no dependencies).
// Skips decorative/interactive subtrees: svg, scripts, forms, nav, aria-hidden, data-nosnippet mockups.
const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'wbr', 'area', 'col'])
const SKIP = new Set(['svg', 'script', 'style', 'form', 'nav', 'noscript', 'button', 'select', 'textarea', 'template', 'iframe'])
const BLOCK = new Set(['p', 'div', 'section', 'header', 'footer', 'article', 'aside', 'figure', 'figcaption', 'details', 'summary', 'blockquote', 'dl', 'dt', 'dd', 'main', 'table'])

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', hellip: '…', middot: '·', rarr: '→', larr: '←', times: '×', copy: '©' }
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (ENT[e.toLowerCase()] ?? m),
  )
const attr = (attrs, name) => (attrs.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1]

export function htmlToMarkdown(html, base) {
  const out = []
  const stack = [] // { tag, skip, href, start }
  let skipDepth = 0
  let row = null
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>|([^<]+)/g
  let m
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue
    const [, close, rawTag, attrs = '', selfClose, text] = m
    if (text !== undefined) {
      if (!skipDepth) out.push(decode(text).replace(/\s+/g, ' '))
      continue
    }
    const tag = rawTag.toLowerCase()
    if (!close) {
      const skip = SKIP.has(tag) || /\saria-hidden="true"/.test(attrs) || /\sdata-nosnippet/.test(attrs) || /\shidden(\s|=|$)/.test(attrs)
      if (VOID.has(tag) || selfClose) {
        if (!skipDepth && tag === 'br') out.push('\n')
        continue
      }
      stack.push({ tag, skip, href: tag === 'a' ? attr(attrs, 'href') : undefined, start: out.length })
      if (skip) skipDepth++
      if (skipDepth) continue
      if (/^h[1-6]$/.test(tag)) out.push(`\n\n${'#'.repeat(Number(tag[1]))} `)
      else if (tag === 'li') out.push('\n- ')
      else if (tag === 'ul' || tag === 'ol') out.push('\n')
      else if (tag === 'strong' || tag === 'b') out.push('**')
      else if (tag === 'tr') row = []
      else if (tag === 'th' || tag === 'td') out.push('\u0000CELL')
      else if (BLOCK.has(tag)) out.push('\n\n')
      continue
    }
    // closing tag: pop to the matching element
    let idx = stack.length - 1
    while (idx >= 0 && stack[idx].tag !== tag) idx--
    if (idx < 0) continue
    const popped = stack.splice(idx)
    const el = popped[0]
    const wasSkipping = skipDepth > 0
    for (const p of popped) if (p.skip) skipDepth--
    if (wasSkipping) {
      if (el.skip) out.length = Math.min(out.length, el.start)
      continue
    }
    if (/^h[1-6]$/.test(tag)) out.push('\n\n')
    else if (tag === 'strong' || tag === 'b') out.push('**')
    else if (tag === 'a') {
      const inner = out.splice(el.start).join('')
      const href = el.href && !el.href.startsWith('#') ? new URL(el.href, base).href : null
      const t = inner.trim()
      if (!href || href.startsWith('javascript:')) out.push(` ${inner} `)
      else if (!t) continue
      else if (/\n/.test(t)) out.push(`${inner}\n\n[${href}](${href})\n\n`)
      else out.push(` [${t}](${href}) `)
    } else if (tag === 'th' || tag === 'td') {
      const inner = out.splice(el.start).join('').replace('\u0000CELL', '').replace(/\s+/g, ' ').trim()
      row?.push(inner || ' ')
    } else if (tag === 'tr' && row) {
      out.push(`\n| ${row.join(' | ')} |`)
      if (!out.some((s) => s.includes('\u0001HDR'))) out.push(`\n| ${row.map(() => '---').join(' | ')} |\u0001HDR`)
      row = null
    } else if (tag === 'table') {
      // reset header marker for next table
      for (let i = el.start; i < out.length; i++) out[i] = out[i].replace('\u0001HDR', '')
      out.push('\n\n')
    } else if (BLOCK.has(tag)) out.push('\n\n')
  }
  return out
    .join('')
    .replaceAll('\u0001HDR', '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\*\*\s*\*\*/g, '')
    .replace(/^-\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
