import { Router } from "express";
import { z } from "zod";
import { createOutputRequest } from "../services/outputService";

const router = Router();

const outputSchema = z.object({
  method: z.enum(["print", "pdf", "copy", "email"]),
  destination: z.string().optional()
});

router.post("/:draftId/outputs", async (req, res, next) => {
  try {
    const input = outputSchema.parse(req.body);
    const output = await createOutputRequest({
      draftId: req.params.draftId,
      method: input.method,
      destination: input.destination
    });
    res.status(201).json(output);
  } catch (error) {
    next(error);
  }
});

export default router;
