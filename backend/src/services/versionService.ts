import { prisma } from "../lib/db";
import { parseJson } from "../lib/json";

export const createDraftVersion = async (draftId: string) => {
  const latest = await prisma.letterVersion.findFirst({
    where: { draftId },
    orderBy: { versionNumber: "desc" }
  });

  const draft = await prisma.letterDraft.findUnique({
    where: { id: draftId }
  });

  if (!draft) {
    throw new Error("Draft not found");
  }

  const versionNumber = latest ? latest.versionNumber + 1 : 1;

  return prisma.letterVersion.create({
    data: {
      draftId,
      versionNumber,
      previewText: draft.previewText ?? "",
      toneSettings: draft.toneSettings
    }
  });
};

export const listDraftVersions = async (draftId: string) => {
  const versions = await prisma.letterVersion.findMany({
    where: { draftId },
    orderBy: { versionNumber: "desc" }
  });
  return versions.map((version) => ({
    ...version,
    toneSettings: parseJson(version.toneSettings, null)
  }));
};
