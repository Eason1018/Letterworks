import type { Template } from "../lib/types";
import { applyTone, type ToneControl } from "./toneService";

export interface DraftComposition {
  subjectLine: string;
  body: string;
  previewText: string;
}

const applyTemplate = (text: string, data: Record<string, unknown>) => {
  return text.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key: string) => {
    const value = data[key];
    if (value === undefined || value === null || value === "") {
      return "";
    }
    return String(value);
  });
};

const buildSubjectLine = (template: Template, facts: Record<string, string>) => {
  if (template.structure?.subject && template.structure.subject.trim()) {
    return applyTemplate(template.structure.subject, facts).trim();
  }

  const recipient = facts.recipientName || facts.contactName || facts.managerName;
  if (recipient) {
    return `Regarding: ${template.name} - ${recipient}`.trim();
  }

  return `Regarding: ${template.name}`;
};

export const composeDraft = (
  template: Template,
  facts: Record<string, string>,
  tone: ToneControl = "none"
): DraftComposition => {
  const structure = template.structure;
  const subjectLine = buildSubjectLine(template, facts);

  const bodySections = [
    applyTemplate(structure.header, facts),
    applyTemplate(structure.recipient, facts),
    "",
    applyTemplate(structure.body, facts),
    "",
    applyTemplate(structure.closing, facts),
    "",
    applyTemplate(structure.signature, facts)
  ];

  const bodyText = bodySections
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();

  const tonedBody = applyTone(bodyText, tone, template);
  const previewText = subjectLine
    ? `Subject: ${subjectLine}\n\n${tonedBody}`.trim()
    : tonedBody;

  return {
    subjectLine,
    body: tonedBody,
    previewText
  };
};
