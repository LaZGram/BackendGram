import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class SearchShopRequestDto {
  @ApiPropertyOptional()
  @IsString()
  shopname: string
  @ApiProperty()
  @IsNumber()
  canteenId: number
}