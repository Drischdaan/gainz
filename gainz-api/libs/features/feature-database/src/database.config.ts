import { registerAs } from '@nestjs/config';

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export function configureDatabaseConfig(): IDatabaseConfig {
  return {
    host: process.env['DATABASE_HOST'] ?? 'localhost',
    port: parseInt(process.env['DATABASE_PORT'] ?? '5432', 10),
    username: process.env['DATABASE_USERNAME'] ?? 'postgres',
    password: process.env['DATABASE_PASSWORD'] ?? '123456',
    database: process.env['DATABASE_NAME'] ?? 'gainz-db',
  };
}

export default registerAs('database', configureDatabaseConfig);
