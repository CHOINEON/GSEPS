import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('seed/process-equipment-sensor')
  async upsertProcessEquipmentSensor() {
    return this.seedService.upsertProcessEquipmentSensor();
  }
}
