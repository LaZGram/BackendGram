import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateOrderStatusRequestDto{
    authId: string;
    @ApiProperty()
    @IsNumber()
    orderId: number;
}