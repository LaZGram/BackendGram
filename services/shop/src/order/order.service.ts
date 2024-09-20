import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}

  async getOrders(authId: string) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        orderItemStatus: "inProgress",
        shopId: await this.appservice.getShopId(authId)
      },
      select: {
        orderItemId: true,
        quantity: true,
        totalPrice: true,
        specialInstructions: true,
        shopId: true,
        orderItemStatus: true,
        orderItemDate: true,
        completedDate: true,
        menuId: true,
        orderId: true,
        orderItemExtra: {
          where: {
            selected: true
          },
          select: {
            optionItem: {
              select: {
                optionItemId: true,
                name: true,
                price: true
              }
            }
          }
        }
      }
    });
    return orderItems;
  }

  async getOrderHistory(authId: string, date: string) {
    const getDate = new Date(date);
    return this.prisma.orderItem.findMany({
      where: {
        shopId: await this.appservice.getShopId(authId),
        orderItemStatus: "completed",
        order: {
          orderDate: {
            gte: new Date(getDate.setTime(0 * 0 * 0 * 0)),
            lt: new Date(getDate.setTime(23 * 59 * 59 * 59))
          }
        }
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
