import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetCanteensDto {
  @ApiProperty({ description: 'Canteen name filter', example: 'Food Plaza', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
