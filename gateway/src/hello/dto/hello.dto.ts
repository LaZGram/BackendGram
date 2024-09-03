import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateJwtDto {
    @ApiProperty({ description: 'authId in jwt', example: "1a34" })
    @IsString()
    authId: string;
}

export class HelloDto {
    @ApiProperty()
    @IsString()
    message: string;
}