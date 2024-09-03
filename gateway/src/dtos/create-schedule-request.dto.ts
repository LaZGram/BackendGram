export class DayOfWeek {
    day: string
    open: string
    close: string
}

export class CreateScheduleRequestDto {
    dayOfWeek: DayOfWeek[]
    shopId: number
}
