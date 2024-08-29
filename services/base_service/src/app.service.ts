import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
<<<<<<< HEAD
=======
import { HelloDto } from '../dtos/hello.dto';
>>>>>>> upstream/main

@Injectable()
export class AppService {
  getHello(msg: HelloDto): string {
    console.log(msg.message);
    return msg.message;
  }
}
