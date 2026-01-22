# Data Model: Letter Writing Wizard

**Date**: 2026-01-22

## Entities

### Template
- **Purpose**: Defines a letter type and required fields.
- **Fields**:
  - `id` (string, UUID)
  - `name` (string, e.g., “Refund Request”)
  - `category` (string, e.g., “Finance”, “Housing”)
  - `description` (string)
  - `requiredFields` (array of field descriptors)
  - `optionalFields` (array of field descriptors)
  - `structure` (object: header, recipient, body, closing, signature)
  - `toneVariants` (object with named variants per tone control)
  - `createdAt`, `updatedAt` (datetime)
- **Validation**:
  - `name` required, 3–80 chars.
  - `requiredFields` must be non‑empty.

### WizardSession
- **Purpose**: Captures in‑progress user input for a template.
- **Fields**:
  - `id` (string, UUID)
  - `templateId` (string, FK -> Template)
  - `currentStep` (int)
  - `data` (object, key/value by field id)
  - `status` (enum: in_progress, completed)
  - `createdAt`, `updatedAt` (datetime)
- **Validation**:
  - `currentStep` >= 1.
  - Required fields for completed sessions must be present.

### LetterDraft
- **Purpose**: Saved in‑progress or completed letter data.
- **Fields**:
  - `id` (string, UUID)
  - `templateId` (string, FK -> Template)
  - `title` (string)
  - `data` (object, key/value by field id)
  - `toneSettings` (object)
  - `previewText` (string)
  - `createdAt`, `updatedAt` (datetime)
- **Validation**:
  - `title` required, max 120 chars.

### LetterVersion
- **Purpose**: Immutable snapshot of a draft at a point in time.
- **Fields**:
  - `id` (string, UUID)
  - `draftId` (string, FK -> LetterDraft)
  - `versionNumber` (int, increments per draft)
  - `previewText` (string)
  - `toneSettings` (object)
  - `createdAt` (datetime)

### OutputRequest
- **Purpose**: Records output attempts and confirmations.
- **Fields**:
  - `id` (string, UUID)
  - `draftId` (string, FK -> LetterDraft)
  - `method` (enum: print, pdf, copy, email)
  - `status` (enum: pending, success, failed)
  - `destination` (string, e.g., file path or email address)
  - `createdAt` (datetime)

## Relationships

- Template 1‑to‑many WizardSession
- Template 1‑to‑many LetterDraft
- LetterDraft 1‑to‑many LetterVersion
- LetterDraft 1‑to‑many OutputRequest

## State Transitions

- **WizardSession**: in_progress → completed
- **LetterDraft**: created → updated (repeatable)
- **OutputRequest**: pending → success | failed

## Field Descriptor (used by Template)

- `id` (string)
- `label` (string)
- `type` (enum: text, textarea, date, number, email, phone)
- `required` (boolean)
- `validation` (object: minLength, maxLength, pattern)
