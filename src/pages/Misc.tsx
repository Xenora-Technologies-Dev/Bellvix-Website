import { Button } from '../components/ui/Button'
import type { Route } from '../site/routes'

export function ThankYou({ route }: { route: Route }) {
  return (
    <section className="flex min-h-[70svh] items-center pt-28">
      <div className="site-wrap max-w-2xl text-center">
        <p className="eyebrow justify-center">Message received</p>
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">{route.h1}</h1>
        <p className="mt-5 text-mute">A member of the Bellvix team will reply soon. If it is urgent, message us on WhatsApp.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/case-studies" variant="secondary">
            See our work
          </Button>
        </div>
      </div>
    </section>
  )
}

export function NotFound({ route }: { route: Route }) {
  const links = [
    ['/services', 'Services'],
    ['/bellvix-os', 'Bellvix OS'],
    ['/case-studies', 'Case studies'],
    ['/insights', 'Insights'],
    ['/contact', 'Contact'],
  ]
  return (
    <section className="flex min-h-[70svh] items-center pt-28">
      <div className="site-wrap max-w-2xl text-center">
        <p className="font-mono text-sm text-cyan">404</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{route.h1}</h1>
        <p className="mt-5 text-mute">The page you are looking for has moved or does not exist. Try one of these:</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="inline-block rounded-md border border-white/12 px-4 py-2.5 text-sm font-semibold hover:border-cyan/50">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/" arrow>
            Go to the home page
          </Button>
        </div>
      </div>
    </section>
  )
}
