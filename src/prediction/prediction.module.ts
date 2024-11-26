import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForecastModel } from 'src/forecast/entities/forecast.entity';
import { PredictionModel } from './entities/prediction.entity';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionModel, ForecastModel])],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}
