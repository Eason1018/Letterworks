# Quickstart: Template AI Flow

## Prerequisites
- Node.js 20+
- SQLite (via Prisma)

## Run the app
1. Start the backend API.
2. Start the frontend UI.

## Try the flow (API-level)
1. Create or pick a template and capture its `templateId`.
2. Extract facts from messy notes using the fact-extraction endpoint.
3. Review the missing-info checklist and confirm extracted facts.
4. Compose a subject line and draft body using the compose endpoint.
5. Apply one-click tone edits (politer, firmer, shorter, timeline, deadline) via the preview endpoints.

## Expected behavior
- Facts are only taken from user notes.
- Missing-info checklist appears when required fields are absent or ambiguous.
- Tone edits never change user details.
