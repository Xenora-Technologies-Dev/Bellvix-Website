import { CheckCheck, CornerUpLeft, User } from 'lucide-react'
import { PhoneFrame } from './kit'

import type { ChatMsg } from './chats'

type Props = {
  title: string
  subtitle?: string
  messages: ChatMsg[]
  ariaLabel: string
  className?: string
}

/** WhatsApp-style chat on a phone. Business name and number are fictional. */
export function WhatsAppChat({ title, subtitle = 'Business account', messages, ariaLabel, className = '' }: Props) {
  return (
    <PhoneFrame ariaLabel={ariaLabel} className={className}>
      <div className="flex h-full flex-col bg-[#0B141A] text-[12px] leading-snug text-[#E9EDEF]">
        <div className="flex items-center gap-3 bg-[#1F2C34] px-4 pb-3 pt-6">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2A3942] text-[#8696A0]">
            <User size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">{title}</p>
            <p className="text-[11px] text-[#8696A0]">{subtitle}</p>
          </div>
        </div>
        <div className="wa-wall flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-3">
          {messages.map((m, i) =>
            m.from === 'bot' ? (
              <div key={i} className="max-w-[86%] self-start">
                <div className="rounded-lg rounded-tl-none bg-[#1F2C34] px-3 py-2">
                  <p className="whitespace-pre-line">{m.text}</p>
                  <p className="mt-1 text-right text-[10px] text-[#8696A0]">{m.time}</p>
                </div>
                {m.buttons?.map((b) => (
                  <div key={b} className="mt-0.5 flex items-center justify-center gap-1.5 rounded-md bg-[#1F2C34] py-2 text-[12.5px] font-medium text-[#53BDEB]">
                    <CornerUpLeft size={13} /> {b}
                  </div>
                ))}
              </div>
            ) : (
              <div key={i} className="max-w-[80%] self-end rounded-lg rounded-tr-none bg-[#005C4B] px-3 py-2">
                {m.quote ? <p className="mb-1 rounded border-l-4 border-[#06CF9C] bg-black/20 px-2 py-1 text-[11.5px] text-[#D1D7DB]">{m.quote}</p> : null}
                <p>{m.text}</p>
                <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#B5D6CF]">
                  {m.time} <CheckCheck size={13} className="text-[#53BDEB]" />
                </p>
              </div>
            ),
          )}
        </div>
        <div className="flex items-center gap-2 bg-[#0B141A] px-3 pb-5 pt-2">
          <div className="flex-1 rounded-full bg-[#1F2C34] px-4 py-2 text-[12px] text-[#8696A0]">Message</div>
          <span className="h-9 w-9 rounded-full bg-[#00A884]" />
        </div>
      </div>
    </PhoneFrame>
  )
}

