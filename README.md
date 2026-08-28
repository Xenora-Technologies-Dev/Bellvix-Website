# BELLVIX TECHNOLOGIES

Premium corporate website for BELLVIX TECHNOLOGIES — technology, AI, branding, and digital growth. Headquartered in the UAE.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Update company details

Edit `src/config/company.ts`:

- `phone` — international format, e.g. `+971501807814`. Leave empty to hide phone everywhere.
- `phoneDisplay` — optional formatted number shown in the UI.
- `email` — leave empty to hide email everywhere.
- `whatsapp` — digits only for `wa.me` links.

To connect the contact form to a backend, set `VITE_CONTACT_ENDPOINT` to a POST URL that accepts JSON.

## Deploy on Netlify

This project is configured for Netlify (`netlify.toml`, SPA redirects, Node 22).

1. Push the repo to GitHub.
2. In Netlify, **Add new site → Import an existing project**.
3. Build command: `npm run build`
4. Publish directory: `dist`

Or deploy from the CLI:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```
