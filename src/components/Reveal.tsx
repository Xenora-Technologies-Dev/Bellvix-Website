import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
