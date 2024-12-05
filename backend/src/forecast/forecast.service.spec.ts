import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionModel } from '../prediction/entities/prediction.entity';
import { PredictionService } from '../prediction/prediction.service';

describe('PredictionService', () => {
  let service: PredictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PredictionService,
        {
          provide: getRepositoryToken(PredictionModel),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CommonService,
          useValue: {
            getPredictData: jest.fn(),
          },
        },
        {
          provide: ForecastService,
          useValue: {
            getForecast3Days: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PredictionService>(PredictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
