# Tasks: Quran Khatma Tracker

**Input**: Design documents from `/specs/001-quran-khatma-tracker/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

**Tests**: Unit tests are not required for MVP. Manual verification tasks are included in the final phase per the constitution and quickstart.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Each task includes exact file paths where work occurs

## Path Conventions

- **App router**: `app/`
- **Feature components**: `app/components/`
- **Shared UI primitives**: `app/components/ui/`
- **Utilities, data, storage**: `lib/`
- **Types only**: `types/`
- Do not add backend, API, database, analytics, auth, route, dark mode, image asset, or tracking directories for MVP tasks.

---

## Phase 1: Setup (Shared Foundation)

**Purpose**: Establish project configuration, fonts, RTL base layout, theme tokens, and approved UI primitives.

- [X] T001 Verify strict TypeScript settings and path aliases in `tsconfig.json`
- [X] T002 Configure Arabic metadata, RTL document attributes, and Amiri/Noto Naskh Arabic font loading in `app/layout.tsx`
- [X] T003 Configure cream background, Tailwind theme variables, focus styles, reduced-motion handling, and Arabic body defaults in `app/globals.css`
- [X] T004 Configure static export only if compatible with the MVP deployment constraints in `next.config.ts`
- [X] T005 Add approved shadcn/ui configuration for local UI primitives in `components.json`
- [X] T006 [P] Add accessible Button primitive for reuse in `app/components/ui/Button.tsx`
- [X] T007 [P] Add accessible Dialog primitive for modal flows in `app/components/ui/Dialog.tsx`
- [X] T008 [P] Add Card, Progress, Input, and Label primitives in `app/components/ui/Card.tsx`, `app/components/ui/Progress.tsx`, `app/components/ui/Input.tsx`, and `app/components/ui/Label.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared types, fixed data, formatting helpers, and local-only persistence before user stories begin.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T009 Define `AyahReference`, `DayPlan`, `AppState`, and `KhatmaProgress` interfaces in `types/index.ts`
- [X] T010 Create the exact fixed 40-day reading plan dataset in `lib/data.ts`
- [X] T011 Create Arabic numeral, percentage, day label, and ayah range formatting helpers in `lib/format.ts`
- [X] T012 Implement localStorage load, save, reset, corrupt-data fallback, and unavailable-storage fallback helpers in `lib/storage.ts`
- [X] T013 Implement derived progress and suggested-current-day helpers in `lib/progress.ts`
- [X] T014 Create the single-page client state shell with initialization, persistence, and reset wiring in `app/page.tsx`

**Checkpoint**: Types, data, formatting, progress derivation, storage, and page state exist for all stories.

---

## Phase 3: User Story 1 - Start a Personal Khatma (Priority: P1) MVP

**Goal**: First-time readers can enter a name, see a personalized Arabic greeting, return without onboarding, and edit their name later.

**Independent Test**: Clear local site data, open the app, submit a valid name, confirm the header shows `الورد اليومي — <اسم القارئ>`, reload, confirm onboarding stays hidden, edit the name from settings, and confirm the greeting updates immediately.

### Implementation for User Story 1

- [X] T015 [P] [US1] Create the onboarding name modal with Arabic validation in `app/components/OnboardingModal.tsx`
- [X] T016 [P] [US1] Create the edit-name settings modal in `app/components/EditNameModal.tsx`
- [X] T017 [P] [US1] Create the app header with title, personalized greeting, and settings action in `app/components/Header.tsx`
- [X] T018 [US1] Wire onboarding visibility, name save, edit-name save, and graceful fresh-state restart in `app/page.tsx`
- [ ] T019 [US1] Verify onboarding, return visit, name edit, Arabic copy, focus trapping, labels, and 44px controls using `specs/001-quran-khatma-tracker/quickstart.md`

**Checkpoint**: User Story 1 is functional and manually testable independently.

---

## Phase 4: User Story 2 - Follow the 40-Day Reading Plan (Priority: P1)

