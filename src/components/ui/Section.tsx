import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children?: ReactNode
  className?: string
  border?: boolean
  align?: 'left' | 'center'
}

export function Section({ id, eyebrow, title, intro, children, className = '', border = true, align = 'left' }: Props) {
  return (
    <section id={id} className={`relative py-20 lg:py-28 ${border ? 'border-t border-white/6' : ''} ${className}`}>
      <div className="site-wrap">
        {eyebrow || title || intro ? (
          <Reveal className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.6rem]">{title}</h2> : null}
            {intro ? <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">{intro}</p> : null}
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  )
}

export function Card({ children, className = '', as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'li' }) {
  const Tag = as
  return <Tag className={`rounded-xl border border-white/8 bg-panel p-6 lg:p-7 ${className}`}>{children}</Tag>
}

export function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-mute">
          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-lime" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-mute">
          {t}
        </li>
      ))}
    </ul>
  )
}
