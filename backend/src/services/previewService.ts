import { parseJson } from "../lib/json.js";
import { applyTone, type ToneControl } from "./toneService.js";

interface PreviewTemplate {
  structure: string;
  toneVariants?: string | null;
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

export const renderPreview = (
  template: PreviewTemplate,
  data: Record<string, unknown> | string,
  tone: ToneControl = "none"
) => {
  const structure = parseJson(template.structure as string, {
    header: "",
    recipient: "",
    subject: "",
    body: "",
    closing: "",
    signature: ""
  }) as {
    header: string;
    recipient: string;
    subject?: string;
    body: string;
    closing: string;
    signature: string;
  };

  const normalizedData = typeof data === "string" ? parseJson(data, {}) : data;

  const subjectLine =
    typeof (normalizedData as { subjectLine?: string }).subjectLine === "string"
      ? String((normalizedData as { subjectLine?: string }).subjectLine).trim()
      : applyTemplate(structure.subject ?? "", normalizedData).trim();

  const sections: string[] = [];
  if (subjectLine) {
    sections.push(`Subject: ${subjectLine}`, "");
  }

  sections.push(
    applyTemplate(structure.header, normalizedData),
    applyTemplate(structure.recipient, normalizedData),
    "",
    applyTemplate(structure.body, normalizedData),
    "",
    applyTemplate(structure.closing, normalizedData),
    "",
    applyTemplate(structure.signature, normalizedData)
  );

  const previewText = sections
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();

  return applyTone(previewText, tone, template);
};
