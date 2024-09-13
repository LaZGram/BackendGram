import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async walkerRegistration(msg: any): Promise<any> {

    let walker = await this.prisma.walker.findUnique({
      where: {
        authId: msg.authId,
      },
      select: {
        walkerId: true,
      },
    });

    if (walker) {
      throw new Error('Walker found');
    }

    const updatedWalker = await this.prisma.walker.create({
      data: {
        authId: msg.authId,
        username: msg.username,
        email: msg.email,
        phoneNumber: msg.phoneNumber,
        profilePicture: msg.profilePicture,
        bankAccountName: msg.bankAccountName,
        bankAccountNo: msg.bankAccountNo,
        registerAt: new Date(),
        status: false,
      },
    });
  
    return updatedWalker;
  }

  async updateWalkerProfile(msg: any): Promise<any> {
    const walker = await this.prisma.walker.findUnique({
      where: {
        authId: msg.authId,
      },
      select: {
        walkerId: true,
      },
    });
  
    if (!walker) {
      throw new Error('Walker not found');
    }
  
    const updatedWalker = await this.prisma.walker.update({
      where: {
        authId: msg.authId,
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
  
    return updatedWalker;
  }

  walkerGet(msg: any): Promise<any> {
    return this.prisma.walker.findMany({
      select: {
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        bankAccountName: true,
        bankAccountNo: true,
        status: true,
        registerAt: true,
      },
    });
  }

  getOrderList(msg: any): Promise<any> {
    return this.prisma.order.findMany({
      select: {
        orderId: true,
        amount: true,
        totalPrice: true,
        shippingFee: true,
        orderDate: true,
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
            latitude: true,
            longitude: true,
          },
        },
      },
    });
  }

  async getOrderDetail(msg: any): Promise<any> {
    return this.prisma.order.findUnique({
      where: {
        orderId: Number(msg.orderId),
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
          connect: { orderId: Number(msg.orderId) },
        },
      },
    });

    const order = await this.prisma.order.update({
      where: {
        orderId: Number(msg.orderId),
      },
      data: {
        orderStatus: 'completed',
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

  async getRequesterIdByOrder(msg: any): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: { orderId: Number(msg.orderId) },
      select: { requesterId: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return { requesterId: order.requesterId };
  }

  async updateOrderStatus(msg: any): Promise<any> {
    const order = await this.prisma.order.update({
      where: {
        orderId: Number(msg.orderId),
      },
      data: {
        orderStatus: msg.status,
      },
    });

    return order;
  }
  
}
