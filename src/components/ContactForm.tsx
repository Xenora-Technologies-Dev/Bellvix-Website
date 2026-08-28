import { useState, type FormEvent } from 'react'
import { hasPhone, whatsappHref } from '../config/company'
import { contactTopics } from '../data/content'
import {
  submitContact,
  validateContact,
  whatsappPrefill,
  type ContactErrors,
  type ContactPayload,
} from '../lib/contact'
import { Button } from './Button'

const empty: ContactPayload = {
  name: '',
  email: '',
  company: '',
  phone: '',
  topic: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'unconfigured' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set =
    (key: keyof ContactPayload) =>
    (event: { target: { value: string } }) => {
      setValues((current) => ({ ...current, [key]: event.target.value }))
      if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
    }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('loading')
    const result = await submitContact(values)
    if (result.status === 'error') {
      setStatus('error')
      setErrorMessage(result.message)
      return
    }
    setStatus(result.status)
  }

  if (status === 'sent') {
    return (
      <div className="border border-cyan/25 bg-panel p-8" role="status">
        <p className="text-lg font-semibold">Message sent.</p>
        <p className="mt-2 text-sm text-mute">
          Thank you. A member of the BELLVIX team will review your inquiry.
        </p>
      </div>
    )
  }

  if (status === 'unconfigured') {
    const wa = whatsappHref(whatsappPrefill(values))
    return (
      <div className="border border-white/10 bg-panel p-8" role="status">
        <p className="text-lg font-semibold">Your inquiry is ready.</p>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Online form delivery is not connected yet, so this message was not emailed.
          You can continue the conversation directly
          {hasPhone ? ' by phone or WhatsApp' : ''}.
        </p>
        {wa ? (
          <div className="mt-6">
            <Button href={wa} arrow className="w-full sm:w-auto">
              Continue on WhatsApp
            </Button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field
        id="name"
        label="Full Name"
        value={values.name}
        onChange={set('name')}
        error={errors.name}
        autoComplete="name"
        required
      />
      <Field
        id="email"
        label="Business Email"
        type="email"
        value={values.email}
        onChange={set('email')}
        error={errors.email}
        autoComplete="email"
        required
      />
      <Field
        id="company"
        label="Company"
        value={values.company}
        onChange={set('company')}
        error={errors.company}
        autoComplete="organization"
        required
      />
      <Field
        id="phone"
        label="Phone"
        type="tel"
        value={values.phone}
        onChange={set('phone')}
        error={errors.phone}
        autoComplete="tel"
      />

      <div>
        <label htmlFor="topic" className="mb-2 block text-sm text-mute">
          How can we help?
        </label>
        <select
          id="topic"
          className="field"
          value={values.topic}
          onChange={set('topic')}
          aria-invalid={Boolean(errors.topic)}
          required
        >
          <option value="">Select a topic</option>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        {errors.topic ? (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.topic}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-mute">
          Message
        </label>
        <textarea
          id="message"
          className="field min-h-32 resize-y"
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          required
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" arrow disabled={status === 'loading'} aria-busy={status === 'loading'} className="w-full sm:w-auto">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (event: { target: { value: string } }) => void
  error?: string
  type?: string
  autoComplete?: string
  required?: boolean
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-mute">
        {label}
        {required ? <span className="sr-only"> required</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="field"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        required={required}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