**Goal**: Readers can view all 40 ordered portions, identify the suggested current day, use the today shortcut, and open detail for any day.

**Independent Test**: With a reader name saved, load the dashboard and confirm exactly 40 cards render in order, the suggested current day is highlighted, responsive columns work, Islamic borders render, and `اليوم: <رقم اليوم>` opens the suggested day detail modal.

### Implementation for User Story 2

- [X] T020 [P] [US2] Create top and bottom SVG Islamic geometric border component in `app/components/IslamicBorder.tsx`
- [X] T021 [P] [US2] Create responsive day card variants with truncation and status indicators in `app/components/DayCard.tsx`
- [X] T022 [P] [US2] Create read-focused day detail modal shell with full surah names and ayah range display in `app/components/DayDetailModal.tsx`
- [X] T023 [US2] Render the Islamic borders, 40-card responsive grid, suggested-current highlight, and today shortcut in `app/page.tsx`
- [ ] T024 [US2] Verify all 40 plan entries, responsive grid counts, long-name truncation, full modal names, RTL layout, and no horizontal scrolling using `specs/001-quran-khatma-tracker/quickstart.md`

**Checkpoint**: User Story 2 is functional and manually testable independently after foundational state exists.

---

## Phase 5: User Story 3 - Mark Daily Reading Complete (Priority: P1)

**Goal**: Readers can toggle any day complete or incomplete in any order, with immediate progress impact and un-complete confirmation.

**Independent Test**: Select any non-sequential day, mark it complete, confirm the card/checkmark/progress update, tap completion again, confirm `هل تريد إلغاء إنجاز هذا اليوم؟`, un-complete the day, reload, and confirm state persists.

### Implementation for User Story 3

- [X] T025 [P] [US3] Add complete and completed-state action UI to `app/components/DayCard.tsx`
- [X] T026 [P] [US3] Add complete, un-complete confirmation, and close/outside-click behavior to `app/components/DayDetailModal.tsx`
- [X] T027 [P] [US3] Create progress bar with Arabic percentage badge and accessible labelling in `app/components/ProgressBar.tsx`
- [X] T028 [US3] Wire any-order completion toggles, dateCompleted updates, progress recalculation, and persistence in `app/page.tsx`
- [ ] T029 [US3] Verify any-order toggle, un-complete confirmation, progress update under 1 second, persistence after reload, and no order enforcement using `specs/001-quran-khatma-tracker/quickstart.md`

**Checkpoint**: User Story 3 is functional and manually testable independently with persisted completion state.

---

## Phase 6: User Story 4 - Understand Progress and Restart (Priority: P2)

**Goal**: Readers can understand khatma progress, safely reset everything, and celebrate after all 40 days are complete.

**Independent Test**: Complete several days, confirm progress percentage is correct, cancel reset and confirm state remains, confirm reset clears reader name/progress/start date and shows onboarding, then complete all 40 days and confirm the celebration modal appears.

### Implementation for User Story 4

- [X] T030 [P] [US4] Create reset confirmation modal with calm Arabic copy in `app/components/ResetConfirmModal.tsx`
- [X] T031 [P] [US4] Create completion celebration modal with reset option in `app/components/CelebrationModal.tsx`
- [X] T032 [US4] Add reset button, reset confirmation flow, full-state clearing, and onboarding re-entry in `app/page.tsx`
- [X] T033 [US4] Add all-40-complete detection and celebration modal trigger in `app/page.tsx`
- [ ] T034 [US4] Verify percentage math, reset cancel, reset confirm, onboarding reappearance, and completion celebration using `specs/001-quran-khatma-tracker/quickstart.md`

**Checkpoint**: User Story 4 is functional and manually testable independently after completion toggles exist.

---

## Phase 7: User Story 5 - Experience a Warm Arabic Interface (Priority: P2)

**Goal**: Arabic-speaking readers experience a polished, RTL-native, accessible, spiritually warm interface with the required visual language and minimal motion.

