import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // Fetch all walkers whose status is false (not verified yet)
  async walkerQueue(): Promise<any> {
    return this.prisma.walker.findMany({
      where: {
        status: false,
      },
      select: {
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        bankAccountName: true,
        bankAccountNo: true,
        registerAt: true,
        status: true,
      },
    });
  }

  // Update walker's status to true (verify walker)
  async verifyWalker(msg: any): Promise<any> {
    return this.prisma.walker.update({
      where: {
        authId: msg.authId,
      },
      data: {
        status: true,
        verifyAt: new Date(),
      },
      select: {
        walkerId: true,
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        registerAt: true,
        verifyAt: true, // Include verifyAt field to show when walker was verified
        status: true,
      },
    });
  }

  // Fetch all requesters
  async showRequester(): Promise<any> {
    return this.prisma.requester.findMany({
      select: {
        requesterId: true,
        username: true,
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        profilePicture: true,
        address: {
          select: {
            name: true,
            detail: true,
            note: true,
            latitude: true,
            longitude: true,
          },
        },
        debitCard: {
          select: {
            cardNumber: true,
            expiryDate: true,
          },
        },
      },
    });
  }

  // Fetch all verified walkers
  async showWalker(): Promise<any> {
    return this.prisma.walker.findMany({
      where: {
        status: true,
      },
      select: {
        walkerId: true,
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        bankAccountName: true,
        bankAccountNo: true,
        status: true,
        registerAt: true,
        verifyAt: true, // Include verification date
      },
    });
  }

  // Fetch all orders with associated address and canteen details
  async showOrder(): Promise<any> {
    return this.prisma.order.findMany({
      select: {
        orderId: true,
        amount: true,
        totalPrice: true,
        shippingFee: true,
        orderStatus: true,
        address: {
          select: {
            name: true, // Added address name for more details
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
        requester: {
          select: {
            username: true, // Show requester info
          },
        },
        walker: {
          select: {
            username: true, // Show walker info
          },
        },
      },
    });
  }

  // Approve or update the order status
  async postApproval(msg: any): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: msg.orderId,
      },
      select: {
        orderId: true,
        orderStatus: true,
      },
    });

    if (!order || order.orderStatus !== 'Waiting approval') {
      throw new Error('Order not found or status is not "Waiting approval".');
    }

    return this.prisma.order.update({
      where: {
        orderId: msg.orderId,
      },
      data: {
        orderStatus: msg.orderStatus,
        confirmedAt: new Date(), // Automatically set confirmedAt timestamp
      },
      select: {
        orderId: true,
        orderStatus: true,
        confirmedAt: true, // Include confirmation time
      },
    });
  }
}
