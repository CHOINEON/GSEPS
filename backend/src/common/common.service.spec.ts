import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('서비스 의존성 검증', () => {
    expect(service).toBeDefined();
  });

  describe('getPredictData', () => {
    it('정확한 예측 데이터 형식 반환', async () => {
      // 테스트용 입력 데이터
      const mockTestData = [
        {
          /* 예측에 필요한 데이터 */
        },
      ];

      // API 응답 모킹
      const mockResponse = {
        datetime: '2024-12-05T10:47:18.488691',
        predict: [
          {
            temperature: 25.5,
            GT1: 100.5,
            GT2: 95.3,
            ST: 85.7,
          },
          {
            temperature: 26.0,
            GT1: 101.2,
            GT2: 96.1,
            ST: 86.2,
          },
        ],
      };

      // getPythonServerAPI 모킹
      jest.spyOn(service, 'getPythonServerAPI').mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
      } as any);

      const result = await service.getPredictData(mockTestData);

      // 전체 응답 구조 검증
      expect(result).toMatchObject({
        datetime: expect.any(String),
        predict: expect.arrayContaining([
          expect.objectContaining({
            temperature: expect.any(Number),
            GT1: expect.any(Number),
            GT2: expect.any(Number),
            ST: expect.any(Number),
          }),
        ]),
      });

      // Date 검증
      expect(new Date(result.datetime)).toBeInstanceOf(Date);

      // API 호출 검증
      expect(service.getPythonServerAPI().post).toHaveBeenCalledWith(
        '/predict',
        mockTestData,
      );
    });

    it('API 에러 처리', async () => {
      const mockTestData = [
        {
          /* 예측에 필요한 데이터 */
        },
      ];

      // API 에러 모킹
      jest.spyOn(service, 'getPythonServerAPI').mockReturnValue({
        post: jest.fn().mockRejectedValue(new Error('API Error')),
      } as any);

      await expect(service.getPredictData(mockTestData)).rejects.toThrow(
        'API Error',
      );
    });
  });
});
