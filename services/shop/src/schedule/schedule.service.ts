import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateSpecialOperatingHoursDto } from './dto/create-special-operating-hours.dto';
import { AppService } from 'src/app.service';


@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    const shopId = await this.appservice.getShopId(createScheduleDto.authId)
    const oldSchedule = await this.prisma.weeklySchedule.findMany({
      where: { shopId: shopId },
    })
    if (oldSchedule.length > 0) {
      await this.prisma.weeklySchedule.deleteMany({
        where: { shopId: shopId },
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
            shop: { connect: { shopId: shopId } },
          },
        })
      )
    }
    return schedule;
  }

  async createSpecialOperatingHours(createSpecialOperatingHoursDto: CreateSpecialOperatingHoursDto) {
    const shopId = await this.appservice.getShopId(createSpecialOperatingHoursDto.authId)
    const date = await this.prisma.specialOperatingHours.findMany({
      where: { 
        shopId: shopId,
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
        shop: { connect: { shopId: shopId }}
      },
    })
  }

  async getSchedule(authId: string) {
    return this.prisma.weeklySchedule.findMany({
      where: { shopId: await this.appservice.getShopId(authId) },
    })
  }

  async getSpecialOperatingHours(authId: string) {
    return this.prisma.specialOperatingHours.findMany({
      where: { shopId: await this.appservice.getShopId(authId) },
    })
  }
}
