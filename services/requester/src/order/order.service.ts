import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appService: AppService) {}

  async create(createOrderDto: CreateOrderDto) {
    const date = new Date();
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
            requesterId: await this.appService.getRequesterId(createOrderDto.authId)
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
        orderDate: date,
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
          orderItemDate: date,
          completedDate: null
        }
      })
    })
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        orderId: order.orderId
      }
    });
    for(let i = 0; i < orderItems.length; i++) {
      await this.prisma.orderItemExtra.createMany({
        data: createOrderDto.orderItems[i].orderItemExtras.map(extra => {
          return {
            orderItemId: orderItems[i].orderItemId,
            optionItemId: extra.optionItemId,
            selected: extra.selected
          }
        })
      });
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
