import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getWalkerId(authId: string){
    return this.prisma.walker.findUnique({
      where: {
        authId: authId
      }
    }).then(walker => {
      return walker.walkerId;
    });
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
        verifyAt: null,
        status: 'waitingVerify',
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

    const updateData: any = {};
    
    if (msg.username !== undefined) updateData.username = msg.username;
    if (msg.email !== undefined) updateData.email = msg.email;
    if (msg.phoneNumber !== undefined) updateData.phoneNumber = msg.phoneNumber;
    if (msg.profilePicture !== undefined) updateData.profilePicture = msg.profilePicture;
    if (msg.bankAccountName !== undefined) updateData.bankAccountName = msg.bankAccountName;
    if (msg.bankAccountNo !== undefined) updateData.bankAccountNo = msg.bankAccountNo;
    if (msg.status !== undefined) updateData.status = msg.status;

    const updatedWalker = await this.prisma.walker.update({
        where: {
            authId: msg.authId,
        },
        data: updateData,
    });

    return updatedWalker;
  }

  async walkerGet(msg: any): Promise<any> {
    return this.prisma.walker.findUnique({
      where: {
        authId: msg.authId,
      },
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

  async orderHistory(msg: any): Promise<any> {
    return this.prisma.order.findMany({
      where: {
        walker: {
          authId: msg.authId
        }
      },
      select: {
        orderId: true,
        orderDate: true,
        orderStatus: true,
        totalPrice: true,
        shippingFee: true,
        amount: true,
        confirmedAt: true,
        canteen: {
          select: {
            name: true,
            latitude: true,
            longitude: true
          }
        },
        requester: {
          select: {
            username: true,
            phoneNumber: true
          }
        },
        orderItem: {
          select: {
            quantity: true,
            specialInstructions: true,
            menu: {
              select: {
                name: true,
                price: true,
                shop: {
                  select: {
                    shopName: true,
                  },
                },
              },
            },
          },
        },
      }
    });
  }
  

  async getOrderList(msg: any): Promise<any> {
    return this.prisma.order.findMany({
      where: {
        orderStatus: msg.orderStatus,
      },
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
                shop: {
                  select: {
                    shopName: true,
                  },
                },
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
      select: {
        orderId: true,
        orderStatus: true
      }
    });

    return order;
  }

  async postReport(msg: any): Promise<any> {
    // Check if a report already exists for the given orderId and reportBy walker
    const existingReport = await this.prisma.report.findMany({
      where: {
        orderId: msg.orderId,
        reportBy: 'walker',
      },
    });
  
    if (existingReport.length > 0) {
      throw new RpcException({ statusCode: 400, message: 'Report already exists' });
    }
  
    // Find the order based on the provided orderId
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: Number(msg.orderId),
      },
    });
  
    if (!order) {
      throw new RpcException({ statusCode: 404, message: 'Order not found' });
    }
  
    // Ensure the order has been completed
    if (order.orderStatus !== 'completed') {
      throw new RpcException({ statusCode: 400, message: 'Order not completed yet' });
    }
  
    // Validate report date range (within 3 days of order date)
    const reportDate = new Date();
    const orderDate = new Date(order.orderDate);
    const validDate = new Date(order.orderDate);
    validDate.setDate(validDate.getDate() + 3);
  
    console.log(reportDate, orderDate, validDate);
  
    const isInRange = reportDate >= orderDate && reportDate <= validDate;
  
    if (!isInRange) {
      throw new RpcException({ statusCode: 400, message: 'Report date is not in range' });
    }
  
    // Create the report with the required requester field
    return this.prisma.report.create({
      data: {
        reportDate: reportDate,
        title: msg.title,
        description: msg.description,
        status: 'pending',
        walker: {
          connect: {
            walkerId: order.walkerId,
          },
        },
        admin: {
          connect: {
            adminId: order.adminId,
          },
        },
        order: {
          connect: {
            orderId: Number(msg.orderId),
          },
        },
        requester: {
          connect: {
            requesterId: order.requesterId,
          },
        },
        reportBy: 'walker',
      },
    });
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
        orderStatus: msg.orderStatus,
      },
    });

    return order;
  }
  
}
