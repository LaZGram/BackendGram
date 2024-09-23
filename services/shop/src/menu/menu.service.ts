import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { EditMenuDto } from './dto/edit-menu.dto';
import { AppService } from 'src/app.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService, private appservice: AppService) { }
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

  async editMenu(msg: EditMenuDto) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { menuId: msg.menuId },
    });
    if (!menuExists) {
      throw new RpcException({statusCode: 404, message: `Menu with id ${msg.menuId} does not exist.`});
    }
    await this.prisma.option.findMany({ where: { menuId: msg.menuId } }).then(async (option) => {
      await this.prisma.optionItem.deleteMany({ where: { optionId: { in: option.map(op => op.optionId) } } });
      await this.prisma.option.deleteMany({ where: { optionId: { in: option.map(op => op.optionId) } } });
    });
    for (const op of msg.option) {
      try {
        await this.prisma.option.create({
          data: {
            menuId: msg.menuId,
            name: op.name,
            mustChoose: op.mustChoose,
            maxChoose: op.maxChoose,
            minChoose: op.minChoose,
          },
        }).then(async (option) => {
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
      } catch (error) {
        throw new RpcException(error);
      }
    }
    const menu = await this.prisma.menu.update({
      where: { menuId: msg.menuId },
      data: {
        name: msg.name,
        price: msg.price,
        picture: msg.picture,
        description: msg.description,
        status: msg.status,
      },
    });
    return menu;
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

  async deleteMenu(id: number) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { menuId: id },
    });
    if (!menuExists) {
      throw new RpcException({statusCode: 404, message: `Menu with id ${id} does not exist.`});
    }
    const option = await this.prisma.option.findMany({ where: { menuId: id } });
    for (const op of option) {
      await this.prisma.optionItem.deleteMany({
        where: { optionId: op.optionId }
      });
    }
    await this.prisma.option.deleteMany({
      where: { optionId: { in: option.map(op => op.optionId) } }
    });
    return this.prisma.menu.delete({ where: { menuId: id } });
  }

  async getMenuInfo(id: number) {
    const menuExists = await this.prisma.menu.findUnique({
      where: { menuId: id },
    });
    if (!menuExists) {
      throw new RpcException({statusCode: 404, message: `Menu with id ${id} does not exist.`});
    }
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
            optionId: true,
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

  async getMenu(authId: string) {
    return (await this.prisma.menu.findMany({ where: { shopId: await this.appservice.getShopId(authId) } })).sort((a, b) => a.menuId - b.menuId);
  }
}
