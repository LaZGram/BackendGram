import { Controller, Get, Inject, Post, Body, Query, Delete } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateAddressRequestDto, CreateOrderRequestDto, CreateReportRequestDto, UpdateAddressRequestDto } from 'src/dtos/';

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

    @Post('order/create-report')
    async createReport(@Body() createReportRequest: CreateReportRequestDto): Promise<string> {
        const result = await this.client.send('createReport', createReportRequest);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/get-report')
    async getReport(@Query() orderId: object): Promise<string> {
        const result = await this.client.send('getReport', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('create-address')
    async createAddress(@Body() body: CreateAddressRequestDto): Promise<string> {
        const result = await this.client.send('createAddress', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('update-address')
    async updateAddress(@Body() body: UpdateAddressRequestDto): Promise<string> {
        const result = await this.client.send('updateAddress', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Delete('delete-address')
    async deleteAddress(@Query() addressId: object): Promise<string> {
        const result = await this.client.send('deleteAddress', addressId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('address')
    async getAddress(@Query() addressId: object): Promise<string> {
        const result = await this.client.send('getAddress', addressId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('address/info')
    async getAddressInfo(@Query() authId: object): Promise<string> {
        const result = await this.client.send('getAddressInfo', authId);
        const value = await lastValueFrom(result);
        return value;
    }
}