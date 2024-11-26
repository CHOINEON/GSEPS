import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ForecastService } from 'src/forecast/forecast.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private forecastService: ForecastService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // 매시간마다 1분에 날씨 데이터 업데이트
  @Cron('0 1 * * * *', {
    name: 'weatherUpdate',
    timeZone: 'Asia/Seoul',
  })
  async scheduleUpsertForecast() {
    this.logger.log('날씨 데이터 업데이트 시작');
    try {
      await this.forecastService.upsertForecast();
      this.logger.log('날씨 데이터 업데이트 완료');
    } catch (error) {
      this.logger.error('날씨 데이터 업데이트 실패:', error);
    }
  }

  // 애플리케이션 부트스트랩 시 실행
  async onApplicationBootstrap() {
    await this.forecastService.upsertForecast();

    const job = this.schedulerRegistry.getCronJob('weatherUpdate');
    this.logger.log(`다음 날씨 업데이트 시간: ${job.nextDate()}`);
  }
}
