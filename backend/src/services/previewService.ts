import type { Template } from "@prisma/client";
import { parseJson } from "../lib/json";
import { applyTone, type ToneControl } from "./toneService";

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
  template: Template,
  data: Record<string, unknown> | string,
  tone: ToneControl = "none"
) => {
  const structure = parseJson(template.structure as string, {
    header: "",
    recipient: "",
    body: "",
    closing: "",
    signature: ""
  }) as {
    header: string;
    recipient: string;
    body: string;
    closing: string;
    signature: string;
  };

  const normalizedData = typeof data === "string" ? parseJson(data, {}) : data;

  const sections = [
    applyTemplate(structure.header, normalizedData),
    applyTemplate(structure.recipient, normalizedData),
    "",
    applyTemplate(structure.body, normalizedData),
    "",
    applyTemplate(structure.closing, normalizedData),
    "",
    applyTemplate(structure.signature, normalizedData)
  ];

  const previewText = sections
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();

  return applyTone(previewText, tone, template);
};
