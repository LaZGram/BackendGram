import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

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
      select: {
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profilePicture: true,
        address: {
          select: {
            name: true,
            latitude: true,
            longitude: true,
          },
        },
        debitCard: {
          select: {
            cardNumber: true,
            expiryDate: true,
          },
        },
      },
    });
  }

  postPersonalInfo(msg: any): Promise<any> {
    return this.prisma.requester.update({
      where: {
        requesterId: msg.requesterId,
      },
      data: {
        username: msg.username,
        phoneNumber: msg.phoneNumber,
      },
    });
  }

  postChangeProfilePicture(msg: any): Promise<any> {
    return this.prisma.requester.update({
      where: {
        requesterId: msg.requesterId,
      },
      data: {
        profilePicture: msg.profilePicture,
      },
    });
  }

  async requesterRegistration(msg: any): Promise<any> {
    let requesterId = this.prisma.requester.findUnique({
      where: {
        authId: msg.jwt.authId
      },
      select: {
        requesterId: true
      }
    })["requesterId"]
    const requester = await this.prisma.requester.update({
      where: {
        requesterId
      },
      data: {
        username: msg.username,
        email: msg.email,
        firstName: msg.firstName,
        lastName: msg.lastName,
        phoneNumber: msg.phoneNumber,
        profilePicture: msg.profilePicture,
        address: {
          connect: {
            addressId: msg.addressId,
          },
        },
        authId: null,
        debitCard: msg.debitCardId ? {
          connect: {
            debitCardId: msg.debitCardId,
          }
        } : undefined,
      },
    });
    return requester;
  }

  getDebitcard(msg: any): Promise<any> {
    return this.prisma.debitCard.findMany({
      where: {
        requesterId: msg.authId,
      },
      select: {
        cardNumber: true,
        expiryDate: true,
        cvv: true,
      },
    });
  }

  async createDebitcard(msg: any): Promise<any> {
    const { cardNumber, expiryDate, cvv, requesterId } = msg;

    const debitCard = await this.prisma.debitCard.create({
      data: {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        requesterId: requesterId,
      },
    });

    return debitCard;
}

  postChangeDebitCard(msg: any): Promise<any> {
    return this.prisma.debitCard.update({
      where: {
        debitCardId: msg.debitCardId,
      },
      data: {
        cardNumber: msg.cardNumber,
        expiryDate: msg.expiryDate,
        cvv: msg.cvv,
      },
    });
  }

}
