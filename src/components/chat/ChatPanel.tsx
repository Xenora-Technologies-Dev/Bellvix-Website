import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, Check, MessageCircle, Send, X } from 'lucide-react'
import { CHAT_ENDPOINT, CHAT_LIMITS, leadInterests, quickReplies, type ApiMessage, type ChatMessage } from '../../chat/types'
import { chipAnswers, fallbackAnswer, matchIntent, type Answer } from '../../chat/knowledge'
import { company, whatsappHref } from '../../config/company'
import { deliverByMailto, ENQUIRY_DELIVERY, pageUrl, submitNetlifyForm, validate, whatsappSummary, type Errors, type Mailto, type Values } from '../../lib/forms'
import { MailtoConfirm } from '../forms/MailtoConfirm'
import { Bellvixy } from './Bellvixy'

const STORE_KEY = 'bxy-chat-v1'
const AI_KEY = 'bxy-ai'
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
const GREETING: ChatMessage = {
  id: 'greet',
  role: 'bot',
  text: "Hi, I'm Bellvixy, the Bellvix assistant. I can answer questions about our services, Bellvix OS and UAE e-invoicing, or connect you with the team. What can I help with?",
}

type Stored = { messages: ChatMessage[]; leadSent: boolean; name?: string }
type AiState = 'unknown' | 'on' | 'off'

const uid = () => Math.random().toString(36).slice(2, 10)
const plain = (t: string) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^#+\s*/gm, '')

function load(): Stored {
  try {
    const raw = sessionStorage.getItem(STORE_KEY)
    if (raw) {
      const s = JSON.parse(raw) as Stored
      if (Array.isArray(s.messages) && s.messages.length) return s
    }
  } catch {
    /* ignore */
  }
  return { messages: [GREETING], leadSent: false }
}

