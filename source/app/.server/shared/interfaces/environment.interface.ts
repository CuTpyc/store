export interface IEnvironment {
  environment: IEnvironmentConfig;
  cookie: ICookie;
  users: IUsers;
}

interface IEnvironmentConfig {
  isProduction: boolean;
  isDevelopment: boolean;
  isStage: boolean;
  isTesting: boolean;
}

interface ICookie {
  secret: string;
}

interface IAdminCredentials {
  email: string;
  password: string;
}

interface IUsers {
  admin: IAdminCredentials;
}
