import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService, private appService: AppService) {}

  async create(createReportDto: CreateReportDto) {
    const report = await this.prisma.report.findUnique({
      where: {
        orderId: createReportDto.orderId
      }
    });
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: createReportDto.orderId
      }
    });
    if (report) {
      return "Report already exists";
    }
    else if (!order) {
      throw new Error("Order not found");
    }
    else if(order.orderStatus !== "completed") {
      return "Order is not completed";
    }
    else {
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
          reportDate: createReportDto.reportDate
        }
      });
    }
  }
}