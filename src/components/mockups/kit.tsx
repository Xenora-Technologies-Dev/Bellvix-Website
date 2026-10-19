import type { ReactNode } from 'react'
import { C } from './palette'

type TProps = {
  x: number
  y: number
  children: ReactNode
  size?: number
  weight?: number
  fill?: string
  anchor?: 'start' | 'middle' | 'end'
  mono?: boolean
}

export function T({ x, y, children, size = 11, weight = 500, fill = C.ink, anchor = 'start', mono }: TProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      fontFamily={mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : undefined}
    >
      {children}
    </text>
  )
}

export function Panel({ x, y, w, h, r = 10, fill = C.panel, stroke = C.stroke }: { x: number; y: number; w: number; h: number; r?: number; fill?: string; stroke?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} />
}

export function Pill({ x, y, w, h = 18, label, fill, color, size = 9.5 }: { x: number; y: number; w: number; h?: number; label: string; fill: string; color: string; size?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
      <T x={x + w / 2} y={y + h / 2 + size / 2.8} size={size} weight={700} fill={color} anchor="middle">
        {label}
      </T>
    </g>
  )
}

export function Btn({ x, y, w, label, dark = true, h = 24 }: { x: number; y: number; w: number; label: string; dark?: boolean; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={dark ? C.dark : C.panel} stroke={dark ? C.dark : C.stroke} />
      <T x={x + w / 2} y={y + h / 2 + 3.6} size={10} weight={700} fill={dark ? '#fff' : C.ink} anchor="middle">
        {label}
      </T>
    </g>
  )
}

/** Bellvix mark (4 slanted tiles) for app chrome. */
export function MarkTiles({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id="mk" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25C0D2" />
          <stop offset="1" stopColor="#EADA69" />
        </linearGradient>
      </defs>
      <g fill="url(#mk)">
        <polygon points="9,0 15,0 18,4 12,4" />
        <polygon points="3,6 9,6 12,10 6,10" />
        <polygon points="11,6 17,6 20,10 14,10" />
        <polygon points="6,12 12,12 15,16 9,16" />
      </g>
    </g>
  )
}

/** Generic app shell: sidebar + top bar. Content goes in children (origin at 0,0 of full viewBox). */
export function AppShell({
  w,
  h,
  product,
  page,
  nav,
  active = 0,
  children,
  darkSidebar = false,
}: {
  w: number
  h: number
  product: string
  page: string
  nav: string[]
  active?: number
  children: ReactNode
  darkSidebar?: boolean
}) {
  const sb = 150
  return (
    <g>
      <rect width={w} height={h} fill={C.bg} />
      <rect width={sb} height={h} fill={darkSidebar ? '#0F1115' : C.panel} />
      <line x1={sb} y1={0} x2={sb} y2={h} stroke={C.stroke} />
      <MarkTiles x={16} y={18} s={1.1} />
      <T x={44} y={33} size={13} weight={800} fill={darkSidebar ? '#fff' : C.ink}>
        {product}
      </T>
      {nav.map((n, i) => (
        <g key={n}>
          {i === active ? <rect x={10} y={58 + i * 30} width={sb - 20} height={24} rx={7} fill={darkSidebar ? '#1E232B' : C.tealSoft} /> : null}
          <rect x={20} y={66 + i * 30} width={8} height={8} rx={2} fill={i === active ? C.teal : darkSidebar ? '#4B5260' : C.faint} />
          <T x={36} y={74 + i * 30} size={10.5} weight={i === active ? 700 : 500} fill={i === active ? (darkSidebar ? '#fff' : C.ink) : darkSidebar ? '#A6ADBA' : C.sub}>
            {n}
          </T>
        </g>
      ))}
      <rect x={sb} y={0} width={w - sb} height={44} fill={C.panel} />
      <line x1={sb} y1={44} x2={w} y2={44} stroke={C.stroke} />
      <T x={sb + 20} y={27} size={11} weight={600} fill={C.sub}>
        {page}
      </T>
      <rect x={w - 250} y={11} width={170} height={22} rx={11} fill={C.bg} stroke={C.stroke} />
      <T x={w - 238} y={26} size={9.5} fill={C.faint}>
        Search…
      </T>
      <circle cx={w - 50} cy={22} r={12} fill={C.dark} />
      <T x={w - 50} y={26} size={9} weight={700} fill="#fff" anchor="middle">
        AD
      </T>
      {children}
    </g>
  )
}

/** Dark browser-style frame. `label` is shown in the address area (no real URL). */
export function DeviceFrame({ label, ariaLabel, children, className = '', w, h }: { label: string; ariaLabel: string; children: ReactNode; className?: string; w: number; h: number }) {
  return (
    <figure className={`device-frame ${className}`} role="img" aria-label={ariaLabel} data-nosnippet="">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-3 py-1 text-[0.68rem] tracking-wide text-faint">{label}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" aria-hidden="true" style={{ fontFamily: 'inherit' }}>
        {children}
      </svg>
    </figure>
  )
}

export function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 text-xs text-faint">{children}</figcaption>
}

/** Donut segments. */
export function Donut({ cx, cy, r, stroke, parts }: { cx: number; cy: number; r: number; stroke: number; parts: { v: number; color: string }[] }) {
  const total = parts.reduce((s, p) => s + p.v, 0)
  const circ = 2 * Math.PI * r
  const lens = parts.map((p) => (p.v / total) * circ)
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((s, n) => s + n, 0))
  return (
    <g transform={`rotate(-90 ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.bg} strokeWidth={stroke} />
      {parts.map((p, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={p.color} strokeWidth={stroke} strokeDasharray={`${Math.max(lens[i] - 2, 0)} ${circ}`} strokeDashoffset={-offsets[i]} />
      ))}
    </g>
  )
}

/** Phone frame for WhatsApp-style chats (HTML, so text wraps naturally). */
export function PhoneFrame({ ariaLabel, children, className = '' }: { ariaLabel: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`phone-frame ${className}`} role="img" aria-label={ariaLabel} data-nosnippet="">
      <div aria-hidden="true" className="h-full">
        {children}
      </div>
    </figure>
  )
}
