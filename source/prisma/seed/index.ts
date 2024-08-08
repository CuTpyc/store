import { PrismaClient } from "@prisma/client";
import { createDefaultAdmin } from "./default-admin";

async function main() {
  const prisma = new PrismaClient();

  await createDefaultAdmin(prisma);
}

main().catch(console.error);
