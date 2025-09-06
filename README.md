# MGI SaaS Ultra

- Next.js 14 + Prisma 5 + Vercel-ready
- Colorful UI + animated Send button
- Admin-only controls (limits, pause/resume, watermark)
- Company dashboard (read-only limits usage)
- Embeddable widget: `/embed/widget.js?companyId=...`
- Integration guide at `/integration`

## Environment
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- Optional email:
  - `EMAIL_OTP_ENABLED=1`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
