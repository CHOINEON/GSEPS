import { PredictionModel } from 'src/prediction/entities/prediction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  orderBy: {
    forecastDate: 'ASC',
  },
})
export class ForecastModel {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
  })
  updatedAt: Date;

  @OneToMany(() => PredictionModel, (prediction) => prediction.forecastData)
  predictions: PredictionModel[];
}
