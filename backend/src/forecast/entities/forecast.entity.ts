import { Column, Entity, JoinTable, ManyToMany, VersionColumn } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { PredictionModel } from '../../prediction/entities/prediction.entity';

@Entity({
  orderBy: {
    forecastDate: 'ASC',
  },
})
export class ForecastModel extends BaseModel {
  @Column({
    type: 'timestamp',
    unique: true,
    precision: 0,
  })
  forecastDate: Date;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'float' })
  pressureMb: number;

  @Column()
  humidity: number;

  @Column()
  weatherImg: string;

  @VersionColumn()
  version: number;

  @ManyToMany(() => PredictionModel, (prediction) => prediction.forecastData)
  @JoinTable()
  predictions: PredictionModel[];
}
