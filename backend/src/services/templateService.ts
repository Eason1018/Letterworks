import { prisma } from "../lib/db";
import { parseJson } from "../lib/json";

const mapTemplate = (template: {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  requiredFields: string;
  optionalFields: string;
  structure: string;
  toneVariants: string | null;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return {
    ...template,
    requiredFields: parseJson(template.requiredFields, []),
    optionalFields: parseJson(template.optionalFields, []),
    structure: parseJson(template.structure, {
      header: "",
      recipient: "",
      subject: "",
      body: "",
      closing: "",
      signature: ""
    }),
    toneVariants: parseJson(template.toneVariants, null)
  };
};

export const listTemplates = async () => {
  const templates = await prisma.template.findMany({
    orderBy: { name: "asc" }
  });
  return templates.map(mapTemplate);
};

export const getTemplateById = async (templateId: string) => {
  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });
  return template ? mapTemplate(template) : null;
};
