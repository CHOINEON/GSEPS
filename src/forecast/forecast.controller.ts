import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  // 3일 예보 데이터를 가져오는 함수
  @Get('3d')
  getForecast3Days(@Query('time', ParseIntPipe) time: number) {
    return this.forecastService.getForecast3Days(time);
  }
}
