import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { ForecastService } from '../forecast/forecast.service';
import { PredictionModel } from './entities/prediction.entity';
import { PredictionService } from './prediction.service';

describe('PredictionService', () => {
  let service: PredictionService;
  let predictionRepository: Repository<PredictionModel>;
  let commonService: CommonService;
  let forecastService: ForecastService;

  const mockPredictionRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    merge: jest.fn(),
  };

  const mockCommonService = {
    getPredictData: jest.fn(),
  };

  const mockForecastService = {
    getForecast3Days: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PredictionService>(PredictionService);
    predictionRepository = module.get<Repository<PredictionModel>>(
      getRepositoryToken(PredictionModel),
    );
    commonService = module.get<CommonService>(CommonService);
    forecastService = module.get<ForecastService>(ForecastService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setPredictions', () => {
    const mockTime = 9;
    const mockForecastData = [
      { temperature: 20, humidity: 65 },
      { temperature: 22, humidity: 60 },
    ];
    const mockPredictions = {
      predict: [
        { temperature: 20, GT1: 100, GT2: 200, ST: 300 },
        { temperature: 22, GT1: 150, GT2: 250, ST: 350 },
      ],
    };

    beforeEach(() => {
      mockForecastService.getForecast3Days.mockResolvedValue(mockForecastData);
      mockCommonService.getPredictData.mockResolvedValue(mockPredictions);
      mockPredictionRepository.find.mockResolvedValue([]);
      mockPredictionRepository.create.mockImplementation((dto) => dto);
      mockPredictionRepository.save.mockImplementation((entity) => entity);
    });

    it('예측 데이터 저장 및 매칭 성공', async () => {
      const result = await service.setPredictions(mockTime);

      expect(forecastService.getForecast3Days).toHaveBeenCalledWith(mockTime);
      expect(commonService.getPredictData).toHaveBeenCalled();
      expect(predictionRepository.create).toHaveBeenCalled();
      expect(predictionRepository.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('기존 예측 데이터 업데이트', async () => {
      const existingPrediction = {
        id: 1,
        time: new Date(),
        predictTemperature: 20,
        GT1: 90,
        GT2: 190,
        ST: 290,
      };

      mockPredictionRepository.find.mockResolvedValue([existingPrediction]);
      mockPredictionRepository.merge.mockImplementation((entity, dto) => {
        return {
          ...entity,
          ...dto,
        };
      });

      await service.setPredictions(mockTime);

      expect(predictionRepository.merge).toHaveBeenCalled();
      expect(predictionRepository.save).toHaveBeenCalled();
    });

    it('예측 데이터와 날씨 데이터 매칭', async () => {
      const result = await service.setPredictions(mockTime);

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            forecastData: expect.any(Array),
          }),
        ]),
      );
    });

    it('에러 처리 검증', async () => {
      mockForecastService.getForecast3Days.mockRejectedValue(
        new Error('Forecast error'),
      );

      await expect(service.setPredictions(mockTime)).rejects.toThrow(
        'Forecast error',
      );
    });
  });
});
