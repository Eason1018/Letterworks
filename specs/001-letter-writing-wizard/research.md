# Research: Letter Writing Wizard

**Date**: 2026-01-22
**Scope**: Resolve technical choices required by plan

## Decisions

### 1) Platform: Web application (frontend + backend)
- **Decision**: Build a web app with a React UI and a small API.
- **Rationale**: Web delivery enables large, readable UI without installs, supports
  built‑in print/PDF, and is accessible on Windows desktops common for the target
  audience. A small API supports draft storage, versioning, and email output.
- **Alternatives considered**:
  - Desktop (Electron): higher packaging burden and update friction.
  - Mobile-only: less suitable for long‑form letter input.
  - Frontend-only: limits reliable email output and shared storage.

### 2) UI Framework: React + Vite
- **Decision**: React with Vite for the UI layer.
- **Rationale**: Mature accessibility ecosystem, component reuse for wizard
  steps, and fast local development for an app with multiple screens.
- **Alternatives considered**:
  - Vue or Svelte: viable, but less aligned with existing tooling and UI testing
    ecosystem in this repo.
  - Next.js: adds unnecessary complexity for a simple app.

### 3) API Layer: Node.js + Express
- **Decision**: Express API for templates, drafts, versions, and outputs.
- **Rationale**: Minimal surface area, easy to test, and sufficient for CRUD +
  email operations.
- **Alternatives considered**:
  - Fastify: good performance but not required for scope.
  - Serverless: adds deployment complexity.

### 4) Data Storage: SQLite + Prisma
- **Decision**: SQLite with Prisma ORM.
- **Rationale**: Simple, local‑friendly storage for drafts/versions with schema
  migrations and easy querying. Suitable for single‑user usage.
- **Alternatives considered**:
  - Postgres: unnecessary for the initial scope.
  - LocalStorage only: weak version history and harder to sync with email output.

### 5) Tone Controls: Deterministic Transformations
- **Decision**: Use rule‑based wording variants and template variants; no AI.
- **Rationale**: Preserves facts, avoids fabrication risk, and complies with the
  Trust & Safety principle.
- **Alternatives considered**:
  - LLM-based rewriting: violates “no AI branding” and fabrication constraints.

### 6) Output Reliability: Print/PDF/Copy/Email
- **Decision**: Provide Print/PDF via browser print, Copy via Clipboard API,
  Email via backend SMTP (or mailto fallback), all with confirmation.
- **Rationale**: Multiple output paths satisfy reliability requirements and
  ensure at least one channel succeeds.
- **Alternatives considered**:
  - Print‑only: insufficient per requirements.
  - Email‑only: not reliable if email is not configured.

## Best‑practice notes (applied)

- Wizard steps are short, single‑decision, and include Back/Next/Cancel.
- Large default text and explicit verb buttons for older adults.
- Preview is the source of truth; all changes are visible and undoable.
