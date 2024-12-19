import { IsDate, IsEnum, IsString } from 'class-validator';
import { ProcessMaxOutputType } from '../entity/process-maxoutput.entity';

export class ProcessMaxOutputRequestDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsEnum(ProcessMaxOutputType)
  type: ProcessMaxOutputType;

  @IsString()
  description: string;
}
