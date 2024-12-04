import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PredictionService } from './prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  async upsertPrediction(@Query('time', ParseIntPipe) time: number) {
    const result = await this.predictionService.setPredictions(time);
    return result;
  }
}
