import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from '../common/common.service';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionService } from '../prediction/prediction.service';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let controller: SeedController;

  // Mock 객체들 생성
  const mockForecastService = {
    upsertForecast: jest.fn(),
    getForecast3Days: jest.fn(),
  };

  const mockPredictionService = {
    setPredictions: jest.fn(),
  };

  const mockCommonService = {
    getPredictData: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockSchedulerRegistry = {
    getCronJob: jest.fn().mockReturnValue({
      nextDate: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        SeedService,
        {
          provide: ForecastService,
          useValue: mockForecastService,
        },
        {
          provide: PredictionService,
          useValue: mockPredictionService,
        },
        {
          provide: CommonService,
          useValue: mockCommonService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: SchedulerRegistry,
          useValue: mockSchedulerRegistry,
        },
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
