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
    if (reduced) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const hash = window.location.hash.replace('#', '')
    const jumpedToSection = Boolean(hash) && hash !== 'home' && hash !== 'privacy' && hash !== 'terms'

    if (jumpedToSection || isInViewport(node)) {
      setVisible(true)
      return
    }

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
