import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configureDatabaseConfig, IDatabaseConfig } from './database.config';

config({ path: '.env' });

export function buildDataSourceOptions(
  databaseConfig: IDatabaseConfig,
  nodeEnv = 'production',
): DataSourceOptions {
  const rootDir = process.cwd();

  return {
    type: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    entities: [
      join(rootDir, 'dist/**/*.entity.js'),
      join(rootDir, 'src/**/*.entity.ts'),
      join(rootDir, 'libs/**/*.entity.ts'),
    ],
    migrations: [
      join(rootDir, 'dist/migrations/*.js'),
      join(rootDir, 'src/migrations/*.ts'),
    ],
    migrationsRun: false,
    synchronize: false,
    logging: nodeEnv === 'development',
    ssl: nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  };
}

const dataSource = new DataSource(
  buildDataSourceOptions(configureDatabaseConfig(), process.env['NODE_ENV']),
);

export default dataSource;
