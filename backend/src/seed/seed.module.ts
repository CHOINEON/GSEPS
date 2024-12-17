import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { PredictionModule } from 'src/prediction/prediction.module';
import { ProcessEquipmentSensorModel } from './entity/process-sensor.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ForecastModule,
    PredictionModule,
    CommonModule,
    TypeOrmModule.forFeature([ProcessEquipmentSensorModel]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
