import { Injectable } from '@nestjs/common';
import { report, title } from 'process';
import { PrismaService } from 'src/prisma.service';
import { SearchReportDto } from './dto/search-report.dto';
import { FilterReportDto } from './dto/filter-report.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  getReport() {
    return this.prisma.report.findMany();
  }

  getReportInfo(reportId: number) {
    return this.prisma.report.findUnique({
      where: {
        reportId: reportId
      },
      select: {
        reportId: true,
        reportDate: true,
        status: true,
        requester: {
          select: {
            requesterId: true,
            username: true,
            email: true
          }
        },
        orderId: true,
        title: true,
        description: true,
      }
    });
  }

  searchReport(msg: SearchReportDto) {
    let id = {}
    for (const key in msg) {
      if(msg[key]) {
        id[key] = parseInt(msg[key].toString());
      }
    }
    return this.prisma.report.findMany({
      where: id
    });
  }

  async filterReport(msg: FilterReportDto) {
    let filter = {}
    for (const key in msg) {
      switch (key) {
        case 'reportDate':
          const date = new Date(msg[key]);
          filter[key] = {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lte: new Date(date.setHours(23, 59, 59, 999))
          }
          break;
        case 'canteenId':
          filter['order'] = {
            canteenId: parseInt(msg[key].toString())
          };
          break;
        case 'shopId':
          filter['order'] = {
            orderItem: {
              every: {
                shopId: parseInt(msg[key].toString())
              }
            }
          };
          break;
        case 'reportBy':
          filter[key] = msg[key];
          break;
      }
    }
    return await this.prisma.report.findMany({
      where: filter
    });
  }
}
