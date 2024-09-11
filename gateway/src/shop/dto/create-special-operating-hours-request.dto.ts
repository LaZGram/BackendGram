import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateSpecialOperatingHoursRequestDto {
  @ApiProperty()
  @IsDate()
  date: Date
  @ApiProperty()
  @IsString()
  open: string
  @ApiProperty()
  @IsString()
  close: string
  @ApiProperty()
  @IsString()
  authId: string
}
