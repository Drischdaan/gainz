import { registerAs } from '@nestjs/config';
import { Environment } from './env.config';

export interface IAppConfig {
  environment: Environment;
  port: number;
}

export default registerAs(
  'app',
  (): IAppConfig => ({
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT ?? '3000') ?? 3000,
  }),
);
