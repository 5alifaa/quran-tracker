# Quran 40-Day Khatma Tracker

Mobile-first Arabic RTL Quran reading tracker for completing a khatma in 40 days.

## Principles

- Mobile-first: design starts on phones, with 44px minimum touch targets.
- Arabic-first: all UI text is Arabic, RTL-native, with Arabic numerals.
- Spiritual tone: encouraging companion language, never guilt-based copy.
- Zero backend MVP: local device storage only, no auth, database, API, analytics, or tracking.
- Performance-first: single page, minimal dependencies, SVG graphics only, fast first paint.
- Accessible: WCAG 2.1 AA expectations, semantic HTML, focus states, and screen reader support.

## Development

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Build

```bash
pnpm build
```

The app is configured for static export through `next.config.ts`. Keep this only while it preserves the single-page local-only behavior, Arabic font loading, and Vercel deployment compatibility.

## Manual Verification

- iPhone Safari
- Android Chrome
- Desktop Chrome
- Local storage persistence after close and reopen
- RTL layout and Arabic numerals
- Arabic font loading
- Offline return after first successful load where browser cache permits
- Keyboard access, visible focus states, labels, semantic HTML, and contrast

## Deployment

Deploy on Vercel. No environment variables are required for the MVP. If static export causes a deployment or font-loading issue, use the standard Vercel Next.js deployment while preserving the zero-backend app behavior.
