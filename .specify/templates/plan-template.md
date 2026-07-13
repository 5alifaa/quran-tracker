# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with concrete technical details.
  The Quran Tracker MVP is governed by the constitution: mobile-first, Arabic-first,
  zero-backend, performance-first, accessible, and single-page.
-->

**Language/Version**: [e.g., TypeScript strict mode / NEEDS CLARIFICATION]  
**Primary Dependencies**: [approved dependencies only; no new external libraries without approval]  
**Storage**: [local device storage only for MVP, or N/A]  
**Testing**: [manual MVP verification and build validation unless tests are explicitly requested]  
**Target Platform**: [mobile web first; tablet and desktop responsive support]  
**Project Type**: [single-page web app]  
**Performance Goals**: [e.g., first paint under 3 seconds on 3G-class connection]  
**Constraints**: [Arabic RTL UI, Arabic numerals, no backend/API/auth/analytics, SVG graphics only, light cream theme]  
**Scale/Scope**: [one reader per device for MVP; no cross-device sync]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Mobile-first**: Plan starts with small-screen layout, 44px minimum touch targets, and no horizontal scrolling.
- **Arabic-first RTL**: Plan covers Arabic-only UI text, RTL-native layout, Arabic numerals, and Islamic heading typography.
- **Spiritual tone**: Plan uses encouraging Arabic copy and avoids guilt, punishment, streak pressure, or transactional language.
- **Zero backend MVP**: Plan avoids auth, databases, analytics, tracking, application API calls, and any reader data leaving the device.
- **Performance over features**: Plan preserves single-page flow, minimal dependencies, SVG-only graphics, and <3s first paint on 3G-class connection.
- **Accessibility**: Plan includes semantic HTML, screen reader labels, visible focus states, keyboard access, and WCAG 2.1 AA contrast.
- **Code constraints**: Plan uses strict TypeScript, Tailwind utilities, shadcn/ui bases where useful, small components, and Arabic comments for non-obvious business logic.
- **Manual verification**: Plan includes iPhone Safari, Android Chrome, Desktop Chrome, local persistence, RTL, fonts, offline return, accessibility basics, and `next build`.

If any gate cannot pass, document the violation in Complexity Tracking before Phase 0 proceeds.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output only if contracts are needed
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── page.tsx
├── layout.tsx
├── globals.css
└── components/          # Page-specific components if this project keeps them under app

components/              # Shared React components with no page-level orchestration
lib/                     # Utilities, Quran plan data, and local storage helpers
types/                   # TypeScript interfaces only
public/                  # Static SVG or self-hosted fonts if needed
```

**Structure Decision**: [Document the selected structure and reference the real directories above. Keep the app single-page unless the constitution is amended.]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because | Follow-up Back to Compliance |
|-----------|------------|-------------------------------------|------------------------------|
| [e.g., new external library] | [current need] | [why built-in/shadcn/Tailwind option is insufficient] | [how/when to remove or approve] |
