import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
