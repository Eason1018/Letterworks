import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db";
import { parseJson, stringifyJson } from "../lib/json";
import { ApiError } from "./errors";

const router = Router();

const createSchema = z.object({
  templateId: z.string().min(1)
});

const updateSchema = z.object({
  currentStep: z.number().int().min(1).optional(),
  data: z.record(z.unknown()).optional(),
  status: z.enum(["in_progress", "completed"]).optional()
});

router.post("/", async (req, res, next) => {
  try {
    const input = createSchema.parse(req.body);
    const session = await prisma.wizardSession.create({
      data: {
        templateId: input.templateId,
        currentStep: 1,
        data: stringifyJson({}),
        status: "in_progress"
      }
    });
    res.status(201).json({
      ...session,
      data: parseJson(session.data, {})
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:sessionId", async (req, res, next) => {
  try {
    const input = updateSchema.parse(req.body);
    const session = await prisma.wizardSession.update({
      where: { id: req.params.sessionId },
      data: {
        ...(input.currentStep !== undefined ? { currentStep: input.currentStep } : {}),
        ...(input.data ? { data: stringifyJson(input.data) } : {}),
        ...(input.status ? { status: input.status } : {})
      }
    });
    res.json({
      ...session,
      data: parseJson(session.data, {})
    });
  } catch (error) {
    if (error instanceof Error && error.name === "NotFoundError") {
      next(new ApiError("Wizard session not found", 404));
      return;
    }
    next(error);
  }
});

export default router;
