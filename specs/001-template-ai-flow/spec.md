# Feature Specification: Template AI Flow

**Feature Branch**: `001-template-ai-flow`  
**Created**: 2026-01-22  
**Status**: Draft  
**Input**: User description: "For each LetterWorks template, run a two-step AI flow (understand the user’s messy input into structured facts + missing-info checklist, then draft a professional email/letter with a subject line using only those facts) and provide simple one-click tone/length edits (politer/firmer/shorter/timeline/deadline) that never invent or change user details."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Turn messy notes into a fact-checked draft (Priority: P1)

As a person writing a letter, I can paste messy notes for a chosen template and receive (a) structured facts and missing-info checklist, then (b) a professional draft with a subject line that uses only those facts.

**Why this priority**: This is the core value of LetterWorks—turning rough notes into a trustworthy draft quickly.

**Independent Test**: Can be fully tested by entering notes into a single template and confirming the facts list, missing-info checklist, and draft are produced without invented details.

**Acceptance Scenarios**:

1. **Given** a selected template and messy notes with sufficient facts, **When** the user runs the flow, **Then** the system outputs a structured facts list and a draft that only uses those facts, including a subject line.
2. **Given** a selected template and notes with missing details, **When** the user runs the flow, **Then** the system outputs a missing-info checklist and the draft does not invent or change any user details.

---

### User Story 2 - One-click tone and length edits (Priority: P2)

As a person reviewing a draft, I can apply one-click edits (politer, firmer, shorter, timeline-focused, deadline-focused) that adjust tone or length without changing or adding any user details.

**Why this priority**: Users need fast, safe refinements that preserve accuracy and trust.

**Independent Test**: Can be fully tested by applying each tone/length edit to one draft and verifying facts remain unchanged.

**Acceptance Scenarios**:

1. **Given** a draft created from structured facts, **When** the user selects a tone/length edit, **Then** the draft updates in that style without altering factual details.

---

### User Story 3 - Consistent behavior across templates (Priority: P3)

As a person using different templates, I get the same two-step flow and safe edit options regardless of template choice.

**Why this priority**: Consistency reduces confusion and supports trust across the product.

**Independent Test**: Can be fully tested by running the flow on two different templates and confirming outputs and controls are the same type and order.

**Acceptance Scenarios**:

1. **Given** two different templates, **When** the user runs the flow for each, **Then** both produce facts, missing-info checklist, and draft with the same edit options available.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- Notes are empty or contain only vague statements (e.g., “please write this for me”).
- Notes include conflicting facts (two dates, two names) that cannot both be true.
- Notes include sensitive details that should not appear in a professional letter.
- User applies tone edits repeatedly and expects facts to remain stable.
- User switches templates after facts were extracted from a different template.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST provide a two-step flow per template: (1) extract structured facts and a missing-info checklist from messy notes, then (2) draft a professional letter/email with a subject line using only those facts.
- **FR-002**: System MUST ensure drafts never invent, alter, or add user details that are not in the extracted facts.
- **FR-003**: System MUST present a missing-info checklist whenever required details are absent or ambiguous.
- **FR-004**: System MUST clearly indicate missing or ambiguous details without fabricating replacements in the draft.
- **FR-005**: Users MUST be able to apply one-click edits: politer, firmer, shorter, timeline-focused, and deadline-focused.
- **FR-006**: One-click edits MUST preserve all facts and user-provided details exactly.
- **FR-007**: The same two-step flow and edit options MUST be available across all LetterWorks templates.
- **FR-008**: Users MUST be able to review the extracted facts before finalizing or exporting the draft.
- **FR-009**: System MUST keep the subject line aligned with the extracted facts without introducing new details.

### Key Entities *(include if feature involves data)*

- **Template**: A predefined letter type with expected information fields and output format.
- **User Notes**: Freeform text input provided by the user.
- **Extracted Facts**: Structured list of explicit details derived from user notes.
- **Missing-Info Checklist**: List of required or important details not present or ambiguous in the notes.
- **Draft**: The generated subject line and letter/email body derived strictly from extracted facts.
- **Edit Variant**: A tone/length adjusted version of the draft that preserves facts.

## Constitution Alignment *(mandatory)*

<!--
  ACTION REQUIRED: Provide explicit design/test evidence for each principle.
  These bullets must be filled out in every spec.
-->

- **Elderly-first usability**: The flow uses clear step labels (“Facts” then “Draft”), readable summaries, and a short checklist that reduces cognitive load.
- **2000s office-tool familiarity**: The steps are explicit and sequential, with visible buttons for “Generate Facts,” “Draft,” and one-click edits.
- **Trust & safety**: Outputs never fabricate details; missing info is flagged and wording avoids any “AI” branding.
- **Output reliability**: Drafts are reviewed before export, with confirmation that facts are correct.
- **Consistency & previewability**: All templates use the same structure and controls with predictable tone edits and preview before exporting.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can produce a draft (facts + subject line + body) from notes in under 3 minutes for 90% of sessions.
- **SC-002**: 95% of generated drafts pass a fact-preservation review with zero invented or altered details.
- **SC-003**: 85% of users complete at least one tone/length edit without re-entering facts.
- **SC-004**: Support requests about “wrong details in drafts” drop by 50% after release.

## Assumptions

- Users can proceed to a draft even when a missing-info checklist is present, as long as missing items are clearly flagged.
- Templates define the expected information fields for their letter type.
- A “professional” tone means clear, polite, and concise language appropriate for formal communication.
