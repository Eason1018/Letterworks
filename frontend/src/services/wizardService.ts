import { apiClient } from "./apiClient";

export interface WizardSession {
  id: string;
  templateId: string;
  currentStep: number;
  data: Record<string, unknown>;
  status: "in_progress" | "completed";
}

export const createWizardSession = (templateId: string) =>
  apiClient.post<WizardSession, { templateId: string }>("/wizard-sessions", {
    templateId
  });

export const updateWizardSession = (sessionId: string, data: Partial<WizardSession>) =>
  apiClient.patch<WizardSession, Partial<WizardSession>>(
    `/wizard-sessions/${sessionId}`,
    data
  );

export const fetchWizardPreview = (sessionId: string) =>
  apiClient.post<{ previewText: string }, { tone?: string }>(
    `/previews/wizard-sessions/${sessionId}`,
    { tone: "none" }
  );
