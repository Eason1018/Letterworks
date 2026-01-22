<!--
Sync Impact Report
- Version change: N/A (template) → 1.0.0
- Modified principles: N/A → I. Elderly-First Usability; N/A → II. 2000s Office-Tool Familiarity;
  N/A → III. Trust & Safety Transparency; N/A → IV. Output Reliability; N/A → V. Consistency &
  Previewability
- Added sections: Product Requirements, Development Workflow & Quality Gates
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: TODO(RATIFICATION_DATE) in Governance
-->
# LetterWorks Constitution

## Core Principles

### I. Elderly-First Usability
LetterWorks MUST prioritize older adults by default.
- Default body text MUST be large and user-adjustable (minimum 16px-equivalent).
- Primary actions MUST use explicit verb labels; no icon-only primary actions.
- Flows MUST minimize cognitive load: one decision per screen, clear step titles,
  and no reliance on short-term memory.
- Error messages MUST be plain language and include a next action.
Rationale: The product succeeds only if older adults can complete tasks confidently
without strain or confusion.

### II. 2000s Office-Tool Familiarity
Interactions MUST feel like a classic desktop office tool.
- Multi-step tasks MUST use wizard flows with Back/Next/Cancel and a visible
  progress indicator.
- Primary actions MUST be explicit buttons; no hidden gestures or implicit actions.
- Menus/toolbars MUST expose key functions with familiar labels (e.g., File, Edit,
  Help).
Rationale: Familiar patterns reduce learning time and improve confidence.

### III. Trust & Safety Transparency
LetterWorks MUST be transparent and safe by default.
- UI copy MUST NOT use “AI” branding or imply autonomous behavior.
- The system MUST NOT fabricate facts; uncertainty MUST be stated with a prompt
  for user input.
- All automated edits MUST be visible in preview; no hidden background changes.
- Privacy messaging MUST be concise and explicit about data use; external sharing
  MUST require clear user confirmation.
Rationale: Users must trust that the product is honest, predictable, and safe.

### IV. Output Reliability
Every flow MUST end with a reliable output path.
- Each flow MUST offer at least one of: Print, PDF, Copy, or Email.
- If one output channel fails, at least one alternative MUST remain available.
- Previewed content MUST match final output exactly.
- Users MUST receive clear confirmation of successful output and where it went.
Rationale: The product’s value is only realized when users can deliver the result.

### V. Consistency & Previewability
Templates and controls MUST behave consistently across the product.
- All templates MUST share a common structure: header, recipient, body, closing,
  signature.
- Tone controls MUST be limited to a small, named set with predictable effects.
- Any change MUST be previewable before commit and undoable after commit.
- Labels, layout, and terminology MUST remain consistent across templates.
Rationale: Consistency reduces errors and builds user confidence.

## Product Requirements

- Accessibility is a hard requirement: keyboard navigation, high contrast,
  and no time-limited interactions without clear extensions.
- All instructional text MUST be concise, plain-language, and scannable.
- No data leaves the device or account without explicit user confirmation.
- Exported content MUST be stored/located in a user-understandable location
  (e.g., Downloads, Sent folder).

## Development Workflow & Quality Gates

- Every spec and plan MUST include a Constitution Check with explicit evidence
  for each principle.
- UX review MUST verify elderly-first readability and cognitive load.
- Trust & safety review MUST verify no “AI” branding, no hidden behavior, and
  clear privacy messaging.
- Output reliability MUST be tested for every flow with Print/PDF/Copy/Email
  coverage.
- Consistency review MUST verify shared template structure and preview/undo
  behavior.

## Governance

- This Constitution supersedes all other practices.
- Amendments require a written proposal, rationale, migration plan, and approval
  from project maintainers.
- Versioning follows semantic rules: MAJOR for principle changes/removals, MINOR
  for new principles or material additions, PATCH for clarifications.
- Compliance is required for every spec, plan, and PR; violations must be fixed
	or explicitly waived with documented justification.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date not recorded | **Last Amended**: 2026-01-22
