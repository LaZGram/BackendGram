import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateCanteenRequestDto {
  @ApiProperty()
  @IsString()
  name: string
  @ApiProperty()
  @IsNumber()
  latitude: number
  @ApiProperty()
  @IsNumber()
  longitude: number
}