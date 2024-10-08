import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // Save a new chat message to the database
  async saveMessage(
    chatId: string,
    orderId: any,
    message: string,
    senderRole: string,
  ): Promise<Chat> {

    const orderIdReal = parseInt(orderId);
  
    const order = await this.prisma.order.findUnique({
      where: { orderId: orderIdReal },
      select: {
        walkerId: true,
        adminId: true,
        requesterId: true,
      },
    });
  
    if (!order) {
      throw new Error(`Order with ID ${orderIdReal} not found`);
    }
    console.log(order.requesterId)
    return this.prisma.chat.create({
      data: {
        chatId,
        orderId: orderIdReal,
        message,
        senderRole,
        walkerId: order.walkerId ?? null,
        adminId: order.adminId ?? 0,
        requesterId: order.requesterId ?? null,
        timestamp: new Date(),
      },
    });
  }

  async getMessages(chatId: string): Promise<Chat[]> {
    console.log(await this.prisma.chat.findMany({
        where: { chatId },
        orderBy: { timestamp: 'asc' },
      }))
    return await this.prisma.chat.findMany({
      where: { chatId },
      orderBy: { timestamp: 'asc' },
    });
  }
  
}
