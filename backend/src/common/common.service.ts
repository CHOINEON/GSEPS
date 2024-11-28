import { Injectable } from '@nestjs/common';
import { pythonServerAPI } from './api/apiInstance';

@Injectable()
export class CommonService {
  getPythonServerAPI() {
    return pythonServerAPI;
  }
}
