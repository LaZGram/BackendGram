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

  async walkerAll(msg:any): Promise<any> {
    return this.prisma.walker.findMany({
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

  async denyWalker(msg: any): Promise<any> {
    return this.prisma.walker.update({
      where: {
        walkerId: msg.walkerId,
      },
      data: {
        status: 'inActive',
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
        createAt: true,
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
    const orders = await this.prisma.order.findMany({
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
        
        orderItem: {
          select: {
            shop: {
              select: {
                shopName: true,
              },
            },
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
  
    // Transform the output to remove the array structure in `orderItem`
    return orders.map(order => {
      return {
        ...order,
        shop: order.orderItem[0]?.shop || null, // Get the first shop object or null if it doesn't exist
      };
    }).map(({ orderItem, ...rest }) => rest); // Remove the original `orderItem` field
  }
  
  

  async selectChat(msg: any): Promise<any> {
    try {
      // Retrieve admin information
      const admin = await this.prisma.admin.findUnique({
        where: { authId: msg.authId },
        select: { adminId: true },
      });
  
      if (!admin) {
        throw new RpcException({
          statusCode: 404,
          message: `Admin with authId: ${msg.authId} not found.`,
        });
      }
  
      // Perform updates in a transaction to ensure consistency
      const [updatedChats, updatedOrder] = await this.prisma.$transaction([
        // Update adminId in the Chat table for the specified orderId and existing adminId = 0
        this.prisma.chat.updateMany({
          where: {
            orderId: Number(msg.orderId),
            adminId: 0, // Update only chats with adminId = 0 (unassigned)
          },
          data: { adminId: admin.adminId },
        }),
        
        // Update adminId in the Order table for the specified orderId
        this.prisma.order.update({
          where: {
            orderId: Number(msg.orderId),
          },
          data: { adminId: admin.adminId },
          select: { orderId: true, adminId: true, orderStatus: true },
        }),
      ]);
  
      // Return a success response with details of the updates
      return {
        statusCode: 200,
        message: `Updated ${updatedChats.count} chats and updated orderId: ${updatedOrder.orderId} with new adminId: ${admin.adminId}.`,
        updatedChats: updatedChats.count,
        updatedOrder,
      };
    } catch (error) {
      // Handle any errors during the update process
      throw new RpcException({
        statusCode: 500,
        message: `Failed to update adminId for chats and order with orderId: ${msg.orderId}. Error: ${error.message}`,
      });
    }
  }
  
  async getChat(msg: any): Promise<any> {
    try {
      // Retrieve admin information using the provided authId
      const admin = await this.prisma.admin.findUnique({
        where: { authId: msg.authId },
        select: { adminId: true },
      });
  
      if (!admin) {
        throw new RpcException({
          statusCode: 404,
          message: `Admin with authId: ${msg.authId} not found`,
        });
      }
  
      // Retrieve all relevant chats, either unassigned (adminId = 0) or assigned to the current admin
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
          adminId: true,
          order: {
            select: {
              orderStatus: true,  // Fetch the order status
              canteen: {
                select: {
                  shop: {
                    select: { shopId: true },  // Fetch the shop ID through Canteen
                  },
                },
              },
            },
          },
        },
      });
  
      // Filter out any chats where the senderRole is 'admin'
      const filteredChats = chats.filter(chat => chat.senderRole !== 'admin');
  
      // Group the filtered chats based on sender role (excluding 'admin')
      const groupedChats = filteredChats.reduce((acc, chat) => {
        if (!acc[chat.senderRole]) {
          acc[chat.senderRole] = { chats: [], orderIds: new Set<number>() };
        }
  
        if (!acc[chat.senderRole].orderIds.has(chat.orderId)) {
          const uniqueChat: any = {
            orderId: chat.orderId,
            orderStatus: chat.order.orderStatus,
            shopId: chat.order.canteen?.shop?.[0]?.shopId,
            adminId: chat.adminId,
          };
  
          if (chat.senderRole === 'requester') uniqueChat['requesterId'] = chat.requesterId;
          if (chat.senderRole === 'walker') uniqueChat['walkerId'] = chat.walkerId;
  
          acc[chat.senderRole].chats.push(uniqueChat);
          acc[chat.senderRole].orderIds.add(chat.orderId);
        }
  
        return acc;
      }, {} as Record<string, { chats: Array<{ orderId: number; requesterId?: number; walkerId?: number; shopId?: number; orderStatus: string }>, orderIds: Set<number> }>);
  
      // Format the grouped chats to return only necessary fields
      const formattedGroupedChats = Object.keys(groupedChats).reduce((formattedAcc, role) => {
        formattedAcc[role] = groupedChats[role].chats;
        return formattedAcc;
      }, {} as Record<string, Array<{ orderId: number; requesterId?: number; walkerId?: number; shopId?: number; orderStatus: string }>>);
  
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
