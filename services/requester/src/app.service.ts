import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RpcException } from '@nestjs/microservices';
import { mergeScan } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getRequesterId(authId: string) {
    const requester = await this.prisma.requester.findUnique({
      where: {
        authId: authId
      }
    })
    if (!requester) throw new Error("Requester not found");
    else return requester.requesterId;
  }

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
    if (!msg.name) {
      throw new RpcException({ statusCode: 400, message: 'Menu name is required for search' });
    }
    return this.prisma.menu.findMany({
      where: {
        name: msg.name,
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
        requesterId: true,
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
        createAt: new Date(),
        address: msg.addressId ? {
          connect: {
            addressId: msg.addressId,
          },
        } : undefined,
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
        requesterId: true,
      },
    });
  }

  async createDebitcard(msg: any): Promise<any> {
    const debitCard = await this.prisma.debitCard.create({
        data: {
            cardNumber: msg.cardNumber,
            expiryDate: msg.expiryDate,
            cvv: msg.cvv,
            requester: {
                connect: {
                    authId: msg.authId,
                },
            },
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

  async getShop(): Promise<any> {
    return this.prisma.shop.findMany({
      select: {
        shopId: true,
        shopName: true,
      },
    });
  }

  async getReview(msg:any): Promise<any> {
    return this.prisma.review.findMany({
      where: {
        shopId: Number(msg.shopId)
      },
      select: {
        rating: true,
        comment: true,
        shopId: true,
        requesterId: true,
      }
    })
  }

  async createReview(msg: any): Promise<any> {
    const { rating, comment, shopId, authId } = msg;

    const existingRequester = await this.prisma.requester.findUnique({
      where: { authId },
      select: { requesterId: true },
    });

    if (!existingRequester) {
      throw new RpcException({ statusCode: 404, message: 'Requester not found' });
    }

    const newReview = await this.prisma.review.create({
      data: {
        rating,
        comment,
        shop: { connect: { shopId } },
        requester: { connect: { requesterId: existingRequester.requesterId } },
      },
    });

    return newReview;
  }

}
