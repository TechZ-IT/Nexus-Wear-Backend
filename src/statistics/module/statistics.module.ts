import { Module } from '@nestjs/common';
import { StatisticsService } from '../service/statistics.service';
import { StatisticsController } from '../controller/statistics.controller';

@Module({
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
