import { Router } from "express";
import { z } from "zod";
import { createDraft, getDraftById, listDrafts, updateDraft } from "../services/draftService";
import { ApiError } from "./errors";

const router = Router();

const createSchema = z.object({
  templateId: z.string().min(1),
  title: z.string().min(1),
  data: z.record(z.unknown()),
  toneSettings: z.record(z.unknown()).optional(),
  previewText: z.string().optional()
});

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  data: z.record(z.unknown()).optional(),
  toneSettings: z.record(z.unknown()).optional(),
  previewText: z.string().optional()
});

router.get("/", async (_req, res, next) => {
  try {
    const drafts = await listDrafts();
    res.json(drafts);
  } catch (error) {
    next(error);
  }
});

router.get("/:draftId", async (req, res, next) => {
  try {
    const draft = await getDraftById(req.params.draftId);
    if (!draft) {
      throw new ApiError("Draft not found", 404);
    }
    res.json(draft);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const input = createSchema.parse(req.body);
    const draft = await createDraft(input);
    res.status(201).json(draft);
  } catch (error) {
    next(error);
  }
});

router.patch("/:draftId", async (req, res, next) => {
  try {
    const input = updateSchema.parse(req.body);
    const draft = await updateDraft(req.params.draftId, input);
    res.json(draft);
  } catch (error) {
    next(error);
  }
});

export default router;
