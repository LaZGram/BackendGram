import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getRequester(authId: string) {
    return this.prisma.requester.findUnique({
      where: {
        authId: authId
      }
    }).then(requester => {
      return requester.requesterId;
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        type: createOrderDto.transactionType,
        date: new Date(createOrderDto.transactionDate),
        amount: createOrderDto.amount,
        status: "completed"
      }
    });
    const order = await this.prisma.order.create({
      data: {
        requester: {
          connect: {
            requesterId: await this.getRequester(createOrderDto.authId)
          }
        },
        canteen: {
          connect: {
            canteenId: createOrderDto.canteenId
          }
        },
        address: {
          connect: {
            addressId: createOrderDto.addressId
          }
        },
        orderDate: new Date(createOrderDto.orderDate),
        orderStatus: "lookingForWalker",
        totalPrice: createOrderDto.totalPrice,
        shippingFee: createOrderDto.shippingFee,
        amount: createOrderDto.amount,
        transaction: {
          connect: {
            transactionId: transaction.transactionId
          }
        },
        admin: {
          connect: {
            adminId: 0 // default admin, will be updated when walker is assigned
          }
        },
        walker: {
          connect: {
            walkerId: 0 // default walker, will be updated when walker is assigned
        }
        }
      }
    });
    await this.prisma.orderItem.createMany({
      data: createOrderDto.orderItems.map(item => {
        return {
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          specialInstructions: item.specialInstructions,
          menuId: item.menuId,
          orderId: order.orderId,
          shopId: item.shopId,
          orderItemStatus: "lookingForWalker",
          orderItemDate: new Date(createOrderDto.orderDate),
          completedDate: null
        }
      })
    })
    for (const item of createOrderDto.orderItems) {
      const orderItem = await this.prisma.orderItem.findFirst({
        where: {
          orderId: order.orderId,
          menuId: item.menuId,
          // Add other fields to uniquely identify the created order item if necessary
        }
      });
      console.log(orderItem.menuId);
      if (orderItem) {
        await this.prisma.orderItemExtra.createMany({
          data: item.orderItemExtras.map(extra => ({
            optionItemId: extra.optionItemId,
            selected: extra.selected,
            orderItemId: orderItem.orderItemId // use the primary key of the created order item
          }))
        });
      }
    }
    return order;
  }

  getStatus(orderId: number) {
    return this.prisma.order.findUnique({
      where: {
        orderId: orderId
      }
    }).then(order => {
      return order.orderStatus;
    });
  }

  async cancleOrder(orderId: number) {
    const status = await this.getStatus(orderId);
    if (status === "lookingForWalker") {
      const order = await this.prisma.order.update({
        where: {
          orderId: orderId
        },
        data: {
          orderStatus: "canceled"
        }
      });
      await this.prisma.orderItem.updateMany({
        where: {
          orderId: orderId
        },
        data: {
          orderItemStatus: "canceled"
      }});
      return `Update a #${orderId} order status to canceled`;
    }
    else if (status === "canceled") return "Order is already canceled";
    else return "Order cannot be canceled";
  }

  getWalker(orderId: number) {
    return this.prisma.order.findUnique({
      where: {
        orderId: orderId
      }
    }).then(order => {
      return order.walkerId;
    });
  }
}
