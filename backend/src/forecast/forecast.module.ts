import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ForecastModel } from './entities/forecast.entity';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  imports: [TypeOrmModule.forFeature([ForecastModel]), CommonModule],
  exports: [ForecastService],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
