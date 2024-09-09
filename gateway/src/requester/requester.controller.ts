import { Controller, Get, Inject, Post, Body, Query, Delete } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateAddressRequestDto, CreateOrderRequestDto, CreateReportRequestDto, UpdateAddressRequestDto } from 'src/dtos/';
import { CancelOrderResponseDto, CreateAddressResponseDto, CreateOrderResponseDto, CreateReportResponseDto, DeleteAddressResponseDto, GetAddressInfoResponseDto, GetAddressResponseDto, UpdateAddressResponseDto } from './dto/response.dto';

@ApiTags('REQUESTER')
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
    
    @Post('auth/google')
        async googleAuth(@Body() body: any): Promise<string> {
            const token = body.token;
            const result = await this.client.send('googleAuth', JSON.stringify({ token }));
            const value = await lastValueFrom(result);
            return value;
        }
    
    @Post('create-order')
    @ApiOperation({ summary: 'Create new order to database' })
    @ApiResponse({ status: 201, description: 'Create new order successes', type: CreateOrderResponseDto })
    async createOrder(@Body() createOrderRequest: CreateOrderRequestDto): Promise<string> {
        const result = await this.client.send('createOrder', createOrderRequest);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/status')
    @ApiOperation({ summary: 'Get order status from database' })
    @ApiResponse({ status: 200, description: 'Get order status successes', type: String })
    async getStatus(@Query() orderId: object): Promise<string> {
        const result = await this.client.send('getStatus', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('cancel-order')
    @ApiOperation({ summary: 'Cancel order in database' })
    @ApiQuery({ name: 'orderId', type: 'number' })
    @ApiResponse({ status: 201, description: 'Cancel order successes', type: CancelOrderResponseDto })
    async cancelOrder(@Query() orderId: any): Promise<string> {
        const result = await this.client.send('cancelOrder', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/walker')
    @ApiOperation({ summary: 'Get walker information from database' })
    @ApiQuery({ name: 'orderId', type: 'number' })
    @ApiResponse({ status: 200, description: 'Get walker information successes', type: String })
    async getWalker(@Query() orderId: any): Promise<string> {
        const result = await this.client.send('getWalker', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('order/create-report')
    @ApiOperation({ summary: 'Create new report to database' })
    @ApiResponse({ status: 201, description: 'Create new report successes', type: CreateReportResponseDto })
    async createReport(@Body() createReportRequest: CreateReportRequestDto): Promise<string> {
        const result = await this.client.send('createReport', createReportRequest);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('order/get-report')
    @ApiOperation({ summary: 'Get report from database' })
    @ApiQuery({ name: 'orderId', type: 'number' })
    @ApiResponse({ status: 200, description: 'Get report successes', type: CreateReportResponseDto })   
    async getReport(@Query() orderId: object): Promise<string> {
        const result = await this.client.send('getReport', orderId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('create-address')
    @ApiOperation({ summary: 'Create new address to database' })
    @ApiResponse({ status: 201, description: 'Create new address successes', type: CreateAddressResponseDto })
    async createAddress(@Body() body: CreateAddressRequestDto): Promise<string> {
        const result = await this.client.send('createAddress', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Post('update-address')
    @ApiOperation({ summary: 'Update address in database' })
    @ApiResponse({ status: 201, description: 'Update address successes', type: UpdateAddressResponseDto })
    async updateAddress(@Body() body: UpdateAddressRequestDto): Promise<string> {
        const result = await this.client.send('updateAddress', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Delete('delete-address')
    @ApiOperation({ summary: 'Delete address in database' })
    @ApiQuery({ name: 'addressId', type: 'number' })
    @ApiResponse({ status: 201, description: 'Delete address successes', type: DeleteAddressResponseDto })
    async deleteAddress(@Query() addressId: object): Promise<string> {
        const result = await this.client.send('deleteAddress', addressId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('address')
    @ApiOperation({ summary: 'Get list of address from database' })
    @ApiQuery({ name: 'addressId', type: 'number' })
    @ApiResponse({ status: 200, description: 'Get address successes', type: GetAddressResponseDto, isArray: true })
    async getAddress(@Query() addressId: object): Promise<string> {
        const result = await this.client.send('getAddress', addressId);
        const value = await lastValueFrom(result);
        return value;
    }

    @Get('address/info')
    @ApiQuery({ name: 'authId', type: 'string' })
    @ApiOperation({ summary: 'Get address information from database' })
    @ApiResponse({ status: 200, description: 'Get address information successes', type: GetAddressInfoResponseDto })
    async getAddressInfo(@Query() authId: object): Promise<string> {
        const result = await this.client.send('getAddressInfo', authId);
        const value = await lastValueFrom(result);
        return value;
    }
}
