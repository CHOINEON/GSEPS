import { BaseModel } from 'src/common/entity/base.entity';
import { PredictionModel } from 'src/prediction/entities/prediction.entity';
import { Column, Entity, JoinTable, ManyToMany, VersionColumn } from 'typeorm';

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
