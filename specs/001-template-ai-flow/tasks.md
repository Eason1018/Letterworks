---

description: "Task list for Template AI Flow implementation"
---

# Tasks: Template AI Flow

**Input**: Design documents from [specs/001-template-ai-flow/](specs/001-template-ai-flow/)
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested for this feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Tasks (required)**: Included in Foundational and Polish phases for usability, familiarity, trust & safety, output reliability, and consistency.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Shared scaffolding needed before story work

- [x] T001 Create fact extraction module skeleton in backend/src/services/factExtractionService.ts
- [x] T002 Create compose-draft module skeleton in backend/src/services/composeDraftService.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Add API routes for fact extraction and compose in backend/src/api/templates.ts
- [x] T004 Add zod request/response validation for new endpoints in backend/src/api/templates.ts
- [x] T005 Update API router registration for new routes in backend/src/api/router.ts
- [x] T006 Update wizard session storage to persist rawNotes and extractedFacts in backend/src/api/wizardSessions.ts
- [x] T007 [P] Add frontend API client methods for fact extraction and compose in frontend/src/services/apiClient.ts
- [x] T008 [P] Define shared tone options and draft/fact types in frontend/src/types.ts
- [x] T009 Add Trust & Safety copy for fact-only drafts in frontend/src/components/TrustSafetyNote.tsx
- [x] T010 Ensure wizard flow keeps explicit step labels and buttons in frontend/src/components/WizardShell.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Turn messy notes into a fact-checked draft (Priority: P1) 🎯 MVP

**Goal**: Convert messy notes into extracted facts + missing-info checklist, then draft a subject line and body from only those facts.

**Independent Test**: Enter notes for one template, verify facts + missing-info checklist, and draft subject/body uses only facts.

### Implementation for User Story 1

- [x] T011 [P] [US1] Implement deterministic note parsing rules in backend/src/services/factExtractionService.ts
- [x] T012 [P] [US1] Implement missing-info and ambiguity detection in backend/src/services/factExtractionService.ts
- [x] T013 [P] [US1] Implement subject line generation in backend/src/services/composeDraftService.ts
- [x] T014 [P] [US1] Implement draft body composition using template structure in backend/src/services/composeDraftService.ts
- [x] T015 [US1] Wire fact extraction endpoint to service in backend/src/api/templates.ts
- [x] T016 [US1] Wire compose endpoint to service in backend/src/api/templates.ts
- [x] T017 [P] [US1] Update wizard service state to store facts, missing info, and draft output in frontend/src/services/wizardService.ts
- [x] T018 [P] [US1] Add notes input + “Generate Facts” UI in frontend/src/pages/WizardPage.tsx
- [x] T019 [P] [US1] Display extracted facts and missing-info checklist in frontend/src/components/WizardStep.tsx
- [x] T020 [P] [US1] Render subject line in preview in frontend/src/components/LetterPreview.tsx
- [x] T021 [US1] Persist draft facts/subject to backend drafts in frontend/src/services/draftsService.ts

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - One-click tone and length edits (Priority: P2)

**Goal**: Apply politer, firmer, shorter, timeline-focused, and deadline-focused edits without changing facts.

**Independent Test**: Apply each edit to a draft and confirm factual details remain unchanged.

### Implementation for User Story 2

- [x] T022 [P] [US2] Extend tone control enum and deterministic transforms in backend/src/services/toneService.ts
- [x] T023 [US2] Update preview endpoints to accept new tone values in backend/src/api/previews.ts
- [x] T024 [P] [US2] Update tone control UI options in frontend/src/components/ToneControls.tsx
- [x] T025 [P] [US2] Update preview API calls to send new tone values in frontend/src/services/previewService.ts
- [x] T026 [US2] Add tone labels/help text in frontend/src/content/helpText.ts

**Checkpoint**: User Story 2 is fully functional and independently testable

---

## Phase 5: User Story 3 - Consistent behavior across templates (Priority: P3)

**Goal**: Ensure the same two-step flow and edit options exist for every template.

**Independent Test**: Run the flow on two different templates and confirm the same steps and controls appear.

### Implementation for User Story 3

- [x] T027 [P] [US3] Ensure template seed data defines required/optional fields for all templates in backend/src/lib/templateSeed.ts
- [x] T028 [P] [US3] Ensure template structure includes subject support in backend/src/lib/templateSeed.ts
- [x] T029 [US3] Enforce shared step order across templates in frontend/src/components/WizardShell.tsx
- [x] T030 [US3] Ensure template library routes all templates into the same flow in frontend/src/pages/TemplateLibraryPage.tsx

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T031 [P] Align accessibility labels and large-text defaults for facts/checklists in frontend/src/components/WizardStep.tsx
- [x] T032 [P] Add preview/undo affordance copy for tone edits in frontend/src/components/OutputActions.tsx
- [x] T033 [P] Update quickstart validation steps in specs/001-template-ai-flow/quickstart.md
- [x] T034 Run consistency review for UI labels in frontend/src/styles/wizard.css

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Parallel Opportunities

- US1: T011–T014 and T017–T020 can run in parallel across backend/frontend
- US2: T022, T024, T025 can run in parallel
- US3: T027–T028 can run in parallel

---

## Parallel Execution Examples

- **US1**: Backend fact extraction (T011–T016) can be built while frontend facts UI (T017–T020) is implemented.
- **US2**: Backend tone transforms (T022–T023) can be built while frontend controls (T024–T026) are implemented.
- **US3**: Template seed updates (T027–T028) can be done while UI consistency updates (T029–T030) are implemented.

---

## Implementation Strategy

- **MVP first**: Deliver US1 to ensure the core two-step flow works end-to-end.
- **Incremental delivery**: Add US2 tone edits next, then US3 consistency polish.
- **Validation**: Confirm no invented facts at each step and maintain consistent UI across templates.
