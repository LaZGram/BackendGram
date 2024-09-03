import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateCanteenDto, CreateShopDto, SearchShopDto } from './dto/';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  saltOrRounds: number = 10;

  async createCanteen(msg: CreateCanteenDto){
    return this.prisma.canteen.create({
      data: {
        name: msg.name,
        latitude: msg.latitude,
        longitude: msg.longitude,
      }
    })
  }

  createShop(msg: CreateShopDto): any{
    const hashPassword = bcrypt.hashSync(msg.password, this.saltOrRounds);
    return this.prisma.shop.create({
      data: {
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

  searchShop(msg: SearchShopDto): any{
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
