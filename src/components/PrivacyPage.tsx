import { company } from '../config/company'

export function PrivacyPage() {
  return (
    <main id="main" className="pt-28 pb-24">
      <article className="site-wrap max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-6 text-sm text-mute">Last updated: 2026</p>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-mute">
          <p>
            {company.name} respects your privacy. This page is a placeholder while a
            full privacy policy is prepared.
          </p>
          <p>
            Information submitted through this website, including contact form
            details, is intended only for responding to your inquiry. We do not
            sell personal information.
          </p>
          <p>
            For privacy questions, please use the contact details published on the
            main website.
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
