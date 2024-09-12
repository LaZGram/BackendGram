import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, AppService],
})
export class ScheduleModule {}
