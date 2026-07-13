---

description: "Task list template for Quran Tracker feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Unit tests are not required for MVP unless explicitly requested. Always include manual verification tasks from the constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **App router**: `app/`
- **Shared components**: `components/`
- **Utilities, data, storage**: `lib/`
- **Types only**: `types/`
- **Static SVG/fonts if needed**: `public/`
- Do not add backend, API, database, analytics, auth, or route directories for MVP tasks.

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with priorities P1, P2, P3...)
  - Constitution gates from plan.md
  - Feature requirements from plan.md
  - Entities from data-model.md

  Tasks MUST preserve mobile-first, Arabic-first, zero-backend, performance-first,
  accessible implementation. DO NOT keep these sample tasks in generated tasks.md.
  ============================================================================
-->

## Phase 1: Setup (Shared Foundation)

**Purpose**: Confirm project structure and constitution constraints before feature work

- [ ] T001 Confirm feature uses the approved single-page structure in app/, components/, lib/, types/, and public/
- [ ] T002 Confirm strict TypeScript remains enabled with no planned `any` usage
- [ ] T003 [P] Confirm Tailwind utility styling and shadcn/ui base components are sufficient without new external libraries
- [ ] T004 [P] Confirm Arabic fonts, Arabic numerals, and RTL base layout approach

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core foundations that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T005 Define shared TypeScript interfaces in types/[name].ts
- [ ] T006 Create or update local-only storage helpers in lib/[storage].ts
- [ ] T007 Create or update static feature data in lib/[data].ts
- [ ] T008 Establish Arabic RTL layout, Arabic numeral formatting, and light cream theme foundations
- [ ] T009 Establish accessible modal/button/card patterns with semantic HTML and visible focus states

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create/update focused component in components/[Component].tsx under 150 lines where practical
- [ ] T011 [P] [US1] Create/update utility logic in lib/[utility].ts with strict types
- [ ] T012 [US1] Integrate the story into app/page.tsx without adding routing
- [ ] T013 [US1] Add Arabic-only UI text and encouraging tone for this flow
- [ ] T014 [US1] Verify mobile layout, 44px targets, keyboard access, focus states, and screen reader labels

**Checkpoint**: User Story 1 is functional and manually testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Implementation for User Story 2

- [ ] T015 [P] [US2] Create/update focused component in components/[Component].tsx under 150 lines where practical
- [ ] T016 [P] [US2] Create/update supporting local-only utility in lib/[utility].ts
- [ ] T017 [US2] Integrate with existing page state without adding backend, APIs, analytics, or routing
- [ ] T018 [US2] Verify Arabic RTL rendering, Arabic numerals, mobile behavior, and accessible controls

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Implementation for User Story 3

- [ ] T019 [P] [US3] Create/update focused component in components/[Component].tsx under 150 lines where practical
- [ ] T020 [US3] Integrate the story into the single-page experience
- [ ] T021 [US3] Verify no guilt-based copy, no dark mode, no image assets, and no unapproved dependencies

**Checkpoint**: All selected user stories are independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Constitution Verification

**Purpose**: Cross-cutting checks required before release

- [ ] TXXX [P] Run `next build` and resolve build failures
- [ ] TXXX [P] Manually test on iPhone Safari viewport or device
- [ ] TXXX [P] Manually test on Android Chrome viewport or device
- [ ] TXXX [P] Manually test on Desktop Chrome
- [ ] TXXX Verify local persistence works after close/reopen on the same device
- [ ] TXXX Verify offline return after first successful load where browser cache permits
- [ ] TXXX Verify RTL layout, Arabic-only UI text, Arabic numerals, and font loading
- [ ] TXXX Verify WCAG 2.1 AA basics: contrast, keyboard access, visible focus, labels, semantic HTML
- [ ] TXXX Verify first paint target remains under 3 seconds on a 3G-class profile
- [ ] TXXX Remove unused code, unused dependencies, image assets, route additions, API calls, analytics, or backend remnants

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion and proceed in priority order unless independent parallel work is safe
- **Polish (Final Phase)**: Depends on all selected user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational - may integrate with US1 but must remain independently testable
- **User Story 3 (P3)**: Can start after Foundational - may integrate with US1/US2 but must remain independently testable

### Within Each User Story

- Types and data before components that consume them
- Local storage helpers before flows that persist data
- Accessible component structure before visual polish
- Mobile layout before tablet and desktop refinements
- Story complete before moving to the next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Independent component, utility, and data tasks marked [P] can run in parallel
- Manual verification tasks for different browsers/devices can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate User Story 1 independently
5. Demo if ready

### Incremental Delivery

1. Complete Setup and Foundational phases
2. Add User Story 1, test independently, then demo
3. Add User Story 2, test independently, then demo
4. Add User Story 3, test independently, then demo
5. Keep every increment compliant with the constitution

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to a specific user story for traceability
- Avoid vague tasks, same-file conflicts, backend work, API calls, analytics, image assets, dark mode, and unapproved libraries
- Manual verification is required even when automated tests are not requested
