import {
  BrainCircuit,
  Code2,
  MonitorCog,
  Network,
  Palette,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import type { Service, ServiceIcon } from '../data/services'
import { Button } from './Button'

const icons: Record<ServiceIcon, typeof Network> = {
  network: Network,
  monitorCog: MonitorCog,
  code2: Code2,
  brainCircuit: BrainCircuit,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  palette: Palette,
}

type Props = {
  service: Service
}

export function ServiceCard({ service }: Props) {
  const Icon = icons[service.icon]

  return (
    <article className="service-card flex h-full flex-col border border-white/8 bg-panel p-6 lg:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.16em] text-faint">{service.number}</span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-raised text-cyan">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <h4 className="mt-6 text-lg font-semibold tracking-tight">{service.name}</h4>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{service.description}</p>
      {service.tags ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.68rem] tracking-wide text-mute"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6">
        <Button href={service.href} variant="ghost" arrow className="text-sm text-ink/90">
          Learn more
        </Button>
      </div>
    </article>
  )
}
