import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class SearchShopRequestDto {
  @ApiProperty()
  @IsString()
  shopname: string
  @ApiProperty()
  @IsNumber()
  canteenId: number
}