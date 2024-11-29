import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { PredictionModel } from './entities/prediction.entity';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PredictionModel]),
    CommonModule,
    ForecastModule,
  ],
  exports: [PredictionService],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}
