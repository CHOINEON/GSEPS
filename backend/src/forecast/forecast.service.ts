import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  ) {}

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
      relations: {
        predictions: true,
      },
      skip: time % 24,
      take: 3 * 24 - (time % 24),
    });
  }

  async getSelectedForecast(
    scopeDate: Date,
    predictionDate: Date,
    predictionTimes: number[],
  ) {
    // 보고있는 날짜의 24시간 예보 데이터를 가져옴
    const forecasts = await this.forecastRepository.find({
      where: {
        forecastDate: MoreThanOrEqual(scopeDate),
      },
      order: {
        forecastDate: 'ASC',
      },
      relations: {
        predictions: true,
      },
      take: 24,
    });

    // forecast 데이터 배열 생성
    const forecastArray = forecasts.map((forecast) => ({
      time: forecast.forecastDate.toISOString(),
      temperature: forecast.temperature,
      pressureMb: forecast.pressureMb,
      humidity: forecast.humidity,
      weatherImg: forecast.weatherImg,
    }));

    // predictions를 시간별로 그룹화
    const predictionsGroups = {};
    predictionTimes.forEach((time) => {
      const timeStr = new Date(
        predictionDate.setHours(time, 0, 0, 0),
      ).toISOString();
      predictionsGroups[time] = forecasts.map((forecast) => {
        const prediction = forecast.predictions.find(
          (p) => p.time.toISOString() === timeStr,
        );

        return {
          GT1: prediction?.GT1 ?? null,
          GT2: prediction?.GT2 ?? null,
          ST: prediction?.ST ?? null,
        };
      });
    });

    return {
      forecasts: forecastArray,
      predictions: predictionsGroups,
    };
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
