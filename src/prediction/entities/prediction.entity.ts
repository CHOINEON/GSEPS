import { ForecastModel } from 'src/forecast/entities/forecast.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PredictionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  GT1: number;

  @Column()
  GT2: number;

  @Column()
  ST: number;

  @ManyToOne(() => ForecastModel, (forecast) => forecast.predictions, {
    nullable: false,
  })
  forecastData: ForecastModel;
}
