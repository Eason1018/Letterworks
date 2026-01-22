# Quickstart: Letter Writing Wizard

**Date**: 2026-01-22

## Overview
This plan targets a web application with a React frontend and a small Express API.
The API stores templates, drafts, versions, and handles email output. The UI
provides a wizard, preview, tone controls, and output options.

## Prerequisites
- Node.js 20+
- npm 10+

## Local Development (planned)

```text
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Configuration (planned)

- `BACKEND_PORT=4000`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional, for Email output)
- `DATABASE_URL=file:./letterworks.db`

## Validation Checklist

- Launch backend and frontend locally.
- Create a draft via wizard, confirm preview.
- Apply tone controls and undo.
- Save a version and reopen.
- Export with Print/PDF/Copy/Email.
