import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private prisma: PrismaService) {}
  createMenu(msg: any): any {
    return this.prisma.menu.create({
      data: {
        name: msg.name,
        picture: msg.picture,
        price: msg.price,
        description: msg.description,
      },
    });
  }
}
