import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getWalkerId(authId: string) {
    try {
      const walker = await this.prisma.walker.findUnique({
        where: {
          authId: authId,
        },
      });

      if (!walker) {
        throw new RpcException({ statusCode: 404, message: 'Walker not found' });
      }

      return walker.walkerId;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get walker ID: ${error.message}` });
    }
  }

  async walkerRegistration(msg: any): Promise<any> {
    try {
      const walker = await this.prisma.walker.findUnique({
        where: {
          authId: msg.authId,
        },
        select: {
          walkerId: true,
        },
      });

      if (walker) {
        throw new RpcException({ statusCode: 400, message: 'Walker found' });
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
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Walker registration failed: ${error.message}` });
    }
  }

  async updateWalkerProfile(msg: any): Promise<any> {
    try {
      const walker = await this.prisma.walker.findUnique({
        where: {
          authId: msg.authId,
        },
        select: {
          walkerId: true,
        },
      });

      if (!walker) {
        throw new RpcException({ statusCode: 404, message: 'Walker not found' });
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
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to update walker profile: ${error.message}` });
    }
  }

  async walkerGet(msg: any): Promise<any> {
    try {

      const walker = await this.prisma.walker.findUnique({
        where: {
          authId: msg.authId,
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
        },
      });

      return walker;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get walker: ${error.message}` });
    }
  }

  async orderHistory(msg: any): Promise<any> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          walker: {
            authId: msg.authId,
          },
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
              longitude: true,
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

      return orders;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get order history: ${error.message}` });
    }
  }

  async getOrderList(msg: any): Promise<any> {
    try {
      const orders = await this.prisma.order.findMany({
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

      return orders;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get order list: ${error.message}` });
    }
  }

  async getOrderDetail(msg: any): Promise<any> {
    try {
      const order = await this.prisma.order.findUnique({
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
          requester: {
            select: {
              username: true,
              phoneNumber: true,
            },
          },
          orderItem: {
            select: {
              orderItemId: true,
              quantity: true,
              totalPrice: true,
              specialInstructions: true,
              orderItemStatus: true,
              orderItemDate: true,
              completedDate: true,
              Photo: {
                select: {
                  photoId: true,
                  photoPath: true,
                  photoType: true,
                },
              },
              shopId: true,
              menu: {
                select: {
                  menuId: true,
                  name: true,
                  price: true,
                  shop: {
                    select: {
                      shopName: true, // Include shopName here
                    },
                  },
                },
              },
              orderItemExtra: {
                where: {
                  selected: true,
                },
                select: {
                  OrderItemExtraId: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });
  
      if (!order) {
        throw new RpcException({ statusCode: 404, message: `Order not found for ID ${msg.orderId}` });
      }
  
      // Define the type for grouped items, including OrderItemExtra details
      type GroupedItem = {
        shopId: number;
        shopName: string;
        items: {
          orderItemId: number;
          quantity: number;
          totalPrice: number;
          specialInstructions: string | null;
          orderItemStatus: string;
          orderItemDate: Date;
          completedDate: Date | null;
          photo: {
            photoId: number;
            photoPath: string;
            photoType: string | null;
          } | null;
          menu: {
            menuId: number;
            name: string;
            price: number;
          };
          extras: {
            OrderItemExtraId: number;
            optionItemName: string;
            optionItemPrice: number;
          }[];
        }[];
      };
  
      // Group order items by shop, including OrderItemExtra details
      const groupedItemsByShop = order.orderItem.reduce((grouped, item) => {
        const { shopId } = item;
        const shopName = item.menu.shop.shopName;
  
        if (!grouped[shopId]) {
          grouped[shopId] = {
            shopId,
            shopName,
            items: [],
          };
        }
  
        // Map OrderItemExtras to the format you want
        const extras = item.orderItemExtra.map(extra => ({
          OrderItemExtraId: extra.OrderItemExtraId,
          optionItemName: extra.name,
          optionItemPrice: extra.price,
        }));
  
        grouped[shopId].items.push({
          orderItemId: item.orderItemId, // Include orderItemId here
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          specialInstructions: item.specialInstructions,
          orderItemStatus: item.orderItemStatus,
          orderItemDate: item.orderItemDate,
          completedDate: item.completedDate,
          photo: item.Photo ? {
            photoId: item.Photo.photoId,
            photoPath: item.Photo.photoPath,
            photoType: item.Photo.photoType,
          } : null,
          menu: {
            menuId: item.menu.menuId,
            name: item.menu.name,
            price: item.menu.price,
          },
          extras, // Add OrderItemExtra details here
        });
  
        return grouped;
      }, {} as { [shopId: number]: GroupedItem });
  
      // Convert groupedItemsByShop to an array format if needed
      const formattedGroupedItems = Object.values(groupedItemsByShop).map((shop) => ({
        shopId: shop.shopId,
        shopName: shop.shopName,
        items: shop.items,
      }));
  
      // Format the result to include grouped items
      const formattedOrder = {
        orderId: order.orderId,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        amount: order.amount,
        totalPrice: order.totalPrice,
        shippingFee: order.shippingFee,
        address: order.address,
        canteen: order.canteen,
        requester: order.requester,
        groupedOrderItemsByShop: formattedGroupedItems,
      };
  
      return formattedOrder;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get order detail: ${error.message}` });
    }
  }
  

  async confirmOrderItem(msg: any): Promise<any> {
    try {
      // Create the photo entry, specifying that it is for an order
      const photo = await this.prisma.photo.create({
        data: {
          photoPath: msg.photoPath,
          orderItemId: Number(msg.orderItemId),
          photoType: 'orderItem',
        },
      });
  
      // Update the order status to 'completed' and link the photo
      const orderItem = await this.prisma.orderItem.update({
        where: {
          orderItemId: Number(msg.orderItemId),
        },
        data: {
          orderItemStatus: 'completed',
          completedDate: new Date(),
          photoId: photo.photoId,
        },
        select: {
          orderItemId: true,
          orderItemStatus: true,
        },
      });
  
      return orderItem;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to confirm order: ${error.message}` });
    }
  }

  async confirmOrder(msg: any): Promise<any> {
    try {
      // Create the photo entry, specifying that it is for an order
      // console.log(Number(msg.orderId))
      const photo = await this.prisma.photo.create({
        data: {
          photoPath: msg.photoPath,
          orderId: Number(msg.orderId),
          photoType: 'order',
        }
      });
  
      // Update the order status to 'completed' and link the photo
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
          orderStatus: true,
        },
      });
  
      return order;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to confirm order: ${error.message}` });
    }
  }

  async postReport(msg: any): Promise<any> {
    try {
      const existingReport = await this.prisma.report.findMany({
        where: {
          orderId: msg.orderId,
          reportBy: 'walker',
        },
      });

      if (existingReport.length > 0) {
        throw new RpcException({ statusCode: 400, message: 'Report already exists' });
      }

      const order = await this.prisma.order.findUnique({
        where: {
          orderId: Number(msg.orderId),
        },
      });

      if (!order) {
        throw new RpcException({ statusCode: 404, message: 'Order not found' });
      }

      if (order.orderStatus !== 'completed') {
        throw new RpcException({ statusCode: 400, message: 'Order not completed yet' });
      }

      const reportDate = new Date();
      const orderDate = new Date(order.orderDate);
      const validDate = new Date(order.orderDate);
      validDate.setDate(validDate.getDate() + 3);

      const isInRange = reportDate >= orderDate && reportDate <= validDate;

      if (!isInRange) {
        throw new RpcException({ statusCode: 400, message: 'Report date is not in range' });
      }

      const newReport = await this.prisma.report.create({
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

      return newReport;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to post report: ${error.message}` });
    }
  }

  async getWalkerIdByOrder(msg: any): Promise<any> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { orderId: Number(msg.orderId) },
        select: { walkerId: true },
      });

      if (!order) {
        throw new RpcException({ statusCode: 404, message: 'Order not found' });
      }

      return { walkerId: order.walkerId };
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get requester ID: ${error.message}` });
    }
  }

  async getRequesterIdByOrder(msg: any): Promise<any> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { orderId: Number(msg.orderId) },
        select: { requesterId: true },
      });

      if (!order) {
        throw new RpcException({ statusCode: 404, message: 'Order not found' });
      }

      return { requesterId: order.requesterId };
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get requester ID: ${error.message}` });
    }
  }

  async updateOrderStatus(msg: any): Promise<any> {
    try {
      const order = await this.prisma.order.update({
        where: {
          orderId: Number(msg.orderId),
        },
        data: {
          orderStatus: msg.orderStatus,
        },
      });

      return order;
    } catch (error) {
      throw new RpcException({ statusCode: 404, message: `Failed to update order status: ${error.message}` });
    }
  }

}
