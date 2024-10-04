import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AdminLoginDto, CreateAdminDto } from './dto/admin.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(msg: CreateAdminDto){
    await this.prisma.authorization.create({
      data: {
        authId: msg.authId,
        tokenId: msg.authId
      }
    })
    return this.prisma.admin.create({
      data: {
        authorization: {connect: {authId : msg.authId}},
        registerAt: new Date(),
        username: msg.username,
        email: msg.email,
        password: msg.password,
        phoneNumber: msg.phoneNumber,
      }
    })
  }

  async loginAdmin(msg: AdminLoginDto){
    const admin = await this.prisma.admin.findUnique({
      where: {
        username: msg.username
      }
    })
    if(admin){
      const isPasswordMatch = (msg.password === admin.password);
      if(isPasswordMatch){
        return JSON.stringify({ authId: admin.authId });
      }
    }
    throw new RpcException({ statusCode: 401, message: 'Invalid username or password' });
  }

  async walkerQueue(): Promise<any> {
    return this.prisma.walker.findMany({
      where: {
        status: 'waitingVerify',
      },
      select: {
        walkerId: true,
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

  async deleteWalker(msg: any): Promise<any> {
    const walker = await this.prisma.walker.findUnique({
      where: {
        walkerId: msg.walkerId,
      },
      select: {
        walkerId: true,
        username: true,
        email: true,
      },
    });

    if (!walker) {
      throw new Error('Walker not found');
    }

    return this.prisma.walker.delete({
      where: {
        walkerId: msg.walkerId,
      },
      select: {
        walkerId: true,
        username: true,
        email: true,
      },
    });
  }

  async verifyWalker(msg: any): Promise<any> {
    return this.prisma.walker.update({
      where: {
        walkerId: msg.walkerId,
      },
      data: {
        status: 'Active',
        verifyAt: new Date(),
      },
      select: {
        walkerId: true,
        username: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        registerAt: true,
        verifyAt: true,
        status: true,
      },
    });
  }

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

  async showWalker(): Promise<any> {
    return this.prisma.walker.findMany({
      where: {
        status: 'Active',
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
        verifyAt: true,
      },
    });
  }

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
            name: true,
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
            username: true,
          },
        },
        walker: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getChat(msg: any): Promise<any> {
    try {
      // Retrieve all chats with only the orderId field
      const chats = await this.prisma.chat.findMany({
        select: {
          orderId: true, // Include only orderId in the result set
          senderRole: true,
          walkerId: true,
          requesterId: true,
          adminId: true,
        },
      });
  
      // Use a Set to filter out duplicate orderId values
      const distinctOrderIds = Array.from(new Set(chats.map(chat => chat.orderId)));
  
      // Map the distinct orderIds back to an array of objects
      const distinctChats = distinctOrderIds.map(orderId => ({ orderId }));
  
      return distinctChats;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to retrieve distinct order IDs: ${error.message}` });
    }
  }

  async postApproval(msg: any): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: parseInt(msg.orderId),
      },
      select: {
        orderId: true,
        orderStatus: true,
      },
    });

    if (!order ) {
      throw new Error('Order not found.');
    }

    return this.prisma.order.update({
      where: {
        orderId: parseInt(msg.orderId),
      },
      data: {
        orderStatus: msg.orderStatus,
        confirmedAt: new Date(),
      },
      select: {
        orderId: true,
        orderStatus: true,
        confirmedAt: true,
      },
    });
  }
}
