import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  authId: string;
}

export class AdminLoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}