import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '../../config/company'
import { deliverByMailto, ENQUIRY_DELIVERY, pageUrl, submitNetlifyForm, validate, whatsappSummary, type Errors, type FormName, type Mailto, type Values } from '../../lib/forms'
import { MailtoConfirm } from './MailtoConfirm'
import { Button } from '../ui/Button'
import { contactTopics, editionOptions } from '../../lib/formOptions'

type FieldDef = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required?: boolean
  autoComplete?: string
  options?: string[]
  placeholder?: string
  full?: boolean
}

const contactFields: FieldDef[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', autoComplete: 'organization' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel' },
  { name: 'topic', label: 'How can we help?', type: 'select', required: true, options: contactTopics, full: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true, full: true, placeholder: 'A few lines about your business and what you need.' },
]

const demoFields: FieldDef[] = [
  { name: 'name', label: 'Full name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel' },
  { name: 'edition', label: 'Edition of interest', type: 'select', options: editionOptions },
  { name: 'modules', label: 'Modules you need', placeholder: 'e.g. ERP, CRM, HRMS' },
  { name: 'message', label: 'Anything we should know?', type: 'textarea', full: true, placeholder: 'Team size, branches, current software, deadlines.' },
]

type Props = { form: FormName; submitLabel?: string; footnote?: ReactNode; defaultTopic?: string }

export function EnquiryForm({ form, submitLabel, footnote, defaultTopic }: Props) {
  const uid = useId()
  const fields = form === 'demo' ? demoFields : contactFields
  const [values, setValues] = useState<Values>(() => (defaultTopic ? { topic: defaultTopic } : ({} as Values)))
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'mailto'>('idle')
  const [mail, setMail] = useState<Mailto | null>(null)

  const onChange = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const honeypot = new FormData(event.currentTarget).get('bot-field')
    if (honeypot) return
    const required = fields.filter((f) => f.required).map((f) => f.name)
    const next = validate(values, required)
    setErrors(next)
    const firstError = Object.keys(next).find((k) => next[k])
    if (firstError) {
      document.getElementById(`${uid}-${firstError}`)?.focus()
      return
    }
    if (ENQUIRY_DELIVERY === 'mailto') {
      // Synchronous, inside the submit gesture: opens the email app; Netlify POST continues in the background.
      setMail(deliverByMailto(form, { ...values, page: pageUrl() }))
      setStatus('mailto')
      return
    }
    setStatus('sending')
    const ok = await submitNetlifyForm(form, { ...values, page: window.location.pathname })
    if (ok) {
      window.location.assign(`/thank-you?form=${form}`)
      return
    }
    setStatus('error')
  }

  if (status === 'mailto' && mail) {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <MailtoConfirm mail={mail} />
        <button type="button" className="text-sm font-semibold text-mute underline underline-offset-4 hover:text-ink" onClick={() => setStatus('idle')}>
          Back to the form
        </button>
      </div>
    )
  }

  return (
    <form name={form} method="POST" action="/thank-you" onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="form-name" value={form} />
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`
        const err = errors[f.name]
        const common = {
          id,
          name: f.name,
          className: 'field',
          'aria-invalid': err ? true : undefined,
          'aria-describedby': err ? `${id}-error` : undefined,
          required: f.required,
          value: values[f.name] ?? '',
          onChange: (e: { target: { value: string } }) => onChange(f.name, e.target.value),
        }
        return (
          <div key={f.name} className={f.full || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink/90">
              {f.label}
              {f.required ? <span className="text-cyan"> *</span> : <span className="text-faint"> (optional)</span>}
            </label>
            {f.type === 'select' ? (
              <select {...common}>
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea {...common} rows={5} placeholder={f.placeholder} />
            ) : (
              <input {...common} type={f.type ?? 'text'} autoComplete={f.autoComplete} placeholder={f.placeholder} />
            )}
            {err ? (
              <p id={`${id}-error`} className="mt-1.5 text-xs text-[#f59a9a]">
                {err}
              </p>
            ) : null}
          </div>
        )
      })}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" arrow disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : (submitLabel ?? (form === 'demo' ? 'Book a demo' : 'Send enquiry'))}
        </Button>
        <a
          href={whatsappHref(whatsappSummary(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-ink hover:border-cyan/50"
        >
          <MessageCircle size={16} aria-hidden="true" /> Or WhatsApp us
        </a>
      </div>
      <div role="status" aria-live="polite" className="sm:col-span-2">
        {status === 'error' ? (
          <p className="rounded-md border border-[#f07171]/40 bg-[#f07171]/5 p-3 text-sm text-ink/90">
            We could not send the form just now. Please email{' '}
            <a className="underline" href="mailto:info@bellvix.com">
              info@bellvix.com
            </a>{' '}
            or use WhatsApp.
          </p>
        ) : null}
      </div>
      {ENQUIRY_DELIVERY === 'mailto' ? (
        <p className="-mt-1 text-xs text-mute sm:col-span-2">Sending opens your email app with your enquiry filled in, addressed to info@bellvix.com.</p>
      ) : null}
      {footnote ? <p className="text-xs leading-relaxed text-faint sm:col-span-2">{footnote}</p> : null}
    </form>
  )
}
