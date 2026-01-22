import OpenAI from "openai";
import type { Template } from "../lib/types.js";

export interface AiDraftResult {
  subjectLine: string;
  body: string;
}

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
};

const buildSystemPrompt = () => {
  return [
    "You write clear, professional emails and letters.",
    "Use ONLY the provided facts. Do not invent names, dates, numbers, or events.",
    "If a detail is missing, avoid guessing. Keep the tone respectful and concise.",
    "Return JSON with keys: subjectLine, body.",
    "No markdown or extra keys."
  ].join(" ");
};

const buildUserPrompt = (template: Template, facts: Record<string, string>) => {
  const requiredFields = template.requiredFields?.map((field) => field.label) ?? [];
  const optionalFields = template.optionalFields?.map((field) => field.label) ?? [];

  return [
    `Template name: ${template.name}`,
    template.description ? `Template description: ${template.description}` : "",
    requiredFields.length ? `Required fields: ${requiredFields.join(", ")}` : "",
    optionalFields.length ? `Optional fields: ${optionalFields.join(", ")}` : "",
    "Facts (key: value):",
    ...Object.entries(facts).map(([key, value]) => `- ${key}: ${value}`),
    "Write the email/letter body and a clear subject line."
  ]
    .filter(Boolean)
    .join("\n");
};

export const generateDraftWithAI = async (
  template: Template,
  facts: Record<string, string>
): Promise<AiDraftResult | null> => {
  const client = getClient();
  if (!client) {
    return null;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const response = await client.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: buildSystemPrompt()
      },
      {
        role: "user",
        content: buildUserPrompt(template, facts)
      }
    ]
  });

  const text = response.choices[0]?.message?.content?.trim();
  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text) as AiDraftResult;
    if (!parsed.subjectLine || !parsed.body) {
      return null;
    }
    return {
      subjectLine: parsed.subjectLine.trim(),
      body: parsed.body.trim()
    };
  } catch {
    return null;
  }
};
