import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionModel } from './entities/prediction.entity';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

describe('PredictionController', () => {
  let controller: PredictionController;

  // Mock 객체들 생성
  const mockPredictionRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockCommonService = {
    getPredictData: jest.fn(),
  };

  const mockForecastService = {
    getForecast3Days: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionController],
      providers: [
        PredictionService,
        {
          provide: getRepositoryToken(PredictionModel),
          useValue: mockPredictionRepository,
        },
        {
          provide: CommonService,
          useValue: mockCommonService,
        },
        {
          provide: ForecastService,
          useValue: mockForecastService,
        },
      ],
    }).compile();

    controller = module.get<PredictionController>(PredictionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
