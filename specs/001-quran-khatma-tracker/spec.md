# Feature Specification: Quran Khatma Tracker

**Feature Branch**: `001-quran-khatma-tracker`  
**Created**: 2026-07-13  
**Status**: Draft  
**Input**: User description: "Mobile-first Arabic RTL single-page Quran reading tracker that helps a reader complete the Quran in 40 days with onboarding, quick-toggle daily cards, progress tracking, reset, warm spiritual tone, and the provided 40-day reading allocation."

## Clarifications

### Session 2026-07-13

- Q: What happens if a reader opens the app on day 5 without completing days 1-4? -> A: No enforcement; any day can be marked complete in any order, while the suggested current-day indicator highlights the next incomplete day.
- Q: What if the reader wants to change their name after onboarding? -> A: A small settings icon in the header opens an edit-name modal and saves the new name immediately.
- Q: How is the 40-day plan data handled? -> A: The fixed 40-day plan is a static local dataset with no API calls.
- Q: What if local saved data is cleared or unavailable? -> A: The app restarts gracefully from fresh state and shows onboarding again without error messaging.
- Q: Should there be a today quick-access button? -> A: Yes; a prominent `اليوم: <رقم اليوم>` shortcut toggles the suggested current day directly.
- Q: Is start date needed? -> A: Store start date for future features but do not display it in the MVP.
- Q: Can the reader un-complete a day? -> A: Yes; tapping a completed day again toggles it back to incomplete immediately, without a confirmation dialog.
- Q: What happens after all 40 days are complete? -> A: Show a celebration modal with `مبروك! ختمت القرآن في ٤٠ يوم 🎉` and an option to reset and start again.
- Q: Should the app work offline? -> A: Yes; after first load, everything needed is local and no network is required.
- Q: What font loading strategy is required? -> A: Use Amiri for headings and Noto Naskh Arabic for body with swap loading and system Arabic fallbacks.
- Q: How should ayah ranges across surahs be displayed? -> A: Use compact card ranges like `<اسم السورة> <رقم الآية> ← <اسم السورة> <رقم الآية>` with the arrow indicating reading direction.
- Q: Should progress sharing be included? -> A: No; sharing progress is out of scope for MVP.
- Q: What animations are allowed? -> A: Minimal modal fade-in for onboarding/reset/celebration flows, checkmark bounce, and progress bar fill only.
- Q: How should day cards display reading ranges? -> A: The day label appears on its own line; the compact range appears below it on a full-width, no-wrap line such as `الأعرَاف ١ ← الأعرَاف ١٤١` or `الصَّافَات ١٤٥ ← الزُّمَر ٧٥`, without repeating the surah name in the day label.
- Q: Are completed days editable in order? -> A: Yes; any day can be toggled complete or incomplete at any time with no ordering restrictions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start a Personal Khatma (Priority: P1)

As a first-time reader, I want to enter my name and see a warm Arabic greeting so the tracker feels personal and encouraging from the first visit.

**Why this priority**: Personal onboarding is the entry point for the experience and enables the companion-like tone requested for the app.

**Independent Test**: Can be fully tested by opening the tracker with no saved reader profile, entering a name, and confirming the dashboard greets the reader by name in Arabic.

**Acceptance Scenarios**:

1. **Given** a first-time reader with no saved name, **When** they open the tracker, **Then** a friendly modal asks for `اسم القارئ`.
2. **Given** the onboarding modal is shown, **When** the reader enters a valid name and confirms, **Then** the name is saved for future visits and the header displays `الورد اليومي — [الاسم]`.
3. **Given** a saved reader name exists, **When** the reader returns later on the same device, **Then** the onboarding modal is not shown and the greeting uses the saved name.
4. **Given** a saved reader name exists, **When** the reader opens header settings and edits the name, **Then** the new name is saved immediately and the greeting updates.

---

### User Story 2 - Follow the 40-Day Reading Plan (Priority: P1)

