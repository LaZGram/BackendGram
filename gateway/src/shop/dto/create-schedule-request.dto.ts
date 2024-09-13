import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class DayOfWeek {
    @ApiProperty()
    @IsString()
    day: string
    @ApiProperty()
    @IsString()
    open: string
    @ApiProperty()
    @IsString()
    close: string
}

export class CreateScheduleRequestDto {
    @ApiProperty({type: [DayOfWeek]})
    dayOfWeek: DayOfWeek[]
    authId: string
}
