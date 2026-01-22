import "dotenv/config";
import express from "express";
import cors from "cors";
import { apiRouter } from "./api/router.js";
import { errorHandler } from "./api/errors.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRouter);
app.use(errorHandler);

const port = Number(process.env.BACKEND_PORT ?? 4000);

app.listen(port, () => {
  console.log(`LetterWorks API listening on port ${port}`);
});
