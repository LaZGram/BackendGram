import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CanteenService {
  constructor(private prisma: PrismaService, @Inject('ADMIN_CANTEEN') private client: ClientKafka) {}

  getCanteen() {
    return this.prisma.canteen.findMany();
  }

  getShopInCanteen(canteenId: number) {
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
  }

  async getShopMenu(shopId: number) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        shopId: shopId
      }
    }).then(shop => {
      return shop.authId;
    });
    const result = this.client.send('getMenu', {authId: shop});
    const value = await lastValueFrom(result);
    return value;
  }

  async getShopOrderHistory(shopId: number) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        shopId: shopId
      }
    }).then(shop => {
      return shop.authId;
    });
    const result = this.client.send('getShopOrderHistory', {authId: shop});
    const value = await lastValueFrom(result);
    return value;
  }

  async getShopInfo(shopId: number) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        shopId: shopId
      }
    }).then(shop => {
      return shop.authId;
    });
    const result = this.client.send('getShopInfo', {authId: shop});
    const value = await lastValueFrom(result);
    return value;
  }
}
