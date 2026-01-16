import { CorrelationFeatureModule } from '@gainz-api/feature-correlation';
import { DatabaseFeatureModule } from '@gainz-api/feature-database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseFeatureModule,
    CorrelationFeatureModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
