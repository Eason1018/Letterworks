import type { Template } from "@prisma/client";
import { parseJson } from "../lib/json";

export type ToneControl =
  | "more_polite"
  | "more_firm"
  | "make_shorter"
  | "fix_spelling"
  | "none";

const applySpellingFixes = (text: string) => {
  return text
    .replace(/\bteh\b/gi, "the")
    .replace(/\brecieve\b/gi, "receive")
    .replace(/\badress\b/gi, "address")
    .replace(/\bthier\b/gi, "their");
};

const shortenBody = (text: string) => {
  const paragraphs = text.split(/\n\s*\n/);
  if (paragraphs.length < 3) {
    return text;
  }

  const body = paragraphs[2];
  const sentences = body.split(/(?<=[.!?])\s+/);
  const shortenedBody = sentences.slice(0, 1).join(" ");
  const updated = [...paragraphs];
  updated[2] = shortenedBody;
  return updated.join("\n\n");
};

const applyClosingTone = (text: string, tone: ToneControl, override?: string) => {
  const paragraphs = text.split(/\n\s*\n/);
  if (paragraphs.length < 4) {
    return text;
  }

  const closingIndex = paragraphs.length - 2;
  if (tone === "more_polite") {
    paragraphs[closingIndex] =
      override ?? "Thank you for your time and consideration.";
  }
  if (tone === "more_firm") {
    paragraphs[closingIndex] = override ?? "Please respond promptly.";
  }
  return paragraphs.join("\n\n");
};

export const applyTone = (
  previewText: string,
  tone: ToneControl,
  template?: Template
) => {
  if (tone === "none") {
    return previewText;
  }

  if (tone === "more_polite" || tone === "more_firm") {
    const variants = parseJson<Record<string, { closing?: string }>>(
      template?.toneVariants as string,
      {}
    );
    const variant = variants[tone];
    if (variant?.closing) {
      return applyClosingTone(previewText, tone, variant.closing);
    }
  }

  switch (tone) {
    case "make_shorter":
      return shortenBody(previewText);
    case "fix_spelling":
      return applySpellingFixes(previewText);
    case "more_polite":
    case "more_firm":
      return applyClosingTone(previewText, tone);
    default:
      return previewText;
  }
};
