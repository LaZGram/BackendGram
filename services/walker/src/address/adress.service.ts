import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AdressService {
    constructor(private prisma: PrismaService) {}

    async updateWalkerAddress(msg: any): Promise<any> {
        let latitude = parseFloat(msg.latitude);
        let longitude = parseFloat(msg.longitude);
        let authId = msg.authId;
        try {
            const updatedWalker = await this.prisma.walker.update({
                where: {
                    authId: authId,
                },
                data: {
                    latitude: latitude,
                    longitude: longitude,
                },
            });
            return updatedWalker;
        }
        catch (error) {
            return new RpcException({status: 400, message: error});
        }
    }

    async getWalkerAddress(msg: any): Promise<any> {
        let orderId = parseInt(msg.orderId);
        try {
            const walker = await this.prisma.walker.findUnique({
                where: {
                    walkerId: (
                        (await this.prisma.order.findUnique({
                            where: {
                                orderId: orderId,
                            },
                            select: {
                                walkerId: true,
                            },
                        }))?.walkerId
                    )
                },
                select: {
                    latitude: true,
                    longitude: true,
                },
            });
            return walker;
        }
        catch (error) {
            return new RpcException({status: 400, message: error});
        }
    }
}
