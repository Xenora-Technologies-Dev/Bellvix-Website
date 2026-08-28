export type ContactPayload = {
  name: string
  email: string
  company: string
  phone: string
  topic: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>

export type ContactResult =
  | { status: 'sent' }
  | { status: 'unconfigured' }
  | { status: 'error'; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}

  if (!payload.name.trim()) errors.name = 'Please enter your full name.'
  if (!payload.email.trim()) errors.email = 'Please enter your business email.'
  else if (!emailPattern.test(payload.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!payload.company.trim()) errors.company = 'Please enter your company name.'
  if (payload.phone.trim() && payload.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!payload.topic.trim()) errors.topic = 'Please tell us how we can help.'
  if (!payload.message.trim()) errors.message = 'Please add a short message.'
  else if (payload.message.trim().length < 12) {
    errors.message = 'Please share a little more detail.'
  }

  return errors
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        return {
          status: 'error',
          message: 'We could not send your message. Please try again or contact us directly.',
        }
      }
      return { status: 'sent' }
    } catch {
      return {
        status: 'error',
        message: 'A network error occurred. Please try again or contact us directly.',
      }
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 500))
  return { status: 'unconfigured' }
}

export function whatsappPrefill(payload: ContactPayload): string {
  return [
    'Hello BELLVIX TECHNOLOGIES,',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    payload.phone ? `Phone: ${payload.phone}` : '',
    `Topic: ${payload.topic}`,
    '',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n')
}
