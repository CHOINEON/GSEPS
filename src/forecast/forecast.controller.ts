import { Controller, Get, Query } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  // 3일 예보 데이터를 가져오는 함수
  @Get('3d')
  getForecast3Days(@Query('time') time: number) {
    return this.forecastService.getForecast3Days(time);
  }

  // Weather API에서 날씨 데이터를 가져와서 DB에 저장하는 함수
  @Get()
  upsertForecast() {
    return this.forecastService.upsertForecast();
  }
}
