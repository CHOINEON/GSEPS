import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ParseDatePipe } from 'src/common/pipes/parse-date.pipe';
import { PredictionService } from './prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  async upsertPrediction(@Query('time', ParseIntPipe) time: number) {
    const result = await this.predictionService.setPredictions(time);
    return result;
  }

  @Get('table')
  async getPredictionTable(@Query('scopeDate', ParseDatePipe) scopeDate: Date) {
    const result =
      await this.predictionService.getDailyPredictionTable(scopeDate);
    return result;
  }
}
