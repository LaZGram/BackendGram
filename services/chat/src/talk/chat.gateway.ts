import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
  
  @WebSocketGateway()
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private chatService: ChatService) {}
  
    private users: Map<string, Socket> = new Map();
  
    @SubscribeMessage('joinOrderChat')
    async handleJoinOrderChat(
      @MessageBody() data: { userId: string, role: string, targetRole: string, orderId: number },
      @ConnectedSocket() client: Socket
    ) {
      try {
        const { userId, role, targetRole, orderId } = data;
        const chatId = this.getChatIdentifier(orderId, role, targetRole);
    
        // Join the user to the order-specific room
        client.join(chatId);
        this.users.set(userId, client);
        client.emit('oldMessages',await this.chatService.getMessages(chatId));
        console.log(this.chatService.getMessages(chatId));
        console.log('Hello');
        // Notify the room that a user has joined
        this.server.to(chatId).emit('systemMessage', `User ${userId} (${role}) has joined the chat for order ${orderId}`);
      } catch (e) {
        this.server.emit('error', e.message);
      }
    }
  
    @SubscribeMessage('orderMessage')
    async handleOrderMessage(
      @MessageBody() data: { orderId: number, message: string, fromUser: string, role: string, targetRole: string },
      @ConnectedSocket() client: Socket
    ) {
      try {
        const { orderId, message, fromUser, role, targetRole } = data;
    
        // Calculate chatId using the getChatIdentifier method
        const chatId = this.getChatIdentifier(orderId, role, targetRole);
    
        let walkerId: number | null = null;
        let adminId: number | null = null;
        let requesterId: number | null = null;
    
        // Assign the correct ID based on the sender role
        if (role === 'requester') {
          requesterId = parseInt(fromUser); // Convert the `fromUser` string to a number (requesterId)
        } else if (role === 'walker') {
          walkerId = parseInt(fromUser); // Convert the `fromUser` string to a number (walkerId)
        } else if (role === 'admin') {
          adminId = parseInt(fromUser); // Convert the `fromUser` string to a number (adminId)
        }
    
        // Call the service to save the message
        await this.chatService.saveMessage(chatId, orderId, message, role, walkerId, adminId, requesterId);
    
        // Broadcast the message to the chat room
        this.server.to(chatId).emit('message', { fromUser, role, message });
      } catch (e) {
        this.server.emit('error', e.message);
      }
    }
  
    // Calculate the chatId based on orderId, role, and targetRole
    private getChatIdentifier(orderId: number, role: string, targetRole: string): string {
      let suffix = '';
      if ((role === 'requester' && targetRole === 'walker') || (role === 'walker' && targetRole === 'requester')) {
        suffix = '0';
      } else if ((role === 'requester' && targetRole === 'admin') || (role === 'admin' && targetRole === 'requester')) {
        suffix = '1';
      } else if ((role === 'walker' && targetRole === 'admin') || (role === 'admin' && targetRole === 'walker')) {
        suffix = '2';
      }
      return `order-${orderId}-${suffix}`;
    }
  }
  