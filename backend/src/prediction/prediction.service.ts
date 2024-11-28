import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { ForecastModel } from 'src/forecast/entities/forecast.entity';
import { ForecastService } from 'src/forecast/forecast.service';
import { Repository } from 'typeorm';
import { PredictionModel } from './entities/prediction.entity';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(PredictionModel)
    private predictionRepository: Repository<PredictionModel>,

    private commonService: CommonService,
    private forecastService: ForecastService,
  ) {}

  async upsertPrediction(time: number) {
    const forecastData = await this.forecastService.getForecast3Days(time);

    // Python 서버에 예측 요청
    const response = await this.requestPrediction(forecastData);
    const predictions = response.predictions;

    // 해당 시간의 기존 예측값 조회
    const targetDate = new Date(new Date().setHours(time, 0, 0, 0));
    const existingPredictions = await this.predictionRepository.find({
      where: { time: targetDate },
      relations: ['forecastData'],
    });
    console.log('existingPredictions', existingPredictions.length);

    // // 모든 예측 ID가 기존 데이터에 있는지 확인
    // const allExist = predictions.every((pred) =>
    //   existingPredictions.some((ep) => ep.id === pred.id),
    // );

    if (existingPredictions.length > 0) {
      // 모든 데이터가 이미 존재하면 업데이트
      return await Promise.all(
        predictions.map(async (pred) => {
          const existingPrediction = existingPredictions.find(
            (ep) => ep.forecastData.id === pred.id,
          );

          return await this.predictionRepository.save(
            this.predictionRepository.merge(existingPrediction, {
              GT1: pred.GT1,
              GT2: pred.GT2,
              ST: pred.ST,
            }),
          );
        }),
      );
    } else {
      // 하나라도 없으면 모두 새로 생성
      return await Promise.all(
        predictions.map((pred) =>
          this.predictionRepository.save({
            time: targetDate,
            GT1: pred.GT1,
            GT2: pred.GT2,
            ST: pred.ST,
            forecastData: { id: pred.id },
          }),
        ),
      );
    }
  }

  private async requestPrediction(forecastData: ForecastModel[]) {
    // Python 서버에 예측 요청
    const predictions = await this.commonService
      .getPythonServerAPI()
      .post('/predict', forecastData);
    return predictions.data;
  }
}
