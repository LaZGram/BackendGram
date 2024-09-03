import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateSpecialOperatingHoursDto } from './dto/create-special-operating-hours.dto';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern('createWeeklySchedule')
  createSchedule(@Payload() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(createScheduleDto);
  }

  @MessagePattern('createSpecialOperatingHours')
  createSpecialOperatingHours(@Payload() createSpecialOperatingHoursDto: CreateSpecialOperatingHoursDto) {
    return this.scheduleService.createSpecialOperatingHours(createSpecialOperatingHoursDto);
  }

  @MessagePattern('getWeeklySchedule')
  getWeeklySchedule(@Payload() msg: object) {
    const shopId = parseInt(msg['shopId'].toString());
    return this.scheduleService.getSchedule(shopId);
  }

  @MessagePattern('getSpecialOperatingHours')
  getSpecialOperatingHours(@Payload() msg: object) {
    const shopId = parseInt(msg['shopId'].toString());
    return this.scheduleService.getSpecialOperatingHours(shopId);
  }
}
