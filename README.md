# MGI Chat SaaS (Colorful Edition)

Production-ready Next.js 14 chatbot SaaS with:
- Colorful UI (Tailwind + gradients + animations)
- Dashboard (pause/resume, usage stats, demo limits)
- Chatbox with tidy Markdown answers + emojis
- Floating widget + embed frame
- Plans page (links to Shopify placeholders)
- Documentation page (HTML / Shopify / WP / Wix / Google Sites)
- Catch-all route to eliminate 404s

## Quick Start
```bash
npm install
npm run dev
```
Then deploy to Vercel.

## Notes
- Usage limits are cookie-based demo storage (zero-config). For production persistence, connect a DB and replace lib/usage.ts.
- Update Shopify links in `app/(public)/plans/page.tsx` when ready.
```
