import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionModel } from './entities/prediction.entity';
import { PredictType } from './types/predict.type';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(PredictionModel)
    private predictionRepository: Repository<PredictionModel>,

    private commonService: CommonService,
    private forecastService: ForecastService,
  ) {}

  async setPredictions(time: number) {
    const forecastData = await this.forecastService.getForecast3Days(time);
    const epsTestData = await this._getRecentTestData();
    const res_predict = await this._requestPrediction(epsTestData);

    const targetDate = new Date(new Date().setHours(time, 0, 0, 0));

    const savedPredictions = await this._savePredictions(
      res_predict,
      targetDate,
    );
    return await this._matchPredictionsWithForecast(
      savedPredictions,
      forecastData,
    );
  }

  async getDailyPredictionTable(scopeDate: Date) {
    const startDate = new Date(scopeDate);
    const endDate = new Date(scopeDate);
    endDate.setDate(endDate.getDate() + 1);

    const predictions = await this.predictionRepository
      .createQueryBuilder('prediction')
      .where('prediction.time >= :startDate', { startDate })
      .andWhere('prediction.time < :endDate', { endDate })
      .orderBy('prediction.time', 'DESC')
      .getMany();

    // 온도별로 그룹화
    const groupedPredictions = predictions.reduce((acc, curr) => {
      const temp = curr.predictTemperature;
      if (!acc[temp]) {
        acc[temp] = {
          temperature: temp,
          predictions: [],
        };
      }
      acc[temp].predictions.push({
        predictionId: curr.id,
        GT1: curr.GT1,
        GT2: curr.GT2,
        ST: curr.ST,
        predictedAt: curr.time.toISOString(),
      });
      return acc;
    }, {});

    // 각 온도 그룹을 최신순으로 정렬하고 latest와 historical로 분리
    const predictionGroups = Object.values(groupedPredictions)
      .map((group: any) => ({
        temperature: group.temperature,
        latest: group.predictions[0],
        historical: group.predictions.slice(1),
      }))
      .sort((a, b) => a.temperature - b.temperature); // 온도 내림차순 정렬

    // 날짜도 KST 기준으로 변환
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(startDate.getTime() + kstOffset);

    return {
      date: kstDate.toISOString().split('T')[0],
      predictions: predictionGroups,
    };
  }

  private async _getRecentTestData() {
    // 최근 시험 데이터를 가져오는 로직 구현
    return [];
  }

  private async _savePredictions(res_predict: PredictType[], targetDate: Date) {
    const existingPredictions = await this.predictionRepository.find({
      where: { time: targetDate },
    });

    return await Promise.all(
      res_predict.map(async (prediction) => {
        const existingPrediction = existingPredictions.find(
          (ep) => ep.predictTemperature === prediction.temperature,
        );

        if (existingPrediction) {
          const updatedPrediction = this.predictionRepository.merge(
            existingPrediction,
            {
              GT1: prediction.GT1,
              GT2: prediction.GT2,
              ST: prediction.ST,
            },
          );
          return this.predictionRepository.save(updatedPrediction);
        } else {
          const newPrediction = this.predictionRepository.create({
            time: targetDate,
            predictTemperature: prediction.temperature,
            GT1: prediction.GT1,
            GT2: prediction.GT2,
            ST: prediction.ST,
          });
          return this.predictionRepository.save(newPrediction);
        }
      }),
    );
  }

  private async _matchPredictionsWithForecast(
    savedPredictions: any[],
    forecastData: any[],
  ) {
    const matchingPromises = savedPredictions.map((prediction) => {
      const matchingForecasts = forecastData.filter(
        (forecast) => forecast.temperature === prediction.predictTemperature,
      );

      if (matchingForecasts.length > 0) {
        prediction.forecastData = matchingForecasts;
        return this.predictionRepository.save(prediction);
      }
      return Promise.resolve(prediction);
    });

    return await Promise.all(matchingPromises);
  }

  private async _requestPrediction(
    forecastData: any[],
  ): Promise<PredictType[]> {
    // Python 서버에 예측 요청
    const predictions = await this.commonService.getPredictData(forecastData);
    return predictions.predict;
  }
}
