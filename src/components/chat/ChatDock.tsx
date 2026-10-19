import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { track } from '../../lib/analytics'
import { Bellvixy } from './Bellvixy'

const loadPanel = () => import('./ChatPanel')
const ChatPanel = lazy(loadPanel)
const TEASER_KEY = 'bxy-teaser-dismissed'

/**
 * Bottom-right dock on every page: the Bellvixy launcher, plus a one-time
 * (per session) teaser bubble. The chat panel itself is a separate lazy chunk loaded on first open.
 */
export function ChatDock({ page }: { page: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === '1'
    } catch {
      /* storage blocked */
    }
    if (dismissed) return
    const t = window.setTimeout(() => setTeaser(true), 4500)
    return () => window.clearTimeout(t)
  }, [])

  const dismissTeaser = () => {
    setTeaser(false)
    try {
      sessionStorage.setItem(TEASER_KEY, '1')
    } catch {
      /* storage blocked */
    }
  }
  const openChat = () => {
    dismissTeaser()
    setMounted(true)
    setOpen(true)
    track('Chat Open', { page })
  }
  const closeChat = () => {
    setOpen(false)
    window.setTimeout(() => launcherRef.current?.focus(), 0)
  }

  return (
    <>
      <div className={`chat-dock fixed z-40 flex flex-col items-end gap-3 ${open ? 'is-open' : ''}`}>
        {teaser && !open ? (
          <div className="chat-teaser relative max-w-[15rem] rounded-2xl rounded-br-md border border-white/10 bg-raised py-3 pr-9 pl-4 text-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]">
            <button type="button" className="text-left font-medium text-ink" onClick={openChat}>
              Hi, I&rsquo;m Bellvixy <span aria-hidden="true">👋</span> need help?
            </button>
            <button
              type="button"
              className="absolute top-1.5 right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-mute hover:bg-white/8 hover:text-ink"
              aria-label="Dismiss message"
              onClick={dismissTeaser}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ) : null}
        <button
          ref={launcherRef}
          type="button"
          className="chat-launcher relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-raised shadow-[0_18px_40px_-18px_rgba(46,230,214,0.55)] transition-transform hover:scale-105"
          aria-label={open ? 'Close Bellvixy chat' : 'Chat with Bellvixy, the Bellvix assistant'}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={mounted ? 'bellvixy-panel' : undefined}
          onClick={() => (open ? closeChat() : openChat())}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Bellvixy size={50} />}
        </button>
      </div>
      {mounted ? (
        <Suspense
          fallback={
            <div className="chat-panel chat-loading fixed z-[60] flex items-center justify-center text-sm text-mute" role="status">
              Bellvixy is waking up…
            </div>
          }
        >
          <ChatPanel open={open} onClose={closeChat} page={page} />
        </Suspense>
      ) : null}
    </>
  )
}
