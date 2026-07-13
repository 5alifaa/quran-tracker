# UI Contract: Quran Khatma Tracker

This feature has no backend, public API, or external service contract. The contract below defines the user-facing UI states and local-only state transitions that implementation and manual verification must preserve.

## Global UI Rules

- All user-facing text is Arabic.
- Layout direction is RTL throughout.
- Displayed numbers use Arabic numerals.
- Primary touch targets are at least 44px.
- Controls are keyboard reachable and have visible focus states.
- Graphics are SVG only.
- Animations are limited to modal fade-in, checkmark bounce, and progress bar fill.

## Onboarding Modal

### Opens When

- No valid reader name exists in local app state.
- Local saved data is cleared, missing, corrupt, or unavailable.
- Confirmed reset clears the reader name.

### Required Content

- Greeting copy in the style of `أهلاً بك! معاً نختم القرآن في ٤٠ يوم`.
- Name field labelled `اسم القارئ`.
- Confirm action with a touch-friendly button.

### Submit Behavior

- Empty or whitespace-only name keeps the modal open and shows friendly Arabic validation.
- Valid name creates or updates AppState and opens the dashboard.

## Header

### Required Content

- App title: `ختمة القرآن في ٤٠ يوم`.
- Personalized greeting: `الورد اليومي — <اسم القارئ>`.
- Small settings action for editing the reader name.

### Edit Name Behavior

- Settings opens an edit-name modal.
- Saving a non-empty name updates the header immediately.

## Dashboard

### Required Content

- Top and bottom Islamic geometric SVG borders.
- Progress area labelled `تقدم الختمة`.
- Percentage badge and progress bar.
- Prominent quick-access shortcut: `اليوم: <رقم اليوم>`.
- Grid of exactly 40 day cards.
- Reset action: `ابدأ من جديد`.

### Responsive Contract

- Mobile: 2 card columns.
- Tablet: 3-4 card columns.
- Desktop: 5-7 card columns.
- Main grid must not require horizontal scrolling.

## Day Card

### Suggested Current Day Variant

- Teal header.
- Day number.
- `ورد اليوم` and `الآيات` labels.
- Surah name and ayah range.
- `أنجزت` action if incomplete or checkmark if complete.
- Gold highlight treatment.

### Compact Variant

- Day number and surah name.
- Ayah range.
- Status indicator.
- Surah names longer than 15 characters truncate with ellipsis.

### Interaction

- Tapping any card opens the detail modal for that day.
- Completion is not order-enforced.

## Day Detail Modal

### Required Content

- Day number.
- Full surah names.
- Ayah range formatted as `السورة <اسم السورة> الآية <رقم الآية> ← السورة <اسم السورة> الآية <رقم الآية>`.
- Primary completion action: `✓ أَنْجَزْت`.
- Close action: `إغلاق`.

### Toggle Behavior

- Incomplete day: completion action marks it complete immediately.
- Completed day: completion action asks `هل تريد إلغاء إنجاز هذا اليوم؟`.
- Confirming un-completion toggles the day incomplete and decreases progress.
- Closing or outside click does not change state.

## Reset Confirmation

### Required Content

- Calm confirmation copy such as `هل تريد البدء من جديد؟`.
- Confirm and cancel actions.

### Behavior

- Cancel preserves all state.
- Confirm clears reader name, hidden start date, all completed flags, and all completion dates, then shows onboarding.

## Completion Celebration

### Opens When

- All 40 days are complete.

### Required Content

- `مبروك! ختمت القرآن في ٤٠ يوم 🎉`.
- Option to reset and start again.

## Local State Contract

- State changes save immediately when localStorage is available.
- If localStorage is unavailable, the UI remains usable for the current session and restarts gracefully later.
- Stored state older than 100 days remains valid.
- No reader data leaves the device.
