/**
 * Bellvixy AI chat. POST /api/chat  { messages: [{ role: 'user' | 'assistant', content }] }  ->  { reply }
 *
 * Env (Netlify UI, never in client code):
 *   AI_API_KEY   required; without it the function answers 503 and the widget uses its scripted fallback
 *   AI_BASE_URL  OpenAI-compatible base URL, default https://api.openai.com/v1
 *   AI_MODEL     model name, default gpt-4o-mini
 *   ALLOWED_ORIGINS  optional comma-separated extra origins (the site's own origin is always allowed)
 */
import { systemPrompt } from '../../src/chat/systemPrompt'
import { CHAT_LIMITS, type ApiMessage } from '../../src/chat/types'

type Context = { ip?: string }

const MAX_BODY_BYTES = 12_000
const RATE = { perMinute: 8, perHour: 40 }
const hits = new Map<string, number[]>() // per-instance, in memory (best effort)

const json = (status: number, body: unknown, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  })

function allowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return false
  let host: string
  try {
    host = new URL(origin).host
  } catch {
    return false
  }
  if (host === new URL(req.url).host) return true
  const allow = ['https://bellvix.com', 'https://www.bellvix.com', process.env.URL, process.env.DEPLOY_PRIME_URL, process.env.DEPLOY_URL]
  for (const o of (process.env.ALLOWED_ORIGINS ?? '').split(',')) allow.push(o.trim())
  if (process.env.NETLIFY_DEV === 'true' && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return true
  return allow.filter(Boolean).includes(origin)
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000)
  const lastMinute = recent.filter((t) => now - t < 60_000).length
  if (lastMinute >= RATE.perMinute || recent.length >= RATE.perHour) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5_000) for (const [k, v] of hits) if (!v.some((t) => now - t < 3_600_000)) hits.delete(k)
  return false
}

function cleanHistory(input: unknown): ApiMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null
  const out: ApiMessage[] = []
  for (const m of input.slice(-CHAT_LIMITS.history)) {
    if (!m || typeof m !== 'object') return null
    const { role, content } = m as Record<string, unknown>
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null
    const text = content.trim()
    if (!text) continue
    if (role === 'user' && text.length > CHAT_LIMITS.messageChars) return null
    out.push({ role, content: text.slice(0, 2_000) })
  }
  return out.length && out[out.length - 1].role === 'user' ? out : null
}

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 })
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' }, { allow: 'POST' })
  if (!allowedOrigin(req)) return json(403, { error: 'Forbidden' })

  const apiKey = process.env.AI_API_KEY
  if (!apiKey) return json(503, { error: 'AI not configured', fallback: true })

  const ip = context?.ip ?? req.headers.get('x-nf-client-connection-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) return json(429, { error: 'Too many messages, please try again shortly.', fallback: true }, { 'retry-after': '60' })

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: 'Message too long' })
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }
  const history = cleanHistory((body as { messages?: unknown })?.messages)
  if (!history) return json(400, { error: 'Invalid messages' })

  const base = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '')
  try {
    const upstream = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt() }, ...history],
        temperature: 0.3,
        max_tokens: 400,
      }),
      signal: AbortSignal.timeout(20_000),
    })
    if (!upstream.ok) {
      console.error(`chat: upstream ${upstream.status}`)
      return json(502, { error: 'AI unavailable', fallback: true })
    }
    const data = (await upstream.json()) as { choices?: { message?: { content?: string } }[] }
    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) return json(502, { error: 'Empty reply', fallback: true })
    return json(200, { reply: reply.slice(0, 2_000) })
  } catch (err) {
    console.error('chat: request failed', err instanceof Error ? err.name : 'unknown')
    return json(504, { error: 'AI timeout', fallback: true })
  }
}

export const config = { path: '/api/chat' }
