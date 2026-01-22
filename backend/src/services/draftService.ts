import { prisma } from "../lib/db";
import { parseJson, stringifyJson } from "../lib/json";

interface DraftCreateInput {
  templateId: string;
  title: string;
  data: Record<string, unknown>;
  toneSettings?: Record<string, unknown>;
  previewText?: string;
}

interface DraftUpdateInput {
  title?: string;
  data?: Record<string, unknown>;
  toneSettings?: Record<string, unknown>;
  previewText?: string;
}

export const createDraft = async (input: DraftCreateInput) => {
  const draft = await prisma.letterDraft.create({
    data: {
      templateId: input.templateId,
      title: input.title,
      data: stringifyJson(input.data),
      toneSettings: input.toneSettings ? stringifyJson(input.toneSettings) : null,
      previewText: input.previewText
    }
  });
  return {
    ...draft,
    data: parseJson(draft.data, {}),
    toneSettings: parseJson(draft.toneSettings, null)
  };
};

export const listDrafts = async () => {
  const drafts = await prisma.letterDraft.findMany({
    orderBy: { updatedAt: "desc" }
  });
  return drafts.map((draft) => ({
    ...draft,
    data: parseJson(draft.data, {}),
    toneSettings: parseJson(draft.toneSettings, null)
  }));
};

export const getDraftById = async (draftId: string) => {
  const draft = await prisma.letterDraft.findUnique({
    where: { id: draftId }
  });
  return draft
    ? {
        ...draft,
        data: parseJson(draft.data, {}),
        toneSettings: parseJson(draft.toneSettings, null)
      }
    : null;
};

export const updateDraft = async (draftId: string, input: DraftUpdateInput) => {
  const draft = await prisma.letterDraft.update({
    where: { id: draftId },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.data ? { data: stringifyJson(input.data) } : {}),
      ...(input.toneSettings ? { toneSettings: stringifyJson(input.toneSettings) } : {}),
      ...(input.previewText !== undefined ? { previewText: input.previewText } : {})
    }
  });
  return {
    ...draft,
    data: parseJson(draft.data, {}),
    toneSettings: parseJson(draft.toneSettings, null)
  };
};
