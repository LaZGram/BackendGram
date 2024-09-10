import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateReportRequestDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  authId: string;
  @ApiProperty()
  @IsNumber()
  orderId: number;
  @ApiProperty()
  @IsDate()
  reportDate: Date;
}
