import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject, IsArray , IsDateString } from 'class-validator';

export class PostApprovalDto {
  @ApiProperty({ description: 'New order status', example: 'cancelled' })
  @IsString()
  orderStatus: string;
}

export class VerifyWalkerDto {
  @ApiProperty({ description: 'WalkerID for the walker', example: 1 })
  @IsNumber()
  walkerId: Number;
}

class RequesterChatDto {
  @ApiProperty({ description: 'ID of the order', example: 1 })
  orderId: number;

  @ApiProperty({ description: 'ID of the requester', example: 1 })
  requesterId: number;
}

class WalkerChatDto {
  @ApiProperty({ description: 'ID of the order', example: 3 })
  orderId: number;

  @ApiProperty({ description: 'ID of the walker', example: 3 })
  walkerId: number;
}

export class getChatDto {
  @ApiProperty({ type: [RequesterChatDto], description: 'List of chats for the requester' })
  requester: RequesterChatDto[];

  @ApiProperty({ type: [WalkerChatDto], description: 'List of chats for the walker' })
  walker: WalkerChatDto[];
}

export class selectChatDto {
  @ApiProperty()
  orderId: number;
}

class UpdatedOrderDTO { 
  @ApiProperty({ description: 'ID of the order that was updated', example: 3 })
  orderId: number;

  @ApiProperty({ description: 'Admin ID assigned to the order', example: 1 })
  adminId: number;

  @ApiProperty({ description: 'Current status of the order', example: 'completed' })
  orderStatus: string;
}

export class ResultselectChatDTO {
  @ApiProperty({ description: 'HTTP status code of the response', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'Detailed message of the update operation', example: 'Updated 3 chats and updated orderId: 3 with new adminId: 1.' })
  message: string;

  @ApiProperty({ description: 'Number of chats that were updated', example: 3 })
  updatedChats: number;

  @ApiProperty({ type: UpdatedOrderDTO, description: 'Details of the updated order' })
  updatedOrder: UpdatedOrderDTO;
}