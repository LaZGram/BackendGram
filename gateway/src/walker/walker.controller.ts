import { Controller, Get, Inject, Post, Body, Param, Request, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrderIdDto, CreateWalkerDto, UpdateWalkerDto, WalkerGetDto, UpdateOrderStatusDto, GetOrderListDto, ConfirmOrderDto, PostReportDto, GetOrderDetailDto, GetRequesterIdByOrderDto } from './dto/walker.dto';
import { AcceptOrderResponseDto } from './dto/response.dto';

@ApiTags('Walker')
@Controller('walker')
export class WalkerController {
  constructor(@Inject('KAFKA') private client: ClientKafka) {}

  @Get()
  @ApiOperation({ summary: 'Get walker base route' })
  @ApiResponse({ status: 200, description: 'Walker base route accessed successfully.' })
  getWalker(): string {
    return 'Walker';
  }

  @Post('registration')
  @ApiOperation({ summary: 'Register a new walker' })
  @ApiResponse({ status: 201, description: 'Walker registered successfully.', type: CreateWalkerDto })
  @ApiResponse({ status: 400, description: 'Invalid walker registration data.' })
  async walkerRegistration(@Body() walkerData: CreateWalkerDto, @Request() req): Promise<any> {
    const result = this.client.send('walkerRegistration', { ...walkerData, authId: req.jwt.authId });
    return await lastValueFrom(result);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get walker profile' })
  @ApiResponse({ status: 200, description: 'Walker profile retrieved successfully.', type: WalkerGetDto })
  @ApiResponse({ status: 404, description: 'Walker not found.' })
  async walkerGet(@Body() body: any, @Request() req): Promise<string> {
    const result = await this.client.send('walkerGet', { ...body, authId: req.jwt.authId });
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('profile/update')
  @ApiOperation({ summary: 'Update walker profile' })
  @ApiResponse({ status: 200, description: 'Walker profile updated successfully.', type: UpdateWalkerDto })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  async updateWalkerProfile(@Body() walkerData: UpdateWalkerDto, @Request() req): Promise<any> {
    const result = this.client.send('updateWalkerProfile', {...walkerData, authId: req.jwt.authId});
    return await lastValueFrom(result);
  }

  @Get('order-list')
  @ApiOperation({ summary: 'Get walker order list' })
  @ApiResponse({ status: 200, description: 'Order list retrieved successfully.', type: [GetOrderListDto] })
  async getOrderList(@Param() params: any): Promise<any> {
    const result = await this.client.send('getOrderList', {...params});
    return await lastValueFrom(result);
  }

  @Get('order-list/:orderId')
  @ApiOperation({ summary: 'Get order detail by orderId' })
  @ApiResponse({ status: 200, description: 'Order detail retrieved successfully.', type: [GetOrderDetailDto]})
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async getOrderDetail(@Param() params: OrderIdDto): Promise<any> {
    const result = await this.client.send('getOrderDetail', {...params});
    return await lastValueFrom(result);
  }

  @Post('order-list/:orderId/confirm-order')
  @ApiOperation({ summary: 'Confirm an order by orderId' })
  @ApiResponse({ status: 200, description: 'Order confirmed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid order confirmation data.' })
  async confirmOrder(
    @Param('orderId') orderId: Number,
    @Body() confirmData: ConfirmOrderDto
  ): Promise<any> {
    const result = this.client.send('confirmOrder', {
      orderId,
      ...confirmData,
    });
    return await lastValueFrom(result);
  }

  @Post('order-list/:orderId/report')
  @ApiOperation({ summary: 'Post a report for an order' })
  @ApiResponse({ status: 201, description: 'Report posted successfully.' })
  async postReport(@Param('orderId') orderId: Number, @Body() reportData: PostReportDto): Promise<any> {
    const result = this.client.send('postReport', { orderId, ...reportData });
    return await lastValueFrom(result);
  }

  @Get('order-list/:orderId/requester-id')
  @ApiOperation({ summary: 'Get requester ID by orderId' })
  @ApiResponse({ status: 200, description: 'Requester ID retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Requester not found.' })
  async getRequesterIdByOrder(@Param() params: GetRequesterIdByOrderDto): Promise<any> {
    const result = this.client.send('getRequesterIdByOrder', {...params});
    return (await lastValueFrom(result));
  }

  @Post('order-list/:orderId/status')
  @ApiOperation({ summary: 'Update the status of an order by orderId' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid order status data.' })
  async postOrderStatus(
    @Param('orderId') orderId: Number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<any> {
    const result = this.client.send('updateOrderStatus', {
      orderId,
      status: updateOrderStatusDto.status,
    });
    return await lastValueFrom(result);
  }

  @Post('order/accept')
  @ApiOperation({ summary: 'Walker accept an order' })
  @ApiQuery({ name: 'authId', type: String })
  @ApiQuery({ name: 'orderId', type: Number })
  @ApiResponse({ status: 200, description: 'Order accepted successfully.', type: AcceptOrderResponseDto })
  async acceptOrder(@Query() msg: object): Promise<any> {
    const result = this.client.send('acceptOrder', msg);
    return await lastValueFrom(result);
  }
}
