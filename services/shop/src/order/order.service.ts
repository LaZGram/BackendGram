import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}

  async getOrders(authId: string) {
    return this.prisma.orderItem.findMany({
      where: {
        orderItemStatus: "inProgress",
        shopId: await this.appservice.getShopId(authId)
      }
    });
  }

  async getOrderHistory(authId: string) {
    return this.prisma.orderItem.findMany({
      where: {
        shopId: await this.appservice.getShopId(authId),
        orderItemStatus: "completed"
      }
    });
  }

  async updateOrderStatus(updateOrderStatus: UpdateOrderStatusDto) {
    return this.prisma.orderItem.update({
      where: {
        orderItemId: updateOrderStatus.orderItemId
      },
      data: {
        orderItemStatus: "completed",
        completedDate: new Date()
      }
    });
  }
}
