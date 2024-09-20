import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { EditMenuDto } from './dto/edit-menu.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}
  async createMenu(msg: CreateMenuDto) {
    const menu = await this.prisma.menu.create({
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
        status: true,
        shop: { connect: { shopId: await this.appservice.getShopId(msg.authId) } },
      },
    });
    msg.option.forEach(async op => {
      const option = await this.prisma.option.create({
        data: {
          menuId: menu.menuId,
          name: op.name,
          mustChoose: op.mustChoose,
          maxChoose: op.maxChoose,
          minChoose: op.minChoose,
        },
      });
      await this.prisma.optionItem.createMany({
        data: op.optionItems.map(optionItem => {
          return {
            optionId: option.optionId,
            name: optionItem.name,
            price: optionItem.price,
          };
        }),
      });
    });
    return menu;
  }

  editMenu(msg: EditMenuDto): any {
    return this.prisma.menu.update({
      where: { menuId: msg.menuId },
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
        status: msg.status,
      },
    });
  }

  deleteMenu(id: number): any {
    return this.prisma.menu.delete({ where: { menuId: id } });
  }

  getMenuInfo(id: number): any {
    return this.prisma.menu.findUnique({ 
      where: { menuId: id }, 
      select: {
        menuId: true,
        name: true,
        price: true,
        picture: true,
        description: true,
        status: true,
        option: {
          select: {
            name: true,
            mustChoose: true,
            maxChoose: true,
            minChoose: true,
            optionItem: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      }
    });
  }

  async getMenu(authId: string){
    return (await this.prisma.menu.findMany({ where: { shopId: await this.appservice.getShopId(authId) } })).sort((a, b) => a.menuId - b.menuId);
  }
}
