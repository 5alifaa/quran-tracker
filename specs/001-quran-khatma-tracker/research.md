# Research: Quran Khatma Tracker

## Decision: Keep The MVP Single-Page And Local-Only

**Rationale**: The constitution and clarified spec require a companion-style tracker with no backend, auth, API calls, analytics, or cross-device sync. A single-page app with localStorage keeps reader data private and makes offline return feasible after the first successful load.

**Alternatives considered**: Backend persistence, authentication, and cross-device sync were rejected as explicitly out of scope and higher privacy/complexity risk.

## Decision: Store The 40-Day Plan As Static Local Data

**Rationale**: The plan is fixed and well-known. A static `lib/data.ts` array gives deterministic rendering, supports offline use, avoids network failure modes, and keeps the data model simple.

**Alternatives considered**: Fetching from an API was rejected because no external calls are allowed. Generating ranges dynamically was rejected because the provided allocation is authoritative and easier to verify as explicit records.

## Decision: Persist Reader State In localStorage With Graceful Fallback

**Rationale**: localStorage satisfies the zero-backend MVP and is sufficient for a tiny state payload. If storage is unavailable, cleared, or corrupt, the app restarts from fresh state and shows onboarding without technical error messaging.

**Alternatives considered**: IndexedDB was rejected as unnecessary complexity for less than 5KB of state. Cookies were rejected because there is no server need and localStorage is simpler for client-only state.

## Decision: Suggested Current Day Is Guidance, Not Enforcement

**Rationale**: The app is a spiritual companion, not a strict task manager. Highlighting the lowest-numbered incomplete day helps orientation while allowing any day to be toggled complete or incomplete at any time.

**Alternatives considered**: Enforcing sequential completion was rejected after clarification because it creates pressure and blocks real-world reading patterns.

## Decision: Use Accessible Dialog/Card/Button Bases With Tailwind Styling

**Rationale**: shadcn/ui bases align with the user request and constitution guidance for accessible UI patterns while keeping visual styling in Tailwind utilities. Components remain small and focused.

**Alternatives considered**: Fully custom dialog primitives were rejected because accessibility risk is higher. Adding a separate component library beyond shadcn/ui was rejected because new external dependencies require approval and increase bundle risk.

## Decision: Arabic Font Loading Uses Swap And System Fallbacks

**Rationale**: Amiri headings and Noto Naskh Arabic body text satisfy the Arabic-first visual direction. Swap loading prevents invisible text and fallbacks reduce layout and availability risk.

**Alternatives considered**: Blocking font load was rejected due to FOIT and performance risk. Self-hosting fonts may be considered later only if deployment testing shows Google font loading harms the first-paint or offline goals.

## Decision: Minimal Motion Only

**Rationale**: Modal fade-in, checkmark bounce, and progress fill are enough to create warmth without heavy animation or low-end device risk.

**Alternatives considered**: Rich page transitions and scroll effects were rejected because they conflict with the performance-over-features principle.

## Decision: Static Export Is Optional Pending Build Verification

**Rationale**: The user prefers static export if possible and the MVP is a static client app. However, final compatibility with Next font behavior and deployment should be verified during implementation.

**Alternatives considered**: Requiring static export was rejected as too rigid before build validation. Standard Vercel deployment remains acceptable if it preserves the no-backend MVP behavior.
