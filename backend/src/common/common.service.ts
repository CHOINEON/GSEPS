import { Injectable } from '@nestjs/common';
import { AIPredictResultType } from 'src/prediction/types/predict.type';
import { pythonServerAPI } from './api/apiInstance';

@Injectable()
export class CommonService {
  getPythonServerAPI() {
    return pythonServerAPI;
  }

  async getPredictData(forecastData: any[]): Promise<AIPredictResultType> {
    return await this.getPythonServerAPI().post('/predict', forecastData);
  }
}
