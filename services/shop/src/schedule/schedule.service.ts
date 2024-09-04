import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateSpecialOperatingHoursDto } from './dto/create-special-operating-hours.dto';


@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    const oldSchedule = await this.prisma.weeklySchedule.findMany({
      where: { shopId: createScheduleDto.shopId },
    })
    if (oldSchedule.length > 0) {
      await this.prisma.weeklySchedule.deleteMany({
        where: { shopId: createScheduleDto.shopId },
      })
    }
    let schedule: any[] = [];
    for (let day of createScheduleDto.dayOfWeek) {
      schedule.push(
        await this.prisma.weeklySchedule.create({
          data: {
            dayOfWeek: day.day,
            open: day.open,
            close: day.close,
            shop: { connect: { shopId: createScheduleDto.shopId } },
          },
        })
      )
    }
    return schedule;
  }

  async createSpecialOperatingHours(createSpecialOperatingHoursDto: CreateSpecialOperatingHoursDto) {
    const date = await this.prisma.specialOperatingHours.findMany({
      where: { 
        shopId: createSpecialOperatingHoursDto.shopId,
        date: createSpecialOperatingHoursDto.date
      },
    })
    if (date.length > 0) {
      for (let d of date) {
        // console.log(d)
        return this.prisma.specialOperatingHours.update({
          where: { specialOperatingHoursId: d.specialOperatingHoursId },
          data: {
            open: createSpecialOperatingHoursDto.open,
            close: createSpecialOperatingHoursDto.close,
          },
        })
      }
    }
    else return this.prisma.specialOperatingHours.create({
      data: {
        date: createSpecialOperatingHoursDto.date,
        open: createSpecialOperatingHoursDto.open,
        close: createSpecialOperatingHoursDto.close,
        shop: { connect: { shopId: createSpecialOperatingHoursDto.shopId }}
      },
    })
  }

  async getSchedule(shopId: number) {
    return this.prisma.weeklySchedule.findMany({
      where: { shopId: shopId },
    })
  }

  async getSpecialOperatingHours(shopId: number) {
    return this.prisma.specialOperatingHours.findMany({
      where: { shopId: shopId },
    })
  }
}
