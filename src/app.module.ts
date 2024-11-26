import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedModule } from './seed/seed.module';
import { ForecastModule } from './forecast/forecast.module';
import { PredictionModule } from './prediction/prediction.module';

@Module({
  imports: [SeedModule, ForecastModule, PredictionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
