import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Test1, Prisma } from '@prisma/client';
import { HelloDto } from '../dtos/hello.dto';

@Injectable()
export class AppService {
  getHello(msg:HelloDto): string {
    console.log(msg.message);
    return msg.message;
  }
}
