import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject, IsArray , IsDateString } from 'class-validator';

export class PostApprovalDto {
  @ApiProperty({ description: 'New order status', example: 'approved' })
  @IsString()
  orderStatus: string;
}

export class VerifyWalkerDto {
  @ApiProperty({ description: 'Authorization ID for the walker', example: '1' })
  @IsString()
  walkerId: string;
}