As a reader, I want to see all 40 daily Quran portions with surah and ayah ranges so I always know what to read today and what remains.

**Why this priority**: The reading plan is the core value of the tracker; without it, users cannot complete the khatma through the app.

**Independent Test**: Can be fully tested by viewing the dashboard and confirming it presents 40 ordered day cards with the provided reading allocations and clear suggested-current, completed, and incomplete states.

**Acceptance Scenarios**:

1. **Given** the reader has started the tracker, **When** the dashboard loads, **Then** it shows the title `ختمة القرآن في ٤٠ يوم`, decorative Islamic borders at the top and bottom, and a 40-card day grid.
2. **Given** no days are completed, **When** the dashboard is shown, **Then** day 1 is highlighted as the suggested current day and later days remain available.
3. **Given** one or more days are completed in any order, **When** the dashboard is shown, **Then** the first incomplete day is highlighted as the suggested current day and completed days show a checkmark and dimmed completed styling.
4. **Given** the reader views the dashboard on a small mobile screen, **When** the cards are displayed, **Then** they appear in two columns with touch-friendly tap targets.
5. **Given** the dashboard is visible, **When** the reader taps the `اليوم: <رقم اليوم>` shortcut, **Then** the suggested current day toggles complete or incomplete directly.

---

### User Story 3 - Mark Daily Reading Complete (Priority: P1)

As a reader, I want to mark or unmark any day's portion directly from its card so my khatma progress reflects my real reading without strict enforcement.

**Why this priority**: Completion tracking is the main action that turns the static plan into a useful companion.

**Independent Test**: Can be fully tested by selecting any day, toggling completion on and off, and verifying the day state and progress percentage update and persist after refresh.

**Acceptance Scenarios**:

1. **Given** any incomplete day card is visible, **When** the reader taps its card, **Then** the day is marked complete immediately, the card shows completed state, and progress increases.
2. **Given** any completed day card is visible, **When** the reader taps its card again, **Then** that day becomes incomplete immediately and progress decreases.
3. **Given** any day card is visible, **When** the reader reviews it, **Then** the day label appears separately and the reading range appears below on a no-wrap full-width line.
4. **Given** any day is visible regardless of earlier days, **When** the reader marks it complete, **Then** the tracker allows the action and updates progress without enforcing reading order.

---

### User Story 4 - Understand Progress and Restart (Priority: P2)

As a reader, I want to see my khatma completion percentage and restart only after confirmation so I can stay motivated without accidentally losing progress.

**Why this priority**: Progress feedback and safe reset support long-running use while reducing accidental data loss.

**Independent Test**: Can be fully tested by completing several days, checking the progress display, using reset, cancelling once, then confirming reset and verifying the tracker returns to the initial progress state.

**Acceptance Scenarios**:

1. **Given** some days are complete, **When** the dashboard is shown, **Then** the `تقدم الختمة` progress area shows a fill bar and percentage badge matching completed days out of 40.
2. **Given** the reader chooses `ابدأ من جديد`, **When** the confirmation is shown and the reader cancels, **Then** no name or completion progress is changed.
3. **Given** the reader confirms `ابدأ من جديد`, **When** reset completes, **Then** all day completions, completion dates, reader name, and hidden start date are cleared, progress returns to 0%, and onboarding appears again.
4. **Given** all 40 days are complete, **When** the app detects full completion, **Then** it shows a celebration modal with `مبروك! ختمت القرآن في ٤٠ يوم 🎉` and an option to reset and start again.

---

### User Story 5 - Experience a Warm Arabic Interface (Priority: P2)

As an Arabic-speaking reader, I want every visible label and message to be in Arabic with right-to-left layout and uplifting wording so the tracker feels spiritually aligned and easy to use.

**Why this priority**: The requested tone and RTL Arabic experience are central to the product’s identity and usability.

**Independent Test**: Can be fully tested by reviewing every visible screen state and confirming Arabic-only interface text, RTL reading order, warm phrasing, and the requested cream, teal, gold, navy, and yellow visual language.

