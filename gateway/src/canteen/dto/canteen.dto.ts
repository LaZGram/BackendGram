import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetCanteensDto {
  @ApiProperty({ description: 'Location filter for the canteens', example: 'Bangkok', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Canteen name filter', example: 'Food Plaza', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