**Independent Test**: Review all visible screens and modals to confirm Arabic-only copy, RTL ordering, Arabic numerals, warm tone, cream/teal/gold/navy palette, accessible labels/focus, minimal animation, and no guilt-based language.

### Implementation for User Story 5

- [X] T035 [P] [US5] Audit and normalize all Arabic UI copy and Arabic numeral output in `app/page.tsx`, `app/components/Header.tsx`, `app/components/OnboardingModal.tsx`, `app/components/EditNameModal.tsx`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, `app/components/ProgressBar.tsx`, `app/components/ResetConfirmModal.tsx`, and `app/components/CelebrationModal.tsx`
- [X] T036 [P] [US5] Apply final cream, teal, gold, navy, and yellow visual styling with Tailwind utilities in `app/globals.css`, `app/components/Header.tsx`, `app/components/OnboardingModal.tsx`, `app/components/EditNameModal.tsx`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, `app/components/ProgressBar.tsx`, `app/components/ResetConfirmModal.tsx`, and `app/components/CelebrationModal.tsx`
- [X] T037 [P] [US5] Add minimal modal fade-in, checkmark bounce, and progress fill motion with reduced-motion support in `app/globals.css`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, and `app/components/ProgressBar.tsx`
- [ ] T038 [US5] Verify screen reader labels, semantic landmarks, keyboard flow, visible focus, color contrast, Arabic-only text, and no guilt-based copy in `app/page.tsx`, `app/components/Header.tsx`, `app/components/OnboardingModal.tsx`, `app/components/EditNameModal.tsx`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, `app/components/ProgressBar.tsx`, `app/components/ResetConfirmModal.tsx`, and `app/components/CelebrationModal.tsx`

**Checkpoint**: User Story 5 polish and accessibility pass manual review without changing feature scope.

---

## Phase 8: Polish & Constitution Verification

**Purpose**: Cross-cutting verification required before release.

