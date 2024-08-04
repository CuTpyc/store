import { env } from "node:process";
import { IEnvironment } from "~/.server/shared/interfaces/environment.interface";

if (!env.DEFAULT_ADMIN_EMAIL || !env.DEFAULT_ADMIN_PASSWORD) {
  throw new Error(
    "Environment variables DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD must be set."
  );
}

export const environment: IEnvironment = {
  environment: {
    isProduction: false,
    isDevelopment: true,
    isStage: false,
    isTesting: false,
  },
  cookie: {
    secret: env.COOKIE_SECRET || "some secret",
  },
  users: {
    admin: {
      email: env.DEFAULT_ADMIN_EMAIL,
      password: env.DEFAULT_ADMIN_PASSWORD,
    },
  },
};
