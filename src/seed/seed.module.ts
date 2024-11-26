import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { PredictionModule } from 'src/prediction/prediction.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [ForecastModule, PredictionModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
