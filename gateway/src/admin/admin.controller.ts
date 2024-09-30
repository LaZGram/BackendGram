import { Controller, Get, Post, Body, Param, Inject, Request, SetMetadata, Query, Delete, BadRequestException, Put  } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { VerifyWalkerDto , PostApprovalDto} from './dto/admin.dto';
import { AdminLoginResponseDto, CanteenResponse, CreateAdminResponseDto, FilterOrderResponse, FilterReportResponse, GetOrderInfoResponse, GetReportInfoResponse, GetReportResponse, GetShopInCanteenResponse, GetShopInfoResponse, GetShopMenuResponse, GetShopOrderResponse, GetToDayOrderResponse, SearchOrderResponse, SearchReportResponse } from './dto/response.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginRequestDto, CreateAdminRequestDto } from './dto/request.dto';

@ApiTags('admin')
@Controller('admin')
@SetMetadata('isPublic', true)
export class AdminController {
  constructor(@Inject('KAFKA') private client: ClientKafka, private JwtService: JwtService) {}

  @SetMetadata('isPublic', true)
  @Post('create-admin')
  @ApiOperation({ summary: 'Create new admin to database' })
  @ApiResponse({ status: 201, description: 'Create new admin successes', type: CreateAdminResponseDto })
  async createAdmin(@Body() createAdminRequest: CreateAdminRequestDto, @Request() req): Promise<CreateAdminResponseDto> {
      const authId = `admin-${uuidv4()}`;
      const token = await this.JwtService.signAsync( { authId: authId });
      createAdminRequest.authId = authId;
      const result = this.client.send('createAdmin', JSON.stringify(createAdminRequest));
      await lastValueFrom(result);
      const tokenDto = new CreateAdminResponseDto();
      tokenDto.token = token;
      return tokenDto;
  }

  @SetMetadata('isPublic', true)
  @Post('login')
  @ApiOperation({ summary: 'Login to admin' })
  @ApiResponse({ status: 201, description: 'Login successes', type: AdminLoginResponseDto })
  async login(@Body() adminLoginRequest: AdminLoginRequestDto): Promise<AdminLoginResponseDto> {
      const result = this.client.send('adminLogin', JSON.stringify(adminLoginRequest))
      .pipe(
        catchError(error => {
          const { statusCode, message } = error;
          if(statusCode === 401)
            throw new BadRequestException(message);
          else throw new BadRequestException(error);
        }),
      );
      const value = await lastValueFrom(result);
      const token = await this.JwtService.signAsync( { authId: value.authId });
      const tokenDto = new CreateAdminResponseDto();
      tokenDto.token = token;
      return tokenDto;
  }

  @Get()
  @ApiOperation({ summary: 'Get walker information' })
  @ApiResponse({ status: 200, description: 'Returns admin info.' })
  getWalker(): string {
    return 'ADMIN';
  }

  @Get('verify')
  @ApiOperation({ summary: 'Show list of walkers with status watingVerify' })
  @ApiResponse({ status: 200, description: 'Returns list of walkers pending approval.' })
  async walkerQueue(): Promise<string> {
    const result = await this.client.send('walkerQueue', {});
    const value = await lastValueFrom(result);
    return value;
  }

  @Put('verify')
  @ApiOperation({ summary: 'Verify a walker by changing their status to true' })
  @ApiResponse({ status: 200, description: 'Walker status updated successfully.' })
  async verifyWalker(@Body() verifyWalkerDto: VerifyWalkerDto): Promise<string> {
    const result = await this.client.send('verifyWalker', { ...verifyWalkerDto });
    const value = await lastValueFrom(result);
    return value;
  }

