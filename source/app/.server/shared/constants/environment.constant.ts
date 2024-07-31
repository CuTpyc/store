import {env} from 'node:process';

export const environment = {
  environment: {
    isProduction: false,
    isDevelopment: true,
    isStage: false,
    isTesting: false,
  },
  cookie: {
    secret: String(env.COOKIE_SECRET || 'some secret'),
  },
  users: {
    admin: {
      email: String(env.DEFAULT_ADMIN_EMAIL),
      password: String(env.DEFAULT_ADMIN_PASSWORD),
    }
  }
}
