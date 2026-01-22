import nodemailer from "nodemailer";
import { prisma } from "../lib/db";

interface OutputCreateInput {
  draftId: string;
  method: "print" | "pdf" | "copy" | "email";
  destination?: string;
}

const canSendEmail = () => {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
};

export const createOutputRequest = async (input: OutputCreateInput) => {
  let status: "pending" | "success" | "failed" = "success";

  if (input.method === "email") {
    if (!input.destination || !canSendEmail()) {
      status = "failed";
    } else {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: input.destination,
        subject: "LetterWorks Letter",
        text: "Please find your letter attached in the LetterWorks app."
      });
    }
  }

  return prisma.outputRequest.create({
    data: {
      draftId: input.draftId,
      method: input.method,
      status,
      destination: input.destination
    }
  });
};
