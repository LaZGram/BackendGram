import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class UpdateShopStatusRequestDto {
  authId: string
  @ApiProperty()
  @IsNumber()
  shopId: number
  @ApiProperty()
  @IsBoolean()
  status: boolean
}
