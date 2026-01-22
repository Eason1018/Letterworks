import { apiClient } from "./apiClient";
import type { ToneControl } from "../types";

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
