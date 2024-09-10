// source/libs/tolgee-export/config.ts
import { env } from "node:process";
import invariant from "tiny-invariant";

invariant(env.TOLGEE_API_KEY, "TOLGEE_API_KEY env variable is required");
invariant(env.TOLGEE_PROJECT_ID, "TOLGEE_PROJECT_ID env variable is required");
invariant(env.TOLGEE_API_URL, "TOLGEE_API_URL env variable is required");
invariant(
  env.TOLGEE_TRANSLATIONS_DIR,
  "TOLGEE_TRANSLATIONS_DIR env variable is required"
);

export const config = {
  apiKey: env.TOLGEE_API_KEY.trim(),
  projectId: env.TOLGEE_PROJECT_ID.trim(),
  apiUrl: env.TOLGEE_API_URL.trim(),
  translationsDir: env.TOLGEE_TRANSLATIONS_DIR.trim(),
} as const;