- [X] T039 [P] Run `pnpm build` and resolve build failures in `package.json`, `next.config.ts`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `types/index.ts`, `lib/data.ts`, `lib/format.ts`, `lib/storage.ts`, `lib/progress.ts`, `app/components/Header.tsx`, `app/components/OnboardingModal.tsx`, `app/components/EditNameModal.tsx`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, `app/components/ProgressBar.tsx`, `app/components/ResetConfirmModal.tsx`, and `app/components/CelebrationModal.tsx`
- [ ] T040 [P] Manually verify iPhone Safari behavior using `specs/001-quran-khatma-tracker/quickstart.md`
- [ ] T041 [P] Manually verify Android Chrome behavior using `specs/001-quran-khatma-tracker/quickstart.md`
- [ ] T042 [P] Manually verify Desktop Chrome behavior using `specs/001-quran-khatma-tracker/quickstart.md`
- [X] T043 Verify localStorage persistence, corrupt-storage fallback, cleared-data onboarding, and 100+ day old saved state behavior in `lib/storage.ts` and `app/page.tsx`
- [X] T044 Verify offline return after first successful load and document any browser-cache limitation in `specs/001-quran-khatma-tracker/quickstart.md`
- [ ] T045 Verify first paint under 3 seconds on a mobile 3G-class profile and no visible font-loading layout shift in `app/layout.tsx` and `app/globals.css`
- [X] T046 Verify no backend, API calls, analytics, tracking, dark mode, image assets, social sharing, audio, tafsir, notes, or calendar code exists in `package.json`, `next.config.ts`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `types/index.ts`, `lib/data.ts`, `lib/format.ts`, `lib/storage.ts`, `lib/progress.ts`, `app/components/Header.tsx`, `app/components/OnboardingModal.tsx`, `app/components/EditNameModal.tsx`, `app/components/DayCard.tsx`, `app/components/DayDetailModal.tsx`, `app/components/ProgressBar.tsx`, `app/components/ResetConfirmModal.tsx`, and `app/components/CelebrationModal.tsx`
- [X] T047 Update deployment notes for Vercel and static export compatibility in `README.md` and `specs/001-quran-khatma-tracker/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **US1 Start a Personal Khatma (Phase 3)**: Depends on Foundational; MVP entry point.
- **US2 Follow the 40-Day Reading Plan (Phase 4)**: Depends on Foundational and benefits from US1 page shell; can be developed after US1 wiring exists.
- **US3 Mark Daily Reading Complete (Phase 5)**: Depends on US2 day cards/detail modal and foundational storage/progress helpers.
- **US4 Understand Progress and Restart (Phase 6)**: Depends on US3 completion/progress state.
- **US5 Warm Arabic Interface (Phase 7)**: Depends on user-facing components from US1-US4.
- **Polish (Phase 8)**: Depends on all selected user stories.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational; delivers personalized app entry.
- **US2 (P1)**: Independent after Foundational; needs page shell and fixed reading data.
- **US3 (P1)**: Depends on US2 components for card/detail interactions.
- **US4 (P2)**: Depends on US3 progress state and completion toggles.
- **US5 (P2)**: Cross-cuts all visible components and should run after core flows exist.

### Within Each User Story

- Build reusable component files before integrating them in `app/page.tsx`.
- Keep local-only state helpers in `lib/` before wiring persistence into UI flows.
- Apply mobile layout before tablet and desktop refinements.
- Verify each story manually at its checkpoint before continuing.

### Parallel Opportunities

- T006-T008 can run in parallel after T005 if files do not conflict.
- T015-T017 can run in parallel during US1.
- T020-T022 can run in parallel during US2.
- T025-T027 can run in parallel during US3.
- T030-T031 can run in parallel during US4.
- T035-T037 can run in parallel if coordinated across component files.
- T040-T042 can run in parallel on different devices/browsers.

---

## Parallel Example: User Story 1

```text
Task: T015 Create OnboardingModal in app/components/OnboardingModal.tsx
Task: T016 Create EditNameModal in app/components/EditNameModal.tsx
Task: T017 Create Header in app/components/Header.tsx
```

## Parallel Example: User Story 2

```text
Task: T020 Create IslamicBorder in app/components/IslamicBorder.tsx
Task: T021 Create DayCard in app/components/DayCard.tsx
Task: T022 Create DayDetailModal shell in app/components/DayDetailModal.tsx
```

## Parallel Example: User Story 3

```text
Task: T025 Add completion action UI in app/components/DayCard.tsx
Task: T026 Add completion behavior in app/components/DayDetailModal.tsx
Task: T027 Create ProgressBar in app/components/ProgressBar.tsx
```

## Parallel Example: User Story 4

```text
Task: T030 Create ResetConfirmModal in app/components/ResetConfirmModal.tsx
Task: T031 Create CelebrationModal in app/components/CelebrationModal.tsx
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) to make the app personal and usable after onboarding.
3. Complete Phase 4 (US2) to display the 40-day plan.
4. Complete Phase 5 (US3) to deliver the core tracking value.
5. Stop and validate US1-US3 as the MVP core before adding US4-US5 polish.

### Incremental Delivery

1. Setup and foundational data/state.
2. US1: Onboarding and editable name.
3. US2: Reading plan dashboard and today shortcut.
4. US3: Completion toggles and progress.
5. US4: Reset and completion celebration.
6. US5: Arabic visual/tone/accessibility polish.
7. Final constitution verification and deployment readiness.

### Suggested MVP Scope

US1, US2, and US3 together form the minimum useful Quran tracker: personalized entry, complete 40-day plan visibility, and persistent completion progress.

---

## Notes

- Every task uses local files only and preserves the no-backend MVP constraint.
- No automated test tasks are generated because the feature specification and plan explicitly choose manual MVP verification.
- Generated tasks avoid adding APIs, analytics, authentication, social sharing, dark mode, image assets, or external data sources.
