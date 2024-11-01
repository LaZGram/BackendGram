import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  getRequester(authId: string) {
    return this.prisma.requester.findUnique({
      where: {
        authId: authId
      }
    }).then(requester => {
      return requester.requesterId;
    });
  }

  async createAddress(createAddressDto: CreateAddressDto) {
    const address = await this.prisma.address.create({
      data: {
        name: createAddressDto.name,
        detail: createAddressDto.detail,
        note: createAddressDto.note,
        latitude: createAddressDto.latitude,
        longitude: createAddressDto.longitude,
        requester: {
          connect: {
            requesterId: await this.getRequester(createAddressDto.authId)
          }
        }
      }
    });
    if (createAddressDto.default) {
      await this.prisma.requester.update({
        where: {
          authId: createAddressDto.authId
        },
        data: {
          defaultAddress: address.addressId,
        }
      });
    }
    return address;
  }

  async updateAddress(updateAddressDto: UpdateAddressDto) {
    const address = await this.prisma.address.update({
      where: {
        addressId: updateAddressDto.addressId
      },
      data: {
        name: updateAddressDto.name,
        detail: updateAddressDto.detail,
        note: updateAddressDto.note,
        latitude: updateAddressDto.latitude,
        longitude: updateAddressDto.longitude
      }
    });
    if (updateAddressDto.default) {
      await this.prisma.requester.update({
        where: {
          authId: updateAddressDto.authId
        },
        data: {
          defaultAddress: address.addressId,
        }
      });
    }
    else {
      const requester = await this.prisma.requester.findUnique({
        where: {
          requesterId: address.requesterId
        }
      });
      if (requester.defaultAddress === address.addressId) {
        await this.prisma.requester.update({
          where: {
            requesterId: requester.requesterId
          },
          data: {
            defaultAddress: null
          }
        });
      }
    }
    return address;
  }

  async deleteAddress(addressId: number) {
    return this.prisma.address.update({
      where: {
        addressId: addressId
      },
      data: {
        deleted: "delete"
      }
    });
  }

  getAddressInfo(addressId: number) {
    return this.prisma.address.findUnique({
      where: {
        addressId: addressId
      },
    });
  }

  async getAddress(authId: string) {
    const defaultAddress = await this.prisma.requester.findUnique({
      where: {
        authId: authId
      },
      select: {
        defaultAddress: true  // Retrieve only the defaultAddress field
      }
    }).then(requester => requester?.defaultAddress);
  
    const address = await this.prisma.address.findMany({
      where: {
        requester: {
          authId: authId
        },
        OR: [
          { deleted: null },
          { deleted: { not: "delete" } }
        ]
      },
      select: {
        addressId: true,
        name: true,
        detail: true,
        note: true,
        latitude: true,
        longitude: true,
        // Add any other fields you want to retrieve
      }
    });
  
    return { defaultAddress, address };
  }
  
  
}