/** Plain text with https://bellvix.com links made clickable. */
function RichText({ text }: { text: string }) {
  const parts = plain(text).split(/(https:\/\/bellvix\.com(?:\/[^\s),]*[^\s),.;:!?])?)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('https://bellvix.com') ? (
          <a key={i} href={p.replace('https://bellvix.com', '') || '/'} className="text-cyan underline underline-offset-2">
            {p.replace('https://', '')}
          </a>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export default function ChatPanel({ open, onClose, page }: { open: boolean; onClose: () => void; page: string }) {
  const [state, setState] = useState<Stored>(load)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [lead, setLead] = useState<string | null>(null)
  const [ai, setAiState] = useState<AiState>(() => {
    try {
      return sessionStorage.getItem(AI_KEY) === 'off' ? 'off' : 'unknown'
    } catch {
      return 'unknown'
    }
  })
  const aiRef = useRef<AiState>(ai)
  const setAi = (v: AiState) => {
    aiRef.current = v
    setAiState(v)
    try {
      if (v === 'off') sessionStorage.setItem(AI_KEY, 'off')
    } catch {
      /* ignore */
    }
  }
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ids = useId()
  const { messages, leadSent } = state

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...state, messages: state.messages.slice(-40) }))
    } catch {
      /* ignore */
    }
  }, [state])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, pending, lead])

  // Open: focus, scroll lock on the full-screen mobile sheet, focus trap, Esc to close.
  useEffect(() => {
    if (!open) return
    const mobile = window.matchMedia('(max-width: 639px)').matches
    if (mobile) {
      document.documentElement.classList.add('scroll-locked')
      titleRef.current?.focus()
    } else inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const inside = panelRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('scroll-locked')
    }
  }, [open, onClose])

  const push = (...m: ChatMessage[]) => setState((s) => ({ ...s, messages: [...s.messages, ...m] }))
  const botMsg = (a: Answer): ChatMessage => ({ id: uid(), role: 'bot', text: a.text, links: a.links, lead: a.lead })

  async function askAi(history: ChatMessage[]): Promise<string | null> {
    if (aiRef.current === 'off') return null
    const payload: ApiMessage[] = history
      .filter((m) => m.id !== 'greet')
      .slice(-CHAT_LIMITS.history)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text.slice(0, 1500) }))
    try {
      const res = await fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: payload }) })
      const isJson = (res.headers.get('content-type') ?? '').includes('application/json')
      const data = isJson ? ((await res.json()) as { reply?: unknown }) : {}
      if (res.ok && typeof data.reply === 'string' && data.reply.trim()) {
        setAi('on')
        return data.reply
      }
      // Not configured / not deployed: use the scripted assistant for the rest of the session.
      if ([403, 404, 405, 503].includes(res.status) || !isJson) setAi('off')
      return null
    } catch {
      return null
    }
  }

  async function send(text: string, viaChip = false) {
    const q = text.trim().slice(0, CHAT_LIMITS.messageChars)
    if (!q || pending) return
    const userMsg: ChatMessage = { id: uid(), role: 'user', text: q }
    push(userMsg)
    setInput('')
    if (q === 'Talk to a human') {
      push(botMsg(fallbackAnswer('talk to a human')))
      setLead('Talk to a human')
      return
    }
    setPending(true)
    let answer: Answer
    const scripted = viaChip ? chipAnswers[q] : undefined
    if (scripted) {
      await new Promise((r) => setTimeout(r, 350))
      answer = fallbackAnswer(scripted)
    } else {
      const reply = await askAi([...messages, userMsg])
      const intent = matchIntent(q)
      answer = reply ? { text: reply, links: intent?.links, lead: intent?.lead ?? 'Something else' } : fallbackAnswer(q)
    }
    push(botMsg(answer))
    setPending(false)
    if (q === 'Bellvix OS demo' && !leadSent) setLead('Bellvix OS demo')
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.text
  const waText = `Hello Bellvix, I was chatting with Bellvixy on bellvix.com${lastUser ? ` about: ${lastUser}` : '.'}`
  const showChips = !lead && messages.length <= 3

  return (
    <div
      ref={panelRef}
      id="bellvixy-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${ids}-title`}
      hidden={!open}
      className="chat-panel fixed z-[60] flex flex-col overflow-hidden border border-white/10 bg-panel text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]"
    >
      <div className="flex items-center gap-3 border-b border-white/8 bg-raised px-4 py-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-void">
          <Bellvixy size={38} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${ids}-title`} ref={titleRef} tabIndex={-1} className="text-[0.95rem] leading-tight font-bold outline-none">
            Bellvixy
          </h2>
          <p className="truncate text-xs text-mute">Bellvix Technologies assistant</p>
        </div>
        <a
          href={whatsappHref(waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] hover:bg-white/8"
          aria-label="Continue on WhatsApp"
        >
          <MessageCircle size={18} aria-hidden="true" />
        </a>
        <button type="button" onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mute hover:bg-white/8 hover:text-ink" aria-label="Close chat">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation with Bellvixy" className="space-y-3">
          {messages.map((m, i) => (
            <Bubble key={m.id} role={m.role}>
              <p className="whitespace-pre-line">
                <RichText text={m.text} />
              </p>
              {m.mailto ? <MailtoConfirm mail={m.mailto} compact /> : null}
              {m.links?.length ? (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {m.links.map((l) => (
                    <a key={l.href} href={l.href} className="inline-flex items-center gap-1 rounded-full border border-cyan/30 px-2.5 py-1 text-xs font-semibold text-cyan hover:bg-cyan/10">
                      {l.label} <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  ))}
                </span>
              ) : null}
              {m.lead && !leadSent && !lead && i === messages.length - 1 ? (
                <button type="button" onClick={() => setLead(m.lead!)} className="mt-2 inline-flex items-center gap-1 rounded-full bg-cyan px-3 py-1.5 text-xs font-bold text-void">
                  Leave my details
                </button>
              ) : null}
            </Bubble>
          ))}
          {pending ? (
            <Bubble role="bot">
              <span className="chat-typing" aria-label="Bellvixy is typing">
                <i />
                <i />
                <i />
              </span>
            </Bubble>
          ) : null}
        </div>

        {showChips ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested topics">
            {quickReplies.map((c) => (
              <button key={c} type="button" disabled={pending} onClick={() => void send(c, true)} className="rounded-full border border-white/14 bg-raised px-3 py-1.5 text-[0.8rem] font-medium hover:border-cyan/50 hover:text-cyan">
                {c}
              </button>
            ))}
          </div>
        ) : null}

        {lead ? (
          <LeadForm
            interest={lead}
            page={page}
            messages={messages}
            onCancel={() => setLead(null)}
            onSent={(v, mail) => {
              setLead(null)
              setState((s) => ({ ...s, leadSent: true, name: v.name }))
              const first = v.name.trim().split(' ')[0]
              push(
                mail
                  ? {
                      id: uid(),
                      role: 'bot',
                      text: `Thank you, ${first}! One last step: send the email that just opened so it reaches the Bellvix team.`,
                      mailto: { href: mail.href, subject: mail.subject, body: mail.body },
                      links: [{ label: 'Continue on WhatsApp', href: whatsappHref(whatsappSummary(v)) }],
                    }
                  : {
                      id: uid(),
                      role: 'bot',
                      text: `Thank you, ${first}! Your details are with the Bellvix team and a consultant will contact you. If you'd like to continue right away, message us on WhatsApp.`,
                      links: [{ label: 'Continue on WhatsApp', href: whatsappHref(whatsappSummary(v)) }],
                    },
              )
            }}
          />
        ) : null}
      </div>

      {!lead ? (
        <div className="border-t border-white/8 bg-raised px-3 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          {!showChips ? (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {!leadSent ? (
                <button type="button" onClick={() => setLead('Something else')} className="shrink-0 rounded-full border border-white/14 px-3 py-1 text-xs font-medium hover:border-cyan/50">
                  Leave my details
                </button>
              ) : null}
              <a href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full border border-white/14 px-3 py-1 text-xs font-medium hover:border-[#25D366]/60">
                Continue on WhatsApp
              </a>
              <button type="button" onClick={() => void send('Talk to a human')} className="shrink-0 rounded-full border border-white/14 px-3 py-1 text-xs font-medium hover:border-cyan/50">
                Talk to a human
              </button>
            </div>
          ) : null}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void send(input)
            }}
          >
            <label htmlFor={`${ids}-input`} className="sr-only">
              Type your question
            </label>
            <input
              ref={inputRef}
              id={`${ids}-input`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={CHAT_LIMITS.messageChars}
              placeholder="Ask about services, Bellvix OS…"
              autoComplete="off"
              enterKeyHint="send"
              className="h-11 min-w-0 flex-1 rounded-full border border-white/12 bg-void px-4 text-[16px] text-ink placeholder:text-faint focus:border-cyan/60 sm:text-sm"
            />
            <button type="submit" disabled={pending || !input.trim()} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan text-void disabled:opacity-40" aria-label="Send message">
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="mt-1.5 text-center text-[0.68rem] text-faint">
            {ai === 'on' ? 'AI assistant: a consultant confirms all details.' : 'Automated assistant.'} Please don&rsquo;t share passwords or card details.
          </p>
        </div>
      ) : null}
    </div>
  )
}

