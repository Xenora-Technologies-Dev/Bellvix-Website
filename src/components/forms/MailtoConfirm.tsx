import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { copyText, ENQUIRY_EMAIL, type Mailto } from '../../lib/forms'

/** Shown after a mailto: enquiry. `compact` is the chat-panel variant. */
export function MailtoConfirm({ mail, compact = false }: { mail: Pick<Mailto, 'href' | 'subject' | 'body'>; compact?: boolean }) {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')
  const copy = async () => setCopied((await copyText(`To: ${ENQUIRY_EMAIL}\nSubject: ${mail.subject}\n\n${mail.body.replace(/\r\n/g, '\n')}`)) ? 'ok' : 'fail')
  const btn = compact
    ? 'inline-flex items-center gap-1.5 rounded-full border border-white/14 px-3 py-1.5 text-xs font-semibold hover:border-cyan/50'
    : 'inline-flex items-center justify-center gap-2 rounded-md border border-white/14 px-4 py-2.5 text-sm font-semibold hover:border-cyan/50'
  return (
    <div className={compact ? 'mailto-confirm mt-2' : 'mailto-confirm rounded-xl border border-cyan/30 bg-cyan/5 p-5'}>
      <p className={compact ? 'text-[0.85rem]' : 'text-sm leading-relaxed text-ink'}>
        {!compact ? <strong className="mb-1 block text-base">Almost done</strong> : null}
        Your email app should open with your enquiry. If it didn&rsquo;t, email us at{' '}
        <a href={`mailto:${ENQUIRY_EMAIL}`} className="font-semibold text-cyan underline underline-offset-2">
          {ENQUIRY_EMAIL}
        </a>
        .
      </p>
      <div className={`flex flex-wrap gap-2 ${compact ? 'mt-2' : 'mt-4'}`}>
        <a href={mail.href} className={`${btn} mailto-open`}>
          <Mail size={compact ? 13 : 15} aria-hidden="true" /> Open email again
        </a>
        <button type="button" onClick={() => void copy()} className={btn}>
          {copied === 'ok' ? <Check size={compact ? 13 : 15} aria-hidden="true" /> : <Copy size={compact ? 13 : 15} aria-hidden="true" />}
          {copied === 'ok' ? 'Copied' : 'Copy details'}
        </button>
      </div>
      <p role="status" className="sr-only">
        {copied === 'ok' ? 'Enquiry details copied to clipboard.' : copied === 'fail' ? 'Copy failed. Please select the text manually.' : ''}
      </p>
      {copied === 'fail' ? <pre className="mt-3 max-h-40 overflow-auto rounded-md bg-void p-3 text-xs whitespace-pre-wrap text-mute">{mail.body.replace(/\r\n/g, '\n')}</pre> : null}
    </div>
  )
}
