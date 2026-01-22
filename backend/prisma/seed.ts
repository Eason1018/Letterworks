import { prisma } from "../src/lib/db";
import { templateSeed } from "../src/lib/templateSeed";

const run = async () => {
  for (const template of templateSeed) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: {
        name: template.name,
        category: template.category,
        description: template.description,
        requiredFields: JSON.stringify(template.requiredFields),
        optionalFields: JSON.stringify(template.optionalFields),
        structure: JSON.stringify(template.structure),
        toneVariants: template.toneVariants ? JSON.stringify(template.toneVariants) : null
      },
      create: {
        id: template.id,
        name: template.name,
        category: template.category,
        description: template.description,
        requiredFields: JSON.stringify(template.requiredFields),
        optionalFields: JSON.stringify(template.optionalFields),
        structure: JSON.stringify(template.structure),
        toneVariants: template.toneVariants ? JSON.stringify(template.toneVariants) : null
      }
    });
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
