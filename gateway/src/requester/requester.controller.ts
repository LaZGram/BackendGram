import { Controller, Get, Inject, Post, Body, Query } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateOrderRequestDto } from 'src/dtos/create-order-request.dto';

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

    @Post('auth/google')
        async googleAuth(@Body() body: any): Promise<string> {
            const token = body.token;
            const result = await this.client.send('googleAuth', JSON.stringify({ token }));
            const value = await lastValueFrom(result);
            return value;
        }
    
    @Post('create-order')
    async createOrder(@Body() createOrderRequest: CreateOrderRequestDto): Promise<string> {
        const result = await this.client.send('createOrder', createOrderRequest);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/status')
    async getStatus(@Query() orderId: object): Promise<string> {
        const result = await this.client.send('getStatus', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('cancel-order')
    async cancelOrder(@Body() body: any): Promise<string> {
        const result = await this.client.send('cancelOrder', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/walker')
    async getWalker(@Query() orderId: any): Promise<string> {
        const result = await this.client.send('getWalker', orderId);
        const value = await lastValueFrom(result);
        return value;
    }
}