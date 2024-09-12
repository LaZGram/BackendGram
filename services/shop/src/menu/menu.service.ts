import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { EditMenuDto } from './dto/edit-menu.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}
  async createMenu(msg: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
        status: true,
        shop: { connect: { shopId: await this.appservice.getShopId(msg.authId) } },
      },
    });
  }

  editMenu(msg: EditMenuDto): any {
    return this.prisma.menu.update({
      where: { menuId: msg.menuId },
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
      },
    });
  }

  deleteMenu(id: number): any {
    return this.prisma.menu.delete({ where: { menuId: id } });
  }

  getMenuInfo(id: number): any {
    return this.prisma.menu.findUnique({ where: { menuId: id } });
  }

  async getMenu(authId: string){
    return this.prisma.menu.findMany({ where: { shopId: await this.appservice.getShopId(authId) } });
  }
}
