import { apiClient } from "./apiClient";

export type ToneControl = "more_polite" | "more_firm" | "make_shorter" | "fix_spelling" | "none";

export const fetchWizardPreviewWithTone = (sessionId: string, tone: ToneControl) =>
  apiClient.post<{ previewText: string }, { tone: ToneControl }>(
    `/previews/wizard-sessions/${sessionId}`,
    { tone }
  );

export const fetchDraftPreviewWithTone = (draftId: string, tone: ToneControl) =>
  apiClient.post<{ previewText: string }, { tone: ToneControl }>(
    `/previews/drafts/${draftId}`,
    { tone }
  );
