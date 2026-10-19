export type ChatLink = { label: string; href: string }

export type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
  links?: ChatLink[]
  /** Offer the lead form with this interest preselected. */
  lead?: string
  /** Mail-client delivery confirmation (temporary mailto mode). */
  mailto?: { href: string; subject: string; body: string }
}

/** Payload for the /api/chat function (OpenAI-style roles). */
export type ApiMessage = { role: 'user' | 'assistant'; content: string }

export const CHAT_ENDPOINT = '/api/chat'

/** Abuse limits shared by the widget and the function. */
export const CHAT_LIMITS = { messageChars: 600, history: 10 } as const

export const quickReplies = [
  'Bellvix OS demo',
  'Custom software',
  'WhatsApp bot',
  'AI & automation',
  'E-invoicing 2027',
  'Talk to a human',
] as const

export const leadInterests = [
  'Bellvix OS demo',
  'Custom software',
  'WhatsApp bot',
  'AI & automation',
  'E-invoicing 2027',
  'Website or e-commerce',
  'Branding & marketing',
  'Offshore development centre',
  'Talk to a human',
  'Something else',
] as const
