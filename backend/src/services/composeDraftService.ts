import type { Template } from "../lib/types.js";
import { applyTone, type ToneControl } from "./toneService.js";
import { generateDraftWithAI } from "./aiDraftService.js";

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

export const composeDraft = async (
  template: Template,
  facts: Record<string, string>,
  tone: ToneControl = "none"
): Promise<DraftComposition> => {
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

  const fallbackBody = bodySections
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();

  const aiResult = await generateDraftWithAI(template, facts);
  const baseBody = aiResult?.body ?? fallbackBody;
  const baseSubject = aiResult?.subjectLine ?? subjectLine;
  const tonedBody = applyTone(baseBody, tone, template);
  const previewText = baseSubject
    ? `Subject: ${baseSubject}\n\n${tonedBody}`.trim()
    : tonedBody;

  return {
    subjectLine: baseSubject,
    body: tonedBody,
    previewText
  };
};
