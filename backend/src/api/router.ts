import { Router } from "express";
import templatesRouter from "./templates";
import wizardSessionsRouter from "./wizardSessions";
import previewsRouter from "./previews";
import draftsRouter from "./drafts";
import outputsRouter from "./outputs";
import versionsRouter from "./versions";

export const apiRouter = Router();

apiRouter.use("/templates", templatesRouter);
apiRouter.use("/wizard-sessions", wizardSessionsRouter);
apiRouter.use("/previews", previewsRouter);
apiRouter.use("/drafts", draftsRouter);
apiRouter.use("/drafts", outputsRouter);
apiRouter.use("/drafts", versionsRouter);