  @Delete('verify')
  @ApiOperation({ summary: 'Delete a walker by ID' })
  @ApiResponse({ status: 200, description: 'Walker deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Walker not found.' })
  async deleteWalker(@Body() delWalkerDto: VerifyWalkerDto): Promise<any> {
    const result = this.client.send('deleteWalker', { ...delWalkerDto });
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('requester')
  @ApiOperation({ summary: 'Show list of all requesters' })
  @ApiResponse({ status: 200, description: 'Returns list of requesters.' })
  async showRequester(): Promise<any> {
    const result = this.client.send('showRequester', {});
    return await lastValueFrom(result);
  }

  @Get('walker')
  @ApiOperation({ summary: 'Show list of walkers with status Active' })
  @ApiResponse({ status: 200, description: 'Returns list of Active walkers.' })
  async showWalker(): Promise<any> {
    const result = this.client.send('showWalker', {});
    return await lastValueFrom(result);
  }

  @Get('order')
  @ApiOperation({ summary: 'Show list of all orders' })
  @ApiResponse({ status: 200, description: 'Returns list of all orders.' })
  async showOrder(): Promise<any> {
    const result = this.client.send('showOrder', {});
    return await lastValueFrom(result);
  }

  @Put('approval/:id')
  @ApiOperation({ summary: 'Approve or disapprove an order' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  async postApproval(
    @Param('id') orderId: number,
    @Body() postApprovalDto: PostApprovalDto,
  ): Promise<any> {
    const result = this.client.send('postApproval', {
      orderId: orderId,
      orderStatus: postApprovalDto.orderStatus,
    });

    return await lastValueFrom(result);
  }

  @Get('order/today')
  @ApiOperation({ summary: 'Show list of all orders that create today' })
  @ApiResponse({ status: 200, description: 'Returns list of all orders that create today', type: GetToDayOrderResponse })
  async getToDayOrder(): Promise<string> {
    const result = await this.client.send('getToDayOrder', {});
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order/info')
  @ApiOperation({ summary: 'Get order information' })
  @ApiQuery({ name: 'orderId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns order info', type: GetOrderInfoResponse })
  async getOrderInfo(@Query() orderId: object): Promise<string> {
    const result = await this.client.send('getOrderInfo', orderId);
    const value = await lastValueFrom(result);
    return value;
  } 

  @Get('order/search')
  @ApiOperation({ summary: 'Search order by orderId, requesterId, walkerId' })
  @ApiQuery({ name: 'orderId', type: 'number' , required: false})
  @ApiQuery({ name: 'requesterId', type: 'number' , required: false})
  @ApiQuery({ name: 'walkerId', type: 'number' , required: false})
  @ApiResponse({ status: 200, description: 'Returns list of orders that match the search criteria', type: SearchOrderResponse })
  async searchOrder(@Query() msg: object): Promise<string> {
    const result = await this.client.send('searchOrder', msg);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order/filter')
  @ApiOperation({ summary: 'Filter order by date, orderStatus, canteenId, shopId, sortPrice' })
  @ApiQuery({ name: 'orderDate', type: 'string' , required: false})
  @ApiQuery({ name: 'orderStatus', type: 'string' , required: false, description: 'lookingForWalker, inProgress, completed, cancelled, waitingAdmin'})
  @ApiQuery({ name: 'canteenId', type: 'number' , required: false})
  @ApiQuery({ name: 'shopId', type: 'number' , required: false})
  @ApiQuery({ name: 'sortPrice', type: 'string' , required: false, description: 'asc or desc'})
  @ApiResponse({ status: 200, description: 'Returns list of orders that match the filter criteria', type: FilterOrderResponse })
  async filterOrder(@Query() msg: object): Promise<string> {
    const result = await this.client.send('filterOrder', msg);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('report')
  @ApiOperation({ summary: 'Show list of all reports' })
  @ApiResponse({ status: 200, description: 'Returns list of all reports.', type: GetReportResponse })
  async showReport(): Promise<any> {
    const result = this.client.send('getReport', {});
    return await lastValueFrom(result);
  }

  @Get('report/info')
  @ApiOperation({ summary: 'Get report information' })
  @ApiQuery({ name: 'reportId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns report info', type: GetReportInfoResponse })
  async getReportInfo(@Query() reportId: object): Promise<string> {
    const result = await this.client.send('getReportInfo', reportId);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('report/search')
  @ApiOperation({ summary: 'Search report by orderId, requesterId, walkerId' })
  @ApiQuery({ name: 'orderId', type: 'number' , required: false})
  @ApiQuery({ name: 'requesterId', type: 'number' , required: false})
  @ApiQuery({ name: 'walkerId', type: 'number' , required: false})
  @ApiResponse({ status: 200, description: 'Returns list of reports that match the search criteria', type: SearchReportResponse })
  async searchReport(@Query() msg: object): Promise<string> {
    const result = await this.client.send('searchReport', msg);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('report/filter')
  @ApiOperation({ summary: 'Filter report by date, canteenId, shopId, reportBy' })
  @ApiQuery({ name: 'reportDate', type: 'string' , required: false})
  @ApiQuery({ name: 'canteenId', type: 'number' , required: false})
  @ApiQuery({ name: 'shopId', type: 'number' , required: false})
  @ApiQuery({ name: 'reportBy', type: 'string' , required: false, description: 'requester, walker'})
  @ApiResponse({ status: 200, description: 'Returns list of reports that match the filter criteria', type: FilterReportResponse })
  async filterReport(@Query() msg: object): Promise<string> {
    const result = await this.client.send('filterReport', msg);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('canteen')
  @ApiOperation({ summary: 'Show list of all canteens' })
  @ApiResponse({ status: 200, description: 'Returns list of canteens.', type: CanteenResponse })
  async getCanteen(): Promise<any> {
    const result = this.client.send('getCanteen', {});
    return await lastValueFrom(result);
  }

  @Get('canteen/shop')
  @ApiOperation({ summary: 'Show list of all shops in a canteen' })
  @ApiQuery({ name: 'canteenId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns list of shops in a canteen.', type: GetShopInCanteenResponse })
  async getShopInCanteen(@Query() canteenId: object): Promise<string> {
    const result = await this.client.send('getShopInCanteen', canteenId);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('canteen/shop/menu')
  @ApiOperation({ summary: 'Show menu of a shop' })
  @ApiQuery({ name: 'shopId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns menu of a shop.', type: GetShopMenuResponse })
  async getShopMenu(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('getShopMenu', shopId);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('canteen/shop/order')
  @ApiOperation({ summary: 'Show order history of a shop' })
  @ApiQuery({ name: 'shopId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns order history of a shop.', type: GetShopOrderResponse })
  async adminGetShopOrderHistory(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('adminGetShopOrderHistory', shopId);
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('canteen/shop/info')
  @ApiOperation({ summary: 'Show information of a shop' })
  @ApiQuery({ name: 'shopId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Returns information of a shop.', type: GetShopInfoResponse })
  async adminGetShopInfo(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('adminGetShopInfo', shopId);
    const value = await lastValueFrom(result);
    return value;
  }
}
