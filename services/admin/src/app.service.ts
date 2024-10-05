import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AdminLoginDto, CreateAdminDto } from './dto/admin.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { maxHeaderSize } from 'http';

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

  async selectChat(msg: any): Promise<any> {
    try {
      // Find the admin based on the provided authId
      const admin = await this.prisma.admin.findUnique({
        where: {
          authId: msg.authId,
        },
        select: {
          adminId: true,
        },
      });
  
      if (!admin) {
        throw new RpcException({
          statusCode: 404,
          message: `Admin with authId: ${msg.authId} not found`,
        });
      }

      const updatedChats = await this.prisma.chat.updateMany({
        where: {
          orderId: Number(msg.orderId),
          adminId: 0,
        },
        data: {
          adminId: admin.adminId,
        },
      });
  
      return {
        statusCode: 200,
        message: `Updated ${updatedChats.count} chats with new adminId: ${admin.adminId} for orderId: ${msg.orderId}`,
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: `Failed to update adminId for chats with orderId: ${msg.orderId}. Error: ${error.message}`,
      });
    }
  }
  
  
  async getChat(msg: any): Promise<any> {
    try {
      // Find the admin based on the provided authId
      const admin = await this.prisma.admin.findUnique({
        where: {
          authId: msg.authId,
        },
        select: {
          adminId: true,
        },
      });
  
      if (!admin) {
        throw new RpcException({
          statusCode: 404,
          message: `Admin with authId: ${msg.authId} not found`,
        });
      }
  
      // Fetch chats based on the adminId or adminId = 0
      const chats = await this.prisma.chat.findMany({
        where: {
          OR: [
            { adminId: 0 },
            { adminId: admin.adminId },
          ],
        },
        select: {
          orderId: true,
          senderRole: true,
          walkerId: true,
          requesterId: true,
        },
      });
  
      // Group chats by roles and ensure unique orderIds
      const groupedChats = chats.reduce((acc, chat) => {
        // Create a set to track unique orderIds for each role
        if (!acc[chat.senderRole]) {
          acc[chat.senderRole] = { chats: [], orderIds: new Set<number>() };
        }
  
        // Check if the orderId is already added for the current role
        if (!acc[chat.senderRole].orderIds.has(chat.orderId)) {
          // Add the unique chat object to the respective role's chat list
          const uniqueChat = { orderId: chat.orderId };
          if (chat.senderRole === 'requester') uniqueChat['requesterId'] = chat.requesterId;
          if (chat.senderRole === 'walker') uniqueChat['walkerId'] = chat.walkerId;
  
          acc[chat.senderRole].chats.push(uniqueChat);
          acc[chat.senderRole].orderIds.add(chat.orderId); // Track the added orderId
        }
  
        return acc;
      }, {} as Record<string, { chats: Array<{ orderId: number; requesterId?: number; walkerId?: number }>, orderIds: Set<number> }>);
  
      // Convert groupedChats into the desired format without orderId tracking sets
      const formattedGroupedChats = Object.keys(groupedChats).reduce((formattedAcc, role) => {
        formattedAcc[role] = groupedChats[role].chats;
        return formattedAcc;
      }, {} as Record<string, Array<{ orderId: number; requesterId?: number; walkerId?: number }>>);
  
      return formattedGroupedChats;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: `Failed to retrieve distinct order IDs: ${error.message}`,
      });
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
