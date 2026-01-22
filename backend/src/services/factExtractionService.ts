import type { Template } from "../lib/types.js";

export interface FactExtractionResult {
  facts: Record<string, string>;
  missingInfo: string[];
  ambiguities: string[];
  warnings: string[];
}

interface FieldDescriptor {
  id: string;
  label: string;
  required: boolean;
  type: string;
}

const normalizeLabel = (value: string) => value.trim().toLowerCase();

export const extractFactsFromNotes = (template: Template, notes: string): FactExtractionResult => {
  const requiredFields = template.requiredFields ?? [];
  const optionalFields = template.optionalFields ?? [];

  const facts: Record<string, string> = {};
  const ambiguities: string[] = [];
  const warnings: string[] = [];
  const ambiguousFields = new Set<string>();

  const lines = notes
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const fieldIndex = new Map<string, { id: string; label: string; required: boolean }>();
  for (const field of [...requiredFields, ...optionalFields]) {
    fieldIndex.set(normalizeLabel(field.id), field);
    fieldIndex.set(normalizeLabel(field.label), field);
  }

  for (const line of lines) {
    const normalizedLine = line.replace(/^[-*]\s+/, "").trim();
    const match = normalizedLine.match(/^([A-Za-z0-9 _-]+)\s*[:\-]\s*(.+)$/);
    if (!match) {
      continue;
    }
    const key = normalizeLabel(match[1]);
    const value = match[2].trim();
    const field = fieldIndex.get(key);
    if (!field || value.length === 0) {
      continue;
    }
    if (facts[field.id] && facts[field.id] !== value) {
      ambiguities.push(`Multiple values provided for ${field.label}.`);
      ambiguousFields.add(field.id);
      continue;
    }
    facts[field.id] = value;
  }

  if (!notes.trim()) {
    warnings.push("Notes are empty. Please provide details for the letter.");
  }

  const missingInfo = (requiredFields as FieldDescriptor[])
    .filter((field) => field.required)
    .filter((field) => !facts[field.id] || ambiguousFields.has(field.id))
    .map((field) => field.label);

  return {
    facts,
    missingInfo,
    ambiguities,
    warnings
  };
};
