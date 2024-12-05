import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionService } from '../prediction/prediction.service';
import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  // Mock 객체들 생성
  const mockForecastService = {
    upsertForecast: jest.fn(),
  };

  const mockSchedulerRegistry = {
    getCronJob: jest.fn().mockReturnValue({
      nextDate: jest.fn().mockReturnValue(new Date()),
    }),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('development'),
  };

  const mockPredictionService = {
    setPredictions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: ForecastService,
          useValue: mockForecastService,
        },
        {
          provide: SchedulerRegistry,
          useValue: mockSchedulerRegistry,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: PredictionService,
          useValue: mockPredictionService,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
