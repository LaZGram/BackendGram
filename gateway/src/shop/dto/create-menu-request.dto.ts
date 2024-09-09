import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateMenuRequestDto {
  @ApiProperty()
  @IsNumber()
  shopId: number
  @ApiProperty()
  @IsString()
  name: string
  @ApiProperty({description: 'encoded with base64'})
  @IsString()
  picture: string
  @ApiProperty()
  @IsNumber()
  price: number
  @ApiProperty()
  @IsString()
  description: string
}