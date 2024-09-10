import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateAddressRequestDto {
    @ApiProperty()
    @IsString()
    name: string
    @ApiPropertyOptional()
    @IsString()
    detail?: string
    @ApiPropertyOptional()
    @IsString()
    note?: string
    @ApiProperty()
    @IsNumber()
    latitude: number
    @ApiProperty()
    @IsNumber()
    longitude: number
    @ApiProperty()
    @IsString()
    authId: string
    @ApiProperty()
    @IsBoolean()
    default: boolean
}