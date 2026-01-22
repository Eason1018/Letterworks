import { Router } from "express";
import { createDraftVersion, listDraftVersions } from "../services/versionService";
import { ApiError } from "./errors";

const router = Router();

router.post("/:draftId/versions", async (req, res, next) => {
  try {
    const version = await createDraftVersion(req.params.draftId);
    res.status(201).json(version);
  } catch (error) {
    if (error instanceof Error && error.message === "Draft not found") {
      next(new ApiError("Draft not found", 404));
      return;
    }
    next(error);
  }
});

router.get("/:draftId/versions", async (req, res, next) => {
  try {
    const versions = await listDraftVersions(req.params.draftId);
    res.json(versions);
  } catch (error) {
    next(error);
  }
});

export default router;
