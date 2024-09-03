import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getCanteens(): Promise<any> {
    return this.prisma.canteen.findMany({
      // include: {
      //   address: true,
      //   order: true,
      //   shop: true,
      // },
    });
  }

  getProfile(): Promise<any> {
    return this.prisma.requester.findMany({
      // select: {
      //   username: true,
      //   email: true,
      //   firstName: true,
      //   lastName: true,
      //   phoneNumber: true,
      //   profilePicture: true,
      //   addressId: true,
      // },
    });
  }

  requesterRegistration(msg: any): any {
    return "";
    // return this.prisma.requester.create({
    //   data: {
    //     // requesterId: msg.requesterId,
    //     username: msg.username,
    //     email: msg.email,
    //     firstName: msg.firstName,
    //     lastName: msg.lastName,
    //     phoneNumber: msg.phoneNumber,
    //     profilePicture: msg.profilePicture,
    //     addressId: msg.addressId,
    //     // address: {
    //     //   connect: { addressId: msg.addressId },
    //     // },
    //   },
    // });
  }

}
