import { Controller, Get, Post, Body, Query, Delete, Inject, Param, Request, BadRequestException, NotFoundException, Put} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { buildReviewDto , PostChangeProfilePictureDto, GetDebitCardDto, PostChangeDebitCardDto, SearchMenuDto, RequesterProfileDto, UpdateRequesterProfileDto, RequesterAddressDto, CreateDebitCardDto, RequesterCreateDto , createReviewDto , ResultgetReview , ResultcreateReview , ResultgetShop } from './dto/requester.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { catchError, lastValueFrom, Observable } from 'rxjs';
import { CreateAddressRequestDto, CreateOrderRequestDto, CreateReportRequestDto, UpdateAddressRequestDto } from 'src/dtos/';
import { CancelOrderResponseDto, CreateAddressResponseDto, CreateOrderResponseDto, CreateReportResponseDto, DeleteAddressResponseDto, GetAddressInfoResponseDto, GetAddressResponseDto, UpdateAddressResponseDto } from './dto/response.dto';

@ApiTags('REQUESTER')
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

    @Put('personal-info')
    @ApiOperation({ summary: 'Update personal info of the requester' })
    @ApiResponse({ status: 200, description: 'Personal info updated successfully.' })
    async postPersonalInfo(@Body() usrchg: UpdateRequesterProfileDto, @Request() req): Promise<string> {
        const result = this.client.send('postPersonalInfo', {...usrchg , authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Put('profile-picture')
    @ApiOperation({ summary: 'Change profile picture of the requester' })
    @ApiResponse({ status: 200, description: 'Profile picture updated successfully.' })
    async postChangeProfilePicture(@Body() body: PostChangeProfilePictureDto, @Request() req): Promise<string> {
        const result = this.client.send('postChangeProfilePicture', {...body, authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Get('debit-card')
    @ApiOperation({ summary: 'Get debit card information of the requester' })
    @ApiResponse({ status: 200, description: 'Debit card information retrieved successfully.' })
    async getDebitcard(): Promise<string> {
        const result = this.client.send('getDebitcard', {});
        return await lastValueFrom(result);
    }

    @Post('debit-card')
    @ApiOperation({ summary: 'Create a debit card for the requester' })
    @ApiResponse({ status: 201, description: 'Debit card created successfully.', type: CreateDebitCardDto })
    async createDebitcard(@Body() body: CreateDebitCardDto, @Request() req): Promise<string> {
        const result = this.client.send('createDebitcard', {...body, authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Put('debit-card/edit-card')
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
    @ApiOperation({ summary: 'Create new order to database' })
    @ApiResponse({ status: 201, description: 'Create new order successes', type: CreateOrderResponseDto })
    async createOrder(@Body() createOrderRequest: CreateOrderRequestDto, @Request() req): Promise<string> {
        createOrderRequest.authId = req.jwt.authId;
        console.log(createOrderRequest.authId);
        const result = this.client.send('createOrder', createOrderRequest);
        return await lastValueFrom(result);
    }

    @Get('order/status')
    @ApiOperation({ summary: 'Get order status from database' })
    @ApiQuery({ name: 'orderId', type: 'number' })
    @ApiResponse({ status: 200, description: 'Get order status successes', type: String })
    async getStatus(@Query() orderId: object): Promise<string> {
        const result = this.client.send('getOrderStatus', orderId);
        return await lastValueFrom(result);
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
        const result = this.client.send('getOrderWalker', orderId);
        return await lastValueFrom(result);
    }

    @Post('order/create-report')
    @ApiOperation({ summary: 'Create new report to database' })
    @ApiResponse({ status: 201, description: 'Create new report successes', type: CreateReportResponseDto })
    @ApiResponse({ status: 400, description: 'Report already exists' })
    @ApiResponse({ status: 400, description: 'Order not completed yet' })
    @ApiResponse({ status: 400, description: 'Order not found' })
    @ApiResponse({ status: 400, description: 'Report date is not in range' })
    async createReport(@Body() createReportRequest: CreateReportRequestDto, @Request() req): Promise<string> {
        createReportRequest.authId = req.jwt.authId;
        const result = this.client.send('createOrderReport', createReportRequest)
        .pipe(
            catchError(error => {
                // Extracting the error message and status code from the microservice response
                const { statusCode, message } = error;
      
                // Throwing appropriate HTTP exceptions based on the microservice error
                if (statusCode === 400) {
                  throw new BadRequestException(message);
                } else if (statusCode === 404) {
                  throw new NotFoundException(message);
                } else {
                  throw new BadRequestException('Unexpected error occurred');
                }
              }),
        );
        return await lastValueFrom(result);
    }

    @Get('search-menu')
    @ApiOperation({ summary: 'Search for menu items by name' })
    @ApiQuery({ name: 'name', type: 'string' })
    @ApiResponse({ status: 200, description: 'Menu items retrieved successfully.' })
    async searchMenu(@Query('name') name: string): Promise<any> {
        const result = this.client.send('searchMenu', { name });
        return await lastValueFrom(result);
    }

    @Post('create-address')
    @ApiOperation({ summary: 'Create new address to database' })
    @ApiResponse({ status: 201, description: 'Create new address successes', type: CreateAddressResponseDto })
    async createAddress(@Body() body: CreateAddressRequestDto, @Request() req): Promise<string> {
        body.authId = req.jwt.authId;
        const result = await this.client.send('createAddress', body);
        const value = await lastValueFrom(result);
        return value;
    }

    @Put('update-address')
    @ApiOperation({ summary: 'Update address in database' })
    @ApiResponse({ status: 201, description: 'Update address successes', type: UpdateAddressResponseDto })
    async updateAddress(@Body() body: UpdateAddressRequestDto, @Request() req): Promise<string> {
        body.authId = req.jwt.authId;
        const result = this.client.send('updateAddress', body);
        return await lastValueFrom(result);
    }

    @Delete('delete-address')
    @ApiOperation({ summary: 'Delete address in database' })
    @ApiQuery({ name: 'addressId', type: 'number' })
    @ApiResponse({ status: 201, description: 'Delete address successes', type: DeleteAddressResponseDto })
    async deleteAddress(@Query() addressId: object): Promise<string> {
        const result = this.client.send('deleteAddress', addressId);
        return await lastValueFrom(result);
    }

    @Get('address')
    @ApiOperation({ summary: 'Get list of address from database' })
    @ApiResponse({ status: 200, description: 'Get address successes', type: GetAddressResponseDto, isArray: true })
    async getAddress(@Request() req): Promise<string> {
        const result = this.client.send('getAddress', {authId: req.jwt.authId});
        return await lastValueFrom(result);
    }

    @Get('address/info')
    @ApiOperation({ summary: 'Get address information from database' })
    @ApiQuery({ name: 'addressId', type: 'number' })
    @ApiResponse({ status: 200, description: 'Get address information successes', type: GetAddressInfoResponseDto })
    async getAddressInfo(@Query() addressId: object): Promise<string> {
        const result = this.client.send('getAddressInfo', addressId);
        return await lastValueFrom(result);
    }

    @Get('payment/token')
    async getPaymentToken(): Promise<string> {
        const result = this.client.send('getPaymentToken', {});
        return await lastValueFrom(result);
    }

    @Get('order')
    @ApiOperation({ summary: 'Get list of orders from database' })
    @ApiResponse({ status: 200, description: 'Get order successes', type: String })
    async reqGetOrder(@Request() req): Promise<string> {
        const result = this.client.send('reqGetOrder', {authId: req.jwt.authId});
        result.pipe(
            catchError(error => {
                const { statusCode, message } = error;
                if (statusCode === 404) {
                  throw new NotFoundException(message);
                } else {
                  throw new BadRequestException('Unexpected error occurred');
                }
        }));
        return await lastValueFrom(result);
    }

    @Get('payment/deeplink/:orderId')
    @ApiOperation({ summary: 'Get payment deeplink for an order' })
    @ApiResponse({ status: 200, description: 'Payment deeplink retrieved successfully.' })
    async getPaymentDeeplink(@Param('orderId') orderId: string, @Request() req): Promise<string> {
        const result = this.client.send('getPaymentDeeplink', { orderId, authId: req.jwt.authId });
        return await lastValueFrom(result);
    }

    @Get('payment/status')
    @ApiOperation({ summary: 'Get payment status from database' })
    @ApiQuery({ name: 'transactionIdSCB', type: 'string' })
    @ApiQuery({ name: 'orderId', type: 'string' })
    @ApiResponse({ status: 200, description: 'Get payment status successes', type: String })
    async getPaymentStatus(@Query('transactionIdSCB') transactionIdSCB: string, @Query('orderId') orderId: string): Promise<string> {
        const result = this.client.send('getPaymentStatus', { transactionIdSCB, orderId });
        return await lastValueFrom(result);
    }

    @Get('review')
    @ApiOperation({ summary: 'Retrieve all reviews' })
    @ApiResponse({ status: 200, description: 'Reviews retrieved successfully.', type: ResultgetReview })
    async getReview(@Query() createReviewDto: createReviewDto): Promise<any> {
        const result = this.client.send('getReview', {...createReviewDto});
        return await lastValueFrom(result);
    }

    @Post('review')
    @ApiOperation({ summary: 'Create a new review' })
    @ApiResponse({ status: 201, description: 'Review created successfully.', type: ResultcreateReview})
    @ApiResponse({ status: 400, description: 'Invalid input data for creating review.' })
    async createReview(@Body() buildReviewDto: buildReviewDto , @Request() req): Promise<string> {
        const result = this.client.send('createReview', {...buildReviewDto, authId: req.jwt.authId});
        return await lastValueFrom(result);
    }
    
    @Get('shop')
    @ApiOperation({ summary: 'Retrieve review by shopId' })
    @ApiResponse({ status: 200, description: 'Shops retrieved successfully.', type: ResultgetShop})
    async getShop(): Promise<any> {
        const result = this.client.send('getShop', {});
        return await lastValueFrom(result);
    }
    
}