**Acceptance Scenarios**:

1. **Given** any normal app screen or modal is visible, **When** a reader reviews the interface, **Then** all user-facing text is Arabic and arranged right-to-left.
2. **Given** a reader sees the dashboard, cards, progress area, and modal, **When** visual styling is evaluated, **Then** the experience uses the requested warm Islamic visual language and avoids a cold task-manager tone.

### Edge Cases

- If the reader submits an empty or whitespace-only name, the tracker keeps the onboarding modal open and shows a friendly Arabic validation message.
- If saved tracker data is missing, incomplete, or unreadable, the tracker restores a safe fresh 40-day plan without showing broken states.
- If local saved data is cleared or unavailable, the tracker restarts gracefully, shows onboarding again, and avoids alarming error messages.
- If all 40 days are complete, the progress display shows 100%, all days appear complete, and the interface shows a celebration modal in Arabic.
- If no days are complete, progress shows 0% and day 1 is the current highlighted day.
- If the reader taps a completed day, the tracker removes that completion once and does not duplicate or corrupt completion records.
- If reset is cancelled or dismissed, all existing reader name and completion progress remain unchanged.
- If the tracker cannot save changes on the current device, it allows viewing the 40-day plan, restarts gracefully when needed, and does not show technical error text.
- If a saved state is more than 100 days old, it remains valid with no expiration.
- If a reading range is long, the card keeps it on one full-width line below the day label and avoids repeating the surah name in the day label.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The tracker MUST show a first-visit onboarding modal requesting the reader name with the Arabic label `اسم القارئ` when no reader name is saved.
- **FR-002**: The tracker MUST require a non-empty reader name before entering the personalized dashboard.
- **FR-003**: The tracker MUST remember the reader name, completed days, completion dates, and start date on the same device between visits.
- **FR-004**: The dashboard header MUST display `ختمة القرآن في ٤٠ يوم` and greet the reader using `الورد اليومي — [الاسم]` after onboarding.
- **FR-004a**: The header MUST include a small settings action that opens a name-edit modal and saves name changes immediately.
- **FR-005**: The dashboard MUST present the complete 40-day khatma plan in day order from 1 through 40.
- **FR-006**: Each day MUST display its day number, starting surah and ayah, ending surah and ayah, and completion status.
- **FR-007**: The suggested current day MUST be defined as the lowest-numbered incomplete day and MUST be visually highlighted with the gold accent.
- **FR-008**: Completed days MUST show a checkmark, appear slightly dimmed, and remain available for review.
- **FR-009**: Any day MUST be markable complete or incomplete at any time, regardless of whether earlier days are complete.
- **FR-010**: The tracker MUST provide a large suggested-current-day card treatment that includes a teal day header, `ورد اليوم`, the ayah range, and either a quick registration cue or a completed checkmark.
- **FR-011**: The tracker MUST provide a compact card treatment for non-current days that includes day number, a full-width no-wrap ayah range below the day label, and a status indicator; the day label MUST NOT repeat the surah name.
- **FR-012**: The day card grid MUST show 2 columns on small mobile screens, expand to 3-4 columns on tablet-sized screens, and expand to 5-7 columns on large desktop screens.
- **FR-013**: All primary touch actions MUST be easy to tap, with interactive targets large enough for comfortable mobile use.
- **FR-014**: Tapping any day card MUST toggle that day complete or incomplete directly.
- **FR-015**: Day cards MUST expose accessible checkbox-like state so keyboard and assistive-technology users can toggle completion directly.
- **FR-015a**: Compact ayah ranges MUST be displayed as `<اسم السورة> <رقم الآية> ← <اسم السورة> <رقم الآية>`, with Arabic numerals and no wrapping in the card.
- **FR-016**: Toggling a day complete MUST immediately update the day state, completion date, suggested current day, and overall progress.
- **FR-016a**: Toggling a completed day back to incomplete MUST happen immediately without a confirmation dialog.
- **FR-017**: The progress area MUST be labelled `تقدم الختمة` and show both a visual progress bar and a numeric percentage badge.
- **FR-018**: The progress percentage MUST equal completed days divided by 40, rounded to the nearest whole percent for display.
- **FR-019**: The visual design MUST use the requested cream page and card background, teal primary accent, gold progress background and highlight accents, deep navy primary text, and yellow/gold secondary accent.
- **FR-020**: The interface MUST use Arabic-only user-facing text and right-to-left layout throughout normal, empty, error, confirmation, modal, and completion states.
- **FR-021**: The visual tone MUST feel warm, friendly, spiritually uplifting, and companion-like, using natural Islamic greetings and encouragement where appropriate.
- **FR-022**: The tracker MUST include Islamic geometric decorative borders at both the top and bottom of the dashboard.
- **FR-023**: The tracker MUST provide an `ابدأ من جديد` action that asks for confirmation before clearing completion progress.
- **FR-024**: Confirmed reset MUST clear reader name, hidden start date, all day completion statuses, and completion dates, reset progress to 0%, and show onboarding again.
- **FR-025**: The tracker MUST preserve the exact 40-day reading allocations listed in this specification.
- **FR-026**: The dashboard MUST include a prominent `اليوم: <رقم اليوم>` shortcut that toggles the suggested current day directly.
- **FR-027**: When all 40 days are complete, the tracker MUST show `مبروك! ختمت القرآن في ٤٠ يوم 🎉` with an option to reset and start again.
- **FR-028**: The tracker MUST work without network access after the first successful load, using only local app data and saved reader progress.
- **FR-029**: The tracker MUST use minimal animations only: modal fade-in for remaining modal flows, checkmark bounce, and progress bar fill.
- **FR-030**: The tracker MUST avoid layout shift during font loading and MUST fall back to system Arabic fonts if preferred fonts are not available.

