import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getCanteens(): Promise<any> {
    return this.prisma.canteen.findMany({
      select: {
        canteenId: true,
        name: true,
        latitude: true,
        longitude: true,
      }
    });
  }

  async searchMenu(msg: any): Promise<any> {
    return this.prisma.menu.findMany({
      where: {
        name: {
          contains: msg.name,
        },
        status: true,
      },
      select: {
        menuId: true,
        name: true,
        price: true,
        picture: true,
        description: true,
        shop: {
          select: {
            shopName: true,
          }
        }
      }
    });
  }

  getProfile(msg: any): Promise<any> {
    return this.prisma.requester.findUnique({
      where: {
        authId: msg.authId,
      },
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
            cvv: true
          },
        },
      },
    });
  }

  async postPersonalInfo(msg: any): Promise<any> {
    const requester = await this.prisma.requester.update({
      where: {
        authId: msg.authId,
      },
      data: {
        username: msg.username,
        phoneNumber: msg.phoneNumber,
      },
    });
    return requester
  }

  async postChangeProfilePicture(msg: any): Promise<any> {
    const requester = await this.prisma.requester.update({
      where: {
        authId: msg.authId,
      },
      data: {
        profilePicture: msg.profilePicture,
      },
    });
    return requester
  }

  async requesterRegistration(msg: any): Promise<any> {
    let req = await this.prisma.requester.findUnique({
      where: {
        authId: msg.authId,
      },
      select: {
        requesterId: true,
      },
    });

    if (req) {
      throw new Error('Requester already exists');
    }

    const requester = await this.prisma.requester.create({
      data: {
        authId: msg.authId,
        username: msg.username,
        email: msg.email,
        firstName: msg.firstName,
        lastName: msg.lastName,
        phoneNumber: msg.phoneNumber,
        profilePicture: msg.profilePicture,
        address: msg.addressId ? {
          connect: {
            addressId: msg.addressId,
          },
        },
        authId: null,
        debitCard: msg.debitCardId ? {
          connect: {
            debitCardId: msg.debitCardId,
          },
        } : undefined,
      },
    });

    return requester;
  }


  getDebitcard(msg: any): Promise<any> {
    return this.prisma.debitCard.findMany({
      where: {
        debitCardId: msg.debitCardId,
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

    if (!cardNumber || !expiryDate || !cvv || !requesterId) {
        throw new Error('Missing required fields: cardNumber, expiryDate, cvv, requesterId');
    }

    try {
        const debitCard = await this.prisma.debitCard.create({
            data: {
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                requester: {
                    connect: {
                        requesterId: requesterId,
                    },
                },
            },
        });
        return debitCard;
    } catch (error) {
        throw new Error(`Failed to create debit card: ${error.message}`);
    }
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
