import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';


export class EditMenuRequestDto{
  @ApiProperty()
  @IsNumber()
  menuId: number;
  @ApiPropertyOptional()
  @IsString()
  name?: string
  @ApiPropertyOptional({description: 'encoded with base64'})
  @IsString()
  picture?: string
  @ApiPropertyOptional()
  @IsNumber()
  price?: number
  @ApiPropertyOptional()
  @IsString()
  description?: string
  @ApiPropertyOptional()
  @IsString()
  status?: boolean
}