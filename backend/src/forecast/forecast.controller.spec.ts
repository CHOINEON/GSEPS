import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForecastModel } from './entities/forecast.entity';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

describe('ForecastController', () => {
  let controller: ForecastController;

  // Mock 객체들 생성
  const mockForecastRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [
        ForecastService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getRepositoryToken(ForecastModel),
          useValue: mockForecastRepository,
        },
      ],
    }).compile();

    controller = module.get<ForecastController>(ForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
