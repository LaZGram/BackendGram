export class DayOfWeek {
    day: string
    open: string
    close: string
}

export class CreateScheduleDto {
    dayOfWeek: DayOfWeek[]
    authId: string
}
