import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { renderPreview } from "../services/previewService.js";
import { ApiError } from "./errors.js";

const router = Router();

const toneSchema = z.object({
  tone: z
    .enum(["politer", "firmer", "shorter", "timeline", "deadline", "none"])
    .optional()
});

router.post("/wizard-sessions/:sessionId", async (req, res, next) => {
  try {
    toneSchema.parse(req.body ?? {});
    const session = await prisma.wizardSession.findUnique({
      where: { id: req.params.sessionId }
    });

    if (!session) {
      throw new ApiError("Wizard session not found", 404);
    }

    const template = await prisma.template.findUnique({
      where: { id: session.templateId }
    });

    if (!template) {
      throw new ApiError("Template not found", 404);
    }

    const previewText = renderPreview(
      template,
      session.data as Record<string, unknown>,
      req.body?.tone ?? "none"
    );
    res.json({ previewText });
  } catch (error) {
    next(error);
  }
});

router.post("/drafts/:draftId", async (req, res, next) => {
  try {
    toneSchema.parse(req.body ?? {});
    const draft = await prisma.letterDraft.findUnique({
      where: { id: req.params.draftId }
    });

    if (!draft) {
      throw new ApiError("Draft not found", 404);
    }

    const template = await prisma.template.findUnique({
      where: { id: draft.templateId }
    });

    if (!template) {
      throw new ApiError("Template not found", 404);
    }

    const previewText = renderPreview(
      template,
      draft.data as Record<string, unknown>,
      req.body?.tone ?? "none"
    );
    res.json({ previewText });
  } catch (error) {
    next(error);
  }
});

export default router;
