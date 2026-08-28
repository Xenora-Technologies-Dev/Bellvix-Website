import { company } from '../config/company'

export function TermsPage() {
  return (
    <main id="main" className="pt-28 pb-24">
      <article className="site-wrap max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-6 text-sm text-mute">Last updated: 2026</p>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-mute">
          <p>
            These terms are a placeholder for {company.name}. They will be replaced
            with a complete legal document.
          </p>
          <p>
            Content on this website is provided for general information. It does
            not constitute a contractual offer. Engagement terms are agreed in
            writing for each project.
          </p>
          <p>
            <a href="#home" className="text-ink underline decoration-white/20 underline-offset-4">
              Return to home
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
