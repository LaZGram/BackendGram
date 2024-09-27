import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateCanteenDto, CreateShopDto, SearchShopDto } from './dto/';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';
import { UpdateShopStatusDto } from './dto/update-shop-status.dto';
import { ShopLoginDto } from './dto/shop-login.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  saltOrRounds: number = 10;

  getShopId(authId: string){
    return this.prisma.shop.findUnique({
      where:{
        authId: authId
      }
    }).then(shop => {
      return shop.shopId;
    })
  }

  async createCanteen(msg: CreateCanteenDto){
    return this.prisma.canteen.create({
      data: {
        name: msg.name,
        latitude: msg.latitude,
        longitude: msg.longitude,
      }
    })
  }

  async createShop(msg: CreateShopDto){
    await this.prisma.authorization.create({
      data: {
        authId: msg.authId,
        tokenId: msg.authId
      }
    })
    const hashPassword = bcrypt.hashSync(msg.password, this.saltOrRounds);
    return this.prisma.shop.create({
      data: {
        authorization: {connect: {authId : msg.authId}},
        registerAt: new Date(),
        username: msg.username,
        password: hashPassword,
        shopName: msg.shopName,
        profilePicture: msg.profilePicture,
        tel: msg.tel,
        shopNumber: msg.shopNumber,
        status: false,
        canteen: {connect: {canteenId: msg.canteenId}}
      }
    })
  }

  async loginShop(msg: ShopLoginDto){
    const shop = await this.prisma.shop.findUnique({
      where: {
        username: msg.username
      }
    })
    if(shop){
      const isPasswordMatch = bcrypt.compareSync(msg.password, shop.password);
      if(isPasswordMatch){
        return JSON.stringify({ authId: shop.authId });
      }
    }
    throw new RpcException({ statusCode: 401, message: 'Invalid username or password' });
  }

  async updateShopInfo(msg: UpdateShopInfoDto){
    return this.prisma.shop.update({
      where: {
        authId: msg.authId
      },
      data: {
        shopName: msg.shopName,
        profilePicture: msg.profilePicture,
        tel: msg.tel,
        shopNumber: msg.shopNumber
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

  getShopInfo(authId: string){
    return this.prisma.shop.findUnique({
      where: {
        authId: authId
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

  updateShopStatus(msg: UpdateShopStatusDto){
    return this.prisma.shop.update({
      where: {
        authId: msg.authId
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

  searchShop(msg: SearchShopDto): any{
    if(!msg.shopname){
      msg.shopname = '';
    }
    return this.prisma.shop.findMany({
      where: {
        shopName: {
          contains: msg.shopname
        },
        canteenId: {
          equals: msg.canteenId
        }
      },
      select: {
        shopId: true,
        shopName: true,
        profilePicture: true,
        status: true,
      }
    })
  }
}
