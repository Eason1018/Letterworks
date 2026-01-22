export type FieldType = "text" | "textarea" | "date" | "number" | "email" | "phone";

export interface FieldDescriptor {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface TemplateStructure {
  header: string;
  recipient: string;
  body: string;
  closing: string;
  signature: string;
}

export interface Template {
  id: string;
  name: string;
  category?: string;
  description?: string;
  requiredFields: FieldDescriptor[];
  optionalFields: FieldDescriptor[];
  structure: TemplateStructure;
  toneVariants?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type WizardStatus = "in_progress" | "completed";

export interface WizardSession {
  id: string;
  templateId: string;
  currentStep: number;
  data: Record<string, unknown>;
  status: WizardStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LetterDraft {
  id: string;
  templateId: string;
  title: string;
  data: Record<string, unknown>;
  toneSettings?: Record<string, unknown>;
  previewText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LetterVersion {
  id: string;
  draftId: string;
  versionNumber: number;
  previewText: string;
  toneSettings?: Record<string, unknown>;
  createdAt: string;
}

export type OutputMethod = "print" | "pdf" | "copy" | "email";
export type OutputStatus = "pending" | "success" | "failed";

export interface OutputRequest {
  id: string;
  draftId: string;
  method: OutputMethod;
  status: OutputStatus;
  destination?: string;
  createdAt: string;
}

export type ToneControl = "more_polite" | "more_firm" | "make_shorter" | "fix_spelling" | "none";
