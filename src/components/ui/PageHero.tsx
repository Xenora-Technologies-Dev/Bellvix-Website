import type { ReactNode } from 'react'
import type { Crumb } from '../../site/routes'
import { Breadcrumbs } from './Breadcrumbs'

type Props = {
  crumbs: Crumb[]
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
}

export function PageHero({ crumbs, eyebrow, title, intro, actions, aside }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" aria-hidden="true" />
      <div className={`site-wrap relative grid gap-12 ${aside ? 'lg:grid-cols-12 lg:items-center' : ''}`}>
        <div className={`hero-copy ${aside ? 'lg:col-span-6' : 'max-w-4xl'}`}>
          <Breadcrumbs crumbs={crumbs} />
          {eyebrow ? <p className="eyebrow mt-8">{eyebrow}</p> : null}
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.04] sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          {intro ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">{intro}</p> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-6">{aside}</div> : null}
      </div>
    </section>
  )
}
