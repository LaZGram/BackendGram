import { PartialType } from '@nestjs/mapped-types';
import { CreateShopRequestDto } from './create-shop-request.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateShopInfoRequestDto extends PartialType(CreateShopRequestDto) {
  authId: string
  @ApiPropertyOptional()
  @IsNumber()
  canteenId?: number
  @ApiPropertyOptional()
  @IsString()
  username?: string
  @ApiPropertyOptional()
  @IsString()
  password?: string
  @ApiPropertyOptional()
  @IsString()
  shopName?: string
  @ApiPropertyOptional()
  @IsString()
  profilePicture?: string
  @ApiPropertyOptional()
  @IsString()
  tel?: string
  @ApiPropertyOptional()
  @IsString()
  shopNumber?: string
}
