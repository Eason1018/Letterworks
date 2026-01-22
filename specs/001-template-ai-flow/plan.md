# Implementation Plan: Template AI Flow

**Branch**: `001-template-ai-flow` | **Date**: 2026-01-22 | **Spec**: [specs/001-template-ai-flow/spec.md](specs/001-template-ai-flow/spec.md)
**Input**: Feature specification from `/specs/001-template-ai-flow/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a two-step flow per template that turns messy notes into structured facts
plus a missing-info checklist, then drafts a subject line and letter/email using
only those facts. Provide one-click tone/length edits (politer, firmer, shorter,
timeline-focused, deadline-focused) that never alter or invent details. The
technical approach extends the existing wizard session and preview pipeline with
fact extraction, explicit validation, and deterministic tone transformations.

## Technical Context

**Language/Version**: TypeScript (Node.js 20+, browser ES2022)  
**Primary Dependencies**: React, Vite, Express, Zod, Prisma  
**Storage**: SQLite (drafts, versions, templates)  
**Testing**: Vitest, React Testing Library, Playwright, Supertest  
**Target Platform**: Modern desktop browsers (Chrome/Edge/Firefox), Windows focus
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Preview updates <100ms for typical letters; API p95 <200ms  
**Constraints**: Accessibility-first, no “AI” branding, no fabricated facts,
  preview must match output, offline read-only not required  
**Scale/Scope**: Single-user usage per device; initial release ~15-20 screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Elderly-first usability: steps remain explicit (“Facts” then “Draft”), with
  short checklists and clear labels.
- 2000s office-tool familiarity: wizard buttons and tone controls are explicit
  and visible; no hidden actions.
- Trust & safety: extraction only surfaces user-provided facts; missing info is
  listed; drafts never invent or change details.
- Output reliability: drafts still flow into Print/PDF/Copy/Email via existing
  output paths.
- Consistency: same flow and tone controls across templates; preview remains
  visible and undoable.

**Post-design check**: PASS (see research.md, data-model.md, contracts).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── src/
│   ├── api/
│   ├── services/
│   └── lib/
└── prisma/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
```

**Structure Decision**: Web application with separate frontend and backend for
template data, wizard sessions, drafts/versions, and preview/output APIs.

## Complexity Tracking

No constitution violations identified.
