import { Router } from "express";
import { getTemplateById, listTemplates } from "../services/templateService.js";
import { extractFactsFromNotes } from "../services/factExtractionService.js";
import { composeDraft } from "../services/composeDraftService.js";
import { z } from "zod";
import { ApiError } from "./errors.js";

const router = Router();

const factExtractionSchema = z.object({
  notes: z.string().min(1)
});

const composeSchema = z.object({
  facts: z.record(z.string().min(1)),
  tone: z
    .enum(["none", "politer", "firmer", "shorter", "timeline", "deadline"])
    .optional()
});

router.get("/", async (_req, res, next) => {
  try {
    const templates = await listTemplates();
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

router.get("/:templateId", async (req, res, next) => {
  try {
    const template = await getTemplateById(req.params.templateId);
    if (!template) {
      throw new ApiError("Template not found", 404);
    }
    res.json(template);
  } catch (error) {
    next(error);
  }
});

router.post("/:templateId/fact-extractions", async (req, res, next) => {
  try {
    const input = factExtractionSchema.parse(req.body);
    const template = await getTemplateById(req.params.templateId);
    if (!template) {
      throw new ApiError("Template not found", 404);
    }
    const result = extractFactsFromNotes(template, input.notes);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/:templateId/drafts/compose", async (req, res, next) => {
  try {
    const input = composeSchema.parse(req.body);
    const template = await getTemplateById(req.params.templateId);
    if (!template) {
      throw new ApiError("Template not found", 404);
    }
    const composition = await composeDraft(template, input.facts, input.tone ?? "none");
    res.json(composition);
  } catch (error) {
    next(error);
  }
});

export default router;
