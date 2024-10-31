import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CanteenService {
  constructor(private prisma: PrismaService, @Inject('ADMIN_CANTEEN') private client: ClientKafka) {}

  getCanteen() {
    return this.prisma.canteen.findMany();
  }

  getShopInCanteen(canteenId: number) {
    try {
      const canteen = this.prisma.canteen.findUnique({
        where: {
          canteenId: canteenId
        }
      });
      if (!canteen) throw new RpcException({ statusCode: 404, message: 'Canteen not found' });
      return this.prisma.shop.findMany({
        where: {
          canteenId: canteenId
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
      });
    } catch (error) {
      throw error;
    }
  }

  async getShopMenu(shopId: number) {
    try {
      const shop = await this.prisma.shop.findUnique({
        where: {
          shopId: shopId
        }
      });
      if (!shop) throw new RpcException({ statusCode: 404, message: 'Shop not found' });
      const result = this.client.send('getMenu', {authId: shop});
      const value = await lastValueFrom(result);
      return value;
    } catch (error) {
      throw error;
    }
  }

  async getShopOrderHistory(shopId: number) {
    try {
      const shop = await this.prisma.shop.findUnique({
        where: {
          shopId: shopId
        }
      });
      if (!shop) throw new RpcException({ statusCode: 404, message: 'Shop not found' });
      const canteenId = (await this.prisma.shop.findUnique({ where: { shopId: shopId } })).canteenId;
      return this.prisma.order.findMany({
        where: {
          canteenId: canteenId,
          orderStatus: "completed",
        },
        select: {
          orderId: true,
          orderDate: true,
          orderStatus: true,
          orderItem: {
            where: {
              shopId: shopId
            },
            select: {
              orderItemId: true,
              quantity: true,
              totalPrice: true,
              specialInstructions: true,
              menu: {
                select: {
                  name: true,
                  price: true,
                }
              },
              orderItemExtra: {
                where: {
                  selected: true
                },
                select: {
                  optionItem: {
                    select: {
                      name: true,
                      price: true
                    }
                  }
                }
              }
            },
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getShopInfo(shopId: number) {
    try {
      const shop = await this.prisma.shop.findUnique({
        where: {
          shopId: shopId
        }
      });
      if (!shop) throw new RpcException({ statusCode: 404, message: 'Shop not found' });
      const result = await this.client.send('getShopInfo', {authId: shop.authId});
      const value = await lastValueFrom(result);
      console.log(value);
      return value;
    } catch (error) {
      throw error;
    }
  }
}
