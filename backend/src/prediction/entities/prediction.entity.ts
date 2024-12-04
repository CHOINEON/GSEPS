import { BaseModel } from 'src/common/entity/base.entity';
import { ForecastModel } from 'src/forecast/entities/forecast.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

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