### 40-Day Reading Plan

- **Day 1**: الفَاتِحة 1 to البَقَرَة 105
- **Day 2**: البَقَرَة 106 to البَقَرَة 202
- **Day 3**: البَقَرَة 203 to البَقَرَة 271
- **Day 4**: البَقَرَة 272 to آل عِمران 92
- **Day 5**: آل عِمران 93 to آل عِمران 200
- **Day 6**: النِّسَاء 1 to النِّسَاء 87
- **Day 7**: النِّسَاء 88 to النِّسَاء 176
- **Day 8**: المَائدة 1 to المَائدة 81
- **Day 9**: المَائدة 82 to الأنعَام 73
- **Day 10**: الأنعَام 74 to الأنعَام 165
- **Day 11**: الأعرَاف 1 to الأعرَاف 141
- **Day 12**: الأعرَاف 142 to الأنفَال 40
- **Day 13**: الأنفَال 41 to التوبَة 59
- **Day 14**: التوبَة 60 to يُونس 25
- **Day 15**: يُونس 26 to هُود 40
- **Day 16**: هُود 41 to يُوسُف 52
- **Day 17**: يُوسُف 53 to إبراهِيم 9
- **Day 18**: إبراهِيم 10 to النَّحل 50
- **Day 19**: النَّحل 51 to الإسرَاء 49
- **Day 20**: الإسرَاء 50 to الكَهف 74
- **Day 21**: الكَهف 75 to طه 82
- **Day 22**: طه 83 to الأنبيَاء 112
- **Day 23**: الحج 1 to المؤمنُون 74
- **Day 24**: المؤمنُون 75 to الفُرقَان 20
- **Day 25**: الفُرقَان 21 to الشعراء 227
- **Day 26**: النَّمل 1 to القَصَص 50
- **Day 27**: القَصَص 51 to الرُّوم 30
- **Day 28**: الرُّوم 31 to الأحزَاب 30
- **Day 29**: الأحزَاب 31 to فَاطِر 14
- **Day 30**: فَاطِر 15 to الصَّافَات 144
- **Day 31**: الصَّافَات 145 to الزُّمَر 75
- **Day 32**: غَافِر 1 to فُصِّلَت 46
- **Day 33**: فُصِّلَت 47 to الدُّخان 16
- **Day 34**: الدُّخان 17 to الفَتح 17
- **Day 35**: الفَتح 18 to النَّجم 25
- **Day 36**: النَّجم 26 to الحدِيد 29
- **Day 37**: المُجَادلة 1 to التغَابُن 18
- **Day 38**: الطَّلَاق 1 to نُوح 28
- **Day 39**: الجِن 1 to التَّكوير 29
- **Day 40**: الانفِطَار 1 to النَّاس end

