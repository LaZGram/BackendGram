import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private appService: AppService) { }

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
    for (let i = 0; i < orderItems.length; i++) {
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
        }
      });
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
      return this.prisma.walker.findUnique({
        where: {
          walkerId: order.walkerId
        }
      }).then(walker => {
        return walker;
      });
    });
  }

  async getOrders(authId: string) {
    try {
      return this.prisma.order.findMany({
        where: {
          requester: {
            requesterId: await this.appService.getRequesterId(authId)
          },
        },
        include:{
            canteen: {}
          },
      });
    }
    catch (e) {
      throw new RpcException({ statusCode: 404, message: "Order not found" + e });
    }
  }

  async getOrder(orderId: number) {
    try {
      return this.prisma.order.findUnique({
        where: {
          orderId: orderId
        }
      });
    }
    catch (e) {
      throw new RpcException({ statusCode: 404, message: "Order not found" });
    }
  }

  async getOrderInfo(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: Number(orderId),
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
              specialInstructions: true,
              orderItemStatus: true, // Include orderItemStatus here
              menu: {
                select: {
                  name: true,
                  price: true,
                  shop: {
                    select: {
                      shopName: true,
                      shopId: true, // Include shopId to distinguish shops
                    },
                  },
                },
              },
            },
          },
        },
      });
  
      if (!order) {
        throw new RpcException({ statusCode: 404, message: `Order not found for ID ${orderId}` });
      }
  
      // Group order items by shop only
      const groupedItemsByShop = order.orderItem.reduce((grouped, item) => {
        const { shopName, shopId } = item.menu.shop;
        if (!grouped[shopId]) {
          grouped[shopId] = {
            shopName,
            items: [],
          };
        }
  
        grouped[shopId].items.push({
          orderItemId: item.orderItemId,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions,
          menuName: item.menu.name,
          price: item.menu.price,
          orderItemStatus: item.orderItemStatus, // Add orderItemStatus to the result
        });
  
        return grouped;
      }, {} as { [shopId: string]: { shopName: string; items: any[] } });
  
      // Convert groupedItemsByShop to an array format if needed
      const formattedGroupedItems = Object.values(groupedItemsByShop).map((shop) => ({
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
        groupedOrderItemsByShop: formattedGroupedItems, // Add the grouped order items in the desired format
      };
  
      return formattedOrder;
    } catch (error) {
      throw new RpcException({ statusCode: 500, message: `Failed to get order detail: ${error.message}` });
    }
  }
}
