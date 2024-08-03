import { Controller, Get, Inject, Post, Body } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { lastValueFrom, Observable } from 'rxjs';

@Controller('requester')
export class RequesterController {
    constructor(@Inject('KAFKA') private client: ClientKafka) { }

    @Get()
    getRequester(): string {
        return 'Requester';
    }

    @Post('registration')
    async requesterRegistration(@Body() body: any): Promise<string> {
        const result = await this.client.send('requesterRegistration', body);
        const value = await lastValueFrom(result);
        return value;
    }
}