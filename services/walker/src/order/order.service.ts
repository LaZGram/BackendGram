import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appService: AppService) {}

  async acceptOrder(authId: string, orderId: number ) {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: orderId,
      },
    });
    await this.updateOrderStatus(orderId, 'inProgress');
    await this.updateOrderItemStatus(orderId, 'inProgress');
    await this.prisma.order.update({
      where: {
        orderId: orderId
      },
      data: {
        walkerId: await this.appService.getWalkerId(authId)
      }
    });
    return order;
  }
  
  async updateOrderStatus(orderId: number, status: string) {
    return this.prisma.order.update({
      where: {
        orderId: orderId
      },
      data: {
        orderStatus: status
      }
    });
  }

  async updateOrderItemStatus(orderId: number, status: string) {
    return this.prisma.orderItem.updateMany({
      where: {
        orderId: orderId
      },
      data: {
        orderItemStatus: status
      }
    });
  }
}
