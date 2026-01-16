import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, DataSourceOptions } from 'typeorm';
import { buildDataSourceOptions } from './data-source';
import databaseConfig, { IDatabaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = buildDataSourceOptions(
          configService.getOrThrow<IDatabaseConfig>('database'),
          configService.get<string>('NODE_ENV', 'development'),
        );
        return {
          ...options,
          entities: [],
          migrations: [],
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseFeatureModule {
  static forFeature(
    entities?: EntityClassOrSchema[],
    dataSource?: DataSource | DataSourceOptions | string,
  ): DynamicModule {
    return TypeOrmModule.forFeature(entities, dataSource);
  }
}
