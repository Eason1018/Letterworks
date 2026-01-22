import { apiClient } from "./apiClient";

export interface DraftCreateInput {
  templateId: string;
  title: string;
  data: Record<string, unknown>;
  toneSettings?: Record<string, unknown>;
  previewText?: string;
}

export interface DraftResponse {
  id: string;
  templateId: string;
  title: string;
  data: Record<string, unknown>;
  previewText?: string;
}

export interface DraftUpdateInput {
  title?: string;
  data?: Record<string, unknown>;
  toneSettings?: Record<string, unknown>;
  previewText?: string;
}

export interface DraftVersionResponse {
  id: string;
  draftId: string;
  versionNumber: number;
  previewText: string;
  toneSettings?: Record<string, unknown>;
}

export interface OutputResponse {
  id: string;
  status: "pending" | "success" | "failed";
  method: "print" | "pdf" | "copy" | "email";
  destination?: string;
}

export const createDraft = (input: DraftCreateInput) => {
  return apiClient.post<DraftResponse, DraftCreateInput>("/drafts", input);
};

export const listDrafts = () => apiClient.get<DraftResponse[]>("/drafts");

export const getDraft = (draftId: string) =>
  apiClient.get<DraftResponse>(`/drafts/${draftId}`);

export const updateDraft = (draftId: string, input: DraftUpdateInput) =>
  apiClient.patch<DraftResponse, DraftUpdateInput>(`/drafts/${draftId}`, input);

export const requestOutput = (
  draftId: string,
  method: OutputResponse["method"],
  destination?: string
) => {
  return apiClient.post<OutputResponse, { method: OutputResponse["method"]; destination?: string }>(
    `/drafts/${draftId}/outputs`,
    { method, destination }
  );
};

export const createDraftVersion = (draftId: string) =>
  apiClient.post<DraftVersionResponse, Record<string, never>>(
    `/drafts/${draftId}/versions`,
    {}
  );

export const listDraftVersions = (draftId: string) =>
  apiClient.get<DraftVersionResponse[]>(`/drafts/${draftId}/versions`);
