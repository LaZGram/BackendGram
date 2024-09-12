import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateShopRequestDto {
  authId: string
  @ApiProperty()
  @IsNumber()
  canteenId: number
  @ApiProperty()
  @IsString()
  username: string
  @ApiProperty()
  @IsString()
  password: string
  @ApiProperty()
  @IsString()
  shopName: string
  @ApiProperty()
  @IsString()
  profilePicture: string
  @ApiProperty()
  @IsString()
  tel: string
  @ApiProperty()
  @IsString()
  shopNumber: string
}