### Key Entities

- **Reader Profile**: Represents the person using the tracker on a device; includes reader name and optional hidden start date.
- **Day Plan**: Represents one of the 40 ordered reading portions; includes day number, starting surah and ayah, ending surah and ayah, completion state, and optional completion date.
- **Khatma Progress**: Represents aggregate completion across the 40-day plan; includes completed day count, percentage complete, suggested current day, and overall completion state.
- **Reading Plan Dataset**: Represents the fixed local 40-day reading allocation; it has no external source and does not change during MVP use.

### Out of Scope

- Backend services, databases, authentication, and cross-device syncing.
- Multiple reading plans, timer or streak tracking, and calendar integration.
- Social sharing, push notifications, analytics, and progress tracking outside the device.
- Dark mode, audio recitation, tafsir, notes, or full Quran text display.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time reader can complete onboarding and reach the personalized dashboard in under 30 seconds.
- **SC-002**: 100% of the provided 40 reading allocations are visible in order and match the specified start and end ranges.
- **SC-003**: A reader can identify and toggle the suggested current day's reading portion within 5 seconds of opening the dashboard.
- **SC-004**: Toggling a day complete or incomplete updates the card state and progress percentage within 1 second from the reader's perspective.
- **SC-005**: Saved reader name and progress remain available after closing and reopening the tracker on the same device in 95% or more of normal return visits.
- **SC-006**: The dashboard remains usable on mobile, tablet, and desktop viewport sizes with no horizontal scrolling for the main 40-day grid.
- **SC-007**: At least 90% of tested primary actions meet comfortable mobile tap sizing and spacing expectations.
- **SC-008**: In user review, at least 90% of Arabic-speaking reviewers can complete onboarding, mark a day complete or incomplete directly from the card, and reset progress without assistance.
- **SC-009**: In qualitative review, at least 80% of Arabic-speaking reviewers describe the experience as warm, clear, and spiritually encouraging rather than task-manager-like.
- **SC-010**: First paint occurs in under 3 seconds on a mobile 3G-class connection during manual performance verification.
- **SC-011**: Font loading avoids invisible text and causes no user-visible layout shift in the dashboard and remaining modal views.
- **SC-012**: After the first successful load, a returning reader can open and use the tracker without network access during manual offline verification.

## Assumptions

- The MVP is intended for one reader per device and does not require accounts, sign-in, sharing, or syncing across devices.
- "Suggested current day" means the lowest-numbered incomplete day; it guides the reader without enforcing order.
- Any day can be toggled complete or incomplete at any time, including when earlier days remain incomplete.
- Reset clears completion progress, completion dates, reader name, and hidden start date so onboarding appears again.
- The provided Quran reading allocation is authoritative for this feature, including surah spellings and ayah ranges.
- The app does not display full Quran text in this MVP; it tracks assigned ranges and completion status only.
- The interface language is Arabic for all user-facing content; the specification is written in English for planning clarity.
- Font loading uses Amiri for headings and Noto Naskh Arabic for body with swap behavior and system Arabic fallbacks.
- Sharing progress, push notifications, audio recitation, tafsir, notes, dark mode, and calendar features are excluded from MVP.
