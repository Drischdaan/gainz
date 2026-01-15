import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { validateEnvironmentVariables } from './env.config';
import { PingController } from './ping/ping.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: validateEnvironmentVariables,
      expandVariables: true,
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
