import { ApiProperty } from "@nestjs/swagger"

export class ShopLoginRequestDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}