import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ParseDatePipe } from '../common/pipes/parse-date.pipe';
import { ProcessMaxOutputRequestDto } from './dto/request.dto';
import { SeedService } from './seed.service';

@Controller()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  // @Get('seed/process-equipment-sensor')
  // async upsertProcessEquipmentSensor() {
  //   return this.seedService.upsertProcessEquipmentSensor();
  // }

  @Post('v1/process-maxoutput')
  async upsertProcessMaxOutput(@Body() dto: ProcessMaxOutputRequestDto) {
    return this.seedService.upsertProcessMaxOutput(dto);
  }

  @Get('v1/find-similar-condition')
  async findSimilarCondition(
    @Query('temperature', ParseIntPipe) temperature: number,
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.seedService.findSimilarTemperaturePeriod(
      temperature,
      startDate,
      endDate,
      1,
    );
  }
}
