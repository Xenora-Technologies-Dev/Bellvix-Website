# Bellvix Technologies website

Multi-page marketing site for bellvix.com. React 19 + TypeScript + Vite 8 + Tailwind 4, prerendered
to static HTML at build time and hosted on Netlify.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (client-rendered, for editing) |
| `npm run build` | Typecheck → client build → SSR build → prerender every route to `dist/*.html`, plus `404.html`, `sitemap.xml`, `llms.txt`, `llms-full.txt` |
| `npm run preview` | Serve `dist/` like Netlify (`/about` → `about.html`, real 404s). `PORT=4321 npm run preview` |
| `npm run lint` / `npm run typecheck` | oxlint / tsc |
| `npm run verify` | Check every page has its own title/description/canonical/OG/H1/JSON-LD + Netlify form markup, and grep for forbidden strings |

## How it is organised

- `src/content/*`: all copy as typed data (services, Bellvix OS, case studies, industries, FAQs, e-invoicing facts).
- `src/site/routes.ts`: the route registry (URL, title, description, breadcrumbs, schema, FAQs). Drives pages, sitemap, llms files and JSON-LD.
- `src/site/head.ts`: per-page `<head>` (meta, canonical, OG/Twitter, JSON-LD `@graph`).
- `src/pages/*`: page templates (code-split per template). `src/components/mockups/*`: coded product screens with **sample data only**.
- `scripts/prerender.mjs`: renders every route with `react-dom/server` into the Vite HTML template.
- `index.html`: contains hidden static copies of the `contact` and `demo` forms so Netlify Forms detects them.

## Netlify setup (once)

- Forms: enable form detection, then add email notifications for `contact`, `demo` and `chat-lead` to info@bellvix.com.
- Analytics (cookieless): set `PLAUSIBLE_DOMAIN=bellvix.com` to inject Plausible, or enable Netlify Analytics (no code needed).

## SEO, AEO and GEO files

Everything below is generated at build time from `src/config/seo.ts` and the content files, so it always matches the pages:
`src/site/seoFiles.ts` builds the text, XML and JSON files, `scripts/prerender.mjs` writes them along with the Markdown copies,
and `npm run verify` checks them (well-formed XML, valid manifest, every sitemap URL is built and indexable, every indexable page is
in the sitemap, image entries exist, feeds resolve, required JSON-LD properties and `@id` references, and Content-Type headers in
`netlify.toml`).

| File | Purpose |
|---|---|
| `/robots.txt` | All crawlers allowed, AI search and AI training bots listed; `Sitemap:` lines for `/sitemap.xml` and `/insights/rss.xml` |
| `/ai.txt` | Same permissive policy, points to `llms.txt` |
| `/sitemap.xml` | Sitemap index → `/sitemap-pages.xml`, `/sitemap-insights.xml` (with `lastmod` and `image:image`) |
| `/insights/rss.xml`, `/insights/atom.xml` | RSS 2.0 and Atom feeds for Insights (linked in every page head) |
| `/llms.txt`, `/llms-full.txt` | LLM index and full site text |
| `/llms/<page>.md` | Markdown copy of each indexable page (`/llms/index.md`, `/llms/bellvix-os.md`, …), linked from `llms.txt` and from each page head (`rel=alternate type=text/markdown`); served `noindex` so the HTML page stays canonical |
| `/site.webmanifest` | Web app manifest, icons 192/512 + maskable, colours `#050505` |
| `/favicon.ico`, `/favicon.svg`, `/favicon-32.png`, `/apple-touch-icon.png` | Icons |
| `/.well-known/security.txt`, `/humans.txt` | Security contact (renew `SECURITY_TXT_EXPIRES` yearly) and credits |
| `/a10a298ef6b4da9c121f8e3daf6354cd.txt` | IndexNow key file |

`lastmod` uses each page's own modified date (articles), otherwise `SITE_LASTMOD` in `src/config/seo.ts`. Update it when content changes.
Each page also has hreflang `en-AE` + `x-default`. Add a locale to `LOCALES` when Arabic ships.

**Search-engine verification** (optional, set in Netlify > Environment variables, then redeploy). The tags are rendered on the home page only when the variable is set:

| Env var | Renders |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | `<meta name="google-site-verification" content="…">` |
| `BING_SITE_VERIFICATION` | `<meta name="msvalidate.01" content="…">` |

A DNS TXT record (Google Search Console "Domain" property) works as well and needs no code.

**IndexNow:** after a production deploy, `npm run build && npm run indexnow` submits every sitemap URL to api.indexnow.org
(`npm run indexnow -- --dry-run` prints the payload without sending anything). Expect 200 or 202; 403 means the key file is not live yet.

## Enquiry delivery (temporary: mail client)

`ENQUIRY_DELIVERY` in `src/lib/forms.ts` controls how the contact form, the Bellvix OS demo form and the Bellvixy lead form deliver:

- `'mailto'` (current, temporary): after validation the submit handler sets `window.location.href` to a `mailto:info@bellvix.com`
  link built by `buildMailto()`. The email has a clear subject, every field, the page URL and, for chat, a short transcript;
  the URL is kept under about 1,800 characters. The page then shows "Your email app should open with your enquiry…", with
  "Open email again" and "Copy details". The Netlify Forms POST still runs in the background (fire-and-forget).
- `'netlify'`: Netlify Forms only. Contact and demo redirect to `/thank-you`; chat shows its thank-you message.

To switch back, set `ENQUIRY_DELIVERY = 'netlify'`, rebuild and deploy. Nothing else needs changing.

## Bellvixy chat assistant

- Widget: `src/components/chat/` (`ChatDock` is in the main bundle; `ChatPanel` is a lazy chunk loaded on first open or hover).
- AI: `netlify/functions/chat.mts` at `POST /api/chat`, calling any OpenAI-compatible `/chat/completions` API.
  The system prompt (`src/chat/systemPrompt.ts`) is built only from the site's own content (`llms-full` text) plus strict rules
  (no prices, clients, partners, stats or timelines; steer to a demo or leaving details).
- Protection: same-origin check, 600-character message cap, last 10 messages only, 12 KB body cap, in-memory per-IP rate limit
  (8 per minute, 40 per hour, per function instance), 20 s upstream timeout. The API key stays server-side.
- Fallback: if the function is missing, unconfigured, rate-limited or errors, the widget answers from a scripted intent matcher
  (`src/chat/knowledge.ts`, built from the same content files). This is what you see in `npm run preview`.
- Leads: the in-chat form posts to the Netlify Form `chat-lead` (name, phone, email, company, interest, message, page, transcript).

| Env var (Netlify, Functions scope) | Required | Default |
|---|---|---|
| `AI_API_KEY` | yes, for AI answers | none (scripted fallback) |
| `AI_BASE_URL` | no | `https://api.openai.com/v1` |
| `AI_MODEL` | no | `gpt-4o-mini` |
| `ALLOWED_ORIGINS` | no | site origin, bellvix.com, www.bellvix.com and Netlify deploy URLs |
| `PLAUSIBLE_DOMAIN` | no (build) | analytics off |

To try the AI locally, use `netlify dev` (Netlify CLI) with the env vars set; `npm run preview` has no functions.

## Content rules

No partner names, no client details, no invented stats/prices/certifications. `npm run verify` fails if a forbidden string appears.
