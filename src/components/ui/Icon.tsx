import {
  Bell,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  ChartColumn,
  Code2,
  Compass,
  Cpu,
  Database,
  Globe,
  KanbanSquare,
  Layers,
  MessageCircle,
  Package,
  Palette,
  Plug,
  Receipt,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '../../content/types'

const map: Record<IconName, LucideIcon> = {
  compass: Compass,
  code: Code2,
  bot: Bot,
  layers: Layers,
  shield: ShieldCheck,
  globe: Globe,
  palette: Palette,
  cpu: Cpu,
  message: MessageCircle,
  receipt: Receipt,
  users: Users,
  chart: ChartColumn,
  kanban: KanbanSquare,
  sparkles: Sparkles,
  truck: Truck,
  plug: Plug,
  database: Database,
  stethoscope: Stethoscope,
  store: Store,
  briefcase: Briefcase,
  package: Package,
  bell: Bell,
  calendar: CalendarDays,
  building: Building2,
}

export function Icon({ name, size = 18, className = '' }: { name: IconName; size?: number; className?: string }) {
  const C = map[name]
  return <C size={size} className={className} aria-hidden="true" />
}

export function IconTile({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-raised text-cyan ${className}`}>
      <Icon name={name} />
    </span>
  )
}
