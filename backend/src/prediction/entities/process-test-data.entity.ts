import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProcessTestData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: number;

  @Column({
    type: 'timestamp',
  })
  date: Date;
  @Column()
  data: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
