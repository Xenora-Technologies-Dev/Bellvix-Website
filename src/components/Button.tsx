import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type Shared = {
  children: ReactNode
  className?: string
  arrow?: boolean
  variant?: Variant
}

type ButtonAsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLink = Shared & {
  href: string
  onClick?: () => void
  target?: string
  rel?: string
}

type Props = ButtonAsButton | ButtonAsLink

function classes(variant: Variant, className: string) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'

  const variants: Record<Variant, string> = {
    primary:
      'bg-ink text-void hover:bg-white hover:shadow-[0_0_32px_-10px_rgba(214,242,106,0.55)]',
    secondary:
      'border border-white/12 bg-transparent text-ink hover:border-cyan/50 hover:bg-white/[0.03]',
    ghost: 'px-0 text-ink hover:text-white',
  }

  return `${base} ${variants[variant]} ${className}`
}

export function Button(props: Props) {
  const { children, className = '', arrow = false, variant = 'primary' } = props
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight size={16} className="btn-arrow" aria-hidden="true" /> : null}
    </>
  )

  if ('href' in props && props.href) {
    const external = props.href.startsWith('http')
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        className={classes(variant, className)}
        target={props.target ?? (external ? '_blank' : undefined)}
        rel={props.rel ?? (external ? 'noreferrer' : undefined)}
      >
        {content}
      </a>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <button
      type={buttonProps.type ?? 'button'}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes(variant, className)}
      aria-busy={buttonProps['aria-busy']}
    >
      {content}
    </button>
  )
}
