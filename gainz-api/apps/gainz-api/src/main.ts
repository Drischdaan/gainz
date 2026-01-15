import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { IAppConfig } from './app/app.config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const appConfig: IAppConfig = configService.getOrThrow<IAppConfig>('app');

  await app.listen(appConfig.port);
  Logger.log(`🚀 Application is running on: http://localhost:${appConfig.port}`);
}

bootstrap();
