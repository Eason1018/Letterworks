---

description: "Task list for Letter Writing Wizard"
---

# Tasks: Letter Writing Wizard

**Input**: Design documents from `/specs/001-letter-writing-wizard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested for this feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backend and frontend scaffolds in backend/package.json, backend/tsconfig.json, frontend/package.json, frontend/tsconfig.json, frontend/vite.config.ts
- [ ] T002 [P] Configure frontend base typography and spacing in frontend/src/styles/base.css and frontend/src/styles/theme.css
- [ ] T003 [P] Create Express app entry and health route in backend/src/index.ts
- [ ] T004 [P] Configure Prisma datasource and generator in backend/prisma/schema.prisma
- [ ] T005 [P] Add shared type definitions in backend/src/lib/types.ts
- [ ] T006 [P] Create frontend app shell and routing in frontend/src/main.tsx and frontend/src/App.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Implement Prisma client setup in backend/src/lib/db.ts
- [ ] T008 [P] Add seed templates and seed script in backend/src/lib/templateSeed.ts and backend/prisma/seed.ts
- [ ] T009 Implement template service layer in backend/src/services/templateService.ts
- [ ] T010 Implement base API router and error handling in backend/src/api/router.ts and backend/src/api/errors.ts
- [ ] T011 [P] Build frontend API client wrapper in frontend/src/services/apiClient.ts
- [ ] T012 [P] Build app shell components (menu + wizard shell) in frontend/src/components/MenuBar.tsx and frontend/src/components/WizardShell.tsx
- [ ] T013 Implement accessibility defaults (large text, explicit buttons) in frontend/src/styles/accessibility.css and apply in frontend/src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create a Letter from a Template (Priority: P1) 🎯 MVP

**Goal**: Users select a template, complete a wizard, preview a letter, and produce an output

**Independent Test**: Select a template, complete wizard steps, preview the letter, and successfully output via Print/PDF/Copy/Email

### Implementation for User Story 1

- [ ] T014 [P] [US1] Implement template endpoints in backend/src/api/templates.ts
- [ ] T015 [P] [US1] Implement wizard session endpoints in backend/src/api/wizardSessions.ts
- [ ] T016 [US1] Implement preview rendering in backend/src/services/previewService.ts
- [ ] T017 [US1] Implement preview endpoint in backend/src/api/previews.ts
- [ ] T018 [P] [US1] Build template library page in frontend/src/pages/TemplateLibraryPage.tsx
- [ ] T019 [US1] Build wizard flow UI in frontend/src/pages/WizardPage.tsx and frontend/src/components/WizardStep.tsx
- [ ] T020 [US1] Build preview panel in frontend/src/components/LetterPreview.tsx
- [ ] T021 [US1] Implement output actions and confirmations in frontend/src/components/OutputActions.tsx and frontend/src/components/OutputConfirmDialog.tsx
- [ ] T022 [US1] Implement output service and endpoint in backend/src/services/outputService.ts and backend/src/api/outputs.ts
- [ ] T023 [US1] Implement draft creation for completed wizard in backend/src/services/draftService.ts and backend/src/api/drafts.ts
- [ ] T024 [US1] Wire wizard completion to draft creation in frontend/src/services/draftsService.ts and frontend/src/pages/WizardPage.tsx

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Refine Tone and Clarity (Priority: P2)

**Goal**: Users adjust tone and clarity with simple controls and undo while preserving facts

**Independent Test**: Apply each tone control, confirm preview updates without changing factual inputs, and use Undo to restore

### Implementation for User Story 2

- [ ] T025 [P] [US2] Implement deterministic tone rules in backend/src/services/toneService.ts
- [ ] T026 [US2] Integrate tone rules into preview rendering in backend/src/services/previewService.ts
- [ ] T027 [US2] Build tone control UI and undo in frontend/src/components/ToneControls.tsx and frontend/src/components/UndoButton.tsx
- [ ] T028 [US2] Connect tone controls to preview API in frontend/src/services/previewService.ts and frontend/src/pages/WizardPage.tsx
- [ ] T029 [US2] Add trust & safety messaging near controls in frontend/src/components/TrustSafetyNote.tsx

**Checkpoint**: User Story 2 is functional and testable independently

---

## Phase 5: User Story 3 - Save Drafts and Versions (Priority: P3)

**Goal**: Users save drafts and versions, reopen them later, and restore prior versions

**Independent Test**: Save a draft, update it, save a version, and restore a prior version

### Implementation for User Story 3

- [ ] T030 [P] [US3] Implement draft list/get/update endpoints in backend/src/api/drafts.ts and backend/src/services/draftService.ts
- [ ] T031 [P] [US3] Implement version endpoints in backend/src/api/versions.ts and backend/src/services/versionService.ts
- [ ] T032 [US3] Build drafts list page in frontend/src/pages/DraftsPage.tsx
- [ ] T033 [US3] Build version history UI in frontend/src/components/VersionHistory.tsx
- [ ] T034 [US3] Wire save version actions in frontend/src/services/draftsService.ts and frontend/src/components/OutputActions.tsx
- [ ] T035 [US3] Implement resume-draft flow in frontend/src/pages/WizardPage.tsx and frontend/src/pages/DraftsPage.tsx

**Checkpoint**: User Story 3 is functional and testable independently

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T036 [P] Add help and instructional copy in frontend/src/content/helpText.ts
- [ ] T037 Add empty/error states and accessibility fixes in frontend/src/components/EmptyState.tsx and frontend/src/styles/accessibility.css
- [ ] T038 [P] Validate quickstart steps and update specs/001-letter-writing-wizard/quickstart.md

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on preview service from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on draft creation from US1

### Within Each User Story

- Services before endpoints
- Endpoints before UI wiring
- Preview/undo before outputs
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Tasks marked [P] within each story can run in parallel

---

## Parallel Example: User Story 1

```text
Task: "Implement template endpoints in backend/src/api/templates.ts"
Task: "Implement wizard session endpoints in backend/src/api/wizardSessions.ts"
Task: "Build template library page in frontend/src/pages/TemplateLibraryPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate outputs and preview → Deploy/demo
3. Add User Story 2 → Validate tone controls + undo → Deploy/demo
4. Add User Story 3 → Validate drafts + versions → Deploy/demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- Each user story is independently completable and testable
- Avoid hidden behavior, preserve user facts, and keep outputs reliable
