import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Test1, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
