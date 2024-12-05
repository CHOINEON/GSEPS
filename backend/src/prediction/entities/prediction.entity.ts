import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { ForecastModel } from '../../forecast/entities/forecast.entity';

@Entity()
export class PredictionModel extends BaseModel {
  @Column({
    type: 'timestamp',
    precision: 0,
  })
  time: Date;

  @Column({
    type: 'float',
    nullable: true,
  })
  predictTemperature: number;

  @Column({
    type: 'float',
  })
  GT1: number;

  @Column({
    type: 'float',
  })
  GT2: number;

  @Column({
    type: 'float',
  })
  ST: number;

  @ManyToMany(() => ForecastModel, (forecast) => forecast.predictions)
  forecastData: ForecastModel[];
}
