import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function isInViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.96 && rect.bottom > 0
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduced) return

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const jumpedToSection = Boolean(window.location.hash)

    if (jumpedToSection || isInViewport(node)) return

    // Content renders visible on the server and for no-JS visitors; it is hidden only after hydration.
    // oxlint-disable-next-line react/set-state-in-effect
    setVisible(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -4% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced, threshold])

  return { ref, visible }
}
