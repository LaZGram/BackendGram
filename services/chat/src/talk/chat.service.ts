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
    walkerId?: number,
    adminId?: number,
    requesterId?: number
  ): Promise<Chat> {
    let orderIdReal = parseInt(orderId);
    return this.prisma.chat.create({
      data: {
        chatId,
        orderId: orderIdReal,
        message,
        senderRole,
        walkerId: walkerId || null,         // Optional walkerId (set to null if not provided)
        adminId: adminId || null,           // Optional adminId (set to null if not provided)
        requesterId: requesterId || null,   // Optional requesterId (set to null if not provided)
        timestamp: new Date(),
      },
    });
  }

  // Retrieve old messages from the database by chatId
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
