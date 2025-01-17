import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ForecastModel } from './forecast/entities/forecast.entity';
import { ForecastModule } from './forecast/forecast.module';
import { PredictionModel } from './prediction/entities/prediction.entity';
import { PredictionModule } from './prediction/prediction.module';
import { ProcessMaxOutputModel } from './seed/entity/process-maxoutput.entity';
import { ProcessEquipmentSensorModel } from './seed/entity/process-sensor.entity';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ForecastModel,
        PredictionModel,
        ProcessEquipmentSensorModel,
        ProcessMaxOutputModel,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      namingStrategy: new SnakeNamingStrategy() as any,
    }),
    SeedModule,
    ForecastModule,
    PredictionModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
