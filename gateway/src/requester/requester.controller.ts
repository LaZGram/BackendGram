import { Controller, Get, Post, Body, Query, Delete, Inject, Param, Request} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostChangeProfilePictureDto, GetDebitCardDto, PostChangeDebitCardDto, CreateOrderRequestDto, SearchMenuDto, CreateReportRequestDto, RequesterProfileDto, UpdateRequesterProfileDto, RequesterAddressDto, UpdateAddressRequestDto, CreateDebitCardDto, RequesterCreateDto } from './dto/requester.dto';

@ApiTags('Requester')
@Controller('requester')
export class RequesterController {
    constructor(@Inject('KAFKA') private client: ClientKafka) {}

    @Get()
    @ApiOperation({ summary: 'Base route for requester' })
    @ApiResponse({ status: 200, description: 'Requester base route accessed successfully.' })
    getRequester(): string {
        return 'Requester';
    }

    @Post('registration')
    @ApiOperation({ summary: 'Register a requester' })
    @ApiResponse({ status: 201, description: 'Requester registered successfully.' })
    async requesterRegistration(@Body() reqData: RequesterCreateDto, @Request() req): Promise<any> {
        const result = this.client.send('requesterRegistration', {...reqData, authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get the profile of the requester' })
    @ApiResponse({ status: 200, description: 'Profile retrieved successfully.', type: RequesterProfileDto })
    async getProfile(@Request() req): Promise<RequesterProfileDto> {
        const result = this.client.send('getProfile', { authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Post('personal-info')
    @ApiOperation({ summary: 'Update personal info of the requester' })
    @ApiResponse({ status: 200, description: 'Personal info updated successfully.' })
    async postPersonalInfo(@Body() usrchg: UpdateRequesterProfileDto, @Request() req): Promise<string> {
        const result = this.client.send('postPersonalInfo', {...usrchg , authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Post('profile-picture')
    @ApiOperation({ summary: 'Change profile picture of the requester' })
    @ApiResponse({ status: 200, description: 'Profile picture updated successfully.' })
    async postChangeProfilePicture(@Body() body: PostChangeProfilePictureDto, @Request() req): Promise<string> {
        const result = this.client.send('postChangeProfilePicture', {...body, authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Get('debit-card')
    @ApiOperation({ summary: 'Get debit card information of the requester' })
    @ApiResponse({ status: 200, description: 'Debit card information retrieved successfully.' })
    async getDebitcard(@Body() body: GetDebitCardDto): Promise<string> {
        const result = this.client.send('getDebitcard', body);
        return await lastValueFrom(result);
    }

    @Post('debit-card')
    @ApiOperation({ summary: 'Create a debit card for the requester' })
    @ApiResponse({ status: 201, description: 'Debit card created successfully.', type: CreateDebitCardDto })
    async createDebitcard(@Body() body: CreateDebitCardDto): Promise<string> {
        const result = this.client.send('createDebitcard', {...body});
        return await lastValueFrom(result);
    }

    @Post('debit-card/edit-card')
    @ApiOperation({ summary: 'Edit debit card information of the requester' })
    @ApiResponse({ status: 200, description: 'Debit card information updated successfully.' })
    async postChangeDebitCard(@Body() body: PostChangeDebitCardDto): Promise<string> {
        const result = this.client.send('postChangeDebitCard', {...body});
        return await lastValueFrom(result);
    }

    @Post('auth/google')
    @ApiOperation({ summary: 'Google authentication for requester' })
    @ApiResponse({ status: 200, description: 'Google authentication successful.' })
    async googleAuth(@Body() body: any): Promise<string> {
        const result = this.client.send('googleAuth', { token: body.token });
        return await lastValueFrom(result);
    }

    @Post('create-order')
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully.', type: CreateOrderRequestDto })
    async createOrder(@Body() createOrderRequest: CreateOrderRequestDto): Promise<string> {
        const result = this.client.send('createOrder', createOrderRequest);
        return await lastValueFrom(result);
    }

    @Get('order/status')
    @ApiOperation({ summary: 'Get the status of an order' })
    @ApiResponse({ status: 200, description: 'Order status retrieved successfully.' })
    async getStatus(@Query() orderId: object): Promise<string> {
        const result = this.client.send('getStatus', orderId);
        return await lastValueFrom(result);
    }

    @Post('cancel-order')
    @ApiOperation({ summary: 'Cancel an order' })
    @ApiResponse({ status: 200, description: 'Order cancelled successfully.' })
    async cancelOrder(@Body() body: any): Promise<string> {
        const result = this.client.send('cancelOrder', body);
        return await lastValueFrom(result);
    }

    @Get('order/walker')
    @ApiOperation({ summary: 'Get the walker assigned to an order' })
    @ApiResponse({ status: 200, description: 'Walker retrieved successfully.' })
    async getWalker(@Query() orderId: any): Promise<string> {
        const result = this.client.send('getWalker', orderId);
        return await lastValueFrom(result);
    }

    @Post('order/create-report')
    @ApiOperation({ summary: 'Create a report for an order' })
    @ApiResponse({ status: 201, description: 'Report created successfully.', type: CreateReportRequestDto })
    async createReport(@Body() createReportRequest: CreateReportRequestDto): Promise<string> {
        const result = this.client.send('createReport', createReportRequest);
        return await lastValueFrom(result);
    }

    @Post('search-menu')
    @ApiOperation({ summary: 'Search for menu items by name' })
    @ApiResponse({ status: 200, description: 'Menu items retrieved successfully.' })
    async searchMenu(@Body() body: SearchMenuDto): Promise<any> {
        const result = this.client.send('searchMenu', body);
        return await lastValueFrom(result);
    }

    @Get('order/get-report')
    @ApiOperation({ summary: 'Get the report for an order' })
    @ApiResponse({ status: 200, description: 'Report retrieved successfully.' })
    async getReport(@Query() orderId: object): Promise<string> {
        const result = this.client.send('getReport', orderId);
        return await lastValueFrom(result);
    }

    @Post('create-address')
    @ApiOperation({ summary: 'Create an address for the requester' })
    @ApiResponse({ status: 201, description: 'Address created successfully.', type: RequesterAddressDto })
    async createAddress(@Body() body: RequesterAddressDto): Promise<string> {
        const result = this.client.send('createAddress', body);
        return await lastValueFrom(result);
    }

    @Post('update-address')
    @ApiOperation({ summary: 'Update an address of the requester' })
    @ApiResponse({ status: 200, description: 'Address updated successfully.', type: UpdateAddressRequestDto })
    async updateAddress(@Body() body: UpdateAddressRequestDto): Promise<string> {
        const result = this.client.send('updateAddress', body);
        return await lastValueFrom(result);
    }

    @Delete('delete-address')
    @ApiOperation({ summary: 'Delete an address of the requester' })
    @ApiResponse({ status: 200, description: 'Address deleted successfully.' })
    async deleteAddress(@Query() addressId: object): Promise<string> {
        const result = this.client.send('deleteAddress', addressId);
        return await lastValueFrom(result);
    }

    @Get('address')
    @ApiOperation({ summary: 'Get an address by ID' })
    @ApiResponse({ status: 200, description: 'Address retrieved successfully.' })
    async getAddress(@Query() addressId: object): Promise<string> {
        const result = this.client.send('getAddress', addressId);
        return await lastValueFrom(result);
    }

    @Get('address/info')
    @ApiOperation({ summary: 'Get address info by auth ID' })
    @ApiResponse({ status: 200, description: 'Address info retrieved successfully.' })
    async getAddressInfo(@Query() authId: object): Promise<string> {
        const result = this.client.send('getAddressInfo', authId);
        return await lastValueFrom(result);
    }
}
