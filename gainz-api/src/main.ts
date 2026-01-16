import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { IAppConfig } from './app.config';
import { AppModule } from './app.module';

function useSwagger(app: INestApplication, logger: Logger) {
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('npm_package_name', 'gainz-api'))
    .setDescription(
      configService.get<string>('npm_package_description', 'Gym Tracker API'),
    )
    .setVersion(configService.get<string>('npm_package_version', '0.0.0'))
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      autoTagControllers: true,
      operationIdFactory: (_: string, methodKey: string, version?: string) => {
        let operationName: string = methodKey;
        if (version) {
          operationName += version;
        }
        return operationName;
      },
    });
  const options: SwaggerCustomOptions = {
    explorer: true,
  };
  SwaggerModule.setup('openapi', app, documentFactory, options);
  logger.log('📚 Swagger enabled');
}

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const appConfig: IAppConfig = configService.getOrThrow<IAppConfig>('app');

  if (appConfig.featureFlags.swagger) {
    useSwagger(app, logger);
  }

  await app.listen(appConfig.port);
}

bootstrap();
