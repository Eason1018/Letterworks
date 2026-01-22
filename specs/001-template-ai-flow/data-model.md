# Data Model: Template AI Flow

## Entities

### Template
- **Description**: Predefined letter type and structure.
- **Key fields**:
  - `id`, `name`, `category`, `description`
  - `requiredFields[]`, `optionalFields[]`
  - `structure`: `{ header, recipient, subject?, body, closing, signature }`
  - `toneVariants`: optional map of tone-specific overrides (e.g., closing lines).
- **Relationships**: One template has many `WizardSession`, `LetterDraft`.

### WizardSession
- **Description**: In-progress wizard data for a user session.
- **Key fields**:
  - `id`, `templateId`, `currentStep`, `status` (in_progress | completed)
  - `data` (JSON):
    - `rawNotes`: string
    - `extractedFacts`: record of `field -> value`
    - `missingInfo`: string[]
    - `ambiguities`: string[] (optional)
    - `subjectLine`: string (optional)
    - `draftBody`: string (optional)
- **Relationships**: Belongs to `Template`.

### LetterDraft
- **Description**: Saved draft derived from facts.
- **Key fields**:
  - `id`, `templateId`, `title`, `data`, `previewText`, `toneSettings`
  - `data` (JSON):
    - `facts`: record of `field -> value`
    - `subjectLine`: string
    - `missingInfo`: string[] (optional)
- **Relationships**: Belongs to `Template`, has many `LetterVersion`.

### LetterVersion
- **Description**: Snapshot of a draft for history.
- **Key fields**:
  - `id`, `draftId`, `versionNumber`, `previewText`, `toneSettings`
- **Relationships**: Belongs to `LetterDraft`.

### FactExtraction (derived)
- **Description**: Result of step 1 in the flow.
- **Key fields**:
  - `facts`: record of `field -> value`
  - `missingInfo`: string[]
  - `ambiguities`: string[]
  - `warnings`: string[] (optional)
- **Persistence**: Stored in `WizardSession.data` and optionally in `LetterDraft.data`.

## Validation Rules

- Extracted facts MUST only include fields defined by the template’s `requiredFields` and `optionalFields`.
- Missing-info checklist MUST include any required field without a single unambiguous value.
- Subject lines MUST only include template name or existing extracted facts.
- Tone edits MUST NOT introduce new facts; they may only rephrase or rearrange existing sentences.

## State Transitions

- `WizardSession.status`: `in_progress` → `completed` when facts are confirmed and a draft is created.
- Draft creation MUST persist a version snapshot for undo/preview history.
