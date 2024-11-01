import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}

  async getOrders(authId: string) {
    const shopId = await this.appservice.getShopId(authId);
    const canteenId = (await this.prisma.shop.findUnique({ where: { shopId: shopId } })).canteenId;
    const order = await this.prisma.order.findMany({
      where: {
        orderStatus: "inProgress",
        canteenId: canteenId
      },
      select: {
        orderId: true,
        orderDate: true,
        orderStatus: true,
        orderItem: {
          where: {
            shopId: shopId
          },
          select: {
            orderItemId: true,
            quantity: true,
            totalPrice: true,
            specialInstructions: true,
            menu: {
              select: {
                name: true,
                price: true,
              }
            },
            orderItemExtra: {
              where: {
                selected: true
              },
              select: {
                OrderItemExtraId: true,
                name: true,
                price: true
              }
            }
          },
        }
      },
    });
    const filteredOrders = order.filter(o => o.orderItem.length > 0);
    return filteredOrders;
  }

  async getOrderHistory(authId: string, date: string) {
    const getDate = new Date(date);
    const startOfDay = new Date(getDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(getDate.setHours(23, 59, 59, 999));
    const shopId = await this.appservice.getShopId(authId);
    const canteenId = (await this.prisma.shop.findUnique({ where: { shopId: shopId } })).canteenId;
    return this.prisma.order.findMany({
      where: {
        canteenId: canteenId,
        orderStatus: "completed",
        orderDate: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      select: {
        orderId: true,
        orderDate: true,
        orderStatus: true,
        orderItem: {
          where: {
            shopId: shopId
          },
          select: {
            orderItemId: true,
            quantity: true,
            totalPrice: true,
            specialInstructions: true,
            menu: {
              select: {
                name: true,
                price: true,
              }
            },
            orderItemExtra: {
              where: {
                selected: true
              },
              select: {
                name: true,
                price: true
              }
            }
          },
        }
      },
    });
  }

  async shopUpdateOrderStatus(msg: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: msg.orderId,
      },
    });
    await this.updateOrderStatus(msg.orderId, 'completed');
    await this.updateOrderItemStatus(msg.orderId, 'completed');
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
    const date = new Date();
    return this.prisma.orderItem.updateMany({
      where: {
        orderId: orderId
      },
      data: {
        orderItemStatus: status,
        completedDate: date
      }
    });
  }
}
