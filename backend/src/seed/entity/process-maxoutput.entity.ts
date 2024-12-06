import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ProcessMaxOutputModel extends BaseModel {
  @Column()
  time: number;

  @Column({
    type: 'timestamp',
  })
  date: Date;
  @Column()
  data: string;
}
