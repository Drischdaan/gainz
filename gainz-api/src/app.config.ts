import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  environment: string;
  port: number;
  featureFlags: {
    swagger: boolean;
  };
}

export default registerAs(
  'app',
  (): IAppConfig => ({
    environment: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000') ?? 3000,
    featureFlags: {
      swagger: (process.env.FEATURE_FLAG_SWAGGER ?? 'false') === 'true',
    },
  }),
);
