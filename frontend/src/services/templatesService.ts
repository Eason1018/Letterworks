import { apiClient } from "./apiClient";

export interface TemplateField {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "number" | "email" | "phone";
  required: boolean;
}

export interface TemplateStructure {
  header: string;
  recipient: string;
  subject?: string;
  body: string;
  closing: string;
  signature: string;
}

export interface TemplateResponse {
  id: string;
  name: string;
  category?: string;
  description?: string;
  requiredFields: TemplateField[];
  optionalFields: TemplateField[];
  structure: TemplateStructure;
}

export const listTemplates = () => apiClient.get<TemplateResponse[]>("/templates");

export const getTemplate = (templateId: string) =>
  apiClient.get<TemplateResponse>(`/templates/${templateId}`);
