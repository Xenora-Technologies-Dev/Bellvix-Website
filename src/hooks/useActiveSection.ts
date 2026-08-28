import { useEffect, useState } from 'react'
import { sectionIds } from '../data/nav'

export function useActiveSection(): string {
  const [active, setActive] = useState('home')

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    const setup = () => {
      observer?.disconnect()
      const nodes = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))

      if (!nodes.length) return

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (visible?.target.id) setActive(visible.target.id)
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] },
      )

      nodes.forEach((node) => observer?.observe(node))
    }

    setup()
    window.addEventListener('hashchange', setup)
    return () => {
      observer?.disconnect()
      window.removeEventListener('hashchange', setup)
    }
  }, [])

  return active
}
