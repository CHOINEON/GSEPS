import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { MoreThanOrEqual } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ForecastModel } from './entities/forecast.entity';

@Injectable()
export class ForecastService {
  private readonly logger = new Logger(ForecastService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ForecastModel)
    private readonly forecastRepository: Repository<ForecastModel>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onApplicationBootstrap() {
    await this.upsertForecast();

    const job = this.schedulerRegistry.getCronJob('weatherUpdate');
    this.logger.log(`다음 날씨 업데이트 시간: ${job.nextDate()}`);
  }

  @Cron('0 1 * * * *', {
    name: 'weatherUpdate',
    timeZone: 'Asia/Seoul',
  })
  async scheduleUpsertForecast() {
    this.logger.log('날씨 데이터 업데이트 시작');
    try {
      await this.upsertForecast();
      this.logger.log('날씨 데이터 업데이트 완료');
    } catch (error) {
      this.logger.error('날씨 데이터 업데이트 실패:', error);
    }
  }

  // 3일 예보 데이터를 가져오는 함수
  async getForecast3Days(time: number): Promise<ForecastModel[]> {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate());
    return this.forecastRepository.find({
      where: {
        forecastDate: MoreThanOrEqual(startDate),
      },
      order: {
        forecastDate: 'ASC',
      },
      skip: time % 24,
      take: 3 * 24 - (time % 24),
    });
  }

  async upsertForecast() {
    // GSEPS 좌표
    const lat = 36.9570520946909;
    const lon = 126.782109876802;
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    // 3일치 예보
    const days = 3;
    const lang = 'ko';

    const url = `https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=${days}&lang=${lang}&key=${apiKey}`;

    try {
      const { data } = await axios.get(url);
      const forecastDays = data.forecast.forecastday;

      // 필드명과 데이터 형식을 엔티티에 맞게 수정
      const hourlyForecasts = forecastDays.flatMap((day) =>
        day.hour.map((hour) => ({
          forecastDate: new Date(hour.time),
          temperature: hour.temp_c,
          weatherImg: hour.condition.icon.replace('//', ''),
          pressureMb: hour.pressure_mb,
          humidity: hour.humidity,
        })),
      );

      // upsert 작업 수행
      const savedForecasts = await Promise.all(
        hourlyForecasts.map(async (forecast) => {
          const existingForecast = await this.forecastRepository.findOne({
            where: { forecastDate: forecast.forecastDate },
          });

          if (existingForecast) {
            // 기존 데이터가 있으면 업데이트
            return this.forecastRepository.save({
              ...existingForecast,
              ...forecast,
            });
          } else {
            // 새로운 데이터 삽입
            return this.forecastRepository.save(forecast);
          }
        }),
      );

      return savedForecasts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API 요청 실패:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
      throw new Error(
        '날씨 데이터를 가져오는데 실패했습니다: ' + error.message,
      );
    }
  }
}
