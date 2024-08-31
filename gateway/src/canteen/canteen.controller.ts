import { Controller, Get, Inject, Post, Body } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { lastValueFrom, Observable } from 'rxjs';

@Controller('canteen')
export class CanteenController {
    constructor(@Inject('KAFKA') private client: ClientKafka) { }
    @Get()
    async getCanteens(@Body() body: any): Promise<string> {
        const result = await this.client.send('getCanteens', body);
        const value = await lastValueFrom(result);
        return value;
    }
}