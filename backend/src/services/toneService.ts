import { parseJson } from "../lib/json.js";

export type ToneControl =
  | "politer"
  | "firmer"
  | "shorter"
  | "timeline"
  | "deadline"
  | "none";

interface ToneTemplate {
  toneVariants?: string | Record<string, unknown> | null;
}

const datePattern = /\b(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\b/i;

const shortenBody = (text: string) => {
  const paragraphs = text.split(/\n\s*\n/);
  if (paragraphs.length < 3) {
    return text;
  }

  const hasSubject = paragraphs[0]?.toLowerCase().startsWith("subject:");
  const bodyIndex = hasSubject ? 2 : 1;
  const body = paragraphs[bodyIndex] ?? "";
  const sentences = body.split(/(?<=[.!?])\s+/);
  const shortenedBody = sentences.slice(0, 1).join(" ");
  const updated = [...paragraphs];
  updated[bodyIndex] = shortenedBody;
  return updated.join("\n\n");
};

const applyClosingTone = (text: string, tone: ToneControl, override?: string) => {
  const paragraphs = text.split(/\n\s*\n/);
  if (paragraphs.length < 4) {
    return text;
  }

  const closingIndex = paragraphs.length - 2;
  if (tone === "politer") {
    paragraphs[closingIndex] =
      override ?? "Thank you for your time and consideration.";
  }
  if (tone === "firmer") {
    paragraphs[closingIndex] = override ?? "Please respond promptly.";
  }
  return paragraphs.join("\n\n");
};

const emphasizeTimeline = (text: string, label: "Timeline" | "Deadline") => {
  const paragraphs = text.split(/\n\s*\n/);
  const bodyIndex = paragraphs.length >= 4 ? (paragraphs[0]?.toLowerCase().startsWith("subject:") ? 2 : 1) : 0;
  const body = paragraphs[bodyIndex] ?? "";
  const sentences = body.split(/(?<=[.!?])\s+/);
  const dateSentenceIndex = sentences.findIndex((sentence) => datePattern.test(sentence));
  if (dateSentenceIndex === -1) {
    return text;
  }

  const dateSentence = sentences[dateSentenceIndex];
  const remaining = sentences.filter((_, index) => index !== dateSentenceIndex);
  const updatedBody = [`${label}: ${dateSentence.trim()}`,
    ...remaining.map((sentence) => sentence.trim()).filter(Boolean)
  ].join(" ");

  const updated = [...paragraphs];
  updated[bodyIndex] = updatedBody;
  return updated.join("\n\n");
};

export const applyTone = (
  previewText: string,
  tone: ToneControl,
  template?: ToneTemplate
) => {
  if (tone === "none") {
    return previewText;
  }

  if (tone === "politer" || tone === "firmer") {
    const variants =
      typeof template?.toneVariants === "string"
        ? parseJson<Record<string, { closing?: string }>>(template.toneVariants, {})
        : ((template?.toneVariants ?? {}) as Record<string, { closing?: string }>);
    const variant = variants[tone];
    if (variant?.closing) {
      return applyClosingTone(previewText, tone, variant.closing);
    }
  }

  switch (tone) {
    case "shorter":
      return shortenBody(previewText);
    case "timeline":
      return emphasizeTimeline(previewText, "Timeline");
    case "deadline":
      return emphasizeTimeline(previewText, "Deadline");
    case "politer":
    case "firmer":
      return applyClosingTone(previewText, tone);
    default:
      return previewText;
  }
};
