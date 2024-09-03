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

    @Get('profile')
    async getProfile(@Body() body: any): Promise<string> {
        const result = await this.client.send('getProfile', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('profile/personal-info')
    async postPersonalInfo(@Body() body: any): Promise<string> {
        const result = await this.client.send('postPersonalInfo', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('profile/profile-picture')
    async postChangeProfilePicture(@Body() body: any): Promise<string> {
        const result = await this.client.send('postChangeProfilePicture', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('profile/debit-card')
    async getDebitcard(@Body() body: any): Promise<string> {
        const result = await this.client.send('getDebitcard', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('profile/debit-card/edit-card')
    async postChangeDebitCard(@Body() body: any): Promise<string> {
        const result = await this.client.send('postChangeDebitCard', body);
        const value = await lastValueFrom(result);
        return value;
    }
}