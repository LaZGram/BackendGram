import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SearchOrderDto } from './dto/search-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateShopStatusDto } from './dto/update-shop.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getToDayOrder() {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    return this.prisma.order.findMany({
      where:{
        orderDate: {
          gte: startOfToday,  // Greater than or equal to start of today
          lte: endOfToday,    // Less than or equal to end of today
        },
      },
    })
  }

  async getOrderInfo(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: orderId
        },
        select: {
          orderId: true,
          orderDate: true,
          orderStatus: true,
          totalPrice: true,
          shippingFee: true,
          amount: true,
          confirmedAt: true,
          requester: {
            select: {
              requesterId: true,
              phoneNumber: true
            }
          },
          walker: {
            select: {
              walkerId: true,
              phoneNumber: true
            }
          },
          Photo: {
            select: {
              photoId: true,
              photoPath: true,
              photoType: true,
            }
          },
          canteen: {
            select: {
              canteenId: true,
              name: true,
            }
          },
          address: {
            select: {
              addressId: true,
              name: true,
              detail: true,
              note: true,
              latitude: true,
              longitude: true
            }
          },
          orderItem:{
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
                }
              },
              shopId: true,
              menu:{
                select: {
                  menuId: true,
                  name: true,
                  price: true,
                }
              },
              orderItemExtra: {
                where: {
                  selected: true
                },
                select: {
                  OrderItemExtraId: true,
                  optionItem: {
                    select: {
                      optionItemId: true,
                      name: true,
                      price: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      if(!order) {
        throw new RpcException({ statusCode: 404, message: 'Order not found' });
      }
      return order;
    } catch (error) {
      throw error;
    }
  }

  searchOrder(msg: SearchOrderDto) {
    let id = []
    for (const key in msg) {
      if(msg[key]) {
        id.push({[key]: parseInt(msg[key].toString())});
      }
    }
    return this.prisma.order.findMany({
      where: {
        AND: id
      }
    });
  }

  async updateMenuStatus(menuId: number) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { menuId: menuId },
    });
    if (!menuExists) {
      throw new RpcException({statusCode: 404, message: `Menu with id ${menuId} does not exist.`});
    }
    const status = await this.prisma.menu.findUnique({
      where: { menuId: menuId },
    }).then((menu) => { return !menu.status; });
    return this.prisma.menu.update({
      where: { menuId: menuId },
      data: { status: status },
    });
  }

  async updateShopStatus(msg: any){
    return this.prisma.shop.update({
      where: {
        shopId: msg.shopId
      },
      data: {
        status: msg.status
      },
      select: {
        shopId: true,
        username: true,
        shopName: true,
        profilePicture: true,
        tel: true,
        shopNumber: true,
        status: true,
        canteenId: true
      }
    })
  }

  async filterOrder(msg: FilterOrderDto) {
    let filter = {}
    let sort = '';
    for (const key in msg) {
      switch (key) {
        case 'orderDate':
          const date = new Date(msg[key]);
          filter[key] = {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lte: new Date(date.setHours(23, 59, 59, 999))
          }
          break;
        case 'canteenId':
          filter[key] = parseInt(msg[key].toString());
          break;
        case 'shopId':
          filter['orderItem'] = {
            every: {
              shopId: parseInt(msg[key].toString())
            }
          };
          break;
        case 'orderStatus':
          filter[key] = msg[key];
          break;
        case 'sortPrice':
          sort = msg[key];
          break;
      }
    }
    const order = await this.prisma.order.findMany({
      where: filter
    });
    if(sort === 'asc') {
      return order.sort((a, b) => a.amount - b.amount);
    } 
    else if(sort === 'desc') {
      return order.sort((a, b) => b.amount - a.amount);
    } 
    else {
      return order;
    }
  }
}
