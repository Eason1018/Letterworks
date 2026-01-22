import { Router } from "express";
import { getTemplateById, listTemplates } from "../services/templateService";
import { ApiError } from "./errors";

const router = Router();

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

export default router;
