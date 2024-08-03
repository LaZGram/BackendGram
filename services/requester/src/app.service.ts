import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Requester, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  requesterRegistration(msg: any): any {
    return this.prisma.requester.create({
      data: {
        name: msg.name,
      },
    });
    
  }
}
