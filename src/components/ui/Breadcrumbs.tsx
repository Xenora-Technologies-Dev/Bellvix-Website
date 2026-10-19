import { ChevronRight } from 'lucide-react'
import type { Crumb } from '../../site/routes'

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs.length) return null
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-faint">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-mute">
                  {c.name}
                </span>
              ) : (
                <>
                  <a href={c.path} className="hover:text-ink">
                    {c.name}
                  </a>
                  <ChevronRight size={12} aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
