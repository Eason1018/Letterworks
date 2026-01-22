# Research: Template AI Flow

## Decision 1: Fact extraction strategy

- **Decision**: Use a deterministic, field-driven extractor that maps user notes to template required/optional fields using explicit parsing rules (e.g., `key: value` lines, labeled bullets, and direct matches to known field names).
- **Rationale**: This preserves trust and safety by avoiding fabricated details and ensures repeatable outputs.
- **Alternatives considered**: LLM-based extraction (rejected due to risk of invented details and “AI” branding constraints).

## Decision 2: Missing-info checklist rules

- **Decision**: Generate missing-info items by comparing extracted facts to template `requiredFields`, flagging ambiguities (multiple values or unclear references) as missing until clarified.
- **Rationale**: Explicitly surfaces uncertainty without inventing defaults and aligns with the constitution’s trust requirements.
- **Alternatives considered**: Auto-filling defaults (rejected because it introduces non-user facts).

## Decision 3: Subject line generation

- **Decision**: Use a deterministic subject pattern: prefer a template-provided subject pattern; otherwise use `"Regarding: {Template Name}"` and only insert facts when explicitly present (e.g., recipient name, account ID, or date).
- **Rationale**: Avoids inventing details and provides consistent, predictable subjects.
- **Alternatives considered**: Freeform summarization (rejected for unpredictability and fabrication risk).

## Decision 4: Tone/length edits

- **Decision**: Implement edits as deterministic text transforms that only rephrase existing sentences or adjust placement of already-present factual sentences. Timeline/deadline edits may only emphasize existing date facts; if none exist, no change is applied.
- **Rationale**: Maintains factual integrity while providing quick refinement options.
- **Alternatives considered**: Generative re-writes (rejected due to fact-invention risk).
