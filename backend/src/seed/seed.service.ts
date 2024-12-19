import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionService } from '../prediction/prediction.service';
import { ProcessMaxOutputRequestDto } from './dto/request.dto';
import {
  ProcessMaxOutputModel,
  ProcessMaxOutputType,
} from './entity/process-maxoutput.entity';
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
    @InjectRepository(ProcessMaxOutputModel)
    private processMaxOutputRepository: Repository<ProcessMaxOutputModel>,
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

  // async upsertProcessEquipmentSensor() {
  //   const csvFilePath = `./tmp/total_data_20240312_20240831.csv`;
  //   this.logger.debug(`CSV 파일 경로: ${csvFilePath}`);
  //   let chunk = [];
  //   let totalProcessed = 0;

  //   try {
  //     const parser = createReadStream(csvFilePath).pipe(
  //       parse({
  //         columns: true,
  //         skip_empty_lines: true,
  //       }),
  //     );

  //     for await (const record of parser) {
  //       const mappedRecord = this.mapCsvRecordToEntity(record);
  //       chunk.push(mappedRecord);

  //       if (chunk.length >= this.CHUNK_SIZE) {
  //         await this.processChunk(chunk);
  //         totalProcessed += chunk.length;
  //         this.logger.log(`처리된 레코드 수: ${totalProcessed}`);
  //         chunk = [];
  //       }
  //     }

  //     // 남은 레코드 처리
  //     if (chunk.length > 0) {
  //       await this.processChunk(chunk);
  //       totalProcessed += chunk.length;
  //       this.logger.log(`최종 처리된 레코드 수: ${totalProcessed}`);
  //     }
  //   } catch (error) {
  //     this.logger.error('데이터 처리 중 오류 발생:', error);
  //     throw error;
  //   }
  // }

  // private mapCsvRecordToEntity(
  //   record: any,
  // ): Partial<ProcessEquipmentSensorModel> {
  //   const mappedRecord: any = {};

  //   for (const [key, value] of Object.entries(record)) {
  //     const dbColumn = convertTagToDBColumn(key);
  //     if (dbColumn) {
  //       if (dbColumn === 'timestamp') {
  //         if (typeof value === 'string') {
  //           mappedRecord[dbColumn] = new Date(value);
  //         }
  //       } else {
  //         if (typeof value === 'string') {
  //           mappedRecord[dbColumn] =
  //             value.trim() === '' ? null : parseFloat(value);
  //         }
  //       }
  //     }
  //   }

  //   return mappedRecord;
  // }
  // private async processChunk(chunk: Partial<ProcessEquipmentSensorModel>[]) {
  //   try {
  //     // save() 메소드 사용
  //     await this.processEquipmentSensorRepository.save(chunk, {
  //       chunk: Math.min(this.CHUNK_SIZE, chunk.length),
  //     });
  //   } catch (error) {
  //     this.logger.error('청크 처리 중 오류 발생:', error);
  //     throw error;
  //   }
  // }

  async upsertProcessMaxOutput(dto: ProcessMaxOutputRequestDto) {
    this.logger.debug(
      `${dto.startDate} ~ ${dto.endDate} 최대출력/정비 데이터 업데이트 시작`,
    );

    try {
      // 1. 기존 데이터와 겹치는지 확인
      const overlappingPeriod = await this.processMaxOutputRepository
        .createQueryBuilder('maxOutput')
        .where(
          '(maxOutput.start_date <= :endDate AND maxOutput.end_date >= :startDate)',
          {
            startDate: dto.startDate,
            endDate: dto.endDate,
          },
        )
        .getOne();

      if (overlappingPeriod) {
        throw new HttpException(
          `기존 등록 데이터와 기간이 겹칩니다. 겹치는 기간: ${
            overlappingPeriod.start_date
          } ~ ${overlappingPeriod.end_date},기간타입&설명 : ${
            overlappingPeriod.type
          } - ${overlappingPeriod.description}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      // ProcessMaxOutputModel에 새로운 레코드 생성
      const maxOutput = this.processMaxOutputRepository.create({
        start_date: dto.startDate,
        end_date: dto.endDate,
        type: dto.type,
        description: dto.description,
      });
      await this.processMaxOutputRepository.save(maxOutput);

      // 2. ProcessEquipmentSensorModel 업데이트
      if (dto.type === ProcessMaxOutputType.MAX) {
        const updateResult = await this.processEquipmentSensorRepository
          .createQueryBuilder()
          .update(ProcessEquipmentSensorModel)
          .set({ is_max_output: true })
          .where('timestamp between :startDate and :endDate', {
            startDate: dto.startDate,
            endDate: dto.endDate,
          })
          .execute();

        this.logger.log(`${updateResult.affected}개의 레코드 업데이트 완료`);
        this.logger.log(
          `${dto.startDate} ~ ${dto.endDate} 최대출력/정비 데이터 업데이트 완료`,
        );
      }
    } catch (error) {
      this.logger.error('최대출력/정비 데이터 업데이트 실패:', error);

      throw error;
    }
  }

  async findSimilarTemperaturePeriod(
    inputTemperature: number,
    maxOutputStartDate: Date,
    maxOutputEndDate: Date,
    threshold: number = 1,
  ) {
    this.logger.debug(
      `입력 온도: ${inputTemperature}, 최대 출력 기간: ${maxOutputStartDate} ~ ${maxOutputEndDate}`,
    );

    try {
      const results = [];

      // 1. 최대 출력 기간 조회
      const maxOutputPeriods = await this.processMaxOutputRepository.find({
        where: {
          start_date: Between(maxOutputStartDate, maxOutputEndDate),
          end_date: Between(maxOutputStartDate, maxOutputEndDate),
        },
      });

      // 2. 각 최대 출력 기간에 대해 1시간 간격 평균 계산 및 비교
      for (const period of maxOutputPeriods) {
        const start = new Date(period.start_date);
        const end = new Date(period.end_date);

        for (let time = start; time < end; time.setHours(time.getHours() + 1)) {
          const nextHour = new Date(time);
          nextHour.setHours(nextHour.getHours() + 1);

          // Ensure the time is within the maxOutputPeriod
          if (time >= period.start_date && nextHour <= period.end_date) {
            const avgTemperature = await this.processEquipmentSensorRepository
              .createQueryBuilder('sensor')
              .select(
                'AVG((sensor.gt1_압축기_입구_대기온도 + sensor.gt2_압축기_입구_대기온도) / 2)',
                'averageTemperature',
              )
              .where('sensor.timestamp BETWEEN :start AND :end', {
                start: time,
                end: nextHour,
              })
              .andWhere('sensor.is_max_output = :isMaxOutput', {
                isMaxOutput: true,
              })
              .getRawOne();

            if (
              Math.abs(avgTemperature.averageTemperature - inputTemperature) <
              threshold
            ) {
              results.push({
                periodStart: time.toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                }),
                periodEnd: nextHour.toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                }),
                averageTemperature: avgTemperature.averageTemperature,
                maxOutputPeriod: `${period.start_date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} ~ ${period.end_date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
                description: period.description,
              });
            }
          }
        }
      }

      return results;
    } catch (error) {
      this.logger.error('유사 온도 구간 조회 실패:', error);
      throw error;
    }
  }
}
