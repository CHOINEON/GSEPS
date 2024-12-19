import { IsEnum } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

export enum ProcessMaxOutputType {
  MAX = 'max',
  FIX = 'fix',
}

@Entity()
export class ProcessMaxOutputModel extends BaseModel {
  @Column({
    type: 'timestamp',
    precision: 0,
  })
  start_date: Date;

  @Column({
    type: 'timestamp',
    precision: 0,
  })
  end_date: Date;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ProcessMaxOutputType,
    default: ProcessMaxOutputType.MAX,
  })
  @IsEnum(ProcessMaxOutputType)
  type: ProcessMaxOutputType;
}
