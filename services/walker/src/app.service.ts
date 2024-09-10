import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async walkerRegistration(msg: any): Promise<any> {
    let walkerId = this.prisma.walker.findUnique({
      where: {
        authId: msg.jwt.authId
      },
      select: {
        walkerId: true
      }
    })["walkerId"]
    const walker = await this.prisma.walker.update({
      where: {
        walkerId,
      },
      data: {
        username: msg.username,
        email: msg.email,
        phoneNumber: msg.phoneNumber,
        profilePicture: msg.profilePicture,
        bankAccountName: msg.bankAccountName,
        bankAccountNo: msg.bankAccountNo,
      },
    });
    return walker;
  }

  walkerGet(msg: any): Promise<any> {
    let walkerId = this.prisma.walker.findUnique({
      where: {
        authId: msg.jwt.authId
      },
      select: {
        walkerId: true
      }
    })["walkerId"]
    return this.prisma.walker.findUnique({
      where: {
        walkerId,
      },
      select: {
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        bankAccountName: true,
        bankAccountNo: true,
        order: {
          select: {
            orderId: true,
            orderDate: true,
            orderStatus: true,
            amount: true,
          },
        },
      },
    });
  }

  getOrderList(msg: any): Promise<any> {
    let walkerId = this.prisma.walker.findUnique({
      where: {
        authId: msg.jwt.authId
      },
      select: {
        walkerId: true
      }
    })["walkerId"]
    return this.prisma.order.findMany({
      where: {
        walkerId
      },
      select: {
        orderId: true,
        amount: true,
        totalPrice: true,
        shippingFee: true,
        orderStatus: true,
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
        canteen: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getOrderDetail(msg: any): Promise<any> {
    return this.prisma.order.findUnique({
      where: {
        orderId: msg.orderId,
      },
      select: {
        orderId: true,
        orderDate: true,
        orderStatus: true,
        amount: true,
        totalPrice: true,
        shippingFee: true,
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
        canteen: {
          select: {
            name: true,
            latitude: true,
            longitude: true,
          },
        },
        walker: {
          select: {
            username: true,
            phoneNumber: true,
          },
        },
        orderItem: {
          select: {
            quantity: true,
            specialInstructions: true,
            menu: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async confirmOrder(msg: any): Promise<any> {
    const photo = await this.prisma.photo.create({
      data: {
        photoPath: msg.photoPath,
        order: {
          connect: { orderId: msg.orderId },
        },
      },
    });

    const order = await this.prisma.order.update({
      where: {
        orderId: msg.orderId,
      },
      data: {
        orderStatus: 'Confirmed',
        confirmedAt: new Date(),
        photoId: photo.photoId,
      },
    });

    return order;
  }

  async postReport(msg: any): Promise<any> {
    const report = await this.prisma.report.create({
      data: {
        reportDate: new Date(msg.reportDate),
        title: msg.title,
        description: msg.description,
        status: msg.status,
        requester: {
          connect: {
            requesterId: msg.requesterId,
          },
        },
        walker: {
          connect: {
            walkerId: msg.walkerId,
          },
        },
        order: {
          connect: {
            orderId: msg.orderId,
          },
        },
        admin: {
          connect: {
            adminId: msg.adminId,
          },
        },
      },
    });
  
    return report;
  }

  async getRequesterIdByOrder(orderId: string): Promise<{ requesterId: number }> {
    const order = await this.prisma.order.findUnique({
      where: { orderId: Number(orderId) },
      select: { requesterId: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return { requesterId: order.requesterId };
  }
  
}
