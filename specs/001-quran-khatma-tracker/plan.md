# Implementation Plan: Quran Khatma Tracker

**Branch**: `001-quran-khatma-tracker` | **Date**: 2026-07-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-quran-khatma-tracker/spec.md`

## Summary

Build a mobile-first, Arabic RTL, single-page Quran khatma tracker that lets one reader per device personalize their name, review a fixed 40-day reading plan, toggle any day complete or incomplete in any order, see local progress, and reset to begin again. Implementation uses the existing Next.js app with strict TypeScript, Tailwind utilities, localStorage persistence, static local plan data, SVG decoration, Arabic fonts, and accessible dialog/card/button patterns.

## Technical Context

**Language/Version**: TypeScript 5 strict mode with Next.js 16.2.10 and React 19.2.4  
**Primary Dependencies**: Existing Next/React/Tailwind stack; shadcn/ui component bases for Dialog, Button, Card, Progress, Input, and Label; Google Fonts Amiri and Noto Naskh Arabic via framework font loading  
**Storage**: Browser localStorage only; graceful fresh-state fallback when unavailable or cleared  
**Testing**: Manual MVP verification plus `pnpm build`; no unit tests for MVP unless later requested  
**Target Platform**: Mobile web first, with responsive tablet and desktop support  
**Project Type**: Single-page web app  
**Performance Goals**: First paint under 3 seconds on a 3G-class mobile profile; no visible font-loading layout shift; completion toggles update within 1 second  
**Constraints**: Arabic-only UI, RTL-native layout, Arabic numerals, no backend/API/auth/database/analytics/tracking, SVG graphics only, light cream theme, minimal animations only  
**Scale/Scope**: One reader per device, 40 static reading-plan records, saved state under 5KB, no cross-device sync

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Mobile-first**: PASS. Plan starts with the mobile grid, 44px interactive targets, thumb-friendly modals/buttons, and no horizontal scrolling.
- **Arabic-first RTL**: PASS. All user-facing UI is Arabic, `html`/layout direction is RTL, Arabic numerals are required, and Amiri/Noto Naskh Arabic are selected.
- **Spiritual tone**: PASS. Completion, reset, empty, and celebration copy uses encouraging language without streak pressure or guilt.
- **Zero backend MVP**: PASS. All state is localStorage; there are no API calls, auth, database, analytics, tracking, or data leaving the device.
- **Performance over features**: PASS. Single-page app, fixed local data, SVG decoration, minimal animation, and no social/audio/tafsir/calendar scope.
- **Accessibility**: PASS. Components must use semantic HTML, accessible dialogs, labels, keyboard flow, visible focus, and WCAG 2.1 AA contrast.
- **Code constraints**: PASS. Strict TypeScript, no `any`, Tailwind utilities, shadcn/ui bases where useful, small focused components, Arabic comments for non-obvious business logic.
- **Manual verification**: PASS. Quickstart includes iPhone Safari, Android Chrome, Desktop Chrome, persistence, RTL, fonts, offline return, accessibility basics, and `pnpm build`.

Post-design re-check: PASS. Phase 1 artifacts preserve the same gates. Static export remains a desired deployment optimization and must be confirmed during implementation; if it conflicts with font loading or offline return behavior, standard Vercel deployment remains constitution-compliant.

## Project Structure

### Documentation (this feature)

```text
specs/001-quran-khatma-tracker/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── page.tsx
├── layout.tsx
├── globals.css
└── components/
    ├── OnboardingModal.tsx
    ├── DayCard.tsx
    ├── EditNameModal.tsx
    ├── ResetConfirmModal.tsx
    ├── CelebrationModal.tsx
    ├── ProgressBar.tsx
    ├── IslamicBorder.tsx
    └── Header.tsx

lib/
├── data.ts
└── storage.ts

types/
└── index.ts
```

**Structure Decision**: Use the user-requested `app/components/` structure for feature-specific components, with `lib/` for static plan data and storage helpers and `types/` for shared TypeScript interfaces. This keeps page orchestration in `app/page.tsx` and avoids backend, routing, or service directories.

## Complexity Tracking

No constitution violations are planned.

| Violation | Why Needed | Simpler Alternative Rejected Because | Follow-up Back to Compliance |
|-----------|------------|-------------------------------------|------------------------------|
