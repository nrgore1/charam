# Charam — Giving Gratitude a Purpose

Single-page landing site for Charam, a gratitude-rooted non-profit funding girls' education.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom token system in `tailwind.config.ts`)
- Framer Motion (one orchestrated hero entrance + gentle in-view reveals, `prefers-reduced-motion` respected)
- Lucide React icons

## Run
```bash
npm install
npm run dev
```

## Where things live
- `app/page.tsx` — assembles the page from modular sections
- `components/` — Navbar, Hero, FounderLetter, RippleEffect, CelebrationGiving, Transparency, Footer, DonateModal, ArchFrame
- `lib/site.ts` — all copy constants, giving tiers, occasions, legal placeholders (edit content here first)

## Wiring real payments
`DonateModal` holds full UI state (frequency, currency, amount, dedication). Replace the `handleContinue` stub with a Stripe Checkout / Razorpay order call — the selected state object is already shaped for a request payload.

## Placeholders to replace before launch
- Photography: `ArchFrame` renders a respectful gradient placeholder; swap in `next/image` with real, consented photos
- Legal registration numbers (501(c)(3) / 80G / FCRA) in `lib/site.ts`

## Recommended charities section
- The site makes no partnership claims; it links out to independent organizations (Project Nanhi Kali, Educate Girls, Room to Read, Pratham) for direct giving
- The list lives in `CHARITIES` in `lib/site.ts` — verify each URL and description before launch, and add or remove organizations there

## Deploying (VPS fleet pattern — sha-tagged Docker image behind Traefik)
- `Dockerfile` builds the static export and bakes it into nginx as `charam/web:<git sha>` — same convention as the other web images on the box
- On the VPS: source lives at `/opt/charam/src` (git clone), `deploy/compose.vps.yml` is copied to `/opt/charam/compose.yml`, and `deploy/deploy.sh` does pull → build → `compose up -d`
- Traefik routing/TLS comes from `/opt/liqmint/edge/dynamic/charam.yml` (router `charam.org` → service `http://charam-web:80`, certResolver `letsencrypt`); Traefik has `watch: false`, so a restart is needed only when that file first lands or changes
- Redeploy = commit + push locally, then run `/opt/charam/src/deploy/deploy.sh` on the VPS

## Referral tracking & admin ledger
- `api/server.js` (zero-dependency Node, built via `Dockerfile.api`) records events to `/opt/charam/data/events.ndjson`: `outbound_click`, `pledge` (amount/currency/org captured at click-out), and donor self-reported `confirmed`
- Dashboard at https://charam.org/admin (basic auth via ADMIN_USER/ADMIN_PASS in `/opt/charam/.env`); Traefik routes `/api` + `/admin` to `charam-api` (`deploy/traefik-charam.yml`)
- Honesty note: pledged/confirmed figures are unverified referrals, not verified payments — outbound links carry `utm_source=charam.org` so partner orgs can corroborate referral traffic
