export type FieldType = "text" | "textarea" | "date" | "number" | "email" | "phone";

export interface FieldDescriptor {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

export type ToneControl = "politer" | "firmer" | "shorter" | "timeline" | "deadline" | "none";

export interface FactExtractionResponse {
  facts: Record<string, string>;
  missingInfo: string[];
  ambiguities?: string[];
  warnings?: string[];
}

export interface ComposeDraftResponse {
  subjectLine: string;
  body: string;
  previewText: string;
}
