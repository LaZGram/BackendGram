import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService, private appService: AppService) {}

  async create(createReportDto: CreateReportDto) {
    const report = await this.prisma.report.findMany({
      where: {
        orderId: createReportDto.orderId,
        reportBy: 'requester'
      }
    });
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: createReportDto.orderId
      }
    });
    if (report.length > 0) {
      throw new RpcException({ statusCode: 400, message: 'Report already exists' });
    }
    else if (!order) {
      throw new RpcException({ statusCode: 404, message: 'Order not found' });
    }
    else if(order.orderStatus == "completed") {
      const reportDate = new Date();
      const orderDate = new Date(order.orderDate);
      const validDate = new Date(order.orderDate);
      validDate.setDate(validDate.getDate() + 3);
      console.log(reportDate, orderDate, validDate);
      const isInRange = reportDate >= orderDate && reportDate <= validDate;
      if(isInRange) {
        return this.prisma.report.create({
          data: {
            title: createReportDto.title,
            description: createReportDto.description,
            status: "pending",
            requester: {
              connect: {
                requesterId: await this.appService.getRequesterId(createReportDto.authId)
              }
            },
            admin: {
              connect: {
                adminId: order.adminId
              }
            },
            order: {
              connect: {
                orderId: createReportDto.orderId
              }
            },
            walker: {
              connect: {
                walkerId: order.walkerId
              }
            },
            reportDate: reportDate,
            reportBy: 'requester'
          }
        });
      }
      else throw new RpcException({ statusCode: 400, message: 'Report date is not in range' });
    }
    else throw new RpcException({ statusCode: 400, message: 'Order not completed yet' });
  }
}