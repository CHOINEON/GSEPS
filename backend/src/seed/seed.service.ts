import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { Repository } from 'typeorm';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionService } from '../prediction/prediction.service';
import { convertTagToDBColumn } from './constants/column-mapping';
import { ProcessEquipmentSensorModel } from './entity/process-sensor.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  private readonly predictionTimes = [0, 3, 6, 9, 12, 15, 18, 21];
  private readonly CHUNK_SIZE = 100; // 100개씩 처리

  constructor(
    private forecastService: ForecastService,
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private predictionService: PredictionService,
    @InjectRepository(ProcessEquipmentSensorModel)
    private processEquipmentSensorRepository: Repository<ProcessEquipmentSensorModel>,
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
    if (this.configService.get('NODE_ENV') === 'production') {
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

  async upsertProcessEquipmentSensor() {
    const csvFilePath = `./tmp/total_data_20240312_20240831.csv`;
    this.logger.debug(`CSV 파일 경로: ${csvFilePath}`);
    let chunk = [];
    let totalProcessed = 0;

    try {
      const parser = createReadStream(csvFilePath).pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
        }),
      );

      for await (const record of parser) {
        const mappedRecord = this.mapCsvRecordToEntity(record);
        chunk.push(mappedRecord);

        if (chunk.length >= this.CHUNK_SIZE) {
          await this.processChunk(chunk);
          totalProcessed += chunk.length;
          this.logger.log(`처리된 레코드 수: ${totalProcessed}`);
          chunk = [];
        }
      }

      // 남은 레코드 처리
      if (chunk.length > 0) {
        await this.processChunk(chunk);
        totalProcessed += chunk.length;
        this.logger.log(`최종 처리된 레코드 수: ${totalProcessed}`);
      }
    } catch (error) {
      this.logger.error('데이터 처리 중 오류 발생:', error);
      throw error;
    }
  }

  private mapCsvRecordToEntity(
    record: any,
  ): Partial<ProcessEquipmentSensorModel> {
    const mappedRecord: any = {};

    for (const [key, value] of Object.entries(record)) {
      const dbColumn = convertTagToDBColumn(key);
      if (dbColumn) {
        if (dbColumn === 'timestamp') {
          if (typeof value === 'string') {
            mappedRecord[dbColumn] = new Date(value);
          }
        } else {
          if (typeof value === 'string') {
            mappedRecord[dbColumn] = parseFloat(value);
          }
        }
      }
    }

    return mappedRecord;
  }
  private async processChunk(chunk: Partial<ProcessEquipmentSensorModel>[]) {
    try {
      // save() 메소드 사용
      await this.processEquipmentSensorRepository.save(chunk, {
        chunk: Math.min(this.CHUNK_SIZE, chunk.length),
      });
    } catch (error) {
      this.logger.error('청크 처리 중 오류 발생:', error);
      throw error;
    }
  }
}
