import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionService } from '../prediction/prediction.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  // private readonly predictionTimes = [0, 3, 6, 9, 12, 15, 18, 21];
  private readonly predictionTimes = [0];

  constructor(
    private forecastService: ForecastService,
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private predictionService: PredictionService,
  ) {}

  // 매시간마다 1분에 날씨 데이터 업데이트
  @Cron('0 1 * * * *', {
    name: 'weatherUpdate',
    timeZone: 'Asia/Seoul',
  })
  async scheduleUpsertForecast() {
    this.logger.debug('날씨 데이터 업데이트 시작');
    try {
      await this.forecastService.upsertForecast();
      this.logger.log('날씨 데이터 업데이트 완료');
    } catch (error) {
      this.logger.error('날씨 데이터 업데이트 실패:', error);
    }
  }

  // 0,3,6,9,12,15,18,21시 2분에 해당 시간 예측
  @Cron('0 2 0,3,6,9,12,15,18,21 * * *', {
    name: 'predictions',
    timeZone: 'Asia/Seoul',
  })
  async schedulePredictions() {
    if (this.configService.get('NODE_ENV') === 'development') {
      const currentHour = new Date().getHours();
      this.logger.debug(`${currentHour}시 예측 시작`);
      try {
        await this.predictionService.setPredictions(currentHour);
        this.logger.log(`${currentHour}시 예측 완료`);
      } catch (error) {
        this.logger.error(`${currentHour}시 예측 실패:`, error);
      }
    }
  }

  // 애플리케이션 부트스트랩 시 실행
  async onApplicationBootstrap() {
    await this.forecastService.upsertForecast();

    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.debug('초기 예측 데이터 업데이트 시작');
      try {
        for (const time of this.predictionTimes) {
          await this.predictionService.setPredictions(time);
          this.logger.debug(`${time}시 예측 데이터 업데이트 완료`);
        }
      } catch (error) {
        this.logger.error('초기 예측 데이터 업데이트 실패:', error);
      }
    }

    const job = this.schedulerRegistry.getCronJob('weatherUpdate');
    this.logger.log(`다음 예보 업데이트 : ${job.nextDate()}`);
    const job2 = this.schedulerRegistry.getCronJob('predictions');
    this.logger.log(`다음 예측 시간 : ${job2.nextDate()}`);
  }
}
