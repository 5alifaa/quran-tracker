# Quickstart: Quran Khatma Tracker

## Prerequisites

- Node.js compatible with the existing Next.js project.
- pnpm installed.

## Install

```bash
pnpm install
```

## Develop

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Build

```bash
pnpm build
```

## Manual Verification

### Onboarding

- Clear local site data.
- Open the app.
- Confirm the onboarding modal appears with `اسم القارئ`.
- Submit an empty name and confirm friendly Arabic validation appears.
- Submit a valid name.
- Confirm the header shows `الورد اليومي — <اسم القارئ>`.
- Reopen the app and confirm onboarding does not reappear.

### Edit Name

- Open the settings action in the header.
- Change the reader name.
- Confirm the updated name appears immediately and persists after reload.

### Dashboard

- Confirm the title `ختمة القرآن في ٤٠ يوم` appears.
- Confirm top and bottom Islamic SVG borders render.
- Confirm exactly 40 cards are visible.
- Confirm progress starts at 0% for fresh state.
- Confirm the suggested current day is highlighted.
- Confirm the `اليوم: <رقم اليوم>` shortcut toggles the suggested current day directly.

### Quick Toggle Completion

- Review several day cards, including a non-sequential day.
- Confirm each compact card shows the day label on its own line and the range below it as one no-wrap full-width line, for example `الأعرَاف ١ ← الأعرَاف ١٤١`.
- Tap a day card and confirm progress updates within 1 second.
- Tap a completed day again and confirm it toggles incomplete without a confirmation dialog.
- Confirm un-completion decreases progress.

### Reset And Completion

- Complete all 40 days.
- Confirm the celebration modal shows `مبروك! ختمت القرآن في ٤٠ يوم 🎉`.
- Cancel reset once and confirm state remains.
- Confirm reset clears reader name and progress and onboarding appears again.

### Responsive And Accessibility

- Verify mobile layout has 2 columns and touch targets are at least 44px.
- Verify tablet layout has 3-4 columns.
- Verify desktop layout has 5-7 columns.
- Verify no horizontal scrolling in the main grid.
- Navigate primary flows with keyboard only.
- Confirm visible focus states and accessible labels for inputs, buttons, checkbox-like day cards, dialogs, and progress.
- Check contrast against WCAG 2.1 AA expectations.

### Persistence And Offline

- Mark days complete, close/reopen the browser, and confirm progress persists.
- Manually make saved data invalid and confirm the app restarts gracefully to onboarding.
- After first successful load, test offline return where browser cache permits.

### Performance And Fonts

- Verify first paint is under 3 seconds on a mobile 3G-class profile.
- Confirm fonts use swap behavior with no invisible text.
- Confirm no user-visible layout shift in dashboard and remaining modal views.
- Confirm Amiri is used for headings and Noto Naskh Arabic or system fallback for body text.

## Deployment Check

- Deploy to Vercel.
- Static export may be enabled only if `pnpm build` and deployed behavior preserve font loading, offline return, and single-page behavior.
- No environment variables are required.
