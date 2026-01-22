import type { ComposeDraftResponse, FactExtractionResponse, ToneControl } from "../types";

const API_BASE = "/api";

export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json() as Promise<T>;
  },
  post: async <T, B = unknown>(path: string, body?: B): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json() as Promise<T>;
  },
  patch: async <T, B = unknown>(path: string, body?: B): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json() as Promise<T>;
  }
};

export const extractFacts = (templateId: string, notes: string) =>
  apiClient.post<FactExtractionResponse, { notes: string }>(
    `/templates/${templateId}/fact-extractions`,
    { notes }
  );

export const composeDraft = (
  templateId: string,
  facts: Record<string, string>,
  tone?: ToneControl
) =>
  apiClient.post<ComposeDraftResponse, { facts: Record<string, string>; tone?: ToneControl }>(
    `/templates/${templateId}/drafts/compose`,
    { facts, tone }
  );
