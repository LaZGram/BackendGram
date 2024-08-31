import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { EditMenuDto } from './dto/edit-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  createMenu(msg: CreateMenuDto): any {
    return this.prisma.menu.create({
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
        status: true,
        shop: { connect: { shopId: msg.shopId } },
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

  getMenu(shopId: number): any {
    return this.prisma.menu.findMany({ where: { shopId: shopId } });
  }
}