function Bubble({ role, children }: { role: 'bot' | 'user'; children: ReactNode }) {
  return role === 'bot' ? (
    <div className="flex items-end gap-2">
      <span className="sr-only">Bellvixy:</span>
      <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/8 bg-raised px-3.5 py-2.5 text-[0.88rem] leading-relaxed">{children}</div>
    </div>
  ) : (
    <div className="flex justify-end">
      <span className="sr-only">You:</span>
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#25C0D2] to-[#EADA69] px-3.5 py-2.5 text-[0.88rem] leading-relaxed font-medium text-void">{children}</div>
    </div>
  )
}

function LeadForm({ interest, page, messages, onCancel, onSent }: { interest: string; page: string; messages: ChatMessage[]; onCancel: () => void; onSent: (v: Values, mail?: Mailto) => void }) {
  const lastQ = [...messages].reverse().find((m) => m.role === 'user' && !(quickReplies as readonly string[]).includes(m.text))?.text ?? ''
  const [v, setV] = useState<Values>({ name: '', phone: '', email: '', company: '', interest, message: lastQ })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const firstRef = useRef<HTMLInputElement>(null)
  const ids = useId()

  useEffect(() => {
    firstRef.current?.focus({ preventScroll: true })
  }, [])

  const set = (k: string) => (e: { target: { value: string } }) => setV((cur) => ({ ...cur, [k]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(v, ['name', 'phone', 'email', 'interest'])
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`${ids}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    const lines = messages
      .filter((m) => m.id !== 'greet')
      .slice(-10)
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Bellvixy'}: ${m.text.replace(/\s+/g, ' ').slice(0, 300)}`)
    if (ENQUIRY_DELIVERY === 'mailto') {
      // Mail-client lines are shorter so the mailto: URL stays within limits.
      const short = lines.map((l) => (l.length > 160 ? `${l.slice(0, 157)}...` : l))
      onSent(v, deliverByMailto('chat-lead', { ...v, page: pageUrl(page) }, { transcript: short }))
      return
    }
    setStatus('sending')
    const ok = await submitNetlifyForm('chat-lead', { ...v, page, transcript: lines.join('\n') })
    if (ok) onSent(v)
    else setStatus('error')
  }

  const field = (k: string, label: string, type: string, auto: string, required = true) => (
    <div>
      <label htmlFor={`${ids}-${k}`} className="mb-1 block text-xs font-semibold text-mute">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="font-normal text-faint"> (optional)</span>}
      </label>
      <input
        ref={k === 'name' ? firstRef : undefined}
        id={`${ids}-${k}`}
        name={k}
        type={type}
        autoComplete={auto}
        value={v[k]}
        onChange={set(k)}
        required={required}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${ids}-${k}-err` : undefined}
        className="h-10 w-full rounded-lg border border-white/12 bg-void px-3 text-[16px] text-ink focus:border-cyan/60 sm:text-sm"
      />
      {errors[k] ? (
        <p id={`${ids}-${k}-err`} className="mt-1 text-xs text-[#ff8a8a]">
          {errors[k]}
        </p>
      ) : null}
    </div>
  )

  return (
    <form name="chat-lead" onSubmit={submit} noValidate className="mt-4 space-y-3 rounded-2xl border border-cyan/25 bg-raised p-4" aria-labelledby={`${ids}-h`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 id={`${ids}-h`} className="text-sm font-bold">
            Leave your details
          </h3>
          <p className="mt-0.5 text-xs text-mute">{ENQUIRY_DELIVERY === 'mailto' ? 'Opens your email app with your details filled in.' : 'A Bellvix consultant will contact you. No spam.'}</p>
        </div>
        <button type="button" onClick={onCancel} className="text-xs font-semibold text-mute hover:text-ink">
          Cancel
        </button>
      </div>
      <input type="hidden" name="form-name" value="chat-lead" />
      {field('name', 'Name', 'text', 'name')}
      {field('phone', 'Phone / WhatsApp', 'tel', 'tel')}
      {field('email', 'Email', 'email', 'email')}
      {field('company', 'Company', 'text', 'organization', false)}
      <div>
        <label htmlFor={`${ids}-interest`} className="mb-1 block text-xs font-semibold text-mute">
          Interested in<span aria-hidden="true"> *</span>
        </label>
        <select id={`${ids}-interest`} value={v.interest} onChange={set('interest')} className="h-10 w-full rounded-lg border border-white/12 bg-void px-3 text-[16px] text-ink sm:text-sm">
          {leadInterests.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${ids}-message`} className="mb-1 block text-xs font-semibold text-mute">
          Message <span className="font-normal text-faint">(optional)</span>
        </label>
        <textarea id={`${ids}-message`} rows={3} maxLength={1000} value={v.message} onChange={set('message')} className="w-full rounded-lg border border-white/12 bg-void px-3 py-2 text-[16px] text-ink focus:border-cyan/60 sm:text-sm" />
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-xs text-[#ff8a8a]">
          We couldn&rsquo;t send that just now. Please try again, or reach us on WhatsApp {company.phoneDisplay}.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-1.5 rounded-full bg-cyan px-4 py-2 text-sm font-bold text-void disabled:opacity-60">
          <Check size={15} aria-hidden="true" /> {status === 'sending' ? 'Sending…' : ENQUIRY_DELIVERY === 'mailto' ? 'Send via email' : 'Send details'}
        </button>
        <a href={whatsappHref(whatsappSummary(v))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/50 px-3.5 py-2 text-sm font-semibold text-[#25D366]">
          <MessageCircle size={15} aria-hidden="true" /> Continue on WhatsApp
        </a>
      </div>
      <p className="text-[0.68rem] text-faint">
        By sending, you agree we may contact you about your enquiry. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  )
}
