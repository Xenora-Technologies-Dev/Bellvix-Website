import { company, SITE_URL } from '../config/company'
import { track } from './analytics'

export type FormName = 'contact' | 'demo' | 'chat-lead'

/** Fields for each Netlify form. Must match the hidden detection forms in index.html. */
export const formFields: Record<FormName, string[]> = {
  contact: ['name', 'email', 'company', 'phone', 'topic', 'message', 'page'],
  demo: ['name', 'email', 'company', 'phone', 'edition', 'modules', 'message', 'page'],
  'chat-lead': ['name', 'phone', 'email', 'company', 'interest', 'message', 'page', 'transcript'],
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Values = Record<string, string>
export type Errors = Record<string, string | undefined>

export function validate(values: Values, required: string[]): Errors {
  const errors: Errors = {}
  for (const key of required) {
    if (!values[key]?.trim()) errors[key] = 'This field is required.'
  }
  if (values.email && !emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone && values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.'
  return errors
}

/**
 * Enquiry delivery switch.
 *  'mailto'  (temporary): after validation, open the visitor's email app with a pre-filled email to
 *            ENQUIRY_EMAIL, show an on-page confirmation, and still POST to Netlify Forms in the background.
 *  'netlify' : Netlify Forms only (contact/demo redirect to /thank-you, chat shows its thank-you message).
 */
export const ENQUIRY_DELIVERY: 'mailto' | 'netlify' = 'mailto'
export const ENQUIRY_EMAIL = company.email
const MAILTO_MAX = 1800

/** POST to Netlify Forms. Returns true on success. */
export async function submitNetlifyForm(form: FormName, values: Values): Promise<boolean> {
  const body = new URLSearchParams({ 'form-name': form, 'bot-field': '', ...values })
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      keepalive: true,
    })
    if (response.ok) track(form === 'demo' ? 'Demo Request' : form === 'chat-lead' ? 'Chat Lead' : 'Contact Form', { page: values.page ?? '' })
    return response.ok
  } catch {
    return false
  }
}

export function whatsappSummary(values: Values): string {
  return [
    'Hello Bellvix,',
    '',
    values.name ? `Name: ${values.name}` : '',
    values.company ? `Company: ${values.company}` : '',
    values.topic ? `Topic: ${values.topic}` : '',
    values.interest ? `Interested in: ${values.interest}` : '',
    values.edition ? `Interested in: ${values.edition}` : '',
    '',
    values.message ?? '',
  ]
    .filter((line, i, arr) => line || (i > 0 && arr[i - 1]))
    .join('\n')
}

export type Mailto = { href: string; subject: string; body: string }

const formTitle: Record<FormName, string> = { contact: 'Contact form', demo: 'Bellvix OS demo form', 'chat-lead': 'Bellvixy chat' }
const labels: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone / WhatsApp',
  company: 'Company',
  topic: 'Topic',
  interest: 'Interested in',
  edition: 'Edition',
  modules: 'Modules',
}
const fieldOrder: Record<FormName, string[]> = {
  contact: ['name', 'email', 'phone', 'company', 'topic'],
  demo: ['name', 'email', 'phone', 'company', 'edition', 'modules'],
  'chat-lead': ['name', 'phone', 'email', 'company', 'interest'],
}

function subjectFor(form: FormName, v: Values): string {
  const name = v.name?.trim() || 'Website visitor'
  if (form === 'demo') return `Bellvix OS demo request – ${name}`
  const what = (form === 'chat-lead' ? v.interest : v.topic)?.trim() || 'General'
  return `Website enquiry: ${what} – ${name}${form === 'chat-lead' ? ' (Bellvixy chat)' : ''}`
}

/** Full page URL for the enquiry (no query or hash). */
export function pageUrl(path?: string): string {
  if (typeof window === 'undefined') return `${SITE_URL}${path ?? '/'}`
  return `${window.location.origin}${path ?? window.location.pathname}`
}

/**
 * Build the mailto: link for an enquiry. Plain-text body with CRLF line breaks, every field listed,
 * page URL, and (chat) a transcript. A very long message is first cut to 700 chars, then transcript lines are
 * dropped oldest-first, then the message is shortened further, so the encoded href stays under MAILTO_MAX characters.
 */
export function buildMailto(form: FormName, values: Values, opts: { transcript?: string[] } = {}): Mailto {
  const subject = subjectFor(form, values)
  let transcript = [...(opts.transcript ?? [])]
  let message = (values.message ?? '').trim()
  const compose = () => {
    const lines = [`New enquiry from bellvix.com (${formTitle[form]})`, '']
    for (const k of fieldOrder[form]) lines.push(`${labels[k]}: ${values[k]?.trim() || '-'}`)
    lines.push('', 'Message:', message || '-', '', `Page: ${values.page || pageUrl()}`)
    if (form === 'chat-lead' && transcript.length) lines.push('', 'Chat transcript (latest):', ...transcript)
    const body = lines.join('\r\n')
    return { body, href: `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
  }
  let out = compose()
  if (out.href.length > MAILTO_MAX && message.length > 700) {
    message = `${message.slice(0, 700).trimEnd()} [...]`
    out = compose()
  }
  while (out.href.length > MAILTO_MAX && transcript.length) {
    transcript = transcript.slice(1)
    out = compose()
  }
  while (out.href.length > MAILTO_MAX && message.length > 40) {
    message = `${message.slice(0, Math.floor(message.length * 0.8)).trimEnd()} [...]`
    out = compose()
  }
  return { subject, ...out }
}

/**
 * Deliver a validated enquiry. Call synchronously inside the submit handler (user gesture) so iOS Safari,
 * Android Chrome and desktop browsers allow the mailto: navigation. The Netlify POST runs in the background.
 */
export function deliverByMailto(form: FormName, values: Values, opts: { transcript?: string[] } = {}): Mailto {
  const mail = buildMailto(form, values, opts)
  window.location.href = mail.href
  void submitNetlifyForm(form, opts.transcript ? { ...values, transcript: opts.transcript.join('\n') } : values)
  track('Mailto Enquiry', { form })
  return mail
}

/** Copy text to the clipboard with a fallback for older browsers / insecure contexts. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;opacity:0;left:-9999px'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}
