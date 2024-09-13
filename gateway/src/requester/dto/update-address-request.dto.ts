import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateAddressRequestDto{
  @ApiProperty()
  @IsNumber()
  addressId: number;
  @ApiPropertyOptional()
  @IsString()
  name?: string
  @ApiPropertyOptional()
  @IsString()
  detail?: string
  @ApiPropertyOptional()
  @IsString()
  note?: string
  @ApiPropertyOptional()
  @IsNumber()
  latitude?: number
  @ApiPropertyOptional()
  @IsNumber()
  longitude?: number
  authId?: string
  @ApiPropertyOptional()
  @IsBoolean()
  default?: boolean
}
