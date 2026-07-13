<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Mobile-First, Always
- Template principle 2 -> II. Arabic-First, RTL-Native
- Template principle 3 -> III. Spiritual, Not Transactional
- Template principle 4 -> IV. Zero Backend for MVP
- Template principle 5 -> V. Performance Over Features
Added principles:
- VI. Accessibility Is Required
Added sections:
- Code Constraints
- Tone, Content, and Data Rules
- Project Organization and Delivery
Removed sections:
- Placeholder SECTION_2_NAME and SECTION_3_NAME template sections
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/checklist-template.md
- ✅ .specify/templates/commands/*.md (directory not present; no command templates to update)
Runtime guidance updates:
- ✅ README.md
- ✅ AGENTS.md (reviewed; no conflicting guidance found)
Follow-up TODOs: None
-->

# Quran 40-Day Khatma Tracker Constitution

## Core Principles

### I. Mobile-First, Always

Every product, design, and engineering decision MUST start with the mobile experience.
Layouts MUST be usable on small screens before tablet or desktop refinements are added.
Primary interactive targets MUST be at least 44px in both dimensions, with spacing suitable
for thumb use. Interactions SHOULD be swipe-friendly where they improve mobile comfort and
do not add complexity. First paint on a 3G-class connection MUST remain under 3 seconds.

Rationale: The tracker is intended as a daily companion and will most often be opened on a
phone at the moment of reading.

### II. Arabic-First, RTL-Native

All user-facing UI text MUST be Arabic. Right-to-left layout MUST be the default for every
screen, component, modal, empty state, confirmation, and error message. Left-to-right layout
MUST be used only for developer-facing artifacts or unavoidable technical strings. Headings
MUST use an Islamic Arabic type style, with Amiri as the preferred heading font. Displayed
numbers in the UI MUST use Arabic numerals such as ١، ٢، ٣.

Rationale: Arabic is not a translation layer for this product; it is the primary experience.

### III. Spiritual, Not Transactional

The tracker MUST feel like a warm spiritual companion, not a productivity dashboard. Copy
MUST encourage without guilt, using phrases such as `أحسنت!`, `بارك الله فيك`, and `استمر!`
where appropriate. The experience MUST celebrate progress and completion, and MUST NOT
punish absence, missed days, or slow progress.

Rationale: Quran reading support invites consistency with mercy and encouragement,
not pressure or shame.

### IV. Zero Backend for MVP

The MVP MUST keep all reader data on the device. It MUST NOT add authentication, databases,
analytics, tracking, or application API calls. Persistence MUST use local device storage
only. The app MUST work offline after the first successful load when the browser can serve
the already-loaded app assets. Reader data MUST NOT leave the device.

Rationale: The MVP remains private, simple, deployable, and fast without server
operations.

### V. Performance Over Features

The MVP MUST prefer speed and simplicity over feature breadth. It MUST remain a single-page
experience with no client-side route transitions. Dependencies MUST be minimal; new external
libraries require explicit approval. Graphics MUST be SVG-based rather than image-based.
The first bundle MUST contain everything required for the core tracker experience; features
that require remote data or delayed loading are out of scope for MVP.

Rationale: A fast, reliable daily reading companion is more valuable than a broader but
slower feature set.

### VI. Accessibility Is Required

The app MUST meet WCAG 2.1 AA expectations for the implemented MVP. Semantic HTML MUST be
used for structure and controls. Screen reader labels, visible focus states, keyboard access,
and high-contrast text MUST be included for all primary flows. Accessibility regressions are
release blockers unless a documented, time-boxed exception is approved.

Rationale: Quran reading support remains usable for readers with different abilities,
devices, and interaction needs.

## Code Constraints

Implementation MUST use strict TypeScript with no `any`. Styling MUST use Tailwind utility
classes; custom CSS is allowed only for global resets, font variables, or unavoidable base
rules. shadcn/ui components SHOULD be used as the base for common accessible UI patterns.
Components SHOULD stay under 150 lines; larger components MUST be split by responsibility.
Business-logic comments, when needed, MUST be written in Arabic and explain intent rather
than restating obvious code.

External libraries MUST NOT be added without approval. Client-side navigation MUST NOT be
added for the MVP. Images MUST NOT be used for graphics; use inline or static SVG instead.
Dark mode MUST NOT be added; the MVP is a light cream theme only.

## Tone, Content, and Data Rules

Arabic text MUST be stored directly as UTF-8 strings, not escaped sequences. Onboarding copy
SHOULD follow the tone of `أهلاً بك! معاً نختم القرآن في ٤٠ يوم`. Completion feedback SHOULD
use language like `بارك الله فيك! أكملت اليوم ١`. Progress feedback SHOULD be celebratory,
for example `تقدمك: ٢٥% — أنت رائع!`. Reset confirmation MUST be calm and clear, such as
`هل تريد البدء من جديد؟`. Empty states SHOULD invite the reader gently, such as
`ابدأ رحلتك مع القرآن اليوم`.

The app MUST NOT collect analytics or tracking data. MVP data MUST stay local to the device.
No environment variables are required for MVP behavior.

## Project Organization and Delivery

Project files MUST follow this organization unless an implementation plan explicitly
documents a simpler compliant alternative:

```text
app/        Next.js app router and page composition
components/ React components with no page-level business orchestration
lib/        Utilities, Quran plan data, and local storage helpers
types/      TypeScript interfaces only
public/     Static assets such as self-hosted fonts, if needed
```

Component files MUST use PascalCase, utilities MUST use camelCase, and shared type names
MUST use PascalCase. CSS class composition MUST prefer Tailwind utilities. Manual testing is
the MVP default and MUST cover iPhone Safari, Android Chrome, and Desktop Chrome. Manual
verification MUST include local persistence, RTL rendering, Arabic numerals, font loading,
offline return after first load, accessibility basics, and successful `next build`.

Deployment MUST target Vercel. The build command is `next build`. Static export SHOULD be
used if it remains compatible with the implemented MVP.

## Governance

This constitution supersedes conflicting repository guidance for product, implementation,
planning, and review decisions. Feature specifications and implementation plans MUST include
checks for mobile-first behavior, Arabic RTL UI, spiritual tone, zero-backend privacy,
performance, accessibility, and the code constraints above.

Amendments require a documented change to this file, an updated Sync Impact Report, and a
semantic version bump. MAJOR versions indicate removed or redefined principles that may
invalidate existing plans. MINOR versions indicate added principles, sections, or materially
expanded guidance. PATCH versions indicate clarifications that do not change compliance
expectations.

Compliance MUST be reviewed before implementation planning, before task generation, and
before release. Any intentional violation MUST be documented in the relevant plan with the
reason, rejected simpler alternatives, and a follow-up path back to compliance.

**Version**: 1.0.0 | **Ratified**: 2026-07-13 | **Last Amended**: 2026-07-